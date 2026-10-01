"use client";

import { OrthographicCamera, useFBO, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import * as React from "react";
import * as THREE from "three";
import { WebGLErrorBoundary } from "@/components/ui/webgl-error-boundary";
import gsap from 'gsap';

const GLOBAL_IMAGES: RippleImageItem[] = [];

const NEUTRAL_MAP = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><path fill="#808000" d="M0 0h1v1H0z"/></svg>')}`;
type DisplacementBounds = { x: number; y: number; width: number; height: number };

/** Componentry displacement field drives the browser's live backdrop pixels. */
export function GlobalRipple({ active }: { active?: string }) {
  const map = React.useRef<SVGFEImageElement>(null);
  const filter = React.useRef<SVGFilterElement>(null);
  const surface = React.useRef<HTMLDivElement>(null);
  const host = React.useRef<HTMLDivElement>(null);
  const keyboard = React.useRef(false);
  const [supported, setSupported] = React.useState(false);
  React.useEffect(() => {
    let cancelled = false;
    // SVG reference backdrop filters are currently reliable in Chromium/Edge.
    queueMicrotask(() => { if (!cancelled) setSupported(/Chrom(e|ium)|Edg\//.test(navigator.userAgent) && CSS.supports('backdrop-filter', 'url(#ulsan-global-distortion)')); });
    const clear = () => { keyboard.current = true; if (surface.current) surface.current.style.backdropFilter = 'none'; };
    const pointer = () => { keyboard.current = false; };
    window.addEventListener('keydown', clear);
    window.addEventListener('pointermove', pointer, { passive: true });
    return () => { cancelled = true; window.removeEventListener('keydown', clear); window.removeEventListener('pointermove', pointer); };
  }, []);
  const apply = React.useCallback((png: string, waves: number, bounds: DisplacementBounds) => {
    if (!map.current || !filter.current || !surface.current || !host.current) return;
    host.current.dataset.waves = String(waves);
    if (waves && !keyboard.current) {
      Object.assign(surface.current.style, { left: `${bounds.x}px`, top: `${bounds.y}px`, width: `${bounds.width}px`, height: `${bounds.height}px` });
      filter.current.setAttribute('width', String(bounds.width)); filter.current.setAttribute('height', String(bounds.height));
      map.current.setAttribute('x', String(-bounds.x)); map.current.setAttribute('y', String(-bounds.y));
      map.current.setAttribute('width', String(innerWidth)); map.current.setAttribute('height', String(innerHeight));
      map.current.setAttribute('href', png);
      surface.current.style.backdropFilter = 'url(#ulsan-global-distortion)';
      host.current.dataset.distorting = 'true';
    } else {
      surface.current.style.backdropFilter = 'none';
      host.current.dataset.distorting = 'false';
    }
  }, []);
  if (!supported) return null;
  return <div ref={host} data-global-ripple aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 55 }}>
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs><filter ref={filter} id="ulsan-global-distortion" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
        <feImage ref={map} href={NEUTRAL_MAP} preserveAspectRatio="none" result="displacement" />
        <feColorMatrix in="displacement" type="matrix" values="1 0 0 0 -0.001960784 0 1 0 0 -0.001960784 0 0 1 0 0 0 0 0 1 0" result="field" />
        <feDisplacementMap in="SourceGraphic" in2="field" scale={active === 'whale' || active === 'intro' ? 26 : 42} xChannelSelector="R" yChannelSelector="G" result="refracted" />
        <feColorMatrix in="displacement" type="matrix" values="0 0 0 0 0.56 0 0 0 0 0.85 0 0 0 0 0.78 0 0 0.025 0 0" result="highlight" />
        <feComposite in="highlight" in2="refracted" operator="over" />
      </filter></defs>
    </svg>
    <ImageRippleEffect global images={GLOBAL_IMAGES} onDisplacement={apply}
      distortionStrength={0.075} waveCount={24} waveSize={60}
      waveRotationSpeed={0.025} waveFadeMultiplier={0.95} waveGrowth={0.155} waveSpawnThreshold={8}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, pointerEvents: 'none' }} />
    <div ref={surface} data-distortion-surface style={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0, pointerEvents: 'none' }} />
  </div>;
}

