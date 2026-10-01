# ULSAN — MASTER BUILD SPEC

문서 버전: 1.0 · 작성일: 2026-09-29 · 대상: ULSAN Cursor 프로젝트 / 구현 담당 Codex

이 파일을 프로젝트 루트에 `MASTER_BUILD_SPEC.md`로 두고 읽는다. 이 산출물은 사이트 구현 명세이며 사이트 자체나 배포 완료 보고서가 아니다. 아래 확정 설계대로 Foundation부터 순서대로 구현한다. 새로운 디자인 브리프를 만들거나 기획 질문을 다시 시작하지 않는다.

## 0. 적용 범위와 우선순위

1. 사용자의 명시적 최신 요청 → 이 문서의 실행 규칙 → 부록의 원본 감사 관찰 순으로 적용한다.
2. `ASSET_AUDIT.md`는 에셋 조사 자료다. 그 안의 “이번 작업은 감사 문서만 작성한다”는 당시 감사 범위를 설명한 문장이지, 이번 사이트 구현을 금지하는 명령이 아니다.
3. 확정된 것은 컨셉, 장면 순서, 핵심 카피, 매핑, 기술 스택, 금지사항이다. 기존 대화에 없던 정확한 거리·진행률·크기·성능 예산은 이 문서에서 정한 **구현 기본값**이다. 이를 과거 대화에서 이미 승인된 수치라고 표현하지 않는다.
4. 부록 A의 전수 매핑 및 부록 B의 감사 원문을 함께 읽는다. 해상도·바이트·중복·불확실성은 원문을 보존한다. 이번 문서 작성 중 66장 육안 감사를 새로 수행했다고 주장하지 않는다.
5. `과거 태화강3.jpg`만 사용자 지시로 U04의 사용 보류를 해제한다. 오염 시기 태화강을 표현하는 **연대 미상 아카이브 이미지**로 배치한다. 화면에 촬영연도·기사 출처·사진 출처를 표시하지 않는다. 1996년 BOD는 별도 사실 데이터이며 사진 촬영연도가 아니다. 사진의 실제 장소·날짜·폐사 원인이 검증되었다고 내부 메타데이터도 바꾸지 않는다.
6. 사용자의 Phase 4 지시에 따라 `현재 태화강3.jpg`를 Recovery의 짧은 분위기 전환 컷으로 활성화한다. 작은 640px 이하 프레임에서 `현재 태화강2.jpg`로 짧게 이어지게 하고, 날짜·촬영 출처·특정 수질 상태를 부여하지 않는다. 기존 촬영 시점/장소 불확실성(U01)은 유지한다.
7. 원본 감사의 다른 보류는 유지한다. 부족한 사진을 AI·스톡 이미지로 대신하거나 별도 지시 없이 보류 에셋을 활성화하지 않는다. 문서의 제한 표시만으로 구현 전체를 중단할 필요는 없다.

## 1. 잠긴 프로젝트 컨셉

**강을 따라 이동하면 시간이 흐른다.**

울산의 선사 기록, 강변 생활, 산업화, 환경 위기와 회복, 정원, 고래 문화, 항만과 바다를 한 번의 세로 스크롤 서사로 연결한다. 강의 선은 시각 정체성·장면 연결·내비게이션·진행률을 담당한다. 고래는 선사 기록에서 되돌아오는 시간의 모티프다.

- 관광 정보는 Explore Ulsan에서 처음 전면화한다. 앞부분을 관광 카드 목록이나 일반 랜딩페이지로 바꾸지 않는다.
- 화면 가득한 것은 장면의 공간과 분위기다. 작은 사진을 무조건 화면 가득 늘리는 뜻이 아니다.
- 기록사진은 작은 독립 프레임, 원래 비율, 넓은 여백으로 읽힌다. 흑백을 가짜 고화질로 보정하지 않는다.
- 산업 발전과 강의 위기를 함께 다룬다. 포경을 영웅화하거나 복원으로 환경 문제가 영구히 끝났다는 결론을 만들지 않는다.
- 강→장생포→항만→해안은 문화·공간의 주제 이동이다. 실제 강이 모든 관광지를 순서대로 관통한다는 지도나 항로를 만들지 않는다.
- 영어 제목과 한국어 메시지는 함께 보인다. 본문은 한국어 우선, 영어는 짧은 동등 의미의 보조문. 별도 언어 전환 기능은 초기 범위에 없다.
- 자동 음향·배경 음악·영상·로그인·예약·블로그·CMS·상점·챗봇은 초기 범위에 없다.

## 2. 화면과 디자인 규칙

### 2.1 PC-first / future mobile

- 주 디자인: 1440×900, 추가 검수: 1920×1080. 1280×720까지 모든 기능과 카피 정상 노출.
- 1440 이상: 좌우 기본 여백 80px, 우측 내비게이션 예약 폭 112px. 1280–1439: 여백 48px, 예약 폭 88px.
- 1920 초과: 텍스트·기록 프레임 콘텐츠 폭 1600px 제한. 배경색·선만 화면 끝까지 확장한다.
- 1280 미만 또는 높이 640px 미만: 같은 콘텐츠의 읽기 레이아웃으로 전환. pin·가로 스크롤·커서·WebGL을 끄고 세로 흐름 유지. “PC에서만 이용” 차단 화면 금지.
- 높이가 부족하거나 200% 확대 시에도 본문이 잘리지 않도록 pin을 해제하는 `compact` 모드 제공. 모바일 전용 완성 디자인은 후속 범위지만 읽기·링크·Explore 상세는 첫 버전부터 동작한다.

### 2.2 색상

| 장면 | 주요 색 / 대비 색 |
|---|---|
| Loading / Intro | #090B10 / #E7E5DE |
| Source | #181713 / #C8B99A |
| Upper stream | #5C7354 / #D9DFCF |
| Archive | #E7E1D6 / #181818 |
| Industry | #252525 / #B86432 |
| Dead river | #171816 / #554E3E |
| Recovery | #396B78 / #A7C8C0 |
| Garden | #355E48 / #DDE6D6 |
| Whale / Sea | #071A2B / #B8D7E7 |
| Night / Ending | #090B10 / #E7E5DE |

위 색은 분위기 토큰이다. 갈색·녹색 악센트를 작은 본문에 그대로 적용하지 않는다. 실제 배경과 4.5:1 대비가 확보되는 밝은/어두운 본문 토큰을 별도로 선택한다. 사진 위 긴 본문 금지. 꼭 필요한 짧은 제목에는 국소 그라데이션을 쓰되 사진 정보를 과하게 숨기지 않는다.

### 2.3 타이포그래피 / 레이어

- 세 계열 한도: 영문 대제목 `Barlow Condensed`, 한국어/본문 `Noto Sans KR`, 연도/메타 `IBM Plex Mono`. 설치 시 각 폰트 배포본의 라이선스를 보관하고 필요한 WOFF2만 자체 제공한다. 폰트 없을 때 시스템 sans/monospace로 즉시 표시.
- 영문 대제목 `clamp(64px, 8vw, 152px)`, 한국어 제목 `clamp(28px, 3vw, 52px)`, 본문 17–20px / line-height 1.65, 메타 12–14px. Intro ULSAN은 `clamp(112px, 19vw, 320px)`.
- 한 장면의 긴 본문은 최대 36em, 제목은 최대 3줄. 본문을 영문 대문자로 바꾸지 않는다. 모든 영문 span에 `lang="en"`.
- z-index: 배경 0, 사진 10, 장식 SVG/WebGL 20, 본문 30, 내비 50, 커서 60, Explore dialog 100, 로딩 120. 장식은 `pointer-events:none`.
- 버튼은 텍스트·얇은 선 위주. 카드 그림자, 둥근 SaaS 패널, 유리 질감 UI, 무지개 그라데이션 금지.

## 3. 기술 및 런타임 계약

필수 스택: **Next.js App Router + TypeScript(strict) + GSAP / ScrollTrigger / MotionPathPlugin + Lenis + Three.js / React Three Fiber / Drei + SVG + CSS Modules**.

- 프로젝트에 기존 lockfile이 있으면 우선 사용한다. 없으면 구현 시점의 서로 호환되는 안정 버전을 선택하고 lockfile로 고정한다. 버전 번호를 이 문서만 보고 추측하지 않는다. React와 R3F의 peer dependency를 확인한다.
- `app/page.tsx`와 콘텐츠는 서버 렌더링. 스크롤 orchestration, 커서, dialog, Canvas만 client boundary. Canvas는 client wrapper에서 동적 로딩, SSR 제외.
- 사진과 글은 DOM. Three.js는 고래에만 기본 사용한다. 바다·정원·역사 전체를 Canvas로 옮기지 않는다.
- 스타일은 CSS Modules + 최소 전역 reset/token. Tailwind나 다른 애니메이션 프레임워크를 임의로 추가하지 않는다.
- SVG stroke-dasharray/dashoffset으로 선 그리기. MotionPathPlugin으로 점 이동. MorphSVG/DrawSVG 등의 추가 플러그인에 의존하지 않는다. 서로 다른 path 형태는 같은 샘플 개수의 좌표 보간 또는 교차 페이드로 전환한다.
- 기본 scroll container는 document/window. transform을 건 거대한 스크롤 래퍼를 만들지 않는다. Lenis는 스무딩만 담당한다.
- 하나의 GSAP ticker가 Lenis `raf(time * 1000)`를 호출한다. `autoRaf:false`, Lenis scroll 이벤트에서 `ScrollTrigger.update`. 동일 Lenis를 별도 requestAnimationFrame으로 또 실행하지 않는다. `gsap.ticker.lagSmoothing(0)`은 provider에서 한 번만 설정하고 앱 전체 영향을 기록한다.
- `gsap.context` 또는 `useGSAP` 범위로 수명 관리. StrictMode 재마운트에서도 이벤트/trigger/ticker 중복 0. cleanup 시 생성한 자원만 해제한다.
- R3F render loop는 고래가 활성인 동안만 실행한다. GSAP는 진행률 ref만 갱신하고 `useFrame`이 GPU uniform/transform에 반영한다. React setState를 프레임마다 호출하지 않는다.
- resize: 폭·높이 재측정 → scene config 재계산 → Lenis resize → ScrollTrigger refresh. 폰트와 주요 이미지 decode 후 최초 refresh. resize observer는 150ms debounce, 프레임마다 refresh 금지.
- 초기 HTML은 읽을 수 있어야 한다. JS 초기화 성공 후에만 animated layout 클래스를 적용한다. JS 실패로 모든 콘텐츠가 opacity:0에 남아서는 안 된다.

