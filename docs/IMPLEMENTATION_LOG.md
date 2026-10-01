# Phase 1 Foundation — 2026-09-29

## 작업 전 점검

MASTER_BUILD_SPEC.md 1,168행과 ASSET_AUDIT.md 422행을 읽고 비교했다. 부록 B와 별도 감사 문서의 전체 본문이 일치함을 추가 검증했다. 원본 이미지에 대한 새 육안 감사는 수행하지 않았다.

- 완료: 필수 스택 설치와 lockfile, strict TypeScript, 66개 원본·배포 사본·manifest, 66개 에셋 메타데이터, 14장면 설정과 카피, 7장소, 15출처, 사실·회복 milestone 데이터.
- 불완전: 13개 장면이 존재하나 누락 공통 컴포넌트를 import하고 있었다. typecheck 11건 오류. globals.css의 token/typography 경로 오류, ESLint FlatCompat와 설치된 Next flat config 불일치, Industry/Dead River 본문 대비 부족. validate-content는 manifest.count만 검사했다.
- 미착수: layout/page/Story, Ending, ArchiveCollage/HorizontalArchive/ExploreMap/MoreLink/WhaleFallback, 로컬 글꼴, Foundation QA 및 구현 기록.
- 보존: MotionProvider와 motion/hooks/graphics 초안. 새 페이지에는 MotionProvider를 연결하지 않았다. Phase 2 이후의 기능 구현은 시작하지 않았다.

## Git 상태

git rev-parse --show-toplevel은 C:/Users/jenny를 반환한다. 이 프로젝트만의 .git은 없다. 프로젝트 범위 git status는 `?? ./`, git ls-files는 빈 결과이며 unstaged/staged diff도 비어 있다. 기존 전체 파일이 미추적이므로 Git으로 Cursor의 파일별 생성/수정 시점을 확정할 수 없다. 상위 저장소 변경, git init/add/commit은 하지 않았다.

## 의존성

기존 설치: Next 16.3.6, React/React DOM 19.3.0, GSAP 3.15.0, @gsap/react 2.1.2, Lenis 1.3.26, Three 0.186.1, R3F 9.8.1, Drei 10.7.9, TypeScript 5.9.3, ESLint 9.39.2. npm ls --depth=0 성공, Next/R3F/Drei의 실제 package.json peer dependency가 설치 React/Three와 일치한다.

기존 런타임 버전은 유지했다. devDependency @playwright/test 1.63.0만 추가하고 lockfile을 갱신했다. Fontsource 배포본의 Barlow Condensed Latin 600, Noto Sans KR 400/500, IBM Plex Mono Latin 400 WOFF2를 public/fonts에 저장했다. 각 폴더에 LICENSE와 패키지 버전 SOURCE.json을 보관한다. 폰트는 unicode-range 및 font-display:swap을 사용하며 외부 폰트 요청/빌드 시 다운로드가 없다.

## 완료한 Foundation

- 서버 렌더링 App Router 진입점과 정확한 순서의 14 scene DOM.
- 기존 한·영 카피, Source fact row, 회복 6개 milestone, 공업탑 독립 사실 연도 재사용.
- 기존 13개 장면 보존, 누락된 Ending과 정적 공통 컴포넌트 추가.
- Explore 7장소를 native details/summary로 열람: LOCATION/TYPE/DESCRIPTION/HIGHLIGHT/VISIT와 이미지 순서, 공식 링크. 지도/preview/dialog는 Phase 6 범위로 남긴다.
- JS 없는 세로 흐름, 건너뛰기 링크, 기본 hash 링크, 모션 없는 SVG placeholder.
- 공통 SceneImage에서 active만 허용, 원비율과 원본/명세 폭 상한 보존. 66개 사본은 원본과 동일하며 파생 이미지 없음.
- globals import, 전역 CSS의 무효 composes, 본문 대비와 compact 미디어쿼리 충돌 수정. 로컬 폰트와 시스템 fallback 연결.
- validate-content를 원본/사본 SHA-256, JPEG 규격, 부록 A 전수 매핑, 카피와 데이터 참조 검사로 확장.

## 변경 파일

신규:

- src/app/layout.tsx, src/app/page.tsx
- src/components/story/Story.tsx
- src/components/scenes/EndingScene.tsx
- src/components/archive/ArchiveCollage.tsx, HorizontalArchive.tsx, Archive.module.css
- src/components/explore/ExploreMap.tsx, ExploreMap.module.css
- src/components/ui/MoreLink.tsx, MoreLink.module.css
- src/components/whale/WhaleFallback.tsx
- src/styles/fonts.css, public/fonts/* (WOFF2, LICENSE, SOURCE.json)
- scripts/read-content.mjs
- playwright.config.ts, tests/foundation.spec.ts
- docs/IMPLEMENTATION_LOG.md, QA_REPORT.md, PROJECT_STRUCTURE.md

수정:

- .gitignore, package.json, package-lock.json, eslint.config.mjs
- tsconfig.json: Next build가 jsx=react-jsx 및 .next/dev/types include 적용.
- src/app/globals.css
- src/styles/tokens.css, typography.css
- src/data/scenes.ts: 12개 내비 목적지의 타입을 literal union으로 보존.
- src/components/story/SceneShell.tsx, SceneShell.module.css, SceneImage.tsx
- src/components/scenes/IntroScene.tsx, IntroScene.module.css, EndingScene.module.css, ExploreScene.module.css, RecoveryScene.module.css
- src/components/providers/MotionProvider.tsx: 기존 초안의 lint 오류만 수정. 렌더 중 ref 읽기를 state로 대체하고 준비 완료를 폰트 Promise 완료 후 반영하며 unmount 후 갱신 방지. 페이지에 연결하지 않음.
- scripts/validate-content.mjs

원본 두 명세 문서, 이미지 66개, 배포 사본 및 기존 manifest, 주요 카피/장소/사실/출처/에셋 데이터는 변경하지 않았다. 전체 최종 파일 목록은 PROJECT_STRUCTURE.md에 있다.

## 결과와 제한

검증 결과는 QA_REPORT.md 참조. Phase 1 수락 기준은 통과했다. Phase 2의 스크롤·Loading·커서·강 내비, Phase 3 이후 애니메이션, Phase 5 실제 고래 형태/WebGL, Phase 6 지도/dialog, Phase 7 성능/이미지 품질/외부 링크 실검사는 미구현 또는 미검증 상태다. 기존 그래픽 고래 좌표는 placeholder이므로 완성된 고래 디자인으로 보고하지 않는다.

API 대조: [Next layouts/pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages), [Next ESLint flat config](https://nextjs.org/docs/app/api-reference/config/eslint), 설치 패키지의 실제 타입/exports.

# Phase 2 Core Scroll — 2026-09-30 재개

## 재개 지점 확인

MASTER_BUILD_SPEC.md와 ASSET_AUDIT.md를 다시 읽었다. 프로젝트 범위 git status는 여전히 `?? ./`, staged/unstaged diff는 없다. 상위 Git 루트는 C:/Users/jenny이며 프로젝트 파일을 추적하지 않는다. `.tools/phase2-baseline.json`의 시작 시점 해시와 현재 파일, Phase 1 기록, 기존 브라우저 점검 스크립트를 대조했다. Git 이력으로 어제의 정확한 종료 시간을 복원했다고 주장하지 않는다.

이미 존재하던 Phase 2 구현: MotionProvider 연결, 단일 GSAP ticker/Lenis, sceneRegistry와 측정 좌표, pin 가능 높이 검사, Intro/Ending timeline, hash/resize/reduced motion 복원, Loading/CustomCursor, 개발용 ChapterIndicator. 이 구조를 재작성하지 않았다.

미완료: 실제 RiverNavigation/CHAPTERS, Intro 시작 링크, Phase 2 회귀 테스트와 완료 기록. 추가로 기존 desktop CSS가 일부 Foundation 이미지를 숨기고 있었으며, CSS BOM 때문에 production에서 일부 첫 번째 규칙이 적용되지 않았다.

## 이번에 완료/수정한 작업

- 12개 목적지 강 내비와 CHAPTERS 목록, 44px 이상 링크 영역, 한국어 접근 이름, 활성 항목, hover/focus 라벨, Escape 메뉴 닫기. Sea 이후에도 CHAPTERS 유지.
- 공용 강 path와 MotionPathPlugin 점 이동. 측정된 읽기 anchor 사이의 진행률을 사용하며 React state를 프레임마다 갱신하지 않는다.
- Intro 시작 링크/scroll cue reveal, Ending 7개 장면 표식과 강 선→물방울 마무리. Replay는 사용자 클릭으로만 실행.
- 이전 resize 측정 캐시 제거: 모션 모드 변경 후 늦게 발생하는 불필요 재빌드가 다음 스크롤 위치를 되돌리던 오류 해결.
- CHAPTERS가 강 내비보다 위에서 클릭을 받도록 레이어 수정.
- 첫 진입 5초 Loading 계속 보기 유지. 직접 hash 진입에서도 decode가 영원히 대기하면 5초 후 읽기 fallback으로 이동.
- desktop에서 숨겨졌던 Source/History/Industry/Garden의 기존 사진 복원. 큰 장면은 자연 세로 흐름이며 가로 트랙·collage·사진 전환은 구현하지 않았다. pin이 없는 장면은 본문을 상단에 배치.
- CSS Module 17개의 BOM만 제거해 기존 스타일 복구. 특히 CustomCursor의 fixed/pointer-events 및 Ending 링크 간격이 실제 production에서 적용되는 것을 검증.
- Next 설치 문서에 따라 공통 Image의 deprecated priority 전달을 preload로 변경. critical은 기존 Source 첫 이미지 1장.
- 이번 요청의 MASTER 우선 기준에 따라 Intro 한국어를 `강을 따라, 울산의 시간을 만나다.`로 복원하고 검사기의 이전 예외 제거. 다른 카피/에셋 매핑 변경 없음.

## 이번 턴 변경 파일

생성:

- src/components/navigation/RiverNavigation.tsx
- src/components/navigation/RiverNavigation.module.css
- tests/core-scroll.spec.ts
- tests/runtime-lifecycle.spec.ts

기능/검사 수정:

- src/components/providers/MotionProvider.tsx
- src/motion/createScrollRuntime.ts
- src/components/scenes/IntroScene.tsx, introMotion.ts, endingMotion.ts
- src/components/story/RiverLine.tsx, SceneShell.module.css, SceneImage.tsx
- src/data/copy.ts
- scripts/validate-content.mjs
- tests/foundation.spec.ts
- docs/IMPLEMENTATION_LOG.md, docs/QA_REPORT.md

인코딩만 수정:

- src/components/navigation/ChapterIndicator.module.css
- src/components/ui/CustomCursor.module.css, ScrollControls.module.css
- src/components/scenes/의 14개 *.module.css (DeadRiver, Ending, Explore, Garden, History, Industry, Intro, Jangsaengpo, Night, Recovery, Sea, Source, UpperStream, Whale)

Next build/typecheck의 .next 및 tsconfig.tsbuildinfo, Playwright test-results는 생성 산출물이다. 기존 package.json/lockfile과 원본 이미지·배포 사본·manifest는 변경하지 않았다.

## 사용 이미지

새 이미지/파생본 추가 없음. 기존 active 36개를 유지한다. 아래 숫자는 파일명 번호이며 모두 `.jpg`다.

- Source/Upper: 반구대암각화2·3, 대곡천·태화강 상류 자연 사진2.
- History/Industry: 옛 울산 시가지1·2·6, 과거 태화강1·2, 옛 공업탑, 산업화 노동 모습 옛 사진1·2·3, 울산 공장산업단지2, 현재 공업탑2, 현재 울산 시가지2, 울산 야경3.
- Dead river/Recovery/Garden: 과거 태화강3, 현재 태화강2, 태화강 국가정원1·2·4.
- Jangsaengpo/Sea/Night: 장생포1, 울산항1, 울산 야경1.
- Explore 기존 정적 상세의 추가 이미지: 대왕암공원1·2·3, 간절곶1·2·3, 간월재1·2, 석남사1·2·3·4. Source/Garden/Jangsaengpo 사진도 지정된 상세에서 재사용.

## 임시 상태와 Phase 3 진입 전 확인

Source/History/Industry의 정적 사진열과 Garden/Recovery의 정적 자료는 유지한다. Phase 3의 Source 공간 전환·collage·가로 트랙·TODAY·time dissolve, Phase 4 회복/대숲 효과, Phase 5 고래/WebGL, Phase 6 지도/dialog는 시작하지 않았다. 고래는 기존 placeholder SVG다.

Phase 3에서는 기존 buildSceneTimeline의 한 장면/한 trigger 소유권과 sceneRegistry 측정 방식을 유지하면서 산업 overflow를 실제 측정값으로 연결해야 한다. 작은 원본의 폭 상한·워터마크·비정합 전후 비교 원칙을 지키고 가로 트랙 첫/끝 패널 및 키보드 포커스 도달을 새로 검증한다. 현재 긴 사진 장면이 unpinned인 것은 콘텐츠 누락을 피하기 위한 Phase 2 읽기 fallback이다.

수락 검사와 실행 환경/제한은 QA_REPORT.md의 Phase 2 항목에 기록한다. 이 시점에는 Phase 3 미착수.

# Phase 3 Archive / Industrialization — 2026-09-30

## 범위와 명세 적용

최신 사용자 요청의 OLD ULSAN, 공업탑, 산업화, 현대 산업도시 reveal만 구현했다. 공업탑은 MASTER §6.6의 다섯 번째 패널이며 별도 Scene을 추가하지 않았다. Source 공간 전환은 이번 요청 범위 밖이므로 기존 상태를 유지했다. Upper Stream / Dead River 내용, Phase 1~2의 Lenis/runtime/내비/Intro/Ending 및 Phase 4 이후 구현은 변경하지 않았다.

MASTER와 달라진 부분은 사용자 요청을 우선한 다음 세 가지다.

- OLD ULSAN의 기존 6장 표 대신 시가지2 → 1 → 3 → 5 → 옛 공업탑의 5장 전시를 사용한다. 시가지3·5를 reserve에서 active로 명시적으로 승격했다. 기존 active 데이터와 원본 감사표는 보존했다. 전체 상태는 active 38 / reserve 24 / hold 4다. validator에 이 두 항목만 예외를 명시했다.
- 동일 패널 폭 공식 대신 내용별 46–82vw 폭과 10vw gap, 양 끝 독립 padding을 사용한다. 시작·끝이 화면 안에 위치하는 것은 실제 브라우저로 검증한다.
- 역사사진의 느린 확대 제안은 MASTER §6.5의 읽기 중 확대/회전 금지에 따라 적용하지 않았다. 대신 서로 다른 위치·폭, opacity, 10px 수준 이동, 프레임 그림자로 깊이를 만든다.

ASSET_AUDIT의 비율/원본 상한/워터마크/비정합 공업탑 제한은 유지한다. 파일명만으로 새 연도·장소·회사·업종을 추가하지 않았다. 공장산업단지1·3과 야경4는 선택하지 않았고 reserve로 유지한다.

## 구성

OLD ULSAN은 3H pin에서 메인 시가지2를 먼저 발견하고 시장·행사·넓은 풍경을 거쳐 중심의 옛 공업탑으로 수렴한다. 이전 사진은 낮은 opacity로 잠시 남고 사라진다. 최대 세 프레임이 동시에 보이며 제목·본문·외부 캡션은 독립 공간이다. 마지막 .88–1에 산업화 배경과 같은 색으로 전환한다.

산업화 DOM 순서는 1962 → 노동 → 건설 → 생산(자동차 조립 / 금속) → 공업탑 → 도시 확장 → TODAY다. 사진과 큰 타이포의 위치·크기를 달리했다. 서로 다른 프레임의 옛 공업탑과 현재 공업탑2는 hold → grain 증가/프레임 소거 → opacity 교차 → grayscale 해제 → .96–1 공간 확장 순으로 변한다. 사진 중심을 정합하거나 슬라이더/모프를 사용하지 않는다. 1967 사실은 사진 밖 하단에 둔다.

초반은 따뜻한 기록색, 생산은 절제한 색, 도시 확장은 부분 컬러로 처리한다. TODAY는 동일 원본의 컬러/흑백 레이어에서 clip reveal하며 배경·글자·상단 진행선도 함께 변화한다. 야경3은 min(76vw,1600px,90svh), 높이 800px 이하에서는 80svh 상한 안에서 원비율을 유지한다. 하단 링크와 사진이 겹치지 않는 것을 검사한다. 마지막 settle에서 Dead River 배경색으로 이어진다. BOD와 Dead River 내용은 변경하지 않았다.

## 스크롤 계약

- buildSceneTimeline의 기존 단일 scene trigger/context에 historyMotion과 industryMotion을 연결했다. 추가 pin/RAF/Lenis/ticker/React scroll state는 없다.
- overflow=max(0,track.scrollWidth-stage.clientWidth), D=.5H+overflow+1.2H+.5H. 세로 local scroll의 .5H 이후 track x=-clamp(local-.5H,0,overflow).
- scrub .6 / start top top / pinSpacing / anticipatePin 1 / invalidateOnRefresh를 유지한다. onRefreshInit/onRefresh에서 폭을 재측정하며 기존 resize/profile rebuild와 sceneRegistry 복원을 사용한다.
- 매 프레임은 캐시한 geometry와 GSAP quickSetter를 사용한다. layout 측정은 build/refresh에만 수행한다. industry readingProgress=0으로 내비 진입 시 첫 패널을 건너뛰지 않는다.
- 트랙 안에 interactive element는 없다. SKIP ARCHIVE와 공식 정보 링크는 움직이는 트랙 밖의 고정된 읽기 영역에 둔다. Tab으로 보이지 않는 패널에 진입할 대상이 없다.
- reduced/compact/JS 없는 상태는 동일 문서 순서의 세로 레이아웃이다. context cleanup 후 사진 opacity/transform/filter가 복구된다. 사진은 기존 SceneImage의 lazy 로딩과 원비율 프레임을 재사용한다.

## 실제 사용한 Phase 3 이미지

- 옛 울산 시가지2.jpg, 옛 울산 시가지1.jpg, 옛 울산 시가지3.jpg, 옛 울산 시가지5.jpg, 옛 공업탑.jpg
- 산업화 노동 모습 옛 사진1.jpg, 울산 공장산업단지2.jpg, 산업화 노동 모습 옛 사진2.jpg, 산업화 노동 모습 옛 사진3.jpg
- 현재 공업탑2.jpg, 현재 울산 시가지2.jpg, 울산 야경3.jpg

옛 공업탑은 양 구간의 연결 모티프다. TODAY의 장식 흑백 중복 레이어는 empty alt/aria-hidden이다. 이미지 원본·배포 복사본·manifest는 변경하지 않았다. 외부 placeholder, AI 이미지/업스케일은 없다.

## 생성/수정 파일

생성: src/components/archive/archiveMotion.ts, tests/archive.spec.ts.

수정: src/components/archive/ArchiveCollage.tsx, HorizontalArchive.tsx, Archive.module.css; src/components/scenes/HistoryScene.tsx, IndustryScene.tsx, IndustryScene.module.css; src/components/story/SceneShell.module.css; src/motion/buildSceneTimeline.ts; src/data/assets.ts, copy.ts, scenes.ts; scripts/validate-content.mjs; tests/foundation.spec.ts; docs/IMPLEMENTATION_LOG.md, docs/QA_REPORT.md.

Foundation 검사는 읽기 모드에서 숨긴 TODAY 장식 중복만 비율 검사에서 제외하도록 조정했다. 실제 콘텐츠 이미지 검사는 그대로다. build/test 산출물과 `.tools/phase3-qa/` 스크린샷은 재생성 가능한 QA 자료다.

## 임시 상태 / 다음 단계 전 확인

Phase 3에 placeholder 이미지는 없다. 낮은 원본 해상도는 해결된 것이 아니며 DPR 2에서 동일 선명도를 보장하지 않는다. 사진 촬영일/권리/정확한 장소 불확실성은 원본 감사의 U 항목대로 남아 있다. Phase 4 전에 이 편집 순서와 contained TODAY 크기를 검토하고, Firefox/Safari 및 실제 트랙패드·고밀도 화면·화면낭독기 확인이 필요하다. 후속 Recovery/BOD/고래/WebGL/지도는 시작하지 않았다.

# Phase 3 중단 후 QA 재개 — 2026-10-01

MASTER_BUILD_SPEC, ASSET_AUDIT, 구현/QA 로그와 현재 archive 컴포넌트·모션·테스트를 대조했다. 기존 collage, 7개 가변 폭 패널, 공업탑 time dissolve, TODAY reveal, scaleX/scaleY 보정과 TODAY 상단 padding 제거가 모두 남아 있었다. 재구현하지 않았다. 이전 QA 표의 PASS와 마지막 재실행 예정 문구가 혼재하여, 새 production 서버에서 기존 다섯 검사를 실행해 모두 통과한 뒤 접근성 보정을 적용했다.

이번 앱 변경은 IndustryScene.module.css의 직접 자식 SKIP 링크에 inline-flex/align-items/min-height:44px를 적용한 것뿐이다. MASTER §12의 클릭 영역 기준을 충족하기 위한 국소 수정이다. tests/archive.spec.ts는 기존 접근성 검사를 1440/1920 두 진입 크기로 확장하고 SKIP·공식 링크의 Tab/Shift+Tab, viewport 내 포커스, SKIP 높이를 검증한다. 기존 resize/reload/reduced 검사는 유지했다. 최종 실행 결과는 QA_REPORT의 2026-10-01 항목을 기준으로 한다.

## 12. Phase 4 전에 확인해야 할 사항

- 완료 범위: 이번 요청의 Archive / Industrialization. OLD ULSAN 5장 순서, 산업화 7패널, 비정합 공업탑 전환, contained TODAY와 Dead River 진입을 유지한다.
- 범위 경계: MASTER의 넓은 Phase 3 표에 있는 Source→Upper 공간 전환은 이전 사용자 범위 결정에 따라 미구현 상태다. Archive 완료와 구분하며, 자동으로 완료 처리하거나 이번 QA에서 새로 구현하지 않았다.
- Phase 4의 Dead River는 사진과 1996/BOD 11.3 mg/L 사실을 분리하고, 숫자 값을 0으로 바꾸는 연출을 하지 않는다. 과거 태화강3의 촬영연도·기사 출처는 계속 null이다.
- Recovery 6개 milestone과 Garden 1→2→4 순서, 원본 폭 상한, reduced/compact/JS 없는 읽기 상태를 보존한다. 기존 단일 runtime/ticker와 장면당 trigger 소유권을 재사용한다.
- Firefox/Safari, 물리 트랙패드, 실제 화면낭독기, 실제 브라우저 200% zoom, DPR 2 선명도 및 실기기 성능은 미검증이다. 후속 검증 항목이며 이번 Chromium 결과로 대체하지 않는다.
- ASSET_AUDIT의 촬영일·출처·권리 불확실성과 저해상도 한계는 유지한다. Phase 4 이후 효과와 고래/WebGL/지도는 이번에 시작하지 않았다.

# Phase 3 Visual Refinement 중단 후 재개 — 2026-10-01

이번 재개 범위는 Phase 3 Visual Refinement다. 위의 Archive 완료 및 Phase 4 인계 문구는 이전 작업의 기록이며, Visual Refinement 완료 기록으로 해석하지 않는다. MASTER_BUILD_SPEC.md, ASSET_AUDIT.md, 두 작업 로그, 현재 코드·테스트 및 `.tools/refine-*.py`를 대조했다. 프로젝트는 상위 Git 저장소에서 추적되지 않아 Git diff로 이전 변경을 복원할 수 없다.

## 재개 시점 상태

- 구현 완료·보존: 중앙 18px DOT의 pulse와 큰 RIVER stroke reveal, ULSAN clip/scale 등장, Intro 2.4H 구간. 현재 한국어 카피도 그대로 보존했다.
- 구현 완료·보존: OLD ULSAN 프레임의 clip reveal/64px 진입/퇴장 이동. 기존 5장 순서와 가변 폭 Horizontal Archive 유지.
- 구현 완료·보존: 공업탑에서 가로 이동을 1.4H 동안 멈추고 동일 위치·크기의 프레임에서 opacity dissolve. 사진은 contain으로 원비율을 유지하며 정합이나 모핑을 하지 않는다.
- 구현 완료·보존: TODAY의 독립 surface를 2H 동안 viewport 전체로 확대하고 흑백 레이어를 걷어 컬러를 드러낸다. 마지막 .8H는 어두운 Dead River 연결 구간이다. 이전 contained TODAY 기록은 현재 enhanced 화면에 적용되지 않는다.
- 구현 완료·보존: Navy/White/Black 토큰과 Mint accent. Mint는 강 선, 점, 활성 내비, 커서, 진행선에 사용하며 대면적 배경에 사용하지 않는다. 사진 원래 색상은 UI 팔레트 제한과 구분한다.
- 진행 중이던 항목: `tests/visual-refinement.spec.ts`와 변경된 Archive 검사에 대한 최종 production 검증 및 화면 확인.
- 미완료 항목: 최신 Visual Refinement의 검증 결과와 명세 예외를 작업/QA 로그에 기록하는 작업.

## 이번 재개 원칙 및 명세 예외

정상 구현을 다시 작성하지 않았다. 기존 Lenis/GSAP ticker, ScrollTrigger 장면 소유권, River Navigation, 가로 트랙, reduced/compact/JS 없는 읽기 구조를 보존했다. 설치된 Next.js 16.3.6의 로컬 CSS 및 Image 문서도 확인했다.

브라우저 자동 검사 후 스크린샷을 직접 열어 Intro RIVER의 중앙이 끊긴 현상을 발견했다. 확대된 SVG의 non-scaling stroke와 정규화 dash 조합을 Intro에서만 연속 stroke + clip reveal로 바꿨다(`src/components/scenes/introMotion.ts`). DOT·선의 크기·위치·타이밍·제목 등장과 공용 강 path, Ending, 내비는 그대로 유지했다. 수정 후 production build/lint/typecheck와 네 해상도 Intro 재검증을 수행한다. 이 국소 수정과 두 로그 갱신 외에 앱 파일을 재구현하거나 덮어쓰지 않았다.

사용자의 최신 fullscreen climax 요구를 우선하여 TODAY의 `울산 야경3.jpg`에만 enhanced 화면 cover/확대가 적용된 기존 구현을 보존했다. 원본은 1600×1067이며 1920 폭에서는 1.2배 확대와 세로 크롭이 발생한다. 고해상도 원본 확보나 업스케일을 수행한 것은 아니다. 공업탑은 동일한 바깥 프레임 안에 서로 다른 원비율 사진을 contain으로 표시하므로 사진 여백은 다를 수 있다. 원본/배포 이미지, 에셋 상태와 촬영정보 불확실성은 변경하지 않았다.

최종 검증 결과는 QA_REPORT.md의 「Phase 3 Visual Refinement」 항목에 기록했다. 22개 production 사례의 분할 실행 결과를 확보했고, Intro 국소 수정 후 네 해상도 4개 검사와 build/lint/typecheck를 재통과했다. 최종 코드의 별도 dev lifecycle 1개 검사도 통과했다. 이 요청의 잔여 수정·검증·기록은 완료했다. Source→Upper의 별도 공간 전환은 기존 범위 밖 상태를 유지하며 Phase 4는 시작하지 않았다.

# Phase 4 재개 — River Recovery / Green Heart — 2026-10-01

사용자가 확정한 흐름: TODAY → THE DEAD RIVER → 11.3 BOD DATA MOMENT → RECOVERY → RIVER TIMELINE → GREEN HEART → BAMBOO WALK. 기존 DEAD RIVER, BOD 고정값 11.3, Recovery 여섯 milestone, Garden 1→2→4, 기존 단일 scene trigger/ticker 구현을 보존했다. Phase 5 작업은 시작하지 않았다.

중단 상태를 다시 대조한 결과 Phase 4 장면과 기본 모션은 이미 코드에 있었고, 전용 테스트와 일부 캡처도 있었으나 최종 QA 결과/Phase 4 작업 기록은 없었다. MASTER의 BOD 최대 글자 크기와 Recovery 선 색상은 현재 의도적 시각 구현과 다르며, 기존 코드에 대한 사용자 지시가 없어 다시 덮어쓰지 않았다. 숫자는 11.3으로 유지된다.

이번 수정은 `GardenScene`의 기존 garden-4/BAMBOO WALK 프레임에만 적용했다. 동일 원본 사진을 재사용한 수동 CSS 마스크 3개 층을 두고 포인터에 따라 x ±10/5/2px, y ±16/8/3px 이내로 움직이며 포인터가 나가면 250ms에 원점으로 돌아오게 했다. 스크롤 구간에서는 장식 층이 최대 16/8/3px 이동한다. 원본 이미지는 수정/복제하지 않았고 새 대나무/3D 모델을 만들지 않았다. compact/reduced-motion에서는 레이어를 숨기고 원본 사진을 그대로 보여준다. Desktop 모션 프로필에서 Garden depth 설정을 켰다.

후속 요구사항에 따라 `현재 태화강3.jpg`를 reserve에서 active로 승격해 Recovery의 0.73–0.84 구간 작은 전환 프레임으로 추가하고, 명세대로 `현재 태화강2.jpg`의 마지막 보조 프레임과 이어지게 했다. ASSET_AUDIT의 U01 촬영시점/장소 불확실성과 원본 파일은 그대로 둔다. 사용자 지정 DEAD RIVER의 연도·사건·출처 없는 archive 표시, 1996 BOD 11.3, 강 내비와 같은 Recovery SVG path, 회사형 타임라인 금지, Navy/White/Black 바탕과 Mint accent 한정, Green Heart 큰 reveal, Garden 1→2→4 순서도 문서화했다. active/reserve 합계는 39/23/4가 되며 validator의 명시적 Phase 4 예외를 갱신했다.

설치된 Next.js 16.3.6의 `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`와 `05-server-and-client-components.md`를 확인했다. 첫 빌드에서 server/client 이벤트 경계 오류를 확인하여 포인터 핸들러를 별도 `BambooDepth.tsx` Client Component로 옮겼다. 최종 lint와 typecheck는 PASS, production build는 PASS (build ID `YNB7FH_yaBd3KRTkS17cy`). 자동화 테스트, 콘텐츠 validator, 브라우저 시각 QA는 실행하지 않았다. 따라서 구현은 이어졌으나 Phase 4 검증은 미완료다.

## 이번 재개의 파일

수정: `src/components/scenes/GardenScene.tsx`, 신규 `BambooDepth.tsx`, `GardenScene.module.css`, `RecoveryScene.tsx`, `RecoveryScene.module.css`, `phase4Motion.ts`, `src/motion/motionProfiles.ts`, `src/data/assets.ts`, `src/data/scenes.ts`, `scripts/validate-content.mjs`, `MASTER_BUILD_SPEC.md`, 두 작업 로그.

첫 production build에서 서버 컴포넌트의 이벤트 핸들러 전달 오류를 발견해 pointer interaction만 `BambooDepth.tsx` Client Component로 분리했다. 그 뒤 최종 lint/typecheck/build를 재실행해 통과했다. 자동화 테스트, content validator 및 browser QA는 실행하지 않았다.

보존: 기존 `DeadRiverScene`, `RecoveryScene`, `deadRiverMotion`, `recoveryMotion`, `tests/phase4.spec.ts`, 전용 캡처 및 사용자 지정 장면 순서. Phase 5는 미착수.

## Phase 4 verification addendum — 2026-10-01

After implementing the current-Taehwa image handoff and Bamboo Walk depth parallax, expanded `tests/phase4.spec.ts` to assert the `taehwa-now-3` interstitial and `taehwa-now-2` closing frame, plus pointer motion and 250ms return. Final Chromium Playwright result: 4/4 passing at 1280x720, 1440x900, 1600x900, and 1920x1080. Visual captures in `.tools/phase4-qa/` were reviewed for TODAY dark, DEAD RIVER, BOD, 1996/2004/2005/2007/2013/2019, current-Taehwa handoff, Green Heart, and BAMBOO WALK. No page errors, console errors, or failed HTTP responses occurred in the tested flows. Content validation, lint, and typecheck pass. The production build passed before this test-only update. Phase 5 remains untouched; no Three.js usage was added.
Final npm.cmd run build also passes with static prerender of /.

## Continuous Phase 4 browser verification — 2026-10-01

Added a continuous forward/reverse scroll sweep to `tests/phase4.spec.ts`. It advances the browser 90px at a time from the TODAY point through DEAD RIVER, 11.3 BOD, Recovery milestones 1996/2004/2005/2007/2013/2019, current Taehwa image handoff, Green Heart, and the completed Bamboo Walk reveal. It asserts the observed chapter order both ways, checks all key visual states during the passage, and reports zero page/console/HTTP errors. Full Phase 4 spec result: 5/5 passed (four viewport tests and one continuous round trip). Reviewed continuous Chromium screenshots are saved in `.tools/phase4-qa/`.
Reverse-scroll verification was strengthened to assert 2019-to-1996 milestone order, Taehwa 3-to-2 visual handoff while rewinding, BOD/archive reappearance, and restoration of the bright TODAY surface. The continuous Chromium round-trip test passes with these assertions.

Fast-scroll QA adds actual 700px Chromium wheel bursts down from TODAY through the four Phase 4 scenes and back up. Chapter order and direction remain stable; Bamboo Walk photo stays available, the pin runtime remains active, TODAY restores, and no browser/runtime/network errors occur. Final `npx.cmd playwright test tests/phase4.spec.ts` result: 6/6 passed.

River Navigation jump verification passed for Recovery, Garden, and Dead River destinations from the TODAY position. Verified destination heading focus, hash, active navigation/current link, SVG path progress, Mint accent at Recovery, and zero browser errors. Final Phase 4 test suite: 7/7 passing.

Mid-scroll refresh was verified at DEAD RIVER progress 0.73 (BOD 11.3) and RECOVERY progress 0.56 (2007 milestone). Session persistence restores the original scene and progress within 0.03, the River Navigation active state matches, and the visual marker returns after reload. Dedicated Chromium test passes.

Phase 4 body/document horizontal overflow check passes across DEAD RIVER, RECOVERY, and GARDEN at 320x720, 640x360, 1280x720, 1440x900, and 1920x1080. All 15 viewport/scene combinations have body and document scroll widths within the viewport.

Explicit image check passes for all six Phase 4 asset IDs: `past-taehwa-3`, `taehwa-now-3`, `taehwa-now-2`, `garden-1`, `garden-2`, and `garden-4`. All decoded with non-zero natural dimensions, with zero image 4xx/5xx responses or failed image requests.

Dedicated browser error monitoring covered Phase 4 scroll transitions, River Navigation jump, and mid-scroll reload. `pageerror`, console error, request failure, and HTTP >=400 counters all remained at zero. Test passes.

Cold-loaded the site with system `prefers-reduced-motion: reduce`. Phase 4 selects the reduced profile, disables pinning and Bamboo depth layers, keeps BOD, milestones, garden frames, and title readable in document flow, and has no horizontal overflow or console/runtime error. Test passes.

Keyboard-only Phase 4 navigation passed: Enter opens CHAPTERS, Tab reaches Recovery/Garden links, Enter jumps to Recovery with heading focus, and Escape closes the disclosure and returns focus to its summary.

The complete Phase 4 continuous scene test was re-run at 1280, 1440, 1600, and 1920 widths; all four passed. The 1600/1920 BOD and Bamboo Walk captures were visually reviewed; no viewport overflow or broken reveal.
Final lint was rerun after the latest browser-test additions. Removed the single unused test locator; `npm.cmd run lint` now passes with zero errors and warnings.
Final typecheck detected and resolved an optional-element nullability mismatch in the continuous browser test helper. `npm.cmd run typecheck` passes; final lint remains clean.
Final production build after Phase 4 QA updates passes; `/` is statically prerendered.
Final current-state Phase 4 Chromium regression: 13/13 tests passed across desktop viewports, continuous/reverse and fast scroll, Navigation jump, refresh restore, horizontal overflow, image loading, error monitoring, reduced motion, and keyboard navigation. Earlier lint/typecheck findings were resolved; no remaining Phase 4 issue found.

## Phase 5 implementation complete — 2026-10-01

Resumed from the existing Phase 5 placeholders. Phase 1–4 scenes, River Navigation, Lenis/ScrollTrigger runtime, Horizontal Archive, and Phase 4 motion were preserved. Added a shared plain-data engraved whale seed, progressive SVG memory callback, and one lazy client-only R3F Canvas using 24 open contour strokes and deterministic Points. ScrollTrigger scrubs formation, swim, camera follow/retreat, tail/body wave, and departure; R3F handles only subtle idle motion. Canvas is DPR-limited, reduced by device tier, only rendered while in view, and falls back to SVG on unsupported/lost WebGL. Reduced motion keeps the static line whale and story in document flow.

Jangsaengpo reveals the existing `장생포1.jpg` as whale-culture imagery and carries the whale trajectory into a restrained, non-card layout. The Port/Sea passage uses `울산항1.jpg` as overview, with `울산항2.jpg` and `울산항3.jpg` as secondary structural layers; those requested Phase 5 images were promoted from reserve in the runtime asset registry. No uncertain generic whale photo or `장생포2.jpg` is presented as an Ulsan whale record. Port typography and the drawn River Line clear into the deep-navy `TO THE SEA` breathing-space ending.

## Phase 5 QA and static verification — 2026-10-01

Production Chromium integration: `npx.cmd playwright test tests/phase5.spec.ts` passes 5/5. At 1440×900, the continuous Garden/Bamboo → Whale → Jangsaengpo → Port → Sea journey verifies the abstract silhouette, formation progress, all requested image decodes, Port layers, Sea ending, pointer-event isolation, native fast forward/reverse wheel movement, River Navigation jump, horizontal bounds, and zero page errors, console errors, or HTTP failures. Captures were visually reviewed at Whale formation/swim, Jangsaengpo, Port structures, and Sea reveal.

Responsive scene regression passes at 1280×900, 1600×900, and 1920×900. With `prefers-reduced-motion: reduce`, pinning and Canvas are absent while the static whale, Jangsaengpo image, and readable story remain. `npm.cmd run lint` passes with zero warnings, `npm.cmd run typecheck` passes, `npm.cmd run build` passes and statically prerenders `/`, and `npm.cmd run validate-content` passes. No Phase 5 defect remains in tested desktop/reduced-motion paths.

## Phase 45 visual / motion / media refinement — 2026-10-01

Reviewed specification, audit, existing logs, scenes, installed Componentry code, and assets. Git diff has no tracked project baseline (project files are untracked); no reset or overwrite was performed. Assets currently contain 66 JPEGs and only one video: `assets/video/태화강 영상.mp4` (8,555,390 bytes). A byte-preserving public copy serves the Upper Stream transition; muted/inline video loads near its scene and pauses offscreen/when hidden. No whale video exists anywhere in the project, so the requested actual whale-video hybrid remains incomplete.

Expanded the Dead River archive into a treated viewport layer retained behind 1996 BOD 11.3 and its short Korean explanation. One fixed SVG path now carries the line through Dead River/Recovery pin boundaries. Removed the motion-toggle UI while preserving OS reduced motion. Linked narrative photographs now own existing official destinations, keyboard focus, hover-only Componentry ripple, and minimal + MORE cursor text; removed fixed scene CTAs and official-information captions/cursor circles. Inspected Collection Surfer's depth/scale/overlap principles and applied selected larger Garden/Recovery/Port layers without its infinite-scroll system. Jangsaengpo now has a full-bleed photograph, readable title/body, and an engraved-whale crossing reveal in place of the dotted trajectory. Existing R3F whale is retained. Phase 6, Explore, Night, and Ending implementation were not started or redesigned.

Integrated Chromium refinement tests passed; screenshots were reviewed and the obscured Jangsaengpo title was corrected and rechecked. Updated the older Phase 5 reduced-motion assertion to use the system preference instead of the removed UI. Final typecheck/build pass; lint has no errors and retains the installed Collection Surfer's one img-element warning. Documentation records the missing whale video rather than claiming full refinement completion.

## Phase 45 / Global UI-Motion refinement completion — 2026-10-01

This entry supersedes the earlier missing-video limitation. Re-inspected the filesystem: `assets/video/고래.mp4` is 6,480,889 bytes, 1280×720, 10.005 seconds. Direct frame inspection confirms an animated whale emerging from an engraving background. Its public copy has an identical SHA-256. The original files and official URLs are preserved; installed Componentry packages were inspected without reinstalling.

Moved the single Taehwa video from Upper Stream into the final Intro passage after ULSAN and the Korean copy. River-stroke expansion becomes an elliptical water reveal with navy treatment and cropped embedded black edges, then Source. Playback is visibility/reveal-gated, muted, inline, and paused outside the transition. A single masked, monochrome whale video scrubs its actual frames forward/backward across Whale and Jangsaengpo, enlarges and exits while the full-bleed photograph opens. Existing R3F formation remains as a restrained hybrid layer; removed FOLLOW, inert cursor labels and the separate engraved crossing. CHAPTERS is unboxed text plus sign/arrow; keyboard disclosure and navigation remain.

Adapted the installed Image Ripple Effect's pooled brush growth/fade mechanism into a global, low-contrast 2D compositor exported alongside that component. Uses 18 bounded waves, half-viewport resolution, the existing GSAP ticker, and pointer-events:none. Photo-local WebGL ripple canvases are removed, leaving one primary whale WebGL Canvas with its existing DPR/visibility limits. All scenes respond to mouse movement; reduced motion disables the global compositor and whale video. Existing enlarged Dead River/BOD context, one continuous Recovery river, + MORE image links, larger Garden/Recovery/Port layouts, and selected depth layers are retained. Phase 6, Explore, Night and Ending were not implemented/redesigned.

Final Chromium integration passed 5/5 across 1440 and layout regressions at 1280/1600/1920. Reviewed screenshots and specifically rechecked the final Intro crop and actual ripple pixels after the last CSS adjustment. Final lint: 0 errors, 1 existing Collection Surfer img warning; typecheck and production build passed. No known blocking refinement defect remains in the tested paths.

## Whale → Jangsaengpo final transition — 2026-10-01

Limited production-code changes to Whale and its Jangsaengpo handoff. Removed the exclusive procedural R3F renderer/island, SVG substitute, shared whale geometry seed, materials and formation/frame updates; no other scene or Global Ripple implementation changed. Re-inspected actual `고래.mp4` frames and confirmed the source/public hashes. The video is now the sole whale subject.

One GSAP master ScrollTrigger with scrub 1.2 drives a continuous smooth approach, vertical drift, perspective/rotation, controlled body-filling crop, and continued rightward/depth exit. Uses a single paused, scroll-seeked video (the actual 1.7–7.4s swim/turn passage), coalesced seek completion, nearby preload and cleanup. No exit opacity fade, additional Canvas or RAF. Soft body-focused mask and navy monochrome treatment blend the original engraving backdrop; opaque video body conceals the scene seam. Jangsaengpo is full bleed behind it, followed by title and description after the foreground departure. Existing outgoing Jangsaengpo/Port behavior is retained. Reduced/reading mode relocates the same video to Whale and holds a recognizable still, with no camera rush or WebGL.

Final dedicated Chromium suite: 5/5 pass at 1440 and 1280/1600/1920, including reverse/fast scroll, trajectory frame samples, media readiness, text timing/bounds, no overflow and no console/runtime/HTTP errors. Captures reviewed in `.tools/whale-final-qa/`. Type checking found one missing HTMLElement query generic; corrected it, then final typecheck and production build passed. Lint passes with the existing Collection Surfer img warning. Original 720p detail is deliberately soft at the brief extreme crop. Phase 6 remains unstarted.

## Whale native playback / Jangsaengpo right exit — 2026-10-01

Supersedes the preceding video zoom, radial subject mask and scroll-frame scrub implementation. Rechecked the actual `assets/video/고래.mp4` (1280×720, 10.005s); source/public SHA-256 remains identical. The single fullscreen video has constant dimensions, cover crop and transform:none. Native looping playback at a fixed 0.8 rate preserves the source swimming motion; a single initial 1.7s cue skips its empty opening, with no seeking on scroll. Offscreen/hidden playback pauses without remounting during scene navigation. Reduced motion displays a source-derived poster without video download/autoplay. Removed camera scale/translation/rotation, radial focus and vignette; kept only uniform Navy color treatment.

The entrance master coordinates a left-to-right clip wipe with the source's close-pass interval, then delays Jangsaengpo title/copy until the whale layer clears. A bounded time gate smooths the close-pass trigger; fast chapter skipping does not wait for source frames. The existing Jangsaengpo inner carries photo, overlay and all text together to xPercent:105 with a 1.1s scrub and gentle acceleration. Its exit temporarily lifts the actual next scene behind it, preserving Port content and its own timeline, with no cloned media or added Canvas. Reverse scrolling restores compositions while native video continues forward. Global Ripple structure and all other scene implementations are unchanged; Phase 6 remains unstarted.

Focused Chromium QA passed 5/5 at 1440×900, 1280×720, 1600×900, 1920×900 and reduced motion. After the last close-pass smoothing change, the affected 1440 scenario passed again. Visually reviewed fullscreen playback, wipe, full-bleed text bounds, partial right exit and complete departure captures in `.tools/whale-native-qa/`. Final lint, typecheck and production build each ran once and passed; lint retains the existing Collection Surfer img warning. Limitation: the supplied source is engraving-background whale animation, not open-ocean footage; the baked background remains visible. No external video was added.

## Componentry Global Ripple renderer — 2026-10-01

User-authorized replacement of the 2D GlobalRipple with the installed ImageRippleEffect renderer. Global mode uses one transparent WebGL Canvas, the built-in brush (no missing /brush.png or external photo), 100 pooled waves with shared geometry, and the supplied strength/size/rotation/fade/growth values. Pointer sampling is window-based, passive and throttled; the fullscreen layer is pointer-events:none. A restrained Navy/Mint crest shader preserves all underlying scene images and text. This is an overlay, not displacement of DOM photographs/text. Whale/Jangsaengpo opacity is reduced. DPR is 1, displacement FBO half-resolution unsigned-byte, unused image FBO 1×1; native R3F RAF disabled and rendering advanced by the existing GSAP ticker only while pointer movement/waves exist. Fixed actual ShaderMaterial texture-uniform binding; transient GPU readback diagnostics were removed. OS reduced motion unmounts the layer. No other scene motion, video or Phase 6 work changed.

Focused global/Whale 1440 Chromium QA passed 2/2; checks include real shader pixel output, one Canvas, idle wave expiry, unobstructed CHAPTERS navigation, 1280/1920 resize bounds, reduced-motion live round trip and Whale/Jangsaengpo native playback/reverse/fast-scroll regression. Screenshots in .tools/global-componentry-qa/. Typecheck and build pass; lint passes after changing the canvas diagnostics to the imperative DOM API, with only the existing Collection Surfer img warning.

## Actual global content distortion — 2026-10-01

Supersedes the previous transparent ripple-overlay implementation. Root cause: its global shader bypassed uTexture sampling and output only tinted crests. Reused the installed Componentry brush texture, pooled wave growth/fade/rotation, FBO and sin/cos displacement direction. The global shader now encodes a neutral R/G vector field rather than a visible overlay. One small WebGL surface (DPR <= 1/3, maximum 512px wide, 24 pooled waves, capped 30Hz) supplies this field to SVG feDisplacementMap through a PNG bridge. A pointer-transparent backdrop filter samples the actual browser-composited SourceGraphic, including native typography, photographs, SVG graphics, backgrounds, videos and CHAPTERS. No DOM content clone, element transforms, text/video texture copies, duplicate video or old Whale Canvas. A 2.5%-maximum Mint highlight makes waves detectable on uniform backgrounds; refraction remains primary.

The filter is restricted to current wave bounds rather than repeatedly processing the whole viewport; corrected neutral 8-bit bias prevents displacement outside waves. Idle filter is removed entirely, restoring exact original text pixels. Uses the existing GSAP ticker, ref coordinates, bounded source lifetime and no pointer-driven React state. Hidden tabs/idle frames do not render maps. Video chapters use lower strength. Keyboard interaction bypasses distortion, custom + MORE remains above the effect, all Canvas descendants are pointer-transparent, and OS reduced motion unmounts it. Chrome/Edge are enabled; unsupported engines retain the original content without a fake overlay. No scene design, navigation, Lenis, video playback, Collection Surfer code or Phase was changed.

Chromium 1440 pixel QA passed for ULSAN, THE DEAD RIVER, 11.3, FLOWING AGAIN, EXPLORE ULSAN and CHAPTERS, including white-glyph-edge migration, unchanged DOM bounds and exact recovery after expiry. Photographs and actual image/background boundaries visibly bend; same-frame Whale and Taehwa video comparisons verified native video pixel distortion (QA alone briefly held playback, then restored it). + MORE official-link click, disclosure, CHAPTERS and River Navigation work. Active fast wheel advanced 6000px and reversed to the original position, with no errors. Four-width suite passed; final strengthened 1440 scenario passed again. After regional compositing, headless active frame means were 16.9ms / 16.5ms / 17.0ms at 1280/1600/1920; hardware GPU profiling is not claimed. Evidence: .tools/content-distortion-qa/. Final lint, typecheck and build passed, with the existing Collection Surfer img warning. Collection Surfer remains installed but is not currently mounted in the site; its code was preserved.