const fragmentShader = `
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec2 winResolution;
uniform float uStrength;
uniform float uGlobal;

const float PI = 3.141592653589793238;

void main() {
  vec2 vUvScreen = gl_FragCoord.xy / winResolution.xy;
  vec4 displacement = texture2D(uDisplacement, vUvScreen);
  if (uGlobal > 0.5) {
    // Encode the installed shader's displacement direction into neutral R/G.
    // feDisplacementMap consumes this field against live compositor SourceGraphic.
    float d = clamp(displacement.r, 0.0, 1.0);
    float theta = d * 2.0 * PI;
    vec2 offset = vec2(sin(theta), cos(theta)) * d * 0.45 * min(uStrength / 0.075, 1.0);
    gl_FragColor = vec4(vec2(0.5) + offset, d, 1.0);
    return;
  }
  float theta = displacement.r * 2.0 * PI;

  vec2 dir = vec2(sin(theta), cos(theta));
  vec2 uv = vUvScreen + dir * displacement.r * uStrength;
  vec4 color = texture2D(uTexture, uv);

  gl_FragColor = color;
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const BRUSH_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
    <defs>
      <radialGradient id="g" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="white" stop-opacity="1"/>
        <stop offset="65%" stop-color="white" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="128" height="128" fill="url(#g)"/>
  </svg>
`)}`;

function createDemoImage(title: string, colorA: string, colorB: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${colorA}" />
          <stop offset="100%" stop-color="${colorB}" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#g)"/>
      <circle cx="610" cy="180" r="130" fill="white" fill-opacity="0.12"/>
      <circle cx="180" cy="760" r="190" fill="white" fill-opacity="0.12"/>
      <text x="64" y="900" fill="white" font-size="64" font-family="system-ui, sans-serif" opacity="0.9">
        ${title}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const DEFAULT_IMAGE_URLS = [createDemoImage("Aurora", "#0f172a", "#155e75")];

export interface RippleImageItem {
  src: string;
  fit?: 'cover';
  x?: number;
  y?: number;
  widthScale?: number;
  heightScale?: number;
}

export interface ImageRippleEffectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  className?: string;
  images?: RippleImageItem[];
  /** Low-resolution displacement field; receives window pointer events. */
  global?: boolean;
  onDisplacement?: (png: string, waves: number, bounds: DisplacementBounds) => void;
  brushTextureUrl?: string;
  distortionStrength?: number;
  waveCount?: number;
  waveSize?: number;
  waveRotationSpeed?: number;
  waveFadeMultiplier?: number;
  waveGrowth?: number;
  waveSpawnThreshold?: number;
  children?: React.ReactNode;
}

type ViewportDimensions = {
  width: number;
  height: number;
  pixelRatio: number;
};

function useContainerDimensions(
  ref: React.RefObject<HTMLElement | null>,
): ViewportDimensions {
  const [dimensions, setDimensions] = React.useState<ViewportDimensions>({
    width: 0,
    height: 0,
    pixelRatio: 1,
  });

  React.useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        pixelRatio:
          typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.25) : 1,
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [ref]);

  return dimensions;
}

interface RippleSceneProps {
  global: boolean;
  onDisplacement?: (png: string, waves: number, bounds: DisplacementBounds) => void;
  width: number;
  height: number;
  pixelRatio: number;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  images: RippleImageItem[];
  brushTextureUrl: string;
  distortionStrength: number;
  waveCount: number;
  waveSize: number;
  waveRotationSpeed: number;
  waveFadeMultiplier: number;
  waveGrowth: number;
  waveSpawnThreshold: number;
}

function RippleScene({
  global,
  onDisplacement,
  width,
  height,
  pixelRatio,
  pointerRef,
  images,
  brushTextureUrl,
  distortionStrength,
  waveCount,
  waveSize,
  waveRotationSpeed,
  waveFadeMultiplier,
  waveGrowth,
  waveSpawnThreshold,
}: RippleSceneProps) {
  const { viewport } = useThree();
  const { gl, camera, advance, scene } = useThree();
  const hasWaves = React.useRef(false);

  const loadedBrushTexture = useTexture(brushTextureUrl);
  const brushTexture = React.useMemo(() => {
    const texture = loadedBrushTexture.clone();
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }, [loadedBrushTexture]);
  const imageTextures = useTexture(images.map((item) => item.src));
  const rippleScene = React.useMemo(() => new THREE.Scene(), []);
  const imageScene = React.useMemo(() => new THREE.Scene(), []);

  const waveMeshesRef = React.useRef<THREE.Mesh[]>([]);
  const prevMouseRef = React.useRef({ x: 0, y: 0 });
  const currentWaveRef = React.useRef(0);
  const materialRef = React.useRef<THREE.ShaderMaterial>(null);

  const uniformsRef = React.useRef({
    uDisplacement: { value: null as THREE.Texture | null },
    uTexture: { value: null as THREE.Texture | null },
    winResolution: { value: new THREE.Vector2(1, 1) },
    uStrength: { value: distortionStrength },
    uGlobal: { value: global ? 1 : 0 },
  });

  const fboBase = useFBO(Math.max(Math.round(width * (global ? Math.min(1 / 3, 512 / width) : 1)), 1), Math.max(Math.round(height * (global ? Math.min(1 / 3, 512 / width) : 1)), 1), {
    type: global ? THREE.UnsignedByteType : THREE.HalfFloatType,
    depthBuffer: false,
    stencilBuffer: false,
  });
  const fboTexture = useFBO(global ? 1 : Math.max(width, 1), global ? 1 : Math.max(height, 1), {
    depthBuffer: false,
    stencilBuffer: false,
  });

  const imageCamera = React.useMemo(
    () =>
      (() => {
        const imageCamera = new THREE.OrthographicCamera(
        viewport.width / -2,
        viewport.width / 2,
        viewport.height / 2,
        viewport.height / -2,
        -1000,
        1000,
        );
        imageCamera.position.z = 2;
        return imageCamera;
      })(),
    [viewport.height, viewport.width],
  );

  React.useEffect(() => () => brushTexture.dispose(), [brushTexture]);

  React.useEffect(() => {
    const meshes: THREE.Mesh[] = [];
    const geometry = new THREE.PlaneGeometry(waveSize, waveSize, 1, 1);
    for (let i = 0; i < waveCount; i += 1) {
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        map: brushTexture,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      mesh.rotation.z = Math.random();
      rippleScene.add(mesh);
      meshes.push(mesh);
    }

    waveMeshesRef.current = meshes;
    currentWaveRef.current = 0;

    return () => {
      geometry.dispose();
      meshes.forEach((mesh) => {
        rippleScene.remove(mesh);
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material.dispose();
        }
      });
    };
  }, [brushTexture, rippleScene, waveCount, waveSize]);

  React.useEffect(() => {
    while (imageScene.children.length > 0) {
      imageScene.remove(imageScene.children[0] as THREE.Object3D);
    }

    imageScene.add(imageCamera);
    const geometry = new THREE.PlaneGeometry(1, 1);
    const group = new THREE.Group();

    images.forEach((item, index) => {
      const texture = imageTextures[index];
      if (!texture) {
        return;
      }
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;

      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ map: texture }),
      );
      mesh.position.x = (item.x ?? (index - (images.length - 1) / 2) * 0.25) * viewport.width;
      mesh.position.y = (item.y ?? 0) * viewport.height;
      mesh.position.z = 1;
      mesh.scale.x = viewport.width * (item.widthScale ?? 0.22);
      mesh.scale.y = viewport.width * (item.heightScale ?? 0.28);
      if (item.fit === 'cover') {
        const image = texture.image as { width?: number; height?: number };
        const ratio = (image.width ?? 1) / (image.height ?? 1);
        mesh.scale.x = Math.max(viewport.width, viewport.height * ratio);
        mesh.scale.y = mesh.scale.x / ratio;
      }
      group.add(mesh);
    });

    imageScene.add(group);

    return () => {
      geometry.dispose();
      group.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material?.dispose?.();
        }
      });
      imageScene.remove(group);
    };
  }, [imageCamera, imageScene, imageTextures, images, viewport.height, viewport.width]);

  React.useEffect(() => {
    if (!global) return;
    const query = matchMedia('(prefers-reduced-motion: no-preference) and (pointer: fine)');
    let lastX = pointerRef.current.x, lastY = pointerRef.current.y, lastFrame = 0;
    const tick = (time: number) => {
      if (document.hidden || !query.matches) return;
      const moved = lastX !== pointerRef.current.x || lastY !== pointerRef.current.y;
      if (!moved && !hasWaves.current) return;
      if (time - lastFrame < 1 / 30) return;
      lastFrame = time;
      lastX = pointerRef.current.x; lastY = pointerRef.current.y;
      advance(time);
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); };
  }, [advance, global, pointerRef]);

  useFrame((_state, delta) => {
    const uniforms = materialRef.current?.uniforms ?? uniformsRef.current;
    uniforms.uStrength.value = distortionStrength;
    const x = pointerRef.current.x - width / 2;
    const y = -pointerRef.current.y + height / 2;
    const prev = prevMouseRef.current;
    const moved =
      Math.abs(x - prev.x) > waveSpawnThreshold ||
      Math.abs(y - prev.y) > waveSpawnThreshold;

    if (moved && waveMeshesRef.current.length > 0) {
      const waveIndex = currentWaveRef.current % waveMeshesRef.current.length;
      const mesh = waveMeshesRef.current[waveIndex];
      if (mesh) {
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.visible = true;
        mesh.scale.set(1.75, 1.75, 1);
        mesh.rotation.z = Math.random() * Math.PI;
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = 1;
      }
      currentWaveRef.current = (waveIndex + 1) % waveMeshesRef.current.length;
    }
    prevMouseRef.current = { x, y };

    hasWaves.current = false;
    const step = Math.min(2, Math.max(.1, delta * 60));
    waveMeshesRef.current.forEach((mesh) => {
      if (!mesh.visible) {
        return;
      }
      mesh.rotation.z += waveRotationSpeed * step;
      const decay = Math.pow(.98, step);
      mesh.scale.x = decay * mesh.scale.x + waveGrowth * (1 - decay) / .02;
      mesh.scale.y = mesh.scale.x;
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity *= Math.pow(waveFadeMultiplier, step);
      if (material.opacity <= 0.01) {
        mesh.visible = false;
      } else { hasWaves.current = true; }
    });
    const waveCount = waveMeshesRef.current.filter(mesh => mesh.visible).length;
    if (global) gl.domElement.setAttribute('data-waves', String(waveCount));

    uniforms.uTexture.value = fboTexture.texture;
    uniforms.uDisplacement.value = fboBase.texture;
    uniforms.winResolution.value.set(global ? gl.domElement.width : width * pixelRatio, global ? gl.domElement.height : height * pixelRatio);

    gl.setRenderTarget(fboBase);
    gl.clear();
    gl.render(rippleScene, camera);

    if (!global) {
      gl.setRenderTarget(fboTexture);
      gl.clear();
      gl.render(imageScene, imageCamera);
    }

    gl.setRenderTarget(null);
    gl.render(scene, camera);
    if (global && onDisplacement) {
      let minX = width, minY = height, maxX = 0, maxY = 0;
      for (const mesh of waveMeshesRef.current) {
        if (!mesh.visible) continue;
        const radius = waveSize * mesh.scale.x / 2 + 24;
        const x = mesh.position.x + width / 2, y = height / 2 - mesh.position.y;
        minX = Math.min(minX, x - radius); maxX = Math.max(maxX, x + radius);
        minY = Math.min(minY, y - radius); maxY = Math.max(maxY, y + radius);
      }
      const x = Math.max(0, Math.floor(minX)), y = Math.max(0, Math.floor(minY));
      const bounds = { x, y, width: Math.max(1, Math.min(width, Math.ceil(maxX)) - x), height: Math.max(1, Math.min(height, Math.ceil(maxY)) - y) };
      onDisplacement(waveCount ? gl.domElement.toDataURL('image/png') : '', waveCount, bounds);
    }
  }, 1);

  return (
    <mesh>
      <planeGeometry args={[Math.max(width, 1), Math.max(height, 1), 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        // R3F needs this stable imperative uniform object for the shader material.
        // eslint-disable-next-line react-hooks/refs
        uniforms={uniformsRef.current}
      />
    </mesh>
  );
}

export function ImageRippleEffect({
  global = false,
  onDisplacement,
  className,
  images = DEFAULT_IMAGE_URLS.map((src) => ({ src })),
  brushTextureUrl = BRUSH_DATA_URI,
  distortionStrength = 0.075,
  waveCount = 100,
  waveSize = 60,
  waveRotationSpeed = 0.025,
  waveFadeMultiplier = 0.95,
  waveGrowth = 0.155,
  waveSpawnThreshold = 0.1,
  children,
  ...props
}: ImageRippleEffectProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { width, height, pixelRatio } = useContainerDimensions(containerRef);
  const pointerRef = React.useRef({ x: 0, y: 0 });

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    },
    [],
  );

  React.useEffect(() => {
    if (!global) return;
    let timestamp = 0, responses = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || document.hidden || event.timeStamp - timestamp < 35) return;
      timestamp = event.timeStamp;
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (containerRef.current) containerRef.current.dataset.responses = String(++responses);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [global]);

  const frustumSize = height;
  const aspect = width > 0 && height > 0 ? width / height : 1;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={cn(
        "relative h-[560px] w-full overflow-hidden text-white",
        className,
      )}
      {...props}
    >
      {width > 0 && height > 0 && (
        <WebGLErrorBoundary fallback={<div aria-hidden="true" />}>
          <Canvas style={global ? { pointerEvents: 'none' } : undefined} frameloop={global ? "never" : "always"} dpr={global ? Math.min(1 / 3, 512 / Math.max(width, 1)) : [1, 1.25]} gl={{ alpha: true, antialias: false }} onCreated={({ gl }) => { if (global) gl.domElement.setAttribute('data-global-ripple-canvas', ''); }}>
            <OrthographicCamera
              makeDefault
              args={[
                (frustumSize * aspect) / -2,
                (frustumSize * aspect) / 2,
                frustumSize / 2,
                frustumSize / -2,
                -1000,
                1000,
              ]}
              position={[0, 0, 2]}
            />
            <RippleScene
              global={global}
              onDisplacement={onDisplacement}
              width={width}
              height={height}
              pixelRatio={pixelRatio}
              pointerRef={pointerRef}
              images={images}
              brushTextureUrl={brushTextureUrl}
              distortionStrength={distortionStrength}
              waveCount={waveCount}
              waveSize={waveSize}
              waveRotationSpeed={waveRotationSpeed}
              waveFadeMultiplier={waveFadeMultiplier}
              waveGrowth={waveGrowth}
              waveSpawnThreshold={waveSpawnThreshold}
            />
          </Canvas>
        </WebGLErrorBoundary>
      )}
      {children ? (
        <div className="pointer-events-none absolute inset-0 z-10">{children}</div>
      ) : null}
    </div>
  );
}