구현 참고: [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Lenis 공식 저장소](https://github.com/darkroomengineering/lenis), [Next Image](https://nextjs.org/docs/app/api-reference/components/image), [R3F 문서](https://r3f.docs.pmnd.rs/). 사용 API는 설치 버전의 공식 문서와 대조한다.

## 4. 에셋 계약과 파일 경로

- 원본 실경로는 프로젝트의 `assets/images/` 한 곳이다. 19개 주제는 문서 분류이며 폴더가 아니다.
- 66개 모두 JPEG, 합계 **20,686,753 bytes / 약 19.73 MiB**, SHA-256 완전 중복 0. 어느 파일도 원본으로 1920×1080 전체 화면 조건을 충족하지 않는다.
- 기존 파일명·띄어쓰기·가운뎃점 `·`·확장자 `.jpg`를 그대로 보존한다. 예: `대곡천·태화강 상류 자연 사진2.jpg`.
- `scripts/sync-assets.mjs`: 원본을 읽어 `public/assets/images/`에 동일 이름의 배포 사본을 생성한다. 원본 이동·삭제 금지. 사본 hash가 원본과 같은지 확인하고 manifest를 생성한다. URL은 `/assets/images/${encodeURIComponent(filename)}`로 경로 세그먼트만 인코딩한다. Windows 절대 경로를 브라우저에 넣지 않는다.
- `assets.ts`: filename, width, height, bytes, role, status, sceneIds, altKo, altEn, maxCssWidth, sourceUncertaintyIds, derivedFrom을 보유한다. 외부 이미지 URL로 hotlink하지 않는다.
- status는 `active | reserve | hold`. reserve는 기본 번들/프리로드/갤러리에 자동 포함하지 않는다. hold는 확인 전 공개 화면에서 제외한다. 모든 이미지 사용 의무 없음.
- 실사·기록의 alt는 감사에서 확인된 피사체만 쓴다. 정확한 공장명·동네·연도·동물 종을 추측하지 않는다. 장식으로 중복된 같은 이미지의 alt는 빈 문자열.
- 원본에 찍힌 로고·워터마크는 보존한다. `과거 태화강3.jpg`의 별도 출처 라벨 생략 지시는 다른 이미지의 원래 워터마크 제거 권한이 아니다.

### 4.1 원본 해상도를 지키는 프레임

사진 하나의 CSS 폭은 기본 `min(레이아웃 폭, 원본 가로 px)`이며 높이는 원비율. DPR 2의 실제 선명도 보장은 원본 폭/2까지임을 QA에 기록한다. 작은 기록사진은 280–520 CSS px 범위에서 그 파일 폭을 상한으로 한다. 기록사진에 cover, zoom, 원근 왜곡을 적용하지 않는다.

장면 대표 사진도 현재는 contained stage로 구현한다. 단색/그라데이션 배경 위에 원비율 사진을 배치하여 100svh 장면을 만든다. Explore의 “전체 화면 이미지”는 전체 화면 **뷰어**이며 저해상도 사진까지 무제한 cover하는 명령이 아니다. 고해상도 교체본 확보 후에만 개별 `allowCover:true`를 승인한다.

우선 고해상도 검토 8장: `반구대암각화3.jpg`, `대곡천·태화강 상류 자연 사진2.jpg`, `울산 야경3.jpg`, `태화강 국가정원1.jpg`, `태화강 국가정원4.jpg`, `장생포1.jpg`, `울산항1.jpg`, `울산 야경1.jpg`. 자동 교체/업스케일하지 말고 실제 렌더 품질 보고서를 먼저 남긴다.

## 5. 공통 스크롤 수학과 전환 규약

기호: `H=viewport height`, `W=viewport width`, `p=clamp((scrollY-start)/(end-start),0,1)`. 아래 pin 거리 `D`는 고정이 유지되는 **추가 스크롤 거리**다. 각 scene outer는 자연 높이 H, sticky 내부 stage H, ScrollTrigger가 D의 pin spacing을 추가한다. outer에 H+D를 다시 수동 할당하지 않는다.

- pin scene: `trigger: outer`, `pin: stage`, `start:'top top'`, `end:()=>'+='+D`, `pinSpacing:true`, `scrub:0.6`, `invalidateOnRefresh:true`, `anticipatePin:1`.
- stage 자체를 움직이지 말고 stage 안 layer를 애니메이션한다. 중첩 pin 금지. 아래 장면 내부에 별도의 pin trigger를 만들지 않는다.
- 일반 장면: reveal 시작 `top 80%`, 종료 `top 30%`, 이미지 parallax는 `top bottom`→`bottom top`. 장면 진행률은 해당 outer가 차지한 실제 scroll interval로 계산한다.
- 기본 ease는 스크롤 위치를 정확히 대응하는 `none`. 버튼·hover만 `power2.out`, 0.2–0.35초.
- 각 scene p의 0–0.10은 진입, 0.10–0.80은 읽기/핵심, 0.80–1은 이탈을 기본으로 한다. 세부 구간은 아래 표가 우선한다.
- 전환은 outgoing 장면 마지막 10–15%에서 배경/선/이미지를 페이드, 다음 장면 첫 10%에서 수신한다. 다음 stage를 이전 pin 내부로 끌어오지 않는다. 색이 일치하는 마지막/첫 프레임으로 이음새를 줄인다.
- 역스크롤도 같은 timeline을 역재생한다. `onEnter`에만 의존해 irreversible 상태를 만들지 않는다. 빠른 점프는 목적지 p를 바로 계산하여 올바른 최종 상태를 표시한다.
- snap은 기본 꺼짐. 휠을 가로 방향 이벤트로 가로채거나 장면마다 강제 이동하지 않는다.
- `sceneRegistry`는 refresh 후 실제 start/end 및 읽기 anchor를 저장한다. URL hash 진입·내비 클릭·탭 포커스 이동은 이 값을 사용한다. 임의 누적 vh 추정값을 쓰지 않는다.

## 6. 전체 Scene 실행표

Loading은 00 오버레이, 본문은 01–14의 확정 순서다. 화면 제목 번호와 내부 id를 섞지 않는다.

| ID / anchor | 장면 | 기본 pin 거리 D | 핵심 화면 / 입출력 |
|---|---|---:|---|
| 00 | Loading | 시간 기반, pin 아님 | 물방울 SVG, 준비 상태 → Intro |
| 01 / intro | ULSAN | 1.5H | 물방울 → 물길 → 강 선 → ULSAN |
| 02 / source | Bangucheon | 2.8H | 암면 세부 → 장소 → 분리된 추상 고래 선 |
| 03 / upper-stream | Upper stream | 1.4H | 물길과 산림, 강 내비 활성 |
| 04 / history | Old Ulsan | 3H | 시장·사람·강·배·시가지·공업탑 collage |
| 05 / industry | Industrialization | 1.0H+overflow+1.2H | 가로 archive → TODAY 컬러 |
| 06 / dead-river | The dead river | 1.8H | 작은 기록사진 + 독립된 11.3 |
| 07 / recovery | Recovery | 3.2H | 6개 역사 노드, 회복의 선 |
| 08 / garden | Green heart | 2.4H | 국가정원1 → 2 → 4 |
| 09 / whale | Whale | 2.4H | SVG 선 → 입자 → 추상 3D 선 고래 |
| 10 / jangsaengpo | Jangsaengpo | 1.4H | 고래 모티프와 고래 문화 |
| 11 / sea | Port / To the sea | 1.8H | 항만 프레임 → 수면 → Deep Blue |
| 12 / explore | Explore Ulsan | pin 없음, min-height 1.2H | 독립적 탐색 지도 / dialog |
| 13 / night | Night | 1.2H | 지도 점 → 도시 불빛 → 상향 이동 |
| 14 / ending | Ending | 1.5H | chapter line → 영어 → 한글 → 물방울 |

### 6.1 00 Loading

초기 서버 HTML의 Intro를 배경으로 가벼운 SVG 물방울 표시. 필요 항목은 로컬 글꼴 준비(실패 시 대체 글꼴), 강 SVG, `반구대암각화2.jpg` decode이며 나머지는 진행에 따라 로드한다. 최초 로딩에서 66장·Three.js 전체 다운로드를 기다리지 않는다.

실제 완료 항목/총 critical 항목 수로만 진행률을 표시한다. 가짜 0–100 카운터 금지. 최소 강제 대기 없음. 정상 완료 시 300ms 페이드. 5초가 지나면 오류 여부와 상관없이 `계속 보기 / CONTINUE` 제공. 선택 시 fallback으로 진입하고 로딩 잠금을 해제한다. JS 실패 시 로딩 오버레이가 생성되지 않는다. 직접 hash 진입·새로고침 위치 복원에서는 Intro 재생을 강제하지 않는다.

### 6.2 01 Intro

p 0–.18: 중앙 6px 물방울 → 세로 짧은 선. .18–.52: 강 SVG의 stroke reveal. .52–.78: ULSAN 글자 opacity/translateY(24→0), 자간만 소폭 정리. .78–1: 부제와 scroll cue, 강은 우측 작은 내비의 위치로 축소. 암각화로 넘어갈 배경은 Source 토큰으로 맞춘다.

타이틀을 글자 조각 폭발·3D 크롬 글자로 만들지 않는다. `이야기 시작 / START THE JOURNEY`는 source 읽기 anchor로 이동한다. `본문으로 건너뛰기`는 scene 콘텐츠로 포커스를 보낸다.

### 6.3 02 Source / Bangucheon

- .00–.32: `반구대암각화2.jpg`, 세로 프레임, 폭 min(30vw,420px), 왼쪽 x=12vw, 중앙 y=50%. 카피는 오른쪽 x=52vw, 폭 32vw. 사진 확대 없음.
- .32–.63: 2번이 0.2 opacity로 빠지고 `반구대암각화3.jpg`를 중앙 폭 min(66vw,900px)로 표시. 암면→절벽·물은 공간 확장이며 선사시대로 time dissolve하지 않는다.
- .63–.86: 원본과 분리된 추상 고래 SVG를 사진 옆 여백에 stroke로 생성. 암각화 위 특정 종을 직접 추적했다고 주장하지 않는다. U07 미확인 자료 1·4·5를 정확히 맞물리는 모핑의 마스크로 사용하지 않는다.
- .86–1: 고래 선을 짧은 입자로 풀어 우측 강 선 방향으로 이동, opacity 0. 다음 Upper Stream에서 원래 고래가 실재 강으로 들어간다는 식의 연출 금지.
- 정보 312점 / 약 20여 종 / 최소 7종 / UNESCO 2025는 본문 또는 작은 fact row. +MORE S01.

### 6.4 03 Upper stream

`대곡천·태화강 상류 자연 사진2.jpg`, 중심 프레임 폭 min(84vw,1280px), 원비율, 상단 잎·우측 정자 보존. 카피는 사진 외 여백 하단 좌측. .10–.70 읽기, 사진 translateY +12→−12px만 허용; 프레임 밖 단색 공간으로 이동하여 픽셀을 늘리지 않는다. .70–1 강 선을 우측 내비로 정착시키고 archive 배경색으로 전환. 촬영 위치를 반구대 바로 아래 지점이라고 적지 않는다.

### 6.5 04 Old Ulsan / Archive Collage

배경 #E7E1D6. 사진을 6개 시간 구간에 배치한다. x/y는 viewport 중심 기준 백분율, 폭 상한은 CSS px. 최소 간격 32px, 본문 영역과 겹치면 사진 위치만 최대 5vw 범위 조정한다.

| p 읽기 구간 | 파일 | 중심 x/y | 폭 상한 | 캡션 KO / EN |
|---|---|---|---:|---|
| .08–.21 | 옛 울산 시가지1.jpg | 31% / 49% | 420 | 시장과 사람 / A MARKET AND ITS PEOPLE |
| .21–.34 | 옛 울산 시가지6.jpg | 66% / 55% | 440 | 도시의 기억 / MEMORIES OF THE CITY |
| .34–.47 | 과거 태화강2.jpg | 32% / 53% | 400 | 강변의 생활 / LIFE BY THE RIVER |
| .47–.60 | 과거 태화강1.jpg | 66% / 48% | 440 | 배와 사람 / BOATS AND PEOPLE |
| .60–.73 | 옛 울산 시가지2.jpg | 35% / 53% | 520 | 옛 시가지 / THE OLD CITY |
| .73–.88 | 옛 공업탑.jpg | 66% / 50% | 440 | 산업도시의 상징 / A SYMBOL OF INDUSTRY |

각 카드 0.04p 동안 opacity 0→1, y 28→0. 이전 카드는 opacity .22, y −12, 다음 카드와 합쳐 최대 3장만 동시에 표시. 기록 읽기 중 확대/회전 없음. 제목은 좌상단의 고정된 별도 공간, 사진 캡션은 프레임 바깥. 옛6의 워터마크 보존. 마지막 .88–1 archive가 가로 트랙 첫 장과 같은 배경으로 전환.

### 6.6 05 Industrialization / Horizontal Archive

세로 스크롤을 가로 x transform에 대응시키되 실제 browser horizontal scrollbar는 만들지 않는다. stage 안 track 폭은 콘텐츠 기반. 패널 폭 `min(0.72W,1040px)`, gap `0.10W`, 시작·끝 padding `(W-panelWidth)/2`. 사진 폭은 별도 원본 상한을 지킨다.

확정 트랙 순서:

1. `1962 / THE INDUSTRIAL CITY BEGINS`: 사진 없음, 1962.01.27·1962.06 텍스트.
2. `노동 / LABOR`: `산업화 노동 모습 옛 사진1.jpg` 폭 480.
3. `건설 / CONSTRUCTION`: `울산 공장산업단지2.jpg` 폭 480.
4. `생산 / PRODUCTION`: `산업화 노동 모습 옛 사진2.jpg` 세로 폭 340 + `산업화 노동 모습 옛 사진3.jpg` 폭 360. 나란히 둘 수 없으면 한 패널에서 순차 등장. 업종/회사 단정 금지.
5. `공업탑 / INDUSTRIAL MONUMENT`: `옛 공업탑.jpg` 폭 440 → `현재 공업탑2.jpg` 폭 640. 상징적 time dissolve, 사진은 서로 다른 프레임. 사실 연도 1967은 사진과 떨어진 하단 타임라인에 둔다.
6. `도시 확장 / CITY EXPANSION`: `현재 울산 시가지2.jpg` 폭 500. 기록 이미지는 정확한 현재 연도가 아님.
7. `TODAY`: `울산 야경3.jpg` 폭 min(84vw,1600px). 지금의 산업도시라는 편집 의미이며 “2026 촬영” 금지.

`overflow=max(0,track.scrollWidth-stage.clientWidth)`; `lead=.5H`, `tail=1.2H`, `settle=.5H`, `D=lead+overflow+tail+settle`. `distance=clamp(localScroll-lead,0,overflow)`; `track.x=-distance`. 첫 lead 동안 제목, overflow 동안 선형 이동, 다음 tail 동안 TODAY 컬러 확장, 마지막 settle 동안 읽기 및 어두운 강으로 이탈한다. overflow=0이면 가로 이동을 생성하지 않고 lead+tail+settle 사용.

TODAY 확장: 원본 사진 위 grayscale 레이어와 아래 컬러 레이어를 겹쳐 clip-path inset을 100%→0으로 바꾸고, 화면 배경도 청색으로 번진다. 파일을 재색칠하지 않는다. 사진 자체는 원본 폭 이상 확대하지 않는다. 기록의 원래 컬러 사진을 영구 흑백으로 바꾸지 않는다.

보이는 패널만 focus 가능. 비가시 패널의 링크는 inert 처리. 가로 트랙 내부로 키보드 포커스를 옮길 때 해당 panel 중심 x를 계산하여 대응하는 세로 scrollY로 이동한다. 선택적 “산업 아카이브 건너뛰기 / SKIP ARCHIVE”는 dead-river anchor로 이동한다. 손가락 가로 드래그나 휠 가로채기 필수 아님.

### 6.7 06 The Dead River

`과거 태화강3.jpg` 폭 min(40vw,570px), 원비율, 좌측 중앙. 특정 연도·사건·출처를 표시하지 않는 연대 미상 오염 시절 archive image로만 사용한다. 오른쪽에 11.3(최대 160px)와 `BOD mg/L · 1996`, 둘은 별도 DOM 블록. 이미지의 caption/date/source 필드는 null, 화면에 출처/연도 배지 없음. alt는 `수면에 떠 있는 죽은 물고기` / `Dead fish floating on the water`로 한정.

.0–.20 밝기 전환, .20–.65 기록과 데이터 읽기. .65–.90 숫자 그룹이 y +64px 이동하며 opacity 1→0, 하단 clip으로 잠김 표현. **값은 11.3으로 유지**한다. .90–1 사진도 사라지고 회복 선만 남는다. 물고기 움직임·유체 시뮬레이션·충격적 확대 금지. 1992/2000 등의 추가 폐사사건을 이 사진에 연결하지 않는다.

### 6.8 07 Recovery

큰 사진 없이 선과 6개의 milestone이 중심. `현재 태화강3.jpg`는 Recovery 후반에 640px 이하 작은 분위기 전환 컷으로 짧게 등장하고 `현재 태화강2.jpg`가 마지막 .82–1에서 같은 크기의 보조 프레임으로 이어진다. 두 사진에 특정 촬영시점/장소를 부여하지 않는다. Garden 1번과 길게 중복 노출하지 않는다.

| p | milestone | 표시 |
|---|---|---|
| .08–.22 | 1996 | BOD 11.3 mg/L |
| .22–.36 | 2004 | 에코폴리스 울산 / ECOPOLIS ULSAN |
| .36–.50 | 2005 | 태화강 마스터플랜 / TAEHWA RIVER MASTER PLAN |
| .50–.64 | 2007 → | 1등급 수질로 개선 / IMPROVED TO GRADE 1 WATER QUALITY |
| .64–.78 | 2013 | 생태관광지역 / ECOTOURISM AREA |
| .78–.92 | 2019 | 국가정원 / NATIONAL GARDEN |

강 내비게이션과 같은 SVG path를 중앙으로 크게 확장해 강 자체가 타임라인이 되게 한다. 일반 회사형 타임라인 UI를 만들지 않고 오른쪽 실제 내비게이션 버튼은 유지한다. Navy/White/Black 바탕을 유지하고 Mint는 강 선·활성 내비게이션·focus 등 작은 강조 요소에만 쓴다. 회복 선은 White→Navy→Mint로 살아난다. 복원이 진행될수록 선과 장면의 움직임·공간감이 열린다. 노드 간 간격은 읽기 순서를 위한 균등 간격이며 정확한 연도 간격 그래프가 아니다. x축/y축·가짜 측정점 없음. `11.3`은 River Line으로 전환되며 이후 `1등급`이 등장한다. 11.3→0 같은 허구의 숫자 tween 금지. 선을 “수질 실측 그래프”라고 설명하지 않는다.

2007 이후 상태는 공식 역사 설명 기준이다. 모든 현재 측정소·모든 날의 1등급을 보장하는 문구를 쓰지 않는다. Ⅰa–Ⅰb는 설명 텍스트에서만 부연 가능, 오늘의 실시간 수질 표시 아님. +MORE 기본은 S04, 실패 시 S05의 연혁 링크로 대체.

### 6.9 08 Green Heart / National Garden

.08–.34 `태화강 국가정원1.jpg` 폭 1024 상한 → .34–.60 `태화강 국가정원2.jpg` 폭 1024 상한 → .60–.88 `태화강 국가정원4.jpg` 폭 812 상한. 첫 두 사진에는 12px 이하 y parallax만. 사실 row는 2019 / 대한민국 제2호 / 835,452㎡, 이미지 밖 배치.

Green Heart는 `태화강 국가정원1.jpg` 폭 1024 상한 → `태화강 국가정원2.jpg` 폭 1024 상한 → `태화강 국가정원4.jpg` 폭 812 상한의 큰 reveal로 전개한다. 대숲 depth는 같은 사진에서 수동 지정한 앞/중간/배경 마스크의 시각 효과다. 원본을 덮어쓰지 않고 SVG/CSS clip 사용. pointer x/y를 −1..1로 정규화하여 앞 ±10px, 중간 ±5px, 뒤 ±2px, scroll y 최대 16/8/3px. 틈이 보이면 움직임을 먼저 줄이고 최종 fallback은 전체 이미지 4px 이동. 새 대나무·3D 숲·가짜 깊이 생성 금지. 텍스트는 마스크와 별도 레이어. pointer leave에 250ms 원점 복귀.

### 6.10 09 Whale

.00–.20 Source에서 사용한 동일 SVG 고래 선 재등장. .20–.42 선의 샘플 점 600개가 최대 0.15 정규화 거리로 흩어짐. .42–.68 동일 seed 입자가 추상 입체 고래를 형성. .68–.85 선 구조가 읽히도록 정지에 가까운 유영, .85–1 오른쪽으로 이동하여 Jangsaengpo에 전달.

형태는 고래로 읽히는 몸통·꼬리·지느러미의 윤곽이며 실제 종 복원이나 원 암각화 도상의 정밀 복제라고 주장하지 않는다. 기본 24개의 세로/가로 곡선과 1,200개의 Points, 작은 기기 600, 저성능 300. 최상위라도 2,000점 한도. 꼬리 진폭 최대 몸길이 .035, 주기 4초, roll ±3°, yaw ±8°. 눈·피부·금속·실사 질감·거대한 실체 mesh 금지.

카메라 FOV 35°, z=6, 고래 기준 길이 3.2 world units; 화면 폭 55–65% 이내. ambient glow는 선의 opacity로, bloom/postprocessing은 기본 없음. 원점과 스케일은 export된 `whale-shape.ts` 하나로 SVG/3D 공용. 프레임마다 geometry를 재생성하지 않는다.

Source SVG→3D 매칭은 픽셀 정합 대신 200ms 교차 페이드. Canvas는 garden .70에서 지연 import, whale 진입 전 준비. 실패/무지원/context lost/reduced motion에서는 같은 고래 SVG를 같은 경로로 이동하여 콘텐츠와 장면을 유지한다. offscreen 이후 RAF 중지 및 resource dispose, 재진입 시 동일 seed로 복구.

### 6.11 10 Jangsaengpo

`장생포1.jpg` 폭 min(54vw,710px), 오른쪽/중앙. 고래는 .0–.25에서 왼쪽 상단 여백→사진 밖 우측으로 이동, .25–.80 본문 읽기, .80–1 sea로 나감. 사진 속 조형물을 살아 있는 고래로 바꾸지 않는다. `장생포2.jpg`는 이 장소의 실경이 아니므로 사용하지 않는다.

선사 기록→산업화 시대 포경→오늘의 고래 문화는 텍스트의 시간 변화로 표현한다. 포경 당시 사진이 없으므로 1번 현대 조형물 사진을 옛 포경 현장으로 처리하지 않는다. +MORE S07.

### 6.12 11 Port / To the Sea

.08–.40 `울산항1.jpg` 폭 min(68vw,800px), 중앙. .40–.68 scale 1→.88, y −18px, opacity 1→0로 사진이 멀어진다. .55–.85 장식 강 선의 stroke-width를 2→viewport 대각선 이상으로 증가시켜 화면을 Deep Blue로 채운다. 큰 선은 interaction 없는 별도 SVG이며 실제 nav 버튼 path가 아니다.

.70부터 고래 opacity→0; .85–1 제목만 유지. 우측 강 내비 장식은 사라지되 헤더의 `장면 이동 / CHAPTERS` 대체 버튼은 항상 사용 가능하다. 현재 항만을 해상 항로 안내도로 해석하지 않는다. 대왕암·간절곶 이미지는 Explore에서 사용하고 이 scene에 새로운 관광 몽타주를 추가하지 않는다.

### 6.13 12 Explore Ulsan

지도 min-height 1.2H, pin 없음. 입장 시 0.6초 reveal만 하고 사용자가 지도에 머무는 동안 시간제 자동 이동 없음. 장소 탐색을 끝내기 위해 모든 노드를 클릭할 필요 없음. 하단 `밤의 울산으로 / CONTINUE TO NIGHT`는 night anchor 이동.

지도는 SVG 해안·내륙 윤곽 + 강 + 산을 암시하는 얇은 선. 전형적인 관광 카드 그리드 금지. 북쪽은 위, 바다는 동쪽. 아래 9절의 좌표는 **개략도 디자인 좌표**이며 위경도나 길찾기 정보가 아니다. 장소명과 버튼 리스트를 함께 제공한다.

### 6.14 13 Night

Explore 실제 node button을 이동하지 않는다. 그 좌표를 복제한 장식 점을 사용하여 .0–.30에서 7개 점이 작은 빛 군집으로 확산. .30–.55에 `울산 야경1.jpg`가 드러나며 점 opacity가 줄어 빛으로 이어지는 시각 효과를 만든다. 사진의 특정 불빛이 특정 관광지라고 대응시키지 않는다.

사진은 폭 min(92vw,1840px), 원래 2.453:1 파노라마. 좌우를 잘라 16:9로 만드는 기본 cover 금지. .55–.90 y +18→−18px로 상향 시선 이동. .90–1 사진 사라지고 Ending 선 등장.

### 6.15 14 Ending

.00–.28 강 선에 SOURCE/HISTORY/INDUSTRY/RECOVERY/GARDEN/WHALE/SEA 7점. .28–.54 영어 두 줄. .54–.80 영어가 사라지고 한국어 두 줄. .80–.94 선을 중심 물방울로 축소. .94–1 `다시 흐르기 / REPLAY`와 `울산 더 둘러보기 / EXPLORE ULSAN` 노출.

Loop는 시각적 회귀다. 사용자가 Replay를 눌렀을 때만 Intro로 이동하고 timeline 상태를 0으로 되돌린다. 강제 scrollTo(0), 무한 자동 재생, 전체 페이지 reload 금지. reduced motion에서는 영어·한국어 모두 정적 표시.

## 7. 최종 한·영 카피

아래 문장은 웹사이트의 확정 카피다. 추가 통계·슬로건·관광 명소·허구의 인용문을 만들지 않는다. 줄바꿈은 레이아웃에 맞춰 조정 가능하나 뜻과 문구 변경 금지. 장면 라벨은 6절의 영어명을 사용한다.

| 장면 | 한국어 제목 / 본문 | English title / body |
|---|---|---|
| Loading | 물길을 준비하고 있습니다. | PREPARING THE JOURNEY. |
| Intro | 울산 / 강을 따라, 울산의 시간을 만나다. | ULSAN / FOLLOW THE RIVER THROUGH ULSAN'S TIME. |
| Source | 돌에 새겨진 바다. / 수천 년 전, 사람들은 바위 위에 자신들이 바라본 동물과 사냥의 모습을 남겼다. 그 안에는 고래와 배, 그리고 고래잡이의 과정까지 기록되어 있다. | THE SEA CARVED IN STONE. / Thousands of years ago, people carved the animals they saw and scenes of hunting into rock. Whales, boats and whaling scenes remain in these images. |
| Upper stream | 모든 것은 물길에서 시작되었다. / 숲과 바위 사이를 흐르는 물길을 따라, 도시의 시간을 향해 나아간다. | EVERYTHING BEGAN WITH THE RIVER. / Follow the water through forests and rocks, toward the unfolding story of the city. |
| Old Ulsan | 강 곁에 도시가 있었다. / 사람들은 강 곁에 모여 살고, 오가고, 일했다. 남겨진 사진 속에서 도시의 일상이 이어진다. | A CITY LIVED BESIDE THE RIVER. / People lived, travelled and worked beside the river. Their everyday lives continue in the photographs they left behind. |
| Industry | 산업도시의 시작. / 1962년 1월 27일, 울산은 특정공업지구로 지정됐다. 같은 해 6월 울산시로 승격된 뒤, 자동차·조선·석유화학을 중심으로 산업도시로 성장했다. | THE INDUSTRIAL CITY BEGINS. / Ulsan was designated a special industrial district on January 27, 1962. It became a city that June and grew around automobile manufacturing, shipbuilding and petrochemicals. |
| Dead river | 성장의 뒤편에서, 강은 숨을 잃어갔다. / 산업화와 도시화가 빠르게 진행되면서 태화강의 수질은 악화됐다. 1996년 기록된 BOD는 11.3 mg/L였다. | WHILE THE CITY GREW, THE RIVER FADED. / Rapid industrialization and urban growth put pressure on the Taehwa River. Its recorded BOD reached 11.3 mg/L in 1996. |
| Recovery | 다시 흐르기 시작하다. / 2004년 에코폴리스 울산 선언과 2005년 태화강 마스터플랜을 거치며 강을 되살리는 노력이 이어졌다. 수질이 개선되고, 강은 다시 생명을 품기 시작했다. | FLOWING AGAIN. / The 2004 Ecopolis Ulsan declaration and the 2005 Taehwa River Master Plan marked steps in the river's recovery. Water quality improved, and life began to return. |
| Garden | 강은 다시 도시의 중심이 되었다. / 2019년 대한민국 제2호 국가정원으로 지정된 태화강. 태화지구와 삼호지구에 걸친 정원은 강과 도시의 일상을 잇는다. | THE RIVER RETURNED TO THE CITY. / Designated Korea's second national garden in 2019, the Taehwa River garden spans the Taehwa and Samho districts, connecting the river with everyday city life. |
| Whale | 고래는 울산의 시간 속에서 계속 헤엄쳐 왔다. / 바위에 남은 선은 고래의 형상이 되어, 서로 다른 시대의 울산을 연결한다. | THE WHALE SWIMS THROUGH ULSAN'S TIME. / Lines left in stone take the shape of a whale, connecting different chapters of Ulsan's history. |
| Jangsaengpo | 고래의 기억이 머무는 곳. / 장생포는 한국 포경산업의 주요 장소였다. 오늘날 고래문화마을은 1960~70년대 장생포의 생활상을 재현하며, 고래와 도시의 관계를 돌아보게 한다. | WHERE THE MEMORY OF WHALES REMAINS. / Jangsaengpo was a major centre of Korea's whaling industry. Today, the Whale Culture Village recreates local life in the 1960s and 1970s and invites reflection on the city's relationship with whales. |
| Sea | 강은 결국 바다와 만난다. / 항만을 지나, 시선은 열린 바다로 향한다. | THE RIVER MEETS THE SEA. / Beyond the port, the view opens toward the sea. |
| Explore | 이제, 당신의 울산을 만날 시간. / 산과 강, 도시와 바다 사이에서 다음 장소를 골라보세요. | EXPLORE ULSAN. / Choose your next place among the mountains, river, city and sea. |
| Night | 밤에도, 강은 흐른다. / 도시의 불빛 아래에서 울산의 시간은 이어진다. | THE RIVER FLOWS THROUGH THE NIGHT. / Beneath the city lights, Ulsan's story continues. |
| Ending | 강은 계속 흐른다. / 울산도 계속 변한다. | THE RIVER CONTINUES. / AND SO DOES ULSAN. |

공통 UI: `스크롤하여 이동 / SCROLL TO EXPLORE`, `자세히 보기 / + MORE`, `닫기 / CLOSE`, `지도에서 선택 / SELECT A PLACE`, `이전 사진 / PREVIOUS IMAGE`, `다음 사진 / NEXT IMAGE`, `사진 준비 중 / IMAGE LOADING`, `이미지를 불러오지 못했습니다. / IMAGE UNAVAILABLE`, `장면 이동 / CHAPTERS`, `모션 줄이기 / REDUCE MOTION`, `모션 켜기 / ENABLE MOTION`.

Source fact row: `약 312점의 그림 / AROUND 312 FIGURES`, `약 20여 종의 동물 / AROUND 20 ANIMAL SPECIES`, `최소 7종의 고래 / AT LEAST 7 WHALE SPECIES`, `반구천의 암각화 · 2025 세계유산 등재 / PETROGLYPHS ALONG THE BANGUCHEON STREAM · INSCRIBED IN 2025`.

## 8. Taehwa River SVG 내비게이션 / 커서

### 8.1 강 내비

- 우측 fixed, top 20vh, height 60vh, width 72px(1280 구간 56px). 실제 강의 큰 굴곡을 참고한 **개략적** SVG 120×600 viewBox. 내비용 세로 재배치는 지리 지도와 별개다. 정확한 행정 경계/하천 측량선으로 표기하지 않는다.
- `river-path.svg` 한 path를 Intro/내비/Recovery/Sea/Ending에 재사용한다. path를 장면마다 랜덤 생성하지 않는다.
- 02에서 장식으로 등장, 03에서 full interaction. Intro에도 키보드용 CHAPTERS 링크는 사용 가능.
- 내비 목적지 12개: SOURCE(source), UPPER STREAM(upper-stream), HISTORY(history), INDUSTRY(industry), DEAD RIVER(dead-river), RECOVERY(recovery), GARDEN(garden), WHALE(whale), JANGSAENGPO(jangsaengpo), SEA(sea), EXPLORE(explore), NIGHT(night). Ending은 progress=1, 별도 Replay.
- 각 anchor의 읽기 위치는 `start+.12*(end-start)`, 일반 Explore는 outer top. Intro·Ending에서 링크 이동 시 예외 처리.
- 노드의 path t는 0..1 균등 분포. 현재 scene의 실제 measured scroll interval과 다음 scene anchor 사이를 선형 보간해 전체 progress t 계산. 전체 문서 scroll ratio를 그대로 적용하지 않아 긴 산업 트랙이 내비를 독점하지 않게 한다.
- background path 1px, filled path 2px, current dot 5px. `pathLength=1`이면 dasharray=1, dashoffset=1−t. MotionPathPlugin progress로 dot 이동.
- 노드 버튼의 실제 hit area ≥44×44px. 가까운 노드는 라벨 리스트로 hit area 분리. hover/focus 시 `01 SOURCE`처럼 번호+영문, 한국어 aria-label 제공. 클릭/Enter로 목적지 이동, 이동 완료 후 scene heading에 `focus({preventScroll:true})`. 휠·키 입력 시 smooth jump 취소 가능.
- 활성 항목 `aria-current="location"`. 이동률을 매 프레임 live region으로 읽지 않는다. 해시는 장면 확정 시 replaceState, 명시적 선택은 pushState. 뒤로 가기 시 해당 hash로 복원하고 기록 루프를 만들지 않는다.
- Sea에서 숨기는 것은 장식 nav이며 CHAPTERS 대체 버튼의 메뉴가 동일 목적지를 제공. 모달에서는 배경 nav inert.

### 8.2 커스텀 커서

`(hover:hover) and (pointer:fine)`에서만 활성. 기본 6px dot + 28px ring, 링크 위 44px ring + `VIEW`, Explore node 위 `EXPLORE`, 상세 닫기 위 `CLOSE`. 이미지 드래그를 구현하지 않으므로 `DRAG`라고 표시하지 않는다.

pointermove는 좌표 ref만 저장, GSAP quickTo 또는 단일 RAF에서 transform 갱신. 추적 지연 0.12초 이내. pointer leave/window blur에는 숨김. native cursor는 커스텀 커서 준비 성공 후 해당 컨테이너에만 숨긴다. 텍스트 입력·외부 iframe·로딩 오류·reduced motion·키보드 사용에서는 native cursor 유지. 커서는 aria-hidden이고 클릭을 받지 않는다.

## 9. Explore 데이터와 상호작용

### 9.1 지도 배치

viewBox `0 0 1000 760`. 이 좌표는 방향 관계를 유지한 개략도다. 정밀 길찾기, 이동 거리·시간·실제 하천 경로를 표시하지 않는다. 북쪽 N, 동쪽 SEA, 바다 영역은 x>800. 산지 서쪽·도심 중앙·해안 동쪽 관계를 보존한다. 간월재를 석남사 북쪽에 두지 않는다.

| id | 장소 | x,y | 대표 이미지 | 보조 순서 |
|---|---|---|---|---|
| bangucheon | 반구대 암각화 / Bangudae Petroglyphs | 410,220 | 반구대암각화3.jpg | 반구대암각화2.jpg |
| taehwa | 태화강 국가정원 / Taehwa River National Garden | 650,355 | 태화강 국가정원1.jpg | 태화강 국가정원2.jpg → 태화강 국가정원4.jpg |
| jangsaengpo | 장생포 / Jangsaengpo | 765,465 | 장생포1.jpg | 없음 |
| daewangam | 대왕암공원 / Daewangam Park | 900,415 | 대왕암공원1.jpg | 대왕암공원2.jpg → 대왕암공원3.jpg |
| ganjeolgot | 간절곶 / Ganjeolgot | 760,675 | 간절곶3.jpg | 간절곶1.jpg → 간절곶2.jpg |
| ganwoljae | 간월재 / Ganwoljae | 170,405 | 간월재1.jpg | 간월재2.jpg |
| seongnamsa | 석남사 / Seongnamsa Temple | 190,190 | 석남사1.jpg | 석남사2.jpg → 석남사3.jpg → 석남사4.jpg |

hover 120ms 후 커서 오른쪽 24px에 240px 폭 preview. 화면 경계 16px 안쪽으로 clamp. mouseleave 시 120ms fade. 키보드 focus에는 버튼 옆 고정 preview. preview 장식은 aria-hidden, 장소명은 버튼 텍스트. coarse pointer에서는 hover 없이 한 번 탭하면 상세.

클릭/Enter/Space → 전체 화면 dialog. 좌측 contained image(폭 min(64vw,원본폭)), 우측 정보 폭 min(30vw,420px). h2+LOCATION/TYPE/DESCRIPTION/HIGHLIGHT/VISIT/+ MORE 구조. 상세 열기 350ms fade/translate 16px, photo 확대 1.02 이내이지만 원본 해상도 상한 초과 금지. 상세 사진 넘김은 사용자가 눌러야만 동작.

dialog에서 Lenis stop, body scroll lock 및 scrollbar 폭 보정, background inert, 첫 focus는 close 버튼. Esc/닫기로 종료, scrollY 및 원래 노드 focus 복원, Lenis start. dialog 내용은 자체 세로 스크롤하고 Lenis prevent 영역으로 설정. 휠이 배경을 움직이면 실패. 사진 실패 시 동일 ratio placeholder+오류문구, 나머지 정보와 +MORE 유지. 외부 링크를 눌렀다가 돌아와도 선택 장소 유지.

### 9.2 최종 장소 카피

모든 VISIT는 운영시간·요금·통제 상황이 변할 수 있으므로 현재 값을 복제하지 않고 공식 페이지 확인으로 연결한다. 다음 문구 그대로 사용한다.

#### 반구대 암각화

- LOCATION: 울산 울주군 언양읍 대곡리 / Daegok-ri, Eonyang-eup, Ulju-gun, Ulsan
- TYPE: 선사유산 / PREHISTORIC HERITAGE
- DESCRIPTION: 대곡천 절벽에 남은 동물과 사냥의 기록. 반구천의 암각화는 2025년 세계유산에 등재됐다. / Animal figures and hunting scenes remain on the cliffs beside Daegokcheon. The Petroglyphs along the Bangucheon Stream were inscribed as World Heritage in 2025.
- HIGHLIGHT: 바위에 남은 고래와 배의 기록. / Whales and boats recorded in stone.
- VISIT: 관람 방법과 현장 안내는 공식 정보를 확인하세요. / Check the official information for viewing guidance and site access.
- +MORE: S01.

#### 태화강 국가정원

- LOCATION: 울산 태화지구·삼호지구 / Taehwa and Samho districts, Ulsan
- TYPE: 강·정원 / RIVER & GARDEN
- DESCRIPTION: 강과 대숲, 정원의 산책로가 도시의 일상을 잇는 공간. 2019년 대한민국 제2호 국가정원으로 지정됐다. / Riverbanks, bamboo groves and garden paths connect with everyday city life. Designated Korea's second national garden in 2019.
- HIGHLIGHT: 물길과 대숲 사이를 걷는 시간. / A walk between the river and bamboo groves.
- VISIT: 구역별 안내와 이용 정보를 공식 페이지에서 확인하세요. / Check the official page for garden areas and visitor information.
- +MORE: S06.

#### 장생포

- LOCATION: 울산 남구 장생포 / Jangsaengpo, Nam-gu, Ulsan
- TYPE: 고래 문화·지역의 기억 / WHALE CULTURE & LOCAL HISTORY
- DESCRIPTION: 포경의 역사와 오늘의 고래 문화가 만나는 곳. 고래문화마을은 1960~70년대 장생포 생활상을 재현한다. / A place to reflect on whaling history and whale culture today. The Whale Culture Village recreates local life in the 1960s and 1970s.
- HIGHLIGHT: 고래와 도시의 관계 돌아보기. / Reflect on the relationship between whales and the city.
- VISIT: 시설별 운영시간과 관람 정보를 공식 페이지에서 확인하세요. / Check official opening hours and visitor information for each facility.
- +MORE: S07.

#### 대왕암공원

- LOCATION: 울산 동구 일산동 / Ilsan-dong, Dong-gu, Ulsan
- TYPE: 해안공원 / COASTAL PARK
- DESCRIPTION: 소나무 숲과 바위 해안을 따라 바다를 만나는 공원. 해안 산책로와 울기등대가 풍경을 잇는다. / A park where pine woods meet a rocky coast. Coastal paths and Ulgi Lighthouse connect the landscape.
- HIGHLIGHT: 바위 해안과 바다를 향한 산책. / Walk toward the sea along a rocky shore.
- VISIT: 시설 운영과 통제 여부는 공식 안내를 확인하세요. / Check official notices for facility access and closures.
- +MORE: S08.

#### 간절곶

- LOCATION: 울산 울주군 서생면 / Seosaeng-myeon, Ulju-gun, Ulsan
- TYPE: 해안·전망 / COAST & OPEN VIEWS
- DESCRIPTION: 넓은 하늘과 바다를 향해 열린 해안 공원. 등대와 산책로를 따라 수평선을 바라본다. / A coastal park open to wide skies and the sea. Follow the lighthouse and walking paths toward the horizon.
- HIGHLIGHT: 수평선을 바라보는 여유. / Time to take in the horizon.
- VISIT: 방문 안내와 현장 정보를 공식 페이지에서 확인하세요. / Check the official page for visitor guidance and local information.
- +MORE: S09. 특정 사진이 일출인지 단정하지 않는다.

#### 간월재

- LOCATION: 울산 울주군 영남알프스 일대 / Yeongnam Alps area, Ulju-gun, Ulsan
- TYPE: 산·능선 / MOUNTAINS & RIDGES
- DESCRIPTION: 산의 능선과 열린 초지를 만나는 영남알프스의 고개. 도시와 다른 속도로 풍경을 바라본다. / A mountain saddle in the Yeongnam Alps, surrounded by ridgelines and open grassland. Experience the landscape at a different pace.
- HIGHLIGHT: 능선 위에서 만나는 넓은 풍경. / Open views from the ridge.
- VISIT: 탐방로와 기상·출입 정보를 확인한 뒤 방문하세요. / Check trail guidance, weather and access information before visiting.
- +MORE: S10. 1,069m는 간월산 높이이지 간월재 높이가 아니다. 이 페이지에는 혼동 방지를 위해 고도 수치를 표시하지 않는다.

#### 석남사

- LOCATION: 울산 울주군 상북면 / Sangbuk-myeon, Ulju-gun, Ulsan
- TYPE: 사찰·숲 / TEMPLE & FOREST
- DESCRIPTION: 가지산 자락, 숲과 사찰의 공간이 이어지는 곳. 문과 마당, 숲길 사이에서 조용한 시간을 만난다. / At the foot of Gajisan, temple spaces meet the forest. Find a quieter rhythm among gates, courtyards and woodland paths.
- HIGHLIGHT: 산과 건축 사이의 고요. / Quiet moments between mountain and architecture.
- VISIT: 관람 안내를 확인하고 사찰의 예절을 지켜주세요. / Check visitor guidance and respect temple etiquette.
- +MORE: S11. 석남사4의 원래 워터마크는 보존한다.

## 10. 사실 데이터와 공식 +MORE

### 10.1 사실과 이미지 날짜를 분리

| 사실 | 표시 값 | 사용 위치 | 근거 |
|---|---|---|---|
| 울산 특정공업지구 지정 | 1962.01.27 | Industry 첫 패널 | S03 |
| 울산시 승격 | 1962.06 | Industry 본문 | 기존 확정 대화; 보충 S12 연표는 6월 1일 |
| 공업탑 건립 | 1967 | 독립 timeline | S13 |
| 태화강 BOD | 1996 / 11.3 mg/L | Dead river·Recovery | 기존 확정 데이터, 보충 S14 |
| 에코폴리스 울산 선언 | 2004 | Recovery | S05 |
| 태화강 마스터플랜 | 2005 | Recovery | S05 |
| 수질 개선 | 2007부터 1등급 수준이라는 역사 설명 | Recovery | S14; 기존 대화의 Ⅰa–Ⅰb 설명 |
| 생태관광지역 지정 | 2013 | Recovery | S05, S15 |
| 대한민국 제2호 국가정원 | 2019 | Recovery·Garden | S05 |
| 국가정원 면적 | 835,452㎡ | Garden 메타 | S06; 확인일 2026-09-29 기준 소개 값 |
| 반구천의 암각화 세계유산 등재 | 2025 | Source | S02 |
| 반구대 도상 | 약 312점 / 약 20여 종 / 최소 7종 고래 | Source | S01 |
| 고래문화마을 재현 생활상 | 1960~70년대 | Jangsaengpo | S07; 사진 촬영연도 아님 |

`11.3`은 BOD이고 DO가 아니다. 단위를 mg/L로 일관되게 유지한다. 1등급을 1.0 mg/L로 치환하지 않는다. 연어·은어 귀환은 기존 연구 맥락으로 남기되 확인되지 않은 개체수·귀환연도 애니메이션은 추가하지 않는다. 간월산 고도처럼 부가 사실은 필요할 때만 공식자료로 검증하고 새 핵심 카피를 만들지 않는다.

### 10.2 URL 레지스트리

확인일 2026-09-29. 공식 설명의 존재와 URL을 확인한 것이 해당 사진의 원 출처·사용권을 확인한 것은 아니다. S04는 이번 웹 도구에서 본문을 가져오지 못했으므로 성공으로 표시하지 않는다. 사이트 코드에 fallback URL을 함께 넣는다.

| ID | 용도 / 상태 | URL |
|---|---|---|
| S01 | 반구대 공식 설명 / 본문 확인 | https://ulsan.go.kr/s/bangucheonpetroglyphs/contents.ulsan?mId=001001002000000000 |
| S02 | UNESCO 등재 / 본문 확인 | https://whc.unesco.org/en/list/1740/ |
| S03 | 국가기록원 산업단지 역사 / 검색 본문 확인 | https://theme.archives.go.kr/next/industry/special1960.do |
| S04 | 태화강 살리기 / 재접속 필요, fallback S05 | https://www.ulsan.go.kr/s/garden/contents.ulsan?mId=001005003003000000 |
| S05 | 국가정원 연혁 / 본문 확인 | https://ulsan.go.kr/s/garden/contents.ulsan?mId=001001007000000000 |
| S06 | 국가정원 소개·면적 / 본문 확인 | https://garden.koagi.or.kr/cpage/garden/national/Detail.do?garden_id=NTG00002 |
| S07 | 고래문화마을 / 본문 확인 | https://tour.ulsan.go.kr/tour/kor/unit/attrctn/view.ulsan?mId=001002001000000000&unqId=123 |
| S08 | 대왕암공원 / 검색 본문 확인 | https://tour.ulsan.go.kr/tour/kor/unit/attrctn/view.ulsan?mId=001002001000000000&unqId=27 |
| S09 | 간절곶 / 공식 추천코스에서 링크 확인 | https://tour.ulsan.go.kr/tour/korean/unit/attrctn/view.ulsan?mId=001001000000000000&unqId=14 |
| S10 | 간월산·간월재 / 검색 본문 확인 | https://tour.ulsan.go.kr/tour/korean/unit/attrctn/view.ulsan?mId=001001000000000000&unqId=2 |
| S11 | 석남사 / 검색 본문 확인 | https://tour.ulsan.go.kr/tour/kor/unit/attrctn/view.ulsan?mId=001002001000000000&unqId=20 |
| S12 | 울산문화원 자료 연표 / 검색 추출 확인 | https://www.ulsanmunhwa.com/download/write_02.pdf |
| S13 | 울산시 웹진 공업탑 / 본문 확인 | https://webzine.ulsan.go.kr/contents/view.do?bbsId=BBSMSTR_000000000180&nttId=15454 |
| S14 | 국회도서관 수록 정책자료의 태화강 수질 / 검색 추출 확인, 원 측정자료 아님 | https://clik.nanet.go.kr/clikr-collection/policyinfo/50/217/1900/CLIKC404944214241373_attach_1.pdf |
| S15 | 공유마당 수록 태화강 생태관광지역 지정 자료 / 검색 본문 확인 | https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?menuNo=200019&wrtSn=12158437 |

Source +MORE S01, Industry S03, Dead river S04(fallback S05), Recovery S04(fallback S05), Garden S06, Jangsaengpo S07. 나머지 감성 연결 장면은 불필요한 +MORE를 만들지 않는다. Explore 각 장소는 지정 Sxx로 연결.

`+ MORE`는 외부 공식 설명 링크, UI label은 동일하되 accessible name은 `반구대 암각화 공식 정보 보기, 새 탭`처럼 구체화. `target="_blank" rel="noopener noreferrer"`. 추적용 utm 제거. 영어 공식 세부 페이지가 확인되지 않으면 같은 한국어 공식 페이지를 열고 `공식 정보(한국어) / OFFICIAL INFORMATION (KOREAN)` 표시. 출처 사이트의 문단을 통째로 복사하지 않는다.

배포 전 링크 title/content와 상태를 실제 확인한다. HTTP 200만으로 통과시키지 않는다. S04가 여전히 실패하면 기본 href를 S05로 두고 label은 `태화강 복원 연혁`에 맞춘다. 브라우저에서 CORS fetch 실패를 링크 오류라고 단정하지 않는다. URL이 바뀌면 같은 기관의 같은 장소 페이지로만 수정하고 변경 근거를 기록한다.

## 11. 이미지 최적화 / 로딩 / 성능

### 11.1 파생본 전략

Foundation–Archive 단계는 원본을 그대로 사용한다. 대량 WebP 변환·AI 업스케일을 선행하지 않는다. 실제 표시 크기를 결정한 뒤 Polish에서 필요한 파생본만 만든다. 원본과 결과는 별도 폴더, manifest로 연결한다.

- 파생 폭 후보 320/480/640/960/1280/1600 중 원본 이하만. 가로 300px 원본으로 640px srcset 생성 금지.
- JPEG vs WebP vs AVIF를 실제 화면에서 비교하여 글자·선·워터마크가 번지지 않는 후보 선택. 무조건 동일 quality 숫자 적용하지 않는다.
- Next Image 또는 동등한 responsive picture를 공통 `SceneImage`에서 사용. width/height 또는 aspect-ratio로 공간 예약, 정확한 sizes 명시, 원본 이상 변형을 요청하지 않는다. Next의 optimizer 사용 시 서버/배포 환경 지원 여부를 확인; static export라면 사전 생성 srcset으로 바꾼다.
- LCP 이미지만 eager/preload(선택 버전의 API 사용), 모든 이미지 priority 금지. Intro는 사진 없음. Source 첫 이미지 1장만 critical, source의 나머지·upper stream은 idle/근접 로드.
- 다음 scene 1개까지 IntersectionObserver rootMargin 100%로 준비. industry 진입 전 트랙 active 이미지 일괄 준비 가능하나 동시 decode 2개 제한. Explore 대표 preview는 Explore 한 화면 전부터, 상세 보조는 선택 후 lazy.
- 원본 압축 바이트와 decoded 메모리는 다름. GPU에 사진 66장을 texture로 올리지 않는다. Canvas 사진 texture 없음.

### 11.2 목표 예산과 저성능 처리

1440×900 최신 Chrome, 일반 노트북 내장 GPU / DPR 1–2를 대표로 측정한다. 수치는 합격 목표이며 달성했다고 미리 주장하지 않는다.

| 항목 | 목표 |
|---|---|
| LCP / CLS / INP | ≤2.5초 / ≤0.1 / ≤200ms (실사용 수집 전에는 lab proxy만 보고) |
| 초기 JS 압축 전송 | ≤300KiB, 고래 chunk 제외; 초과 원인 분석 |
| critical 전송 합계 | ≤1.5MiB 목표, 폰트 포함 |
| WebGL 지연 chunk | ≤450KiB gzip 목표, tree-shaking 검토 |
| 스크롤 | 60fps 목표, 대표 구간 p95 frame ≤25ms, 장기 30fps 이하 금지 |
| Canvas | 최대 1개, DPR 1.5 상한, low tier 1.0 |
| 고래 draw calls | 30 이하, 그림자·postprocessing 0 |
| 메모리 | 왕복 3회 후 지속 증가 없음; dispose 전후 측정 기록 |
| main thread | 반복적인 100ms 초과 long task 없음 |

2초 관찰 중 지속 30fps 미만이면 점 수 절반→DPR 1→SVG fallback 순으로 한 번씩 낮춘다. 반복적으로 품질을 올렸다 내리지 않는다. `document.hidden`에서는 Canvas/ticker의 불필요 작업 중지. 사용자 설정 `모션 줄이기`가 항상 성능 감지보다 우선한다.

## 12. 접근성 / 모바일 확장 규칙

- `prefers-reduced-motion:reduce` 또는 사용자 모션 끄기: Lenis 제거, pin/가로 transform 제거, 모든 장면이 자연 세로 높이, 모든 본문 표시. Whale SVG 정적, 대숲 depth 없음, Ending 한·영 동시 표시.
- focus ring을 숨기지 않는다. 링크/버튼 keyboard 작동, 44px target. 가로 track에서 focus가 화면 밖으로 사라지면 실패.
- skip link, h1 하나(ULSAN), scene h2, dialog h2 및 aria-labelledby. 정보 사진 alt, 장식 Canvas/SVG aria-hidden. 시각 연출용 복사 카피는 읽기 트리에서 중복 제거.
- 숫자 애니메이션 대신 스크린리더에 정적인 값과 단위. 색만으로 오염/회복/활성 장면 구분 금지; 텍스트·노드 표식 함께 제공.
- 애니메이션은 스크롤이 멈추면 대부분 정지. 유영 같은 지속 장식은 모션 설정으로 끌 수 있다. 초당 번쩍임·flash 금지.
- 200% 확대, 320 CSS px 폭에서 본문·링크·dialog 접근 가능. 글로벌 가로 넘침 금지. 성능을 위해 숨긴 콘텐츠도 의미상 누락시키지 않는다.
- 향후 768–1279 태블릿 / <768 모바일은 같은 `scenes.ts`, `copy.ts`, `places.ts`, `assets.ts`를 사용하고 `motionProfiles.ts`만 확장. PC DOM의 문구를 다른 컴포넌트에 복사하지 않는다.
- 모바일 가로 archive는 세로 기록열로 재배치, 세로 사진 원비율 유지. 내비는 CHAPTERS 목록/간단 진행선, hover preview 없음. dialog는 단일 열·안전영역 padding. WebGL 기본 off, 고성능 폰에서조차 선택사항.
- 현재 가로 사진을 무조건 세로 center crop하지 않는다. 별도 portrait 원본이 없으면 contained image를 유지한다. 간월재2는 309px 폭으로 고밀도 모바일 hero 승인이 아니다.

## 13. 폴더 / 컴포넌트 / 데이터 아키텍처

```text
ULSAN/
  MASTER_BUILD_SPEC.md
  ASSET_AUDIT.md
  assets/images/                   # 원본 66장, 불변
  public/assets/images/            # 배포용 동일 사본
  public/assets/derived/           # Polish에서만 선택 생성
  public/fonts/
  src/app/{layout.tsx,page.tsx,globals.css}
  src/components/providers/MotionProvider.tsx
  src/components/story/{Story.tsx,SceneShell.tsx,SceneImage.tsx}
  src/components/scenes/
    IntroScene.tsx
    SourceScene.tsx
    UpperStreamScene.tsx
    HistoryScene.tsx
    IndustryScene.tsx
    DeadRiverScene.tsx
    RecoveryScene.tsx
    GardenScene.tsx
    WhaleScene.tsx
    JangsaengpoScene.tsx
    SeaScene.tsx
    ExploreScene.tsx
    NightScene.tsx
    EndingScene.tsx
    *.module.css
  src/components/archive/{ArchiveFrame,ArchiveCollage,HorizontalArchive}.tsx
  src/components/navigation/{RiverNavigation,ChapterMenu}.tsx
  src/components/explore/{ExploreMap,PlacePreview,PlaceDialog}.tsx
  src/components/whale/{WhaleCanvas,WhaleLines,WhaleFallback}.tsx
  src/components/ui/{LoadingOverlay,CustomCursor,MoreLink,MotionToggle}.tsx
  src/data/{assets,copy,scenes,places,timeline,sources}.ts
  src/graphics/{river-path,whale-shape,explore-map}.ts
  src/motion/{sceneRegistry,motionProfiles,buildSceneTimeline,scrollToScene}.ts
  src/hooks/{useSceneMotion,useReducedMotion,useAssetPreload}.ts
  src/styles/{tokens,typography}.css
  scripts/{sync-assets,validate-content,check-links}.mjs
  tests/{navigation,archive,explore,fallbacks}.spec.ts
  docs/{IMPLEMENTATION_LOG,QA_REPORT,IMAGE_QUALITY_REVIEW}.md
```

기존 프로젝트 구조가 있으면 같은 책임을 유지하며 경로만 맞춘다. 페이지 전체를 1개의 거대한 client component로 만들지 않는다. 각 scene의 시각/모션은 해당 component와 CSS Module이 소유한다. 전역 Provider는 스크롤 엔진과 registry만 소유한다.

```ts
type Localized = { ko: string; en: string };
type SceneId = 'intro' | 'source' | 'upper-stream' | 'history' | 'industry'
  | 'dead-river' | 'recovery' | 'garden' | 'whale' | 'jangsaengpo'
  | 'sea' | 'explore' | 'night' | 'ending';
type AssetStatus = 'active' | 'reserve' | 'hold';
type Asset = {
  id: string; filename: string; width: number; height: number; bytes: number;
  status: AssetStatus; roles: string[]; sceneIds: SceneId[];
  alt: Localized; maxCssWidth: number; allowCover: boolean;
  uncertaintyIds: string[]; derivedFrom?: string;
  capturedAt: string | null; visibleCredit: string | null;
};
type SceneConfig = {
  id: SceneId; order: number; pin: boolean;
  distance: (viewport: {width:number;height:number}, overflow:number)=>number;
  readingProgress: number; assetIds: string[]; sourceIds: string[];
};
type Fact = {
  id: string; yearLabel: string; text: Localized;
  value?: number; unit?: string; sourceIds: string[];
  scope: 'historical' | 'reference-snapshot';
};
type Place = {
  id: string; name: Localized; mapPoint: [number,number];
  location: Localized; type: Localized; description: Localized;
  highlight: Localized; visit: Localized; assetIds: string[]; sourceId: string;
};
```

사진 filename을 key로 콘텐츠를 추론하지 않는다. 명시적 id→filename 매핑 사용. `capturedAt:null`과 역사 milestone의 year는 완전히 분리한다. React key·seed는 안정적인 id, Math.random 기반 레이아웃 금지.

## 14. 구현 단계와 수락 기준

각 Phase를 마칠 때 구현 파일, 검증 결과, 남은 제한을 IMPLEMENTATION_LOG에 기록한다. 실패한 기준은 다음 단계의 화려한 효과로 숨기지 말고 먼저 고친다. 사용자에게 매 단계 반복 승인을 요청할 필요는 없다.

| Phase | 수행 범위 | 통과 기준 |
|---|---|---|
| 1 Foundation | 기존 프로젝트 확인, 스택·lockfile, 에셋 manifest, 14 scene DOM, 카피/사실/출처/장소 데이터, 디자인 토큰, 정적 fallback | 66개 매핑 존재, 파일 경로 404 없음, 보류 파일 미노출, 1280/1440 및 좁은 화면 읽기 가능, typecheck/build 통과 |
| 2 Core Scroll | Lenis 단일 ticker, GSAP context, scene registry, Intro/Ending, 강 내비·커서·Loading, hash 이동 | 순방향/역방향/빠른 점프/resize에서 올바른 scene, 중복 trigger 0, 로딩 실패 탈출, 모든 내비 keyboard 동작 |
| 3 Archive | Source→Upper, Old collage, Industry horizontal, time dissolve | 사진 원비율/해상도 상한/워터마크 보존, 트랙 첫·끝 패널 완전 노출, TODAY 색 전환, 동일 앵글 비교 없음, 포커스가 보이는 패널로 이동 |
| 4 River Recovery | Dead river, 6 milestone, Garden 1→2→4, depth parallax | 사진에 날짜·출처 없음, 별도 1996/BOD 확인, 허구 카운터 0, 같은 p 역재현, reduced motion에서 모든 사실 읽기 |
| 5 Whale/WebGL | 공용 SVG shape, 지연 Canvas, particle/line whale, Jangsaengpo/Sea | 귀환 모티프 일관성, 최대 1 Canvas, 무지원/context lost SVG 대체, offscreen 정지·cleanup, 실사 고래/3D 숲 없음 |
| 6 Explore | 7개 지도 노드, hover/focus preview, modal, 사진 순서, +MORE, Night 연결 | 카드 그리드 없음, 7개 정보 완비, Esc/focus restore/scroll lock/사진 실패 처리, 잘못된 지리·항로 암시 없음 |
| 7 Polish | 필요한 파생본, 고해상도 검토, 접근성, 성능, 기기·브라우저 테스트, 외부 링크 검사 | 아래 QA 전부 기록, 치명 오류 0, 목표 예산 미달이면 SVG/모션 축소로 해결 또는 정확한 제한 보고, 원본 무변경 확인 |

처음부터 7단계를 한 파일에 구현하지 않는다. 다른 Phase의 기능은 데이터·interface 준비 정도로만 선행한다. 개발용 markers/debug UI는 환경변수로 제어하고 production에서 제거한다.

## 15. 테스트 체크리스트

### 데이터 / 콘텐츠

- [ ] 감사 기술 목록과 manifest가 66:66 일치; 파일명·width·height·bytes 일치.
- [ ] 원본 hash가 구현 전후 동일; 배포 사본 또는 파생본 계보 기록.
- [ ] 모든 active asset이 정의된 scene/place에서만 사용; hold는 공개 import 목록에 없음.
- [ ] `옛 울산 시가지4.jpg` 중복 예비, `현재 태화강1.jpg` 보류 유지.
- [ ] 공장산업단지1–3이 현대 대표로 노출되지 않음; 장생포2를 장소 사진으로 쓰지 않음.
- [ ] 한국어·영어 카피, 6 milestone, 수치·단위, Source 사실 row 일치.
- [ ] 과거 태화강3 주변·alt·tooltip·structured data에 특정 촬영연도/기사 출처 주장 없음.
- [ ] 다른 사진의 원래 워터마크 보존; 공식 +MORE와 사진 출처를 혼동하지 않음.

### 스크롤 / 내비

- [ ] 1280×720, 1440×900, 1920×1080, 2560×1440에서 전 구간 왕복.
- [ ] 01–14의 p=0/.25/.5/.75/1 스냅샷 점검; 빈 화면·겹친 pin·큰 jump 없음.
- [ ] 산업 트랙의 lead/overflow/tail/settle, overflow=0, 마지막 패널 도달 검사.
- [ ] 직접 hash 진입, 새로고침 중간 위치, Back/Forward, 엔딩 Replay 작동.
- [ ] resize/orientation/font load 후 시작점 갱신, 읽던 scene/local progress 보존.
- [ ] 빠른 스크롤→즉시 역스크롤 시 배경·고래·내비 상태 정상.
- [ ] 모든 숨은 frame/link가 focus를 빼앗지 않음.

### Explore / 접근성

- [ ] 모든 7노드 hover/focus/click/tap, preview 화면 모서리 clamp.
- [ ] dialog open→닫기→같은 노드 focus, Esc, Tab/Shift+Tab trap, 배경 스크롤 정지.
- [ ] 작은 화면과 200% 확대에서 이미지·본문·닫기·MORE 접근.
- [ ] reduced motion 최초 진입/실행 중 전환, JS 없음, 폰트 실패, 이미지 실패.
- [ ] keyboard-only 전 여정, 화면낭독기 landmark/heading/alt/숫자 읽기.
- [ ] axe 등 자동 검사 serious/critical 0 + 수동 대비·순서 확인.

### 성능 / 호환성

- [ ] Chrome/Edge/Firefox 현행 안정판, macOS Safari는 이용 가능한 기기에서 검사. 미실행 환경은 미실행으로 표시.
- [ ] DPR 1/2 품질 비교와 원본 크기 제한 보고, 특히 Night·Garden4·Jangsaengpo·Port.
- [ ] cold cache/slow network, loader 5초 continue, optional image 늦게 도착해도 CLS 없음.
- [ ] WebGL disabled/context lost/저성능 fallback; Canvas가 없어도 여정 완주.
- [ ] StrictMode mount/unmount 및 왕복 3회 후 trigger/listener/ticker/메모리 누수 없음.
- [ ] typecheck, lint, production build; production preview에서 404/console error 없음.
- [ ] 공식 링크 실제 도착 내용 확인, S04 실패 시 S05 적용 기록.
- [ ] 성능 측정 기기·브라우저·viewport·네트워크와 실제 수치를 QA_REPORT에 기록. Lighthouse 점수만으로 시각 품질 통과 처리하지 않음.

회귀 자동화는 navigation hash/트랙 끝 도달/modal focus restore/reduced motion/WebGL fallback처럼 실제 고장 위험을 검증한다. CSS 값 하나를 그대로 기대값으로 복사하는 무의미한 테스트는 만들지 않는다.

## 16. 엄격한 DO NOT

1. 컨셉·14장면 순서·핵심 카피를 임의 재기획하지 말 것.
2. 일반 랜딩페이지, 카드 그리드 관광 사이트, dashboard 형태로 바꾸지 말 것.
3. 동일 앵글 Before/After 슬라이더, 건물 정합 모핑, 원근을 강제로 맞추는 이미지 왜곡 금지.
4. 미확인 사진에 연도·촬영자·회사·동네·고래 종·폐사 원인을 invent하지 말 것.
5. 과거 태화강3을 1996년 촬영 또는 특정 사건의 직접 증거로 쓰지 말 것. 화면의 추가 출처/연도 표기도 금지.
6. 현재 태화강1의 조감도 의심을 무시하지 말 것. 공장1–3을 현재 산업 사진으로 쓰지 말 것.
7. 장생포2·고래1–3을 울산 해역에서 촬영한 생태 증거로 쓰지 말 것.
8. 원본 이름 변경·이동·삭제·덮어쓰기·워터마크 제거 금지. 먼저 일괄 변환/AI 업스케일하지 말 것.
9. 저해상도 기록사진을 cover hero로 확대하거나 글자를 얼굴·도상·워터마크 위에 놓지 말 것.
10. 복원 그래프에 임의 수질 숫자·보간 데이터·연어 개체수·실시간 상태를 만들지 말 것.
11. 실사 mesh 고래·게임 캐릭터·3D 대나무·전체 Canvas 사이트 금지.
12. 실제 관광지들을 가짜 직선 항로나 하나의 강으로 연결하지 말 것. 장면 순서를 지리 순서라고 설명하지 말 것.
13. 가로 스크롤을 강제 휠 가로채기·필수 drag로 구현하지 말 것.
14. 무한 로딩, 필수 긴 Intro, 강제 자동 처음 이동, 자동 소리, 자동 dialog, 강제 snap 금지.
15. 폴백을 “지원 안 함” 한 줄로 끝내거나 모바일에서 콘텐츠를 숨기지 말 것.
16. 확인하지 않은 공식 URL·운영시간·요금·행사 날짜를 만들지 말 것.
17. npm latest를 무조건 덮어 설치하거나 현재 프로젝트 구조를 이유 없이 전면 교체하지 말 것.
18. Phase 수락 기준을 검사하지 않고 “완료”라고 보고하지 말 것.

## 17. 구현 담당 Codex의 첫 실행

이 문서와 로컬 프로젝트 지침을 읽고 기존 파일·lockfile·원본 assets 존재 여부를 확인한다. 문서 내 경로를 실제 프로젝트 루트 기준으로 해석한다. Foundation의 manifest·정적 14장면·공용 데이터부터 구현한 뒤 정해진 Phase를 진행한다. 기술 선택과 모션 수치는 이 문서 기본값으로 시작한다. 실제 미존재 active 파일이나 상충하는 사용자 지시가 아닌 이상 기획 질문을 반복하지 않는다.

부록 A는 본문을 실행하는 정확한 에셋 배치표이며, 부록 B는 판단 근거인 원본 감사 자료다. 부록 B의 제안이 본문과 다른 경우 본문의 선정/제외를 적용하되 감사의 사실 관찰을 지우지 않는다.


## 부록 A. 66개 정확한 파일 매핑 / 원본 규격

모든 원본 폴더는 `assets/images/`. `폭 상한`은 초기 CSS px 상한으로 추가 레이아웃 폭 제한을 함께 적용한다. reserve/hold의 폭은 나중에 채택할 경우의 원본 상한이며 지금 표시하라는 뜻이 아니다. 본문에 쓰지 않는 66개 파일도 누락 없이 기록한다. 원본 픽셀·byte는 감사에서 직접 옮겼다.

| 파일명 | 원본 px | bytes | 상태 | Scene / 목적지 | 역할 | 폭 상한 | 조건 |
|---|---:|---:|---|---|---|---:|---|
| `간월재1.jpg` | 710×399 | 452,484 | active | 12 Explore 간월재 | 대표 / SECONDARY | 710 | 원비율, 산길 제목은 프레임 밖 |
| `간월재2.jpg` | 309×550 | 166,182 | active | 12 Explore 간월재 | 상세 2 / DETAIL | 309 | 세로 카드, 확대·가로 크롭 금지 |
| `간절곶1.jpg` | 560×373 | 29,950 | active | 12 Explore 간절곶 | 상세 2 / SECONDARY | 560 | 해 뜨는 시각 단정 금지 |
| `간절곶2.jpg` | 300×225 | 33,172 | active | 12 Explore 간절곶 | 상세 3 / DETAIL | 300 | 표석 글씨 보존, 작은 원본 그대로 |
| `간절곶3.jpg` | 1200×675 | 86,265 | active | 12 Explore 간절곶 | 대표 / HERO 조건부 | 1200 | 하늘 여백 보존; 본문 Ending 사진으로 추가하지 않음 |
| `고래1.jpg` | 545×366 | 27,254 | reserve | 09 Whale 예비만 | 상징 / SECONDARY | 545 | U11: 촬영해역·종 미확인; 기본은 추상 SVG/선 고래, 실사 자동 삽입 없음 |
| `고래2.jpg` | 576×354 | 18,491 | reserve | 09 Whale 예비만 | 상징 / SECONDARY | 576 | U11: 촬영해역·종 미확인; 기본은 추상 SVG/선 고래, 실사 자동 삽입 없음 |
| `고래3.jpg` | 720×480 | 88,831 | reserve | 09 Whale 예비만 | 상징 / SECONDARY | 720 | U11: 촬영해역·종 미확인; 기본은 추상 SVG/선 고래, 실사 자동 삽입 없음 |
| `과거 태화강1.jpg` | 500×326 | 40,753 | active | 04 History | 배와 사람 / ARCHIVE | 440 | 나루 이름·연도 미상, 사람과 배 보존 |
| `과거 태화강2.jpg` | 500×282 | 41,516 | active | 04 History | 강변 생활 / ARCHIVE | 400 | 작업 종류·가축 종·연도 단정 금지 |
| `과거 태화강3.jpg` | 570×427 | 45,101 | active | 06 Dead river | 연대 미상 오염시기 표현 / ARCHIVE | 570 | 사용자 예외 적용: 보이는 촬영연도·출처 없음; 실제 사건 미확인 기록은 유지 |
| `대곡천·태화강 상류 자연 사진1.jpg` | 420×560 | 75,767 | reserve | 03 Upper stream 예비 | SECONDARY | 420 | 세로 물길 상세, 기본 장면 추가 없음 |
| `대곡천·태화강 상류 자연 사진2.jpg` | 1280×721 | 572,980 | active | 03 Upper stream | 대표 / HERO 조건부 | 1280 | 정확한 촬영지 미확인; 정자·잎 프레임 보존 |
| `대곡천·태화강 상류 자연 사진3.jpg` | 800×533 | 113,401 | reserve | 03 Upper stream 예비 | SECONDARY | 800 | 계절·지점 비교 근거 없음 |
| `대곡천·태화강 상류 자연 사진4.jpg` | 800×533 | 117,577 | reserve | 03 Upper stream 예비 | SECONDARY | 800 | 좌하단 서명 보존; 자동 정합 금지 |
| `대곡천·태화강 상류 자연 사진5.jpg` | 1024×660 | 716,542 | reserve | 03 Upper stream 예비 / 05 경계 예비 | SECONDARY | 1024 | 공장·농경지 공존; 원시 자연으로 사용 금지 |
| `대곡천·태화강 상류 자연 사진6.jpg` | 640×437 | 386,490 | reserve | 03 Upper stream 예비 / 05 경계 예비 | SECONDARY | 640 | 도시 경계; 상류 대표로 사용 금지 |
| `대왕암공원1.jpg` | 1200×800 | 148,587 | active | 12 Explore 대왕암 | 대표 / HERO 조건부 | 1200 | 다리·바위·사람 보존; 같은 앵글 비교 아님 |
| `대왕암공원2.jpg` | 1200×777 | 811,479 | active | 12 Explore 대왕암 | 상세 2 / SECONDARY | 1200 | 다리·바위·사람 보존; 같은 앵글 비교 아님 |
| `대왕암공원3.jpg` | 758×405 | 56,801 | active | 12 Explore 대왕암 | 상세 3 / SECONDARY | 758 | 다리·바위·사람 보존; 같은 앵글 비교 아님 |
| `반구대암각화1.jpg` | 960×445 | 285,404 | hold | 02 자료 후보 보류 | DETAIL / ARCHIVE | 960 | U07: 가공 도상 유형·출처·대응 범위 확인 전 공개 사용 제외 |
| `반구대암각화2.jpg` | 710×1065 | 737,679 | active | 02 Source / 12 Explore 반구대 | DETAIL / ARCHIVE | 420 | 암면 세로 프레임, 종 식별 오버레이 금지 |
| `반구대암각화3.jpg` | 900×600 | 949,128 | active | 02 Source / 12 Explore 반구대 | 장소 대표 / HERO 조건부 | 900 | 절벽과 물; 도상 근접 사진 아님 |
| `반구대암각화4.jpg` | 970×537 | 340,253 | hold | 02 자료 후보 보류 | DETAIL / ARCHIVE | 970 | U07: 가공 도상 유형·출처·대응 범위 확인 전 공개 사용 제외 |
| `반구대암각화5.jpg` | 970×508 | 397,726 | hold | 02 자료 후보 보류 | DETAIL / ARCHIVE | 970 | U07: 가공 도상 유형·출처·대응 범위 확인 전 공개 사용 제외 |
| `산업화 노동 모습 옛 사진1.jpg` | 559×308 | 156,140 | active | 05 Industry | 노동 / ARCHIVE | 480 | 1 업종·3 공정·회사·연도 미확인; 2 원래 세로/컬러 보존 |
| `산업화 노동 모습 옛 사진2.jpg` | 560×780 | 688,595 | active | 05 Industry | 생산 / ARCHIVE | 340 | 1 업종·3 공정·회사·연도 미확인; 2 원래 세로/컬러 보존 |
| `산업화 노동 모습 옛 사진3.jpg` | 559×391 | 624,111 | active | 05 Industry | 생산 / ARCHIVE | 360 | 1 업종·3 공정·회사·연도 미확인; 2 원래 세로/컬러 보존 |
| `석남사1.jpg` | 600×355 | 147,952 | active | 12 Explore 석남사 | 대표 / SECONDARY | 600 | 건축·문·숲 원래 구도 보존 |
| `석남사2.jpg` | 600×600 | 533,911 | active | 12 Explore 석남사 | 상세 2 / DETAIL | 600 | 건축·문·숲 원래 구도 보존 |
| `석남사3.jpg` | 547×365 | 302,507 | active | 12 Explore 석남사 | 상세 3 / DETAIL | 547 | 건축·문·숲 원래 구도 보존 |
| `석남사4.jpg` | 903×600 | 870,045 | active | 12 Explore 석남사 | 상세 4 / DETAIL | 903 | 4번 하단 양쪽 출처 워터마크 보존 |
| `옛 공업탑.jpg` | 559×357 | 14,954 | active | 04 History / 05 Industry | ARCHIVE / TRANSITION | 440 | 현재 공업탑2와 상징적 연결; 촬영연도 없음 |
| `옛 울산 시가지1.jpg` | 500×401 | 117,243 | active | 04 History | ARCHIVE | 420 | 시장과 사람 |
| `옛 울산 시가지2.jpg` | 650×393 | 217,871 | active | 04 History | ARCHIVE | 520 | D01 우선본; 4와 동시 사용 금지 |
| `옛 울산 시가지3.jpg` | 460×296 | 72,110 | reserve | 04/05 예비 | ARCHIVE | 460 | 행사 현수막 보존; 날짜 추측 금지 |
| `옛 울산 시가지4.jpg` | 569×344 | 222,503 | reserve | 04/05 예비 | ARCHIVE | 569 | D01 동일 원본 변형 예비, 기본 미노출 |
| `옛 울산 시가지5.jpg` | 650×224 | 91,838 | reserve | 04/05 예비 | ARCHIVE | 650 | 긴 파노라마 기록 띠, 장소 미확인 |
| `옛 울산 시가지6.jpg` | 550×344 | 141,494 | active | 04 History | ARCHIVE | 440 | 하단 경상일보 워터마크 보존 |
| `울산 공장산업단지1.jpg` | 455×441 | 134,581 | reserve | 05 Industry | 과거 산업 / ARCHIVE 예비 | 455 | 모두 과거 기록 성격; 현재 대표 금지, 1·3 로고 보존 |
| `울산 공장산업단지2.jpg` | 550×433 | 133,846 | active | 05 Industry | 건설 / ARCHIVE | 480 | 모두 과거 기록 성격; 현재 대표 금지, 1·3 로고 보존 |
| `울산 공장산업단지3.jpg` | 347×344 | 104,374 | reserve | 05 Industry | 과거 산업 / ARCHIVE 예비 | 347 | 모두 과거 기록 성격; 현재 대표 금지, 1·3 로고 보존 |
| `울산 야경1.jpg` | 1840×750 | 748,183 | active | 13 Night | HERO 조건부 / TRANSITION | 1840 | 촬영연도 없음; 1 파노라마, 3 산업 전경; 확대 허용 자동 승인 아님 |
| `울산 야경2.jpg` | 720×480 | 514,776 | reserve | 13 Night 예비 | SECONDARY | 720 | 촬영연도 없음; 1 파노라마, 3 산업 전경; 확대 허용 자동 승인 아님 |
| `울산 야경3.jpg` | 1600×1067 | 1,974,938 | active | 05 Industry TODAY | HERO 조건부 / TRANSITION | 1600 | 촬영연도 없음; 1 파노라마, 3 산업 전경; 확대 허용 자동 승인 아님 |
| `울산 야경4.jpg` | 500×333 | 206,521 | reserve | 05 Industry 예비 | SECONDARY | 500 | 촬영연도 없음; 1 파노라마, 3 산업 전경; 확대 허용 자동 승인 아님 |
| `울산항1.jpg` | 800×599 | 737,075 | active | 11 Sea | SECONDARY / TRANSITION | 800 | 항만 대표, 정확한 부두명 미확인 |
| `울산항2.jpg` | 536×369 | 96,849 | reserve | 11 Sea | SECONDARY / TRANSITION | 536 | 물류 세부 |
| `울산항3.jpg` | 455×300 | 191,714 | reserve | 05 Industry 제작현장 예비 | SECONDARY / TRANSITION | 455 | 조선 제작 현장, 항만 전체 전경이라 부르지 않음 |
| `장생포1.jpg` | 710×473 | 368,043 | active | 10 Jangsaengpo / 12 Explore | SECONDARY / TRANSITION | 710 | 조형물·교량 보존; 과거 포경 장면 아님 |
| `장생포2.jpg` | 800×415 | 393,261 | reserve | 09 Whale 상징 예비만 | SECONDARY | 800 | 장생포 실경 아님; 야생 고래·해역 미확인 U11 |
| `태화강 국가정원1.jpg` | 1024×682 | 685,121 | active | 08 Garden / 12 Explore | HERO 조건부 | 1024 | 1→2→4 확정 순서; 3은 기본 미노출; 4는 사진 레이어 효과만 |
| `태화강 국가정원2.jpg` | 1024×682 | 720,237 | active | 08 Garden / 12 Explore | HERO 조건부 | 1024 | 1→2→4 확정 순서; 3은 기본 미노출; 4는 사진 레이어 효과만 |
| `태화강 국가정원3.jpg` | 455×455 | 437,797 | reserve | 08 Garden 세부 예비 | DETAIL | 455 | 1→2→4 확정 순서; 3은 기본 미노출; 4는 사진 레이어 효과만 |
| `태화강 국가정원4.jpg` | 812×457 | 798,103 | active | 08 Garden / 12 Explore | SECONDARY / DEPTH PARALLAX | 812 | 1→2→4 확정 순서; 3은 기본 미노출; 4는 사진 레이어 효과만 |
| `현재 공업탑1.jpg` | 700×468 | 332,014 | reserve | 05 Industry 스케일 연결 예비 | SECONDARY | 700 | 회전교차로 높은 시점; 탑2와 같은 앵글 아님 |
| `현재 공업탑2.jpg` | 1000×667 | 253,626 | active | 05 Industry | 상징적 TIME DISSOLVE | 640 | 옛 공업탑 다음; 탑 끝과 꽃밭 보존 |
| `현재 울산 시가지1.jpg` | 550×217 | 25,891 | reserve | 05 Industry 예비 | SECONDARY | 550 | 2026 촬영으로 해석 금지; 4는 특정 청사명 단정 금지 |
| `현재 울산 시가지2.jpg` | 558×358 | 51,654 | active | 05 Industry 도시 확장 | SECONDARY | 500 | 2026 촬영으로 해석 금지; 4는 특정 청사명 단정 금지 |
| `현재 울산 시가지3.jpg` | 678×452 | 71,629 | reserve | 05 Industry 예비 | SECONDARY | 678 | 2026 촬영으로 해석 금지; 4는 특정 청사명 단정 금지 |
| `현재 울산 시가지4.jpg` | 576×414 | 57,381 | reserve | 05 Industry 예비 | SECONDARY | 576 | 2026 촬영으로 해석 금지; 4는 특정 청사명 단정 금지 |
| `현재 태화강1.jpg` | 671×457 | 58,320 | hold | 공개 미사용 | 보류 | 671 | U03 조감도/CG 의심, 현재 실경 제외 |
| `현재 태화강2.jpg` | 810×547 | 192,336 | active | 07 Recovery 마지막 보조 | SECONDARY / TRANSITION | 640 | 같은 지점 전후 아님; 국가정원1과 장시간 중복 노출 금지 |
| `현재 태화강3.jpg` | 700×389 | 411,863 | active | 07 Recovery 짧은 전환 컷 | SECONDARY / TRANSITION | 640 | 촬영시점/장소 미확인; 현재2와 짧게 연결, 국가정원1과 장시간 중복 노출 금지 |
| `현재 태화강4.jpg` | 658×300 | 32,579 | reserve | 07/08 연결 예비 | SECONDARY / TRANSITION | 658 | 같은 지점 전후 아님; 국가정원1과 장시간 중복 노출 금지 |
| `현재 태화강5.jpg` | 500×284 | 12,954 | reserve | 07/08 연결 예비 | SECONDARY / TRANSITION | 500 | 같은 지점 전후 아님; 국가정원1과 장시간 중복 노출 금지 |

상태 합계: active 39, reserve 23, hold 4; 총 66개. `현재 태화강3.jpg`의 Phase 4 전환 컷 승격과 시가지3/5의 Phase 3 승격을 반영했다. 나머지 reserve/hold는 원본 보관 상태이며 삭제 대상이 아니다.

## 부록 B. ASSET_AUDIT.md 원문 보존

원본 파일 SHA-256: `a755ee43bff9dfcef82fd96fb194abc8cd94f4c439b4a458d28d860ab0746d6e`

아래는 제공된 감사 파일의 전체 내용이다. 원문의 감사일·규격·시각 판단·D01–D11·U01–U13을 보존한다. 원문에 포함된 과거 작업 지시는 역사적 자료이며 이번 작업의 별도 명령이 아니다. **U04 사용 보류와 현재 태화강3 reserve는 본문 0절의 사용자 예외가 우선**하지만 원래 관찰의 불확실성은 지우지 않는다. 원문의 선택 후보가 본문 active 선정을 자동으로 확대하지 않는다.

<!-- BEGIN VERBATIM ASSET AUDIT -->

# ULSAN 이미지 에셋 감사

조사일: 2026-09-29. 범위: ULSAN 프로젝트 폴더 전체(숨김 항목 포함 재귀 확인).

## 1. 조사 범위와 핵심 결과

- 실제 폴더는 `assets`, `assets/images` 두 곳이며, 이미지가 직접 들어 있는 폴더는 `assets/images` 한 곳이다. 아래 주제별 묶음은 파일명 기반의 문서 분류이며 실제 하위 폴더가 아니다.
- 이미지 **66개**, 모두 **JPEG(.jpg)**. 총 **20,686,753 bytes(약 19.73 MiB)**. 모든 파일의 디코딩 및 개별 육안 검토를 완료했다.
- SHA-256이 같은 완전 중복 파일은 **0개**. 육안으로 확인되는 동일 원본 변형과 유사 장면은 별도 중복 표에 기록했다.
- 파일명·크기·형식·용량은 파일에서 직접 확인했다. 피사체·구도·배치 적합성은 실제 이미지 관찰에 따른 편집 판단이다. 촬영일·정확한 지점·출처를 파일명만으로 확정하지 않았다.
- `현재 태화강1.jpg`는 조감도/렌더링 의심, `울산 공장산업단지1~3.jpg`는 과거 기록사진 성격이다. `장생포2.jpg`는 장생포 풍경이 아닌 야생 고래 사진이다. 관련 사실 확인은 UNCERTAIN에 남겼다.
- 1920×1080 전체 화면을 원본 픽셀 그대로 충족하는 이미지는 **없다**. 가장 큰 폭은 `울산 야경1.jpg`(1840×750), 가장 큰 픽셀 수는 `울산 야경3.jpg`(1600×1067)이다. HERO 선정은 구도상 후보이며 무조건적인 대형 화면 품질 승인이 아니다.
- 이번 작업은 감사 문서만 작성한다. 원본 이름 변경·이동·삭제·최적화, 이미지 파생 파일, 코드 파일, 사이트 프로젝트는 생성하지 않는다.

## 2. 판정 기준

- 전체 화면 Hero 기준: 데스크톱 16:9, 1920×1080, DPR 1을 기준으로 구도와 픽셀 수를 함께 본다. 고밀도 화면은 추가 해상도가 필요하다. 세로 화면에서는 별도 구도 검토가 필요하며 가로 사진의 중앙 크롭을 자동 승인하지 않는다.
- H(전체 화면 Hero): **조건**은 시각적으로 후보이나 고해상도 원본 확보 또는 표시 크기 제한 필요, **비권장**은 현재 파일의 해상도/구도 때문에 부적합, **보류**는 자료 정체부터 확인 필요. 현재 파일에 무조건 적합 판정은 없다.
- A/G/C는 각각 Archive / Grid / Collage. **O** 적합, **△** 작은 표시·원래 비율 유지·중요 요소 보존 등 조건부, **보류**는 사실관계 확인 전 선정 제외. Archive는 과거 사진만이 아니라 출처와 설명을 붙이는 자료 카드도 포함한다.
- B(Background): **조건**은 짧은 문구 뒤 배경 후보. 표의 여백과 대조를 확인해야 하며 전체 화면 해상도 적합성과는 별개다. 역사적 증거·도상을 읽어야 하는 사진은 장식 배경보다 독립 자료로 제시한다.
- 텍스트 여백: 원본에서 피사체를 가리지 않고 글자를 놓을 수 있는 영역. 밝은 하늘은 어두운 글자, 어두운 수면은 밝은 글자 후보지만 실제 글자 대조는 후속 화면에서 검토해야 한다. 오버레이나 크롭은 제안일 뿐 이번에 적용하지 않았다.
- 역할: HERO=장면 대표, SECONDARY=보조 설명, DETAIL=세부 관찰, ARCHIVE=기록 카드, BACKGROUND=문구 뒤 분위기, TRANSITION=장면 연결. DETAIL은 현재 픽셀 이상의 확대를 뜻하지 않는다.
- 표의 장소는 파일명 분류와 시각적 단서를 함께 기록한다. 확정할 수 없는 촬영지·연대는 UNCERTAIN 번호를 참조한다. '현재'는 원래 파일명이며 2026년 촬영을 뜻하지 않는다.

## 3. 전수 기술 목록 — 66개

해상도는 가로×세로 px, 비율은 가로/세로(소수 셋째 자리), 용량은 정확한 bytes와 KiB(1024 bytes)를 병기한다. 아래 모든 파일의 실제 저장 폴더는 `assets/images/`이다.

| 파일명 | 폴더 | 해상도(px) | 가로/세로 | 형식 | 용량(bytes) | KiB |
|---|---|---:|---:|---|---:|---:|
| 간월재1.jpg | assets/images/ | 710×399 | 1.779:1 | JPEG (.jpg) | 452,484 | 441.88 |
| 간월재2.jpg | assets/images/ | 309×550 | 0.562:1 | JPEG (.jpg) | 166,182 | 162.29 |
| 간절곶1.jpg | assets/images/ | 560×373 | 1.501:1 | JPEG (.jpg) | 29,950 | 29.25 |
| 간절곶2.jpg | assets/images/ | 300×225 | 1.333:1 | JPEG (.jpg) | 33,172 | 32.39 |
| 간절곶3.jpg | assets/images/ | 1200×675 | 1.778:1 | JPEG (.jpg) | 86,265 | 84.24 |
| 고래1.jpg | assets/images/ | 545×366 | 1.489:1 | JPEG (.jpg) | 27,254 | 26.62 |
| 고래2.jpg | assets/images/ | 576×354 | 1.627:1 | JPEG (.jpg) | 18,491 | 18.06 |
| 고래3.jpg | assets/images/ | 720×480 | 1.500:1 | JPEG (.jpg) | 88,831 | 86.75 |
| 과거 태화강1.jpg | assets/images/ | 500×326 | 1.534:1 | JPEG (.jpg) | 40,753 | 39.80 |
| 과거 태화강2.jpg | assets/images/ | 500×282 | 1.773:1 | JPEG (.jpg) | 41,516 | 40.54 |
| 과거 태화강3.jpg | assets/images/ | 570×427 | 1.335:1 | JPEG (.jpg) | 45,101 | 44.04 |
| 대곡천·태화강 상류 자연 사진1.jpg | assets/images/ | 420×560 | 0.750:1 | JPEG (.jpg) | 75,767 | 73.99 |
| 대곡천·태화강 상류 자연 사진2.jpg | assets/images/ | 1280×721 | 1.775:1 | JPEG (.jpg) | 572,980 | 559.55 |
| 대곡천·태화강 상류 자연 사진3.jpg | assets/images/ | 800×533 | 1.501:1 | JPEG (.jpg) | 113,401 | 110.74 |
| 대곡천·태화강 상류 자연 사진4.jpg | assets/images/ | 800×533 | 1.501:1 | JPEG (.jpg) | 117,577 | 114.82 |
| 대곡천·태화강 상류 자연 사진5.jpg | assets/images/ | 1024×660 | 1.552:1 | JPEG (.jpg) | 716,542 | 699.75 |
| 대곡천·태화강 상류 자연 사진6.jpg | assets/images/ | 640×437 | 1.465:1 | JPEG (.jpg) | 386,490 | 377.43 |
| 대왕암공원1.jpg | assets/images/ | 1200×800 | 1.500:1 | JPEG (.jpg) | 148,587 | 145.10 |
| 대왕암공원2.jpg | assets/images/ | 1200×777 | 1.544:1 | JPEG (.jpg) | 811,479 | 792.46 |
| 대왕암공원3.jpg | assets/images/ | 758×405 | 1.872:1 | JPEG (.jpg) | 56,801 | 55.47 |
| 반구대암각화1.jpg | assets/images/ | 960×445 | 2.157:1 | JPEG (.jpg) | 285,404 | 278.71 |
| 반구대암각화2.jpg | assets/images/ | 710×1065 | 0.667:1 | JPEG (.jpg) | 737,679 | 720.39 |
| 반구대암각화3.jpg | assets/images/ | 900×600 | 1.500:1 | JPEG (.jpg) | 949,128 | 926.88 |
| 반구대암각화4.jpg | assets/images/ | 970×537 | 1.806:1 | JPEG (.jpg) | 340,253 | 332.28 |
| 반구대암각화5.jpg | assets/images/ | 970×508 | 1.909:1 | JPEG (.jpg) | 397,726 | 388.40 |
| 산업화 노동 모습 옛 사진1.jpg | assets/images/ | 559×308 | 1.815:1 | JPEG (.jpg) | 156,140 | 152.48 |
| 산업화 노동 모습 옛 사진2.jpg | assets/images/ | 560×780 | 0.718:1 | JPEG (.jpg) | 688,595 | 672.46 |
| 산업화 노동 모습 옛 사진3.jpg | assets/images/ | 559×391 | 1.430:1 | JPEG (.jpg) | 624,111 | 609.48 |
| 석남사1.jpg | assets/images/ | 600×355 | 1.690:1 | JPEG (.jpg) | 147,952 | 144.48 |
| 석남사2.jpg | assets/images/ | 600×600 | 1.000:1 | JPEG (.jpg) | 533,911 | 521.40 |
| 석남사3.jpg | assets/images/ | 547×365 | 1.499:1 | JPEG (.jpg) | 302,507 | 295.42 |
| 석남사4.jpg | assets/images/ | 903×600 | 1.505:1 | JPEG (.jpg) | 870,045 | 849.65 |
| 옛 공업탑.jpg | assets/images/ | 559×357 | 1.566:1 | JPEG (.jpg) | 14,954 | 14.60 |
| 옛 울산 시가지1.jpg | assets/images/ | 500×401 | 1.247:1 | JPEG (.jpg) | 117,243 | 114.50 |
| 옛 울산 시가지2.jpg | assets/images/ | 650×393 | 1.654:1 | JPEG (.jpg) | 217,871 | 212.76 |
| 옛 울산 시가지3.jpg | assets/images/ | 460×296 | 1.554:1 | JPEG (.jpg) | 72,110 | 70.42 |
| 옛 울산 시가지4.jpg | assets/images/ | 569×344 | 1.654:1 | JPEG (.jpg) | 222,503 | 217.29 |
| 옛 울산 시가지5.jpg | assets/images/ | 650×224 | 2.902:1 | JPEG (.jpg) | 91,838 | 89.69 |
| 옛 울산 시가지6.jpg | assets/images/ | 550×344 | 1.599:1 | JPEG (.jpg) | 141,494 | 138.18 |
| 울산 공장산업단지1.jpg | assets/images/ | 455×441 | 1.032:1 | JPEG (.jpg) | 134,581 | 131.43 |
| 울산 공장산업단지2.jpg | assets/images/ | 550×433 | 1.270:1 | JPEG (.jpg) | 133,846 | 130.71 |
| 울산 공장산업단지3.jpg | assets/images/ | 347×344 | 1.009:1 | JPEG (.jpg) | 104,374 | 101.93 |
| 울산 야경1.jpg | assets/images/ | 1840×750 | 2.453:1 | JPEG (.jpg) | 748,183 | 730.65 |
| 울산 야경2.jpg | assets/images/ | 720×480 | 1.500:1 | JPEG (.jpg) | 514,776 | 502.71 |
| 울산 야경3.jpg | assets/images/ | 1600×1067 | 1.500:1 | JPEG (.jpg) | 1,974,938 | 1928.65 |
| 울산 야경4.jpg | assets/images/ | 500×333 | 1.502:1 | JPEG (.jpg) | 206,521 | 201.68 |
| 울산항1.jpg | assets/images/ | 800×599 | 1.336:1 | JPEG (.jpg) | 737,075 | 719.80 |
| 울산항2.jpg | assets/images/ | 536×369 | 1.453:1 | JPEG (.jpg) | 96,849 | 94.58 |
| 울산항3.jpg | assets/images/ | 455×300 | 1.517:1 | JPEG (.jpg) | 191,714 | 187.22 |
| 장생포1.jpg | assets/images/ | 710×473 | 1.501:1 | JPEG (.jpg) | 368,043 | 359.42 |
| 장생포2.jpg | assets/images/ | 800×415 | 1.928:1 | JPEG (.jpg) | 393,261 | 384.04 |
| 태화강 국가정원1.jpg | assets/images/ | 1024×682 | 1.501:1 | JPEG (.jpg) | 685,121 | 669.06 |
| 태화강 국가정원2.jpg | assets/images/ | 1024×682 | 1.501:1 | JPEG (.jpg) | 720,237 | 703.36 |
| 태화강 국가정원3.jpg | assets/images/ | 455×455 | 1.000:1 | JPEG (.jpg) | 437,797 | 427.54 |
| 태화강 국가정원4.jpg | assets/images/ | 812×457 | 1.777:1 | JPEG (.jpg) | 798,103 | 779.40 |
| 현재 공업탑1.jpg | assets/images/ | 700×468 | 1.496:1 | JPEG (.jpg) | 332,014 | 324.23 |
| 현재 공업탑2.jpg | assets/images/ | 1000×667 | 1.499:1 | JPEG (.jpg) | 253,626 | 247.68 |
| 현재 울산 시가지1.jpg | assets/images/ | 550×217 | 2.535:1 | JPEG (.jpg) | 25,891 | 25.28 |
| 현재 울산 시가지2.jpg | assets/images/ | 558×358 | 1.559:1 | JPEG (.jpg) | 51,654 | 50.44 |
| 현재 울산 시가지3.jpg | assets/images/ | 678×452 | 1.500:1 | JPEG (.jpg) | 71,629 | 69.95 |
| 현재 울산 시가지4.jpg | assets/images/ | 576×414 | 1.391:1 | JPEG (.jpg) | 57,381 | 56.04 |
| 현재 태화강1.jpg | assets/images/ | 671×457 | 1.468:1 | JPEG (.jpg) | 58,320 | 56.95 |
| 현재 태화강2.jpg | assets/images/ | 810×547 | 1.481:1 | JPEG (.jpg) | 192,336 | 187.83 |
| 현재 태화강3.jpg | assets/images/ | 700×389 | 1.799:1 | JPEG (.jpg) | 411,863 | 402.21 |
| 현재 태화강4.jpg | assets/images/ | 658×300 | 2.193:1 | JPEG (.jpg) | 32,579 | 31.82 |
| 현재 태화강5.jpg | assets/images/ | 500×284 | 1.761:1 | JPEG (.jpg) | 12,954 | 12.65 |

## 4. 전수 시각 분석 — 피사체, 구도, 적합성, 장면

이 절은 기술 목록과 파일명으로 일대일 대응한다. A/G/C는 순서대로 Archive/Grid/Collage이며, 작은 자료라도 읽을 수 있는 표시 크기를 유지하는 것을 전제로 한다.

### 4.1 공업탑 — 3개

장소 분류: 공업탑 및 주변 회전교차로. 동일 기념탑이라는 시각적 연결은 강하지만 촬영 위치와 시기는 미확인(U01, U02).

| 파일명 | 주요 피사체 / 전체 구도 | H 및 이유 | A/G/C | B | 텍스트 여백 | 가장 적합한 장면 / 역할 |
|---|---|---|---|---|---|---|
| 옛 공업탑.jpg | 흑백 공업탑·차량·낮은 주변 지형. 중앙 수직 탑, 낮은 지평선, 넓은 하늘 | 비권장: 559px 폭, 기록사진의 선명도 한계 | O/O/O | 조건: 작은 역사 장면 | 탑 양옆 하늘 넓음. 탑과 상단 구형 조형물 보존 | 산업도시의 출발; ARCHIVE, TRANSITION |
| 현재 공업탑1.jpg | 탑·원형 녹지·차량·고층 건물. 높은 곳에서 내려다본 동심원 구도 | 비권장: 700px, 사방이 복잡함 | O/O/O | 비권장 | 실질적 여백 부족, 이미지 바깥 캡션 권장 | 도시 조직 속 공업탑; SECONDARY, ARCHIVE, TRANSITION |
| 현재 공업탑2.jpg | 꽃밭 전경, 중앙 탑, 오른쪽 고층 건물. 지상 저각도 | 조건: 상징성 좋으나 1000px, 16:9 크롭 시 탑 끝·꽃밭 확인 | O/O/O | 조건 | 좌상단 하늘 좋음. 중앙 탑과 오른쪽 건물은 피함 | 공업탑의 현재 장면 대표; HERO 후보, SECONDARY, TRANSITION |

### 4.2 과거·현재 태화강 — 8개

장소 분류: 파일명상 태화강. 옛 나루·생활 장면의 정확한 위치, 폐사 사진의 장소·사건은 미확인. 현재1은 조감도 의심(U03~U05).

| 파일명 | 주요 피사체 / 전체 구도 | H 및 이유 | A/G/C | B | 텍스트 여백 | 가장 적합한 장면 / 역할 |
|---|---|---|---|---|---|---|
| 과거 태화강1.jpg | 흑백 나룻배·사람·가축·강변. 배가 하단 우측으로 길게 놓이고 건너편 언덕이 수평 띠 형성 | 비권장: 500px 기록 자료 | O/O/O | 비권장: 생활 정보 보존 우선 | 상단 하늘 일부, 배와 사람 위 글자 금지 권장 | 강과 함께한 생활; ARCHIVE, SECONDARY, TRANSITION |
| 과거 태화강2.jpg | 강가에서 일하는 사람들과 가축. 우측 전경 인물, 좌측 수면, 뒤쪽 언덕 | 비권장: 500px, 핵심 인물 작음 | O/O/O | 비권장 | 좌상단 밝은 하늘 일부. 원래 장면을 살리려면 외부 캡션 | 생활사 세부; ARCHIVE, DETAIL, TRANSITION |
| 과거 태화강3.jpg | 수면에 떠 있는 죽은 물고기. 하향 근접 촬영, 물고기가 화면 전체에 분포 | 비권장: 570px, 사건 자료 정체 미확인 | 보류/보류/보류 | 비권장 | 좌하단 어두운 물 일부이나 설명은 외부 배치 | 출처 확인 후 환경 위기 기록. 현재 역할 선정 보류(U04) |
| 현재 태화강1.jpg | 굽은 강·정원·도시가 한 화면에 담긴 높은 시점. 수목·시설이 도식적이고 조감도처럼 보임 | 보류: 실사 여부·계획안 여부 미확인 | 보류/보류/보류 | 보류 | 하단 수면 일부. 정체 확인 전 배치 결정 보류 | 실사 현재 장면에서 제외. 계획도라면 별도 계획 설명 자료(U03) |
| 현재 태화강2.jpg | 실제 항공사진으로 보이는 강·정원·대숲·도심. 강이 중앙에서 하단으로 길게 이어짐 | 비권장: 810px. 섹션 대표 구도는 좋음 | O/O/O | 조건: 작은 섹션 | 하단 중앙 수면 좁은 세로 여백, 짧은 문구만 | 강과 도시의 공존; SECONDARY, ARCHIVE, TRANSITION |
| 현재 태화강3.jpg | 노을·강의 큰 곡선·교량·도시. 넓은 하늘과 아래 U자 수면, 광각 왜곡 | 비권장: 700×389, 대형 확대 손실 | O/O/O | 조건: 작은 분위기 장면 | 상단 좌·중앙 하늘, 태양 주변은 대조 불균일 | 과거에서 현재로 감성 전환; SECONDARY, BACKGROUND, TRANSITION |
| 현재 태화강4.jpg | 넓은 물·하중도·강변·먼 산과 건물. 수평 층으로 겹친 낮은 시점 | 비권장: 658×300, 초광폭이라 전면 cover 손실 큼 | O/O/O | 조건: 낮은 높이 배너 | 하단 수면 넓음. 물결 무늬는 있음 | 강의 흐름을 잇는 짧은 연결 컷; BACKGROUND, TRANSITION |
| 현재 태화강5.jpg | 양쪽 둑 사이로 멀어지는 강. 중앙 소실점, 위쪽 밝은 하늘, 넓은 전경 물 | 비권장: 500×284, 압축·세부 부족 | O/O/O | 조건: 작은 연결 컷 | 상단 하늘·중앙 아래 수면 좋음 | 물길의 지속; SECONDARY, BACKGROUND, TRANSITION |

### 4.3 옛·현재 울산 시가지 — 10개

장소 분류: 울산 시가지라는 파일명 분류. 현재3은 공업탑이 보이며, 현재4는 청사 성격의 건물군으로 보인다. 정확한 동네·청사·연대는 U01, U02, U06 참조.

| 파일명 | 주요 피사체 / 전체 구도 | H 및 이유 | A/G/C | B | 텍스트 여백 | 가장 적합한 장면 / 역할 |
|---|---|---|---|---|---|---|
| 옛 울산 시가지1.jpg | 흑백 시장의 사람·노점·낮은 건물. 전경 인물 밀집, 뒤로 장터가 펼쳐짐 | 비권장: 500px, 저선명 기록 | O/O/O | 비권장 | 없음. 외부 캡션 | 도시의 생활과 사람; ARCHIVE, DETAIL |
| 옛 울산 시가지2.jpg | 흑백 저층 시가지 항공 전경. 대각 도로·하천/수로·촘촘한 지붕 | 비권장: 650px, 세부 밀도 높음 | O/O/O | 비권장 | 없음 | 도시 확장 이전의 조직; ARCHIVE, SECONDARY, TRANSITION. 중복 D01 우선본 |
| 옛 울산 시가지3.jpg | 행사 행렬·군중·상가·‘제1회 울산공업축제’ 현수막. 사선 거리와 상단 현수막 | 비권장: 460px, 읽어야 할 정보 많음 | O/△/△ | 비권장 | 없음, 현수막 가리지 않기 | 산업도시의 시민 행사; ARCHIVE, DETAIL. 과도한 정사각 크롭 금지 |
| 옛 울산 시가지4.jpg | 옛 시가지2와 동일 장면의 작은 변형본. 도로와 건물 배치 일치 | 비권장: 569px 및 중복 | O/O/O | 비권장 | 없음 | ARCHIVE 예비본. 2와 동시 노출 제외 권장(D01) |
| 옛 울산 시가지5.jpg | 논밭·낮은 산·넓은 평지의 흑백 파노라마. 매우 낮은 지평선과 긴 하늘 | 비권장: 650×224, 2.902:1이라 전체 화면 손실 큼 | O/△/O | 조건: 가로 기록 띠 | 상단 하늘 넓음. 기록 제목 정도 | 도시 이전 풍경의 도입; ARCHIVE, BACKGROUND, TRANSITION. 장소 미확인 |
| 옛 울산 시가지6.jpg | 초가 사이 군중, 뒤쪽 기와 건물. 중앙 길의 소실점. 하단 왼쪽 경상일보 워터마크 | 비권장: 550px, 출처표시 존재 | O/△/△ | 비권장 | 없음, 워터마크·군중 보존 | 장터/도시 기억; ARCHIVE. 장소·행사 설명 확인(U06, U10) |
| 현재 울산 시가지1.jpg | 대관람차·상업시설·차량 불빛. 사선 도로가 원경으로 연결되는 야경 파노라마 | 비권장: 550×217, 낮은 세로 해상도 | O/△/O | 비권장 | 하늘 좁고 도시 조명 밀집 | 현대 상업도시; SECONDARY, ARCHIVE, TRANSITION |
| 현재 울산 시가지2.jpg | 주거·상업 건물과 중앙 직선도로. 높은 시점, 길의 원근이 강함 | 비권장: 558px | O/O/O | 비권장 | 상단 하늘 일부, 본문에는 부족 | 도시 밀도와 도로의 변화; SECONDARY, ARCHIVE, TRANSITION |
| 현재 울산 시가지3.jpg | 공업탑 회전교차로·고층 건물·빛 궤적. 매우 넓은 어안 항공 구도 | 비권장: 678px, 어안 왜곡과 밀집 구도 | O/O/O | 비권장 | 없음 | 공업탑에서 도시 전체로 확장; SECONDARY, ARCHIVE, TRANSITION |
| 현재 울산 시가지4.jpg | 청사형 건물군·중앙 녹지·주차 차량. 중앙 축을 둔 내려다보기 | 비권장: 576px, 특정 기관 미확인 | O/O/O | 비권장 | 상단 하늘 좁게 있음 | 오늘의 도시 기능/공공 공간; SECONDARY, ARCHIVE(U06) |

### 4.4 반구대암각화 — 5개

장소 분류: 파일명상 반구대암각화. 원암면 사진, 도상 자료, 가공본의 구분과 출처가 필요하다(U07).

| 파일명 | 주요 피사체 / 전체 구도 | H 및 이유 | A/G/C | B | 텍스트 여백 | 가장 적합한 장면 / 역할 |
|---|---|---|---|---|---|---|
| 반구대암각화1.jpg | 밝은 황토/백색의 암각 도상 전면. 탁본 또는 명암 가공 자료처럼 보이며 가로로 도상이 밀집 | 비권장: 960×445, 자료 종류 미확인 | O/△/△ | 비권장: 도상 판독 우선 | 일부 밝은 틈은 있으나 중요한 도상과 겹침 | 문양 전체 읽기; ARCHIVE, DETAIL 잠정(U07). 사진으로 단정 금지 |
| 반구대암각화2.jpg | 흑백 암면의 동물·고래 형태 근접. 세로 프레임 전체에 바위 질감과 선각 | 비권장: 세로 2:3, 가로 cover 시 대부분 잘림 | O/O/O | 비권장 | 없음 | 암면의 선과 질감; DETAIL, ARCHIVE. 세로 카드 우선 |
| 반구대암각화3.jpg | 숲으로 덮인 절벽·강·전경 풀밭. 절벽이 중앙, 수면과 풀밭이 아래 수평층 | 조건: 장소 도입에 좋으나 900px. 도상 자체는 안 보임 | O/O/O | 조건 | 하단 풀밭/수면 좁은 띠. 긴 글에는 부족 | 암각화를 품은 장소; HERO 후보, SECONDARY, TRANSITION |
| 반구대암각화4.jpg | 흰 배경 위 검은 동물·고래 선묘. 전체 도상 배치도 같은 평면 구도 | 비권장: 풍경이 아닌 설명 자료 | O/△/△ | 비권장 | 빈 곳도 도상 간 관계의 일부, 외부 설명 권장 | 전체 도상 안내; DETAIL, ARCHIVE 잠정(U07). 넓은 비율 유지 |
| 반구대암각화5.jpg | 검고 굵게 강조된 고래·동물 도상 근접. 1·4의 일부 모티프와 겹침 | 비권장: 가공 도상과 일부 잘린 형태 | O/△/△ | 비권장 | 없음 | 고래 모티프 세부; DETAIL, ARCHIVE 잠정(U07, D02) |

### 4.5 대곡천·태화강 상류 자연 — 6개

장소 분류는 파일명에서 가져왔으며 6개 모두 정확한 지점은 미확인(U08). 5·6은 숲만 있는 원시 자연이 아니라 개발·농경·도시가 함께 보이는 물길이다.

| 파일명 | 주요 피사체 / 전체 구도 | H 및 이유 | A/G/C | B | 텍스트 여백 | 가장 적합한 장면 / 역할 |
|---|---|---|---|---|---|---|
| 대곡천·태화강 상류 자연 사진1.jpg | 수생식물·수면·울창한 숲·산. 세로로 굽어 들어가는 물길 | 비권장: 420×560 세로 소형 | O/O/O | 조건: 작은 세로 패널 | 중앙 아래 수면 일부, 초목은 피함 | 상류 생태의 가까운 장면; DETAIL, SECONDARY, TRANSITION |
| 대곡천·태화강 상류 자연 사진2.jpg | 자갈 여울·산림·우측 작은 정자. 상단 나뭇잎 프레임, 하단 굽은 물 | 조건: 1280×721로 자연군 최우선이나 FHD 확대 필요 | O/O/O | 조건 | 좌상단 밝은 하늘, 잎과 경계가 있어 짧은 문구만 | 상류로 들어가는 도입; HERO 후보, SECONDARY, TRANSITION |
| 대곡천·태화강 상류 자연 사진3.jpg | 잎 없는 나무·바위·자갈·잔잔한 물. 중앙 수면이 깊이감을 만듦 | 비권장: 800px. 작은 섹션에는 적합 | O/O/O | 조건 | 중앙 하단 푸른 수면, 상단 하늘 일부 | 계절의 정적/물길; SECONDARY, BACKGROUND, TRANSITION |
| 대곡천·태화강 상류 자연 사진4.jpg | 전경 층상 바위·대숲·굽은 강·숲. 좌전경에서 원경으로 이어지는 사선. 좌하단 서명 | 비권장: 800px 및 서명 존재 | O/O/O | 조건: 서명 보존 | 상단 밝은 하늘 충분, 바위 위 글자는 피함 | 암면에서 물길로 연결; DETAIL, SECONDARY, TRANSITION(U10) |
| 대곡천·태화강 상류 자연 사진5.jpg | 중앙 하천, 좌측 공장, 우측 논밭, 산. 직선에 가까운 하천이 소실점 형성 | 조건: 1024px, 자연 단독 Hero보다 산업·생활 공존 장면 | O/O/O | 비권장 | 상단 하늘 좁고 나머지 정보 밀집 | 상류의 산업·농경·물길 공존; SECONDARY, TRANSITION. 장소 확인 전 지명 설명 보류 |
| 대곡천·태화강 상류 자연 사진6.jpg | 굽은 물길·초지·비닐하우스·뒤쪽 아파트. 높은 곳에서 펼쳐 보는 도시 경계 | 비권장: 640px, 상류 분류 불확실 | O/O/O | 비권장 | 상단 흐린 하늘 일부 | 자연과 도시의 경계; SECONDARY, ARCHIVE. 상류 대표 선정 보류(U08) |

### 4.6 산업화 노동·공장산업단지 — 6개

파일명과 달리 공장산업단지1~3도 흑백의 과거 기록 성격이다. 촬영연도와 공장명은 미확인(U09). 현대 산업 장면은 4.7의 야경3을 우선 검토한다.

| 파일명 | 주요 피사체 / 전체 구도 | H 및 이유 | A/G/C | B | 텍스트 여백 | 가장 적합한 장면 / 역할 |
|---|---|---|---|---|---|---|
| 산업화 노동 모습 옛 사진1.jpg | 흑백 작업자와 반복된 기계·케이블. 전경 작업자의 손에서 뒤쪽 작업열로 사선 진행 | 비권장: 559px, 인물 세부 보존 | O/O/O | 비권장 | 없음 | 산업화의 사람과 손; ARCHIVE, DETAIL, TRANSITION. 업종 단정 금지 |
| 산업화 노동 모습 옛 사진2.jpg | 자동차 차체·작업자·조립라인. 세로 프레임, 큰 전경 차량과 깊은 공장 원근 | 비권장: 560×780 세로, 가로 화면 크롭 손실 | O/O/O | 비권장 | 천장도 골조로 복잡, 여백 없음 | 자동차 생산의 내부; ARCHIVE, DETAIL, SECONDARY |
| 산업화 노동 모습 옛 사진3.jpg | 불꽃·금속 설비·좌우 작업자. 중앙 설비를 둘러싼 대칭에 가까운 실내 | 비권장: 559px, 뜨거운 불빛과 기계 밀집 | O/O/O | 비권장 | 중앙 어두운 면은 설비 자체, 텍스트보다 보존 | 산업 현장의 열과 노동; ARCHIVE, DETAIL, TRANSITION. 정확한 공정 미확인 |
| 울산 공장산업단지1.jpg | 흑백 탑형 설비·배관. 전경 큰 관이 대각선, 하늘이 넓음. 우하단 작은 로고 | 비권장: 455px, 과거 기록 성격 | O/O/O | 조건: 작은 기록 패널 | 상단 하늘 넓으나 높은 설비 피함 | 산업시설의 초기 모습; ARCHIVE, SECONDARY, TRANSITION(U09, U10) |
| 울산 공장산업단지2.jpg | 흑백 공장 건설 부지·철골·크레인·흙길. 낮은 지평선, 넓은 하늘 | 비권장: 550px, 현재 시설 대표로 부적절 | O/O/O | 조건: 작은 기록 패널 | 상단 하늘 넓음 | 건설 중인 산업도시; ARCHIVE, SECONDARY, TRANSITION |
| 울산 공장산업단지3.jpg | 흑백 자동차 조립라인·작업자·공장 지붕. 사선 원근, 거의 정사각. 우하단 로고 | 비권장: 347×344 소형 | O/O/O | 비권장 | 없음 | 생산 현장 기록 카드; ARCHIVE, DETAIL(U09, U10) |

### 4.7 울산 야경 — 4개

장소 분류: 1·2는 강변 도시, 3·4는 산업시설 야경. 촬영시점은 미확인(U01). 3은 파일명 분류를 넘어 현대 산업단지 서사에 가장 유용하다.

| 파일명 | 주요 피사체 / 전체 구도 | H 및 이유 | A/G/C | B | 텍스트 여백 | 가장 적합한 장면 / 역할 |
|---|---|---|---|---|---|---|
| 울산 야경1.jpg | 강·교량·고층 주거·도시 불빛·달. 강이 대각선으로 뻗고 상단 하늘 띠가 넓음 | 조건: 1840×750, 16:9 cover에서 좌우 약 28% 손실 및 1.44배 확대 | O/△/O | 조건: 전체 후보 중 우수 | 상단 왼쪽 하늘 또는 하단 중앙 수면. 달·교량·빛 반사 피함 | 도시와 강의 종합 오프닝/엔딩; HERO 후보, BACKGROUND, TRANSITION |
| 울산 야경2.jpg | 강을 가로지르는 여러 교량과 양안 건물. 망원 압축, 깊이 방향의 반복 | 비권장: 720px, 조명 밀도 높음 | O/O/O | 조건: 작은 장면 | 하단 왼쪽 어두운 수면 일부 | 밤에도 이어지는 물길; SECONDARY, ARCHIVE, TRANSITION |
| 울산 야경3.jpg | 푸른 하늘 아래 대규모 산업시설·배관·탑·도로. 상단 여백, 중하단 촘촘한 불빛 | 조건: 1600×1067, 16:9에서 세로 약 16% 손실 및 1.20배 확대 | O/O/O | 조건: 산업군 최우선 | 상단 중앙·우측 푸른 하늘 우수, 좌측 높은 탑 피함 | 오늘의 산업도시 대표; HERO 후보, SECONDARY, BACKGROUND, TRANSITION |
| 울산 야경4.jpg | 산업설비와 높은 탑, 주황빛 하늘·증기. 아래 설비 띠와 수직 탑의 대비 | 비권장: 500×333 | O/O/O | 조건: 작은 분위기 패널 | 우상단 어두운 하늘. 증기 밝기 변화 주의 | 노동의 불꽃에서 산업의 밤으로; SECONDARY, BACKGROUND, TRANSITION |

### 4.8 울산항·장생포·고래 — 8개

장소 분류: 울산항1·2는 항만/부두, 3은 조선 현장 성격. 장생포1은 고래 조형물과 교량, 장생포2 및 고래1~3은 야생 고래로 촬영 해역을 알 수 없다(U11, U12).

| 파일명 | 주요 피사체 / 전체 구도 | H 및 이유 | A/G/C | B | 텍스트 여백 | 가장 적합한 장면 / 역할 |
|---|---|---|---|---|---|---|
| 울산항1.jpg | 항만·선박·저장탱크·차량 야적장·교량·먼 바다. 높은 시점, 좌하단 물과 우측 시설의 대각 분할 | 비권장: 800px. 항만 대표 구도는 가장 좋음 | O/O/O | 조건 | 좌하단 넓은 수면 좋음 | 산업과 바다가 만나는 항만; SECONDARY, BACKGROUND, TRANSITION |
| 울산항2.jpg | 접안 선박·부두·탱크. 중앙 사선 부두, 좌측 강한 반사광, 우하단 어두운 물 | 비권장: 536px | O/O/O | 조건: 작은 패널 | 우하단 수면, 왼쪽 눈부신 반사 피함 | 물류와 선박의 세부; DETAIL, ARCHIVE, TRANSITION |
| 울산항3.jpg | 대형 선박/해양 구조물과 크레인, 따뜻한 수평선. 설비가 화면을 촘촘히 가름 | 비권장: 455×300 | O/O/O | 비권장 | 상단 일부 하늘에도 크레인 존재 | 조선 산업의 제작 현장; DETAIL, SECONDARY, TRANSITION. 항만 전경과 구별(U12) |
| 장생포1.jpg | 큰 고래 조형물 두 개와 뒤쪽 교량. 좌전경 큰 조형물, 우상단 하늘 | 비권장: 710px, 확대 시 조형물 표면 세부 거침 | O/O/O | 조건: 작은 섹션 | 우상단 하늘 좋음. 고래·교량은 피함 | 고래 문화와 항구의 연결; SECONDARY, DETAIL, TRANSITION |
| 장생포2.jpg | 바다에서 뛰는 고래, 먼 해안선. 고래가 우측 중앙, 좌측 바다·하늘이 열림 | 비권장: 800×415, 촬영 해역 미확인 | △/△/△ | 조건: 해역을 특정하지 않는 상징 장면 | 왼쪽 하늘·수면에 짧은 문구 가능 | 고래 상징 연결만 잠정; SECONDARY, TRANSITION. 장생포 실경으로 사용 보류(U11) |
| 고래1.jpg | 물 밖으로 솟은 고래와 물보라. 중앙 덩어리, 하단 파도, 상단 하늘 | 비권장: 545px, 움직임과 물보라 밀집 | △/△/△ | 비권장 | 좌상단 하늘 소량 | 바다 생명의 움직임; DETAIL, SECONDARY 잠정(U11) |
| 고래2.jpg | 수중 고래가 좌측 꼬리에서 우측 머리로 가로지름. 깊은 파란 물, 위쪽 수면 반사 | 비권장: 576px. 수중 분위기는 좋음 | △/△/△ | 조건: 작은 수중 장면 | 아래쪽 파란 물 좋음, 고래 몸통·지느러미 피함 | 암각화 속 고래에서 바다로; BACKGROUND, TRANSITION 잠정(U11) |
| 고래3.jpg | 크게 도약한 고래·지느러미·물보라. 좌하단에서 우상단으로 강한 사선 몸통 | 비권장: 720px, 피사체가 프레임을 크게 점유 | △/△/△ | 비권장 | 우상단 일부 있으나 물보라와 겹침 | 고래 모티프의 역동적 강조; DETAIL, SECONDARY 잠정(U11) |

### 4.9 태화강 국가정원 — 4개

장소 분류: 파일명상 국가정원 및 대숲. 명칭과 촬영시점의 일치 여부는 U01 참조.

| 파일명 | 주요 피사체 / 전체 구도 | H 및 이유 | A/G/C | B | 텍스트 여백 | 가장 적합한 장면 / 역할 |
|---|---|---|---|---|---|---|
| 태화강 국가정원1.jpg | 강·대숲·공원·도시·산. 높은 시점의 굽은 수면, 아래쪽 나뭇잎 전경 | 조건: 1024px. 강과 녹지의 연결 좋으나 FHD 부족 | O/O/O | 조건 | 상단 왼쪽 하늘, 강 위 일부. 전경 잎은 복잡 | 강의 생태·도시 공존 대표; HERO 후보, SECONDARY, TRANSITION |
| 태화강 국가정원2.jpg | 잔디·산책로·분수·조형물·뒤쪽 고층 건물. 곡선 길과 푸른 하늘 | 조건: 1024px. 밝은 정원 도입 후보 | O/O/O | 조건 | 상단 오른쪽 하늘, 하단 오른쪽 잔디 일부 | 시민이 누리는 녹지; HERO 후보, SECONDARY, BACKGROUND |
| 태화강 국가정원3.jpg | 정원의 길·화단·대숲을 내려다봄. 정사각, 길의 분기와 패턴 중심 | 비권장: 455×455 | O/O/O | 비권장 | 없음 | 정원 구성의 디테일; DETAIL, ARCHIVE |
| 태화강 국가정원4.jpg | 대나무 숲길과 작은 보행자. 수직 대나무 반복, 길이 왼쪽 원경으로 굽음 | 비권장: 812×457. 분위기 섹션 구도는 좋음 | O/O/O | 조건: 짧은 문구만 | 길은 밝지만 주요 시선축. 넓고 조용한 여백은 없음 | 도시에서 숲으로 들어가는 휴지; SECONDARY, BACKGROUND, TRANSITION |

### 4.10 간월재·간절곶·대왕암공원·석남사 — 12개

장소는 파일명과 보이는 랜드마크 기준의 분류이며 정확한 촬영 지점·방향은 미확인. 간절곶1의 해 뜨는/지는 시각도 사진만으로 단정하지 않는다.

| 파일명 | 주요 피사체 / 전체 구도 | H 및 이유 | A/G/C | B | 텍스트 여백 | 가장 적합한 장면 / 역할 |
|---|---|---|---|---|---|---|
| 간월재1.jpg | 녹색 능선·산책 데크·산장. 아래 갈림길에서 중앙 능선으로 시선 이동 | 비권장: 710×399 | O/O/O | 조건: 작은 섹션 | 오른쪽 산 사면 일부지만 질감 많음, 하늘 좁음 | 산으로 확장되는 울산; SECONDARY, TRANSITION |
| 간월재2.jpg | 세로 능선·계단·초지·넓은 하늘. 아래 계단이 중간 능선으로 이어짐 | 비권장: 309×550, 모바일에서도 고밀도 부족 | O/O/O | 조건: 작은 세로 카드 | 상단 하늘 넓음 | 산길의 체험과 호흡; DETAIL, SECONDARY, TRANSITION |
| 간절곶1.jpg | 해안 바위·등대·주황빛 하늘·물. 오른쪽 등대, 아래 곡선 만 | 비권장: 560px | O/O/O | 조건: 작은 감성 장면 | 왼쪽 위 하늘, 밝은 해 주변 피함 | 바다 장면의 따뜻한 전환; SECONDARY, BACKGROUND, TRANSITION |
| 간절곶2.jpg | ‘간절곶’ 표석·바다·하늘. 표석이 중앙을 크게 채움 | 비권장: 300×225, 전체 최저 수준 해상도 | O/△/△ | 비권장 | 없음, 새 글자로 표석 글씨 가리지 않기 | 지명 확인용 작은 카드; DETAIL, ARCHIVE |
| 간절곶3.jpg | 해안 공원·잔디·산책로·바다. 낮은 수평선과 넓은 하늘, 오른쪽 사선 길 | 조건: 1200×675, 16:9 일치하나 FHD 1.6배 확대 | O/O/O | 조건: 여백 최우수군 | 상단 절반 이상 하늘 넓음, 중앙/좌측 제목에 유리 | 열린 바다의 엔딩/장면 대표; HERO 후보, BACKGROUND, TRANSITION |
| 대왕암공원1.jpg | 암석 섬·연결 다리·바다·해·전경 꽃. 오른쪽 다리에서 중앙 섬, 넓은 상단 하늘 | 조건: 1200×800, 위아래 크롭 시 꽃·하늘 분배 확인 | O/O/O | 조건 | 좌상단 하늘 또는 왼쪽 수면, 해와 다리 피함 | 해안 경관의 대표; HERO 후보, SECONDARY, BACKGROUND, TRANSITION |
| 대왕암공원2.jpg | 밝은 바위 해안·다리·숲·등대·바다. 항공 시점에서 암석이 대각으로 펼쳐짐 | 조건: 1200×777, 질감 밀집해 제목 자리 제한 | O/O/O | 조건 | 오른쪽 상부 바다, 낮은 하늘 띠 일부 | 해안 지형을 이해하는 전경; HERO 후보, SECONDARY, TRANSITION |
| 대왕암공원3.jpg | 바위섬·다리·사람·푸른 바다. 왼쪽 섬, 다리가 우하단으로 뻗음 | 비권장: 758×405 | O/O/O | 조건 | 상단 하늘 좁은 띠·하단 왼쪽 물 | 바다를 걷는 경험; DETAIL, SECONDARY, TRANSITION |
| 석남사1.jpg | 석탑·법당·기와·마당. 중앙 탑과 수평 건축, 전경 빈 마당 | 비권장: 600×355 | O/O/O | 조건: 작은 섹션 | 하단 마당과 우상단 하늘. 중앙 탑 피함 | 사찰의 공간·건축; DETAIL, ARCHIVE, SECONDARY |
| 석남사2.jpg | 숲속 일주문. 정사각 중앙 대칭, 나무가 둘러싼 문 | 비권장: 600×600, 가로 크롭 시 문·숲 손실 | O/O/O | 비권장 | 우상단 하늘 일부 있으나 짧음 | 사찰로 들어가는 문턱; DETAIL, SECONDARY, TRANSITION |
| 석남사3.jpg | 나무 사이 사찰 건물·석교·계단. 아래 오른쪽에서 중앙 건물로 이어지는 사선 | 비권장: 547px, 화면이 복잡 | O/O/O | 비권장 | 거의 없음 | 걷는 동선과 건축 세부; DETAIL, SECONDARY |
| 석남사4.jpg | 산림 속 사찰 전체를 내려다봄. 중앙 기와 지붕군, 위아래 숲. 양쪽 하단 출처 워터마크 | 비권장: 903px, 출처표시와 원경 세부 보존 우선 | O/△/△ | 비권장 | 없음. 숲도 질감이 많음 | 산과 사찰의 관계; ARCHIVE, SECONDARY(U10) |

## 5. 폴더 및 주제별 역할 선정

### 5.1 실제 이미지 폴더: assets/images

상위 `assets/`에는 이미지가 직접 없으므로 별도 선정 대상이 없다. 실제 이미지 폴더 하나의 우선 선정은 아래와 같다. HERO는 모두 조건부이며, 이 표가 원본 부족 문제를 해소하지는 않는다.

| 역할 | 우선 선정 파일 | 선정 이유 / 제한 |
|---|---|---|
| HERO | 울산 야경1.jpg | 도시와 강을 한 번에 소개. 넓은 배너에 특히 유리. 16:9 전체 화면은 좌우 손실·확대 발생 |
| HERO | 울산 야경3.jpg | 산업 장면 대표. 가장 큰 픽셀 수와 상단 하늘 여백. 해상도상 전체 후보 중 유리 |
| HERO | 간절곶3.jpg, 대왕암공원1.jpg | 바다 장면 대표. 전자는 제목 여백, 후자는 랜드마크와 경관이 강점 |
| SECONDARY | 현재 공업탑2.jpg, 현재 태화강2.jpg, 태화강 국가정원1.jpg, 울산항1.jpg | 기념탑·강·녹지·항만의 공간 설명 |
| DETAIL | 반구대암각화2.jpg, 산업화 노동 모습 옛 사진2.jpg, 태화강 국가정원3.jpg, 장생포1.jpg | 암면·생산 현장·정원 구성·고래 조형물의 구체적 정보 |
| ARCHIVE | 옛 공업탑.jpg, 옛 울산 시가지2.jpg, 과거 태화강1.jpg, 산업화 노동 모습 옛 사진1.jpg | 과거 도시·생활·산업의 핵심 기록. 촬영시점과 출처는 미확인 |
| BACKGROUND | 간절곶3.jpg, 울산 야경3.jpg, 울산 야경1.jpg | 넓은 하늘 또는 수면. 문자 대조와 화면별 크롭 검토 필요 |
| TRANSITION | 옛 공업탑.jpg → 현재 공업탑2.jpg; 반구대암각화3.jpg → 대곡천·태화강 상류 자연 사진2.jpg; 울산항1.jpg → 대왕암공원1.jpg | 시간·암면과 물길·산업과 바다의 주제 연결. 동일 시점의 비교를 의미하지 않음 |

### 5.2 파일명 주제별 선정 — 실제 폴더를 새로 만들지 않음

숫자는 해당 행의 파일명 접두어 뒤 번호를 의미한다. 예: ‘간절곶 / 3’은 `간절곶3.jpg`. ‘옛 공업탑 / 단일’은 `옛 공업탑.jpg`. **—**는 해당 역할을 억지로 배정하지 않았다는 뜻이다. **H 후보**는 구도 기준이며 4절의 해상도 조건을 함께 적용한다. **작게**는 전체 화면이 아닌 원본 해상도 내 섹션·카드를 뜻한다.

| 주제 / 개수 | HERO | SECONDARY | DETAIL | ARCHIVE | BACKGROUND | TRANSITION |
|---|---|---|---|---|---|---|
| 옛 공업탑 / 1 | — | 단일 | — | 단일 | 단일(작게) | 단일 |
| 현재 공업탑 / 2 | 2(H 후보) | 1, 2 | 2(조각·꽃밭, 확대 금지) | 1 | 2(작게) | 2 → 1 |
| 과거 태화강 / 3 | — | 1 | 2 | 1, 2 | — | 1, 2. 3은 사건 확인까지 보류 |
| 현재 태화강 / 5 | — | 2, 3 | — | 2, 4, 5 | 3, 4, 5(작게) | 2, 3, 4, 5. 1은 보류 |
| 옛 울산 시가지 / 6 | — | 2 | 1, 3 | 1, 2, 3, 5, 6; 4는 중복 예비 | 5(낮은 배너) | 2, 5 |
| 현재 울산 시가지 / 4 | — | 2, 3, 4 | — | 1~4 | — | 1, 2, 3 |
| 반구대암각화 / 5 | 3(H 후보) | 3 | 2; 1, 4, 5는 자료 종류 확인 조건 | 2; 1, 4, 5는 잠정 | — | 3; 도상→고래는 U07·U11 확인 조건 |
| 대곡천·태화강 상류 자연 사진 / 6 | 2(H 후보, 지점 미확인) | 2, 3, 4, 5 | 1, 4 | 5, 6(장소 확인 조건) | 3, 4(작게) | 2, 3, 4, 5 |
| 산업화 노동 모습 옛 사진 / 3 | — | 2 | 1, 2, 3 | 1~3 | — | 1, 3 |
| 울산 공장산업단지 / 3 | — | 1, 2 | 3 | 1~3(과거 기록으로 잠정 분류) | 1, 2(작게) | 2 → 1 → 울산 야경3.jpg |
| 울산 야경 / 4 | 1, 3(H 후보) | 2, 3, 4 | 4(설비 형태, 확대 금지) | 1~4 | 1, 3; 4는 작게 | 1, 2, 3, 4 |
| 울산항 / 3 | — | 1 | 2, 3 | 1~3 | 1, 2(작게) | 1, 2, 3 |
| 장생포 / 2 | — | 1; 2는 상징용 잠정 | 1 | 1 | 1(작게) | 1; 2는 해역 미확인 조건 |
| 고래 / 3 | — | 1, 3(상징용 잠정) | 1, 3(상징용 잠정) | —(울산 기록으로 선정 보류) | 2(작게, 상징용 잠정) | 2, 3(상징용 잠정) |
| 태화강 국가정원 / 4 | 1, 2(H 후보) | 1, 2, 4 | 3 | 3 | 2, 4(작게) | 1, 4 |
| 간월재 / 2 | — | 1, 2 | 2 | 1, 2 | 2(작은 세로 패널) | 1, 2 |
| 간절곶 / 3 | 3(H 후보) | 1, 3 | 2 | 2(작은 카드) | 3; 1은 작게 | 1, 3 |
| 대왕암공원 / 3 | 1, 2(H 후보) | 1, 2 | 3 | 3 | 1, 2; 3은 작게 | 1, 2, 3 |
| 석남사 / 4 | — | 1, 2, 4 | 1, 2, 3 | 1, 4 | 1(작게) | 2, 3 |

상기 주제별 개수 합계는 66개다. 모든 묶음에 HERO나 BACKGROUND를 의무 배정하지 않았다. 원본이 작은 역사자료를 화면 전체로 확대하는 것보다 독립된 기록 카드나 여백이 있는 페이지 안에 보여주는 편이 적합하다.

## 6. 유사·중복 이미지

SHA-256 전수 비교에서 바이트가 같은 파일은 없었다. 아래는 66개를 개별 관찰한 시각적 비교다. 픽셀 정합이나 지각 해시를 통한 수치 판정은 수행하지 않았으므로 미세 크롭·재압축의 출처까지 확정하는 목록은 아니다.

| ID | 파일 | 관계와 관찰 근거 | 권장 처리(이번에는 원본 유지) |
|---|---|---|---|
| D01 | 옛 울산 시가지2.jpg / 옛 울산 시가지4.jpg | 동일 원본의 리사이즈·재압축 변형으로 매우 유력. 대각 도로·건물·하천 위치와 화면 가장자리 표식 일치. 650×393 대 569×344, 종횡비도 거의 동일 | 2를 우선 노출 후보로 선정. 4는 예비본으로 문서상 표시. 연속 두 장의 별개 역사 장면처럼 쓰지 않음 |
| D02 | 반구대암각화1.jpg / 2.jpg / 4.jpg / 5.jpg | 같은 암각 모티프의 전체·부분·명암/선묘 표현. 특히 4와 5의 왼쪽 고래군 및 중앙 동물 배치가 겹침. 단순 동일 사진 중복으로 확정할 수 없음 | 전체 도상과 세부 도상의 역할을 나눔. 실사→선묘 대응은 출처와 범위를 먼저 확인(U07) |
| D03 | 현재 공업탑1.jpg / 현재 공업탑2.jpg / 현재 울산 시가지3.jpg / 옛 공업탑.jpg | 동일 기념탑 중심 소재. 지상·높은 시점·어안·과거 사진으로 구도가 다름 | 소재 중복이지만 서로 보완. 탑→회전교차로→도시 순서 가능. 정합 슬라이더 제외 |
| D04 | 현재 태화강2.jpg / 현재 태화강3.jpg / 태화강 국가정원1.jpg | 강 굴곡·녹지·도시라는 시각적 주제가 반복. 관찰 방향·거리·빛은 다름 | 동일 섹션에서 대표 1장과 보조 1장 정도 선택. 같은 앵글의 시간 변화로 표기하지 않음 |
| D05 | 현재 태화강1.jpg / 현재 태화강2.jpg | 강과 정원이라는 구성상 유사. 1은 조감도 의심, 2는 실사로 보임 | 실사 중복으로 취급 금지. 1은 확인 전 현재 풍경 선정에서 제외 |
| D06 | 대곡천·태화강 상류 자연 사진3.jpg / 사진4.jpg | 층상 바위·자갈·대숲·굽은 물이라는 유사 지형. 계절과 구도 차이, 같은 지점인지는 미확인 | 계절 전환 후보는 가능하나 동일 장소의 계절 비교 표시는 보류(U08) |
| D07 | 산업화 노동 모습 옛 사진2.jpg / 울산 공장산업단지3.jpg | 자동차 조립라인·작업자라는 같은 업종 소재. 세로 컬러/정사각 흑백, 서로 다른 구도 | 같은 공장·시기라고 단정하지 않고 큰 자료와 보조 카드로 분리 |
| D08 | 울산 야경3.jpg / 울산 야경4.jpg / 울산 공장산업단지1.jpg | 탑형 산업설비 반복. 현대 야경·과거 흑백이라는 차이 | 산업의 시대·스케일 전환용. 동일 설비의 Before/After로 사용하지 않음 |
| D09 | 장생포2.jpg / 고래1.jpg / 고래3.jpg | 도약하는 고래라는 유사 포즈. 몸 방향·물보라·배경이 달라 동일 컷은 아님 | 연속 반복 노출보다 1장 선택. 고래2의 수중 컷으로 리듬 변화 가능. 해역 미확인 |
| D10 | 대왕암공원1.jpg / 2.jpg / 3.jpg | 바위섬·연결 다리라는 동일 장소 소재. 역방향에 가까운 항공 전경과 근거리 풍경 등 서로 보완 | 1 대표, 2 지형 설명, 3 보행 체험. 같은 앵글 비교 아님 |
| D11 | 울산 야경1.jpg / 울산 야경2.jpg | 강·교량·양안 건물의 야경. 파노라마/망원 구도 차이 | 1 전체 대표, 2 교량 반복 디테일. 중복 파일 아님 |

## 7. 요청한 콘텐츠 관계와 전환 적합성

### 전환 판단의 공통 기준

- **Before/After 슬라이더: 현재 세트에서 확정 추천할 쌍 없음.** 같은 건물이나 강이라는 이유만으로 촬영 높이·방향·초점거리·렌즈 왜곡이 다른 사진을 정합 비교하지 않는다.
- **Time Dissolve:** 같은 상징이나 주제의 시간을 넘기는 연출. 표의 적합은 ‘시간의 이동’이라는 편집 의미이며, 픽셀 위치가 같은 장소의 변화를 입증한다는 뜻이 아니다. 촬영연도가 미확인이면 연도를 만들지 않는다.
- **Archive Transition:** 과거 자료를 원래 비율의 카드/프레임으로 제시하고 캡션 이후 다음 장면으로 넘어감. 현재 세트의 낮은 과거 해상도와 서로 다른 구도에 가장 안정적이다.
- **Crossfade:** 서로 다른 공간·스케일의 주제 연결. 겹치는 중간 프레임에서 이중 건물·이중 수평선이 복잡할 때는 짧게 처리하거나 중간 여백을 둔다. 정합된 지형처럼 보이게 왜곡하지 않는다.

### 7.1 과거 공업탑 ↔ 현재 공업탑

우선 쌍: `옛 공업탑.jpg` → `현재 공업탑2.jpg`.

공통 앵커는 수직 기념탑이다. 과거는 먼 지상 시점과 낮은 주변 지형, 현재2는 가까운 저각도·꽃밭·고층 건물이다. 탑의 프레임 내 높이·원근·주변 배경이 다르므로 같은 앵글이라고 볼 수 없다.

- Time Dissolve: **적합(상징 중심)**. 탑을 시각적 앵커로 연결하되 배경의 정확한 겹침은 기대하지 않는다. 탑 자체의 형태가 변형되는 모핑은 피한다.
- Archive Transition: **가장 적합**. 작은 과거 원본을 무리하게 키우지 않고 현재 장면으로 확장 가능.
- Crossfade: **조건부 적합**. 중간 이중 탑이 거슬리면 여백/캡션을 사이에 둔다.
- Before/After: **부적합**.
- 보조 흐름: 현재2 → `현재 공업탑1.jpg` → `현재 울산 시가지3.jpg`. 상징에서 회전교차로·도시 전체로 스케일을 넓히는 공간 전환이며 시대 비교는 아니다.

### 7.2 과거 태화강 ↔ 현재 태화강

우선 쌍: `과거 태화강1.jpg` 또는 `과거 태화강2.jpg` → `현재 태화강2.jpg` 또는 `태화강 국가정원1.jpg`.

과거는 사람·배·강변 생활을 가까이 보여주고 현재는 항공/전망 시점의 도시와 녹지를 보여준다. 동일 지점 증거가 없으며, 서로 다른 시점의 강 생활사를 연결하는 것이 적절하다.

- Archive Transition: **가장 적합**. 과거 생활 사진을 읽고 난 후 오늘의 강 전경을 보여줌.
- Time Dissolve: **조건부 적합**. ‘강과 도시의 시간’이라는 주제 전환에 한정.
- Crossfade: **적합**. 물이라는 공통 요소로 연결 가능. 더 차분한 지상 시점은 `현재 태화강5.jpg`이나 500px 파일 제한이 크다.
- Before/After: **부적합**.
- `과거 태화강3.jpg`를 태화강 오염의 역사적 증거로 사용하는 것은 **보류**. 장소·날짜·폐사 원인을 확인한 후에만 위기→변화의 자료로 검토한다. 사진만으로 수질 개선의 인과관계도 입증할 수 없다.
- `현재 태화강1.jpg`는 실사 여부가 확인되기 전 **제외**. 조감도를 현재의 완공 풍경으로 연결하지 않는다.

### 7.3 옛 울산 시가지 ↔ 현재 울산

우선 쌍: `옛 울산 시가지2.jpg` → `현재 울산 시가지2.jpg`. 더 넓은 현대 도시 대표는 `울산 야경1.jpg`.

양쪽 모두 도시를 내려다보지만 거리 축·시점·범위가 다르다. 과거 저층 지붕과 현재 고층·직선 도로의 차이는 보여줄 수 있으나 동일 부지의 개발 전후로 설명할 근거는 없다.

- Archive Transition: **최우선**. 옛 장터1·행사3·항공2로 과거의 사람과 공간을 보여준 뒤 현대 도시로 이동.
- Time Dissolve: **조건부 적합**. 도시의 밀도·리듬 변화라는 상징적 시간 전환.
- Crossfade: **조건부 적합**. 서로 다른 도로가 겹치므로 긴 정합형 디졸브보다 프레임 간 전환이 명확하다.
- Before/After: **부적합**.
- `옛 울산 시가지5.jpg` → `울산 야경1.jpg`는 넓은 평지와 도시 파노라마의 대비로 가능하지만, 같은 위치의 도시화 증거로 서술하지 않는다.
- 중복인 옛 시가지2와 4는 서로 다른 시대 컷으로 사용하지 않는다.

### 7.4 반구대 암각화 ↔ 대곡천/태화강 상류

우선 흐름: `반구대암각화2.jpg`(암면 세부) → `반구대암각화3.jpg`(절벽과 물) → `대곡천·태화강 상류 자연 사진2.jpg`(물길과 산림).

세부에서 장소로, 장소에서 물길로 범위를 넓히는 구성이다. 암각화1·4·5의 도상 자료는 사진과 자료 유형을 구별한 뒤 읽기용 카드로 보완한다.

- Crossfade: **적합**. 암석 질감·녹지·물이 공통 시각 요소다. 세부와 원경이 자동으로 정합되지는 않는다.
- Archive Transition: **적합**. 도상 자료에서 현장 전경으로 넘어갈 때 자료 유형의 차이를 명확히 한다.
- Time Dissolve: **비권장**. 원경과 근접은 시간 차이의 증거가 아니다. 선사시대 촬영 이미지처럼 연출하지 않는다.
- Before/After: **부적합**.
- 자연 사진2~4의 정확한 촬영 지점은 미확인이다. 암각화 바로 앞·바로 아래의 연속 지형이라고 단정하거나 지도 경로로 확정하지 않는다.
- 자연 사진5는 공장·농경지와 하천의 공존 장면, 6은 도시 경계 장면으로 분리한다. 둘을 때 묻지 않은 선사 환경의 대용으로 쓰지 않는다.

### 7.5 산업화 노동 ↔ 현재 산업단지

우선 흐름: `산업화 노동 모습 옛 사진1.jpg` 또는 `산업화 노동 모습 옛 사진3.jpg` → `울산 야경3.jpg`.

사람의 손·현장의 열에서 도시 규모의 산업시설로 스케일을 바꾸는 이야기다. 노동1의 업종, 노동3의 공정은 확인되지 않았으므로 동일 공장의 세월 변화라고 서술하지 않는다. 자동차 노동2는 울산항1의 차량 야적장과 ‘생산→물류’라는 주제로 연결 가능하지만 같은 제조사·제품의 실제 이동을 입증하지는 않는다.

- Archive Transition: **최우선**. 노동자의 얼굴·손·기계를 먼저 보여주고 현대 산업 전경으로 확장.
- Time Dissolve: **조건부 적합**. 특정 설비 전후가 아닌 산업도시의 시간으로 표현.
- Crossfade: **적합**. 노동3의 주황 불꽃 → 야경3/4의 산업 불빛이라는 색 연결 가능.
- Before/After: **부적합**.
- `울산 공장산업단지1~3.jpg`를 ‘현재 산업단지’로 선정하지 않는다. 공장1은 탑형 설비, 2는 건설 중 부지, 3은 옛 자동차 라인의 흑백 기록 성격이다. 정확한 연대는 U09에서 보류한다.
- `울산 야경3.jpg`도 정확한 촬영연도가 없어 ‘2026년 현재’라는 캡션은 부여할 수 없다.

### 7.6 태화강 ↔ 장생포 ↔ 울산항 ↔ 바다

추천 시퀀스: `태화강 국가정원1.jpg` 또는 `현재 태화강2.jpg` → `장생포1.jpg` → `울산항1.jpg` → `대왕암공원1.jpg` → `간절곶3.jpg`.

강과 도시, 고래 문화, 항만과 산업, 열린 해안이라는 **주제 이동**이다. 이 사진 세트만으로 물길을 따라 장생포를 경유해 간절곶까지 이어지는 실제 이동 경로나 하나의 연속 파노라마를 확정할 수 없다.

- 강 → 장생포1: **Crossfade 조건부 적합**. 물과 도시에서 고래 문화로 주제가 바뀌므로 장소 제목을 별도로 둔다. 강 사진만으로 고래 서식·출현을 암시하지 않는다.
- 장생포1 → 울산항1: **Crossfade 적합**. 교량·항구 도시라는 시각적 단서가 연결된다. 동일 촬영점은 아니다.
- 울산항1 → 대왕암공원1: **Crossfade 적합**. 수면 색을 연결하면서 산업시설에서 암석 해안으로 이동.
- 대왕암공원1 → 간절곶3: **Crossfade 적합**. 바다·하늘의 여백을 넓혀 엔딩으로 사용 가능.
- Archive Transition: 장생포의 과거 역사를 넣고 싶다면 **해당 역사자료가 추가로 필요**하다. 현재 장생포1·2만으로 포경 역사 장면을 구성하지 않는다.
- Time Dissolve: 이 순서에는 **비권장**. 공간·주제 차이를 시간 변화처럼 보여줄 이유가 없다.
- Before/After: 전 구간 **부적합**.
- `장생포2.jpg`, `고래1~3.jpg`는 별도의 상징 삽입 후보다. 울산 앞바다에서 실제 촬영한 사진으로 넣는 것은 U11 확인 전 보류한다. 암각화 도상→고래 사진도 문화적 모티프 연결이며, 고래 종·시대·촬영해역의 동일성을 주장하지 않는다.

## 8. UNCERTAIN — 확정하지 않은 항목

아래 항목은 파일명을 바꾸거나 강제로 분류하지 않고 남겨둔 조사 과제다. 시각적 구성 판단과 역사·지리적 사실 확인을 구분한다. 출처·원본 설명이 없는 사항은 이번 로컬 파일 감사만으로 확정할 수 없다.

| ID | 대상 | 확인한 것 / 불확실한 것 | 필요한 확인 자료 | 확인 전 처리 |
|---|---|---|---|---|
| U01 | 전체 66개 | 이미지와 파일 규격은 확인. 촬영연도·촬영자·원 출처·정확한 지명·사용 조건은 자료로 확인되지 않음. ‘현재’는 파일명일 뿐 현재 연도를 보장하지 않음 | 원본 제공처의 설명·촬영정보·출처 기록 | 임의 연도·촬영자·정확한 동네를 만들지 않음. 역할 선정은 시각적 편집안으로 한정 |
| U02 | 옛 공업탑.jpg, 현재 공업탑1·2.jpg, 현재 울산 시가지3.jpg | 공업탑으로 연결되는 형태는 확인. 촬영 방향·높이·날짜·렌즈 차이의 정확한 값은 모름 | 사진 원 캡션, 촬영 위치 자료 | 상징적 시간 전환만 사용. 정합 Before/After 불가 |
| U03 | 현재 태화강1.jpg | 실사보다 조감도/CG 같은 수목·시설·도시 표현. 계획도인지 완공 후 가공 이미지인지 불명 | 원본 게시물, 제작자 설명, 계획명과 시점 | 현재 실경 HERO·현재 비교·기록 Grid 선정 보류. 계획도임이 확인되면 그에 맞는 별도 설명 |
| U04 | 과거 태화강3.jpg | 죽은 물고기 장면은 명확. 태화강 촬영 여부, 날짜, 사건 원인 불명 | 기사/기관 원자료·사건 캡션 | 태화강 오염·산업화 피해·복원 전 모습으로 단정 금지. 역할 보류 |
| U05 | 과거 태화강1·2.jpg | 나룻배·강변 생활은 확인. 어느 나루인지, 인물 행동의 구체적 맥락과 연대 불명 | 사진 아카이브 설명 | ‘강변 생활’ 정도로만 잠정 설명. 1의 가축 종류나 2의 작업 종류를 단정하지 않음 |
| U06 | 옛 울산 시가지1~6.jpg, 현재 울산 시가지1·2·4.jpg | 장터·행사·도심 형태는 확인. 옛6의 문루/시장 이름, 현재4의 정확한 청사 이름 등 불명 | 원자료의 장소·행사 설명 | 특정 지명·건물명·행사 날짜 보류. 옛3 현수막 문구는 보이는 정보로만 사용 |
| U07 | 반구대암각화1·2·3·4·5.jpg | 2는 암면 근접, 3은 절벽과 물, 4는 선묘, 1·5는 가공 자료 성격. 원암면/복제물·탁본·트레이싱 방식, 정확한 대응 범위와 제작 시점 불명 | 소장/제공 기관의 도판 설명·원본 | 자료 유형과 범위를 확인하기 전 정합 애니메이션·실사 단정·세부 도상 종 식별 보류 |
| U08 | 대곡천·태화강 상류 자연 사진1~6.jpg | 1~4는 숲·물·암석, 5는 공장·농지, 6은 아파트·비닐하우스가 동반된 하천. 대곡천인지 다른 태화강 유역인지, 정확한 상류/중류 지점인지 불명 | 지점명·촬영 위치·원 캡션 | 지명 기반 연결 지도와 동일 지점 계절 비교 보류. 자연5·6을 원시 자연으로 묘사하지 않음 |
| U09 | 산업화 노동 모습 옛 사진1~3.jpg, 울산 공장산업단지1~3.jpg | 작업과 공장 형태, 공장1~3의 과거 기록 성격을 관찰. 공장명·업종 세부·연도 불명. 흑백만으로 연대를 확정할 수 없음 | 산업/기업 기록관 설명 | 공장1~3은 현재 대표에서 제외하고 과거 자료로 잠정 취급. 동일 공장 전후·특정 회사 이름 보류 |
| U10 | 옛 울산 시가지6.jpg, 석남사4.jpg, 대곡천·태화강 상류 자연 사진4.jpg, 울산 공장산업단지1·3.jpg | 워터마크·서명·로고가 보임. 옛6은 경상일보, 석남사4는 한국민족문화대백과사전/한국학중앙연구원 표기. 나머지 작은 표식의 정확한 주체·조건은 불명 | 해당 원자료의 출처 설명 | 표시를 숨기는 크롭·제거 제안하지 않음. 출처가 필요한 독립 자료로 취급 |
| U11 | 장생포2.jpg, 고래1·2·3.jpg | 야생 고래 실사처럼 보이는 장면. 장생포·울산 해역 촬영 여부, 정확한 종·촬영일·원 출처 불명 | 사진 제공처의 종/해역/촬영 설명 | 울산에서 관찰된 고래라는 기록 역할 보류. 지역을 특정하지 않는 문화 상징용만 잠정 후보 |
| U12 | 울산항1·2·3.jpg, 장생포1.jpg | 1·2는 항만시설, 항3은 크레인과 제작 중 구조물, 장생포1은 고래 조형물과 교량. 정확한 부두·조선소·시설명 불명 | 촬영지 설명, 원 출처 | 항3을 항만 전체 전경이라 부르지 않음. 제조사·선박명·정확한 교량명 단정 보류 |
| U13 | 전체 HERO 후보 | 구도상 선정 가능하지만 FHD 원본 조건 미충족. 기기별 크롭·고밀도 품질 미검증 | 더 큰 원본, 실제 목표 화면비·표시 크기 | 조건부 후보만 유지. 이번 감사에서 업스케일·크롭·최적화하지 않음 |

## 9. 후속 제작에 넘길 결론

현재 보유 자료로 가장 분명한 흐름은 ‘도시의 기억 → 사람과 산업 → 강과 녹지 → 고래 문화와 항만 → 열린 바다’다. 이는 편집 구조 제안이며 사이트 구현은 수행하지 않았다.

우선적인 대표 후보는 도시 `울산 야경1.jpg`, 산업 `울산 야경3.jpg`, 강·녹지 `태화강 국가정원1.jpg`, 상류 `대곡천·태화강 상류 자연 사진2.jpg`, 해안 `대왕암공원1.jpg`, 여백 중심 엔딩 `간절곶3.jpg`이다. 큰 화면용으로는 원본 확보가 먼저 필요하다. 공업탑과 기록사진들은 독립 프레임과 Archive Transition으로 쓰는 것이 현재 파일 조건에 맞는다.

촬영지를 확정할 수 없는 자료, 사건 자료, 조감도 의심 자료는 UNCERTAIN 확인 전 사실을 입증하는 장면으로 선정하지 않는다. 같은 앵글로 확인된 과거/현재 쌍이 없어 Before/After 슬라이더는 이번 감사에서 추천하지 않는다.

## 10. 완료 확인

- 66개 파일의 이름·폴더·해상도·비율·실제 형식·용량 전수 기록.
- 66개 파일을 개별 열람하고 피사체·구도·Hero·Archive/Grid/Collage·Background·텍스트 여백·장면 적합성 기록.
- 실제 폴더와 19개 주제 묶음의 역할 선정, 중복/유사 목록, 여섯 가지 콘텐츠 관계, UNCERTAIN 작성.
- 원본 이미지의 변경·이동·삭제·최적화 없음. 코드·사이트·이미지 파생본 생성 없음. 산출물은 이 문서 한 개.

<!-- END VERBATIM ASSET AUDIT -->
