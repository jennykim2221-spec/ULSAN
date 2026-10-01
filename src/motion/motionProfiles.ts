/**
 * Motion profiles — desktop default; tablet/mobile extend later (§12).
 */
export type MotionProfileId = 'desktop' | 'compact' | 'reduced';

export type MotionProfile = {
  id: MotionProfileId;
  enableLenis: boolean;
  enablePin: boolean;
  enableHorizontalArchive: boolean;
  enableWebGL: boolean;
  enableCustomCursor: boolean;
  enableGardenDepth: boolean;
};

export const motionProfiles: Record<MotionProfileId, MotionProfile> = {
  desktop: {
    id: 'desktop',
    enableLenis: true,
    enablePin: true,
    enableHorizontalArchive: false,
    enableWebGL: false,
    enableCustomCursor: true,
    enableGardenDepth: true,
  },
  compact: {
    id: 'compact',
    enableLenis: false,
    enablePin: false,
    enableHorizontalArchive: false,
    enableWebGL: false,
    enableCustomCursor: false,
    enableGardenDepth: false,
  },
  reduced: {
    id: 'reduced',
    enableLenis: false,
    enablePin: false,
    enableHorizontalArchive: false,
    enableWebGL: false,
    enableCustomCursor: false,
    enableGardenDepth: false,
  },
};

export function resolveMotionProfile(input: {
  width: number;
  height: number;
  prefersReducedMotion: boolean;
  userReducedMotion: boolean;
}): MotionProfile {
  if (input.prefersReducedMotion || input.userReducedMotion) {
    return motionProfiles.reduced;
  }
  if (input.width < 1280 || input.height < 640) {
    return motionProfiles.compact;
  }
  return motionProfiles.desktop;
}
