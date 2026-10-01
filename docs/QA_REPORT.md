# Phase 4 재개 — 검증 대기 — 2026-10-01

Phase 4 사용자 흐름은 TODAY → THE DEAD RIVER → 11.3 BOD DATA MOMENT → RECOVERY → RIVER TIMELINE → GREEN HEART → BAMBOO WALK다. Dead River 사진은 특정 연도·사건·출처 표기 없이 사용하고 BOD 1996 / 11.3 mg/L를 별도 데이터로 표시한다. Recovery는 기존 River Navigation과 같은 SVG 경로로 여섯 milestone을 보여주며 회사형 timeline UI는 없다. Navy/White/Black이 화면 바탕이며 Mint는 강 선·활성 내비게이션·focus 같은 강조 요소에만 사용한다.

`현재 태화강3.jpg`는 사용자 지시에 따라 active로 승격되어 Recovery 후반 0.73–0.84의 작은 전환 프레임으로 들어가고, `현재 태화강2.jpg`가 .82 이후 마지막 보조 프레임으로 이어진다. 태화강3의 촬영연도/장소는 표시하지 않으며 U01 불확실성은 유지한다. Green Heart는 기존 1→2→4 순서와 큰 reveal을 사용한다. Bamboo Walk는 태화강 국가정원4 사진의 3개 CSS 마스크 depth layer를 사용한다. 앞/중간/배경 포인터 범위는 x ±10/5/2px, y ±16/8/3px, 스크롤 이동은 16/8/3px 이내이며 leave 복귀는 250ms다. 원본 사진은 변경하지 않고 reduced/compact 화면은 장식 레이어 없이 표시한다.

최신 current3 전환 및 명세 수정 이후 lint PASS (오류/경고 0), typecheck PASS, production build PASS (Next.js build ID `YNB7FH_yaBd3KRTkS17cy`, `/` 정적 prerender). 이전 lint에서 발견된 미사용 변수 경고는 제거했다. Phase 4 전용 Playwright 테스트, content validator 및 브라우저 화면 확인은 실행하지 않았다. 기존 캡처는 중단 전 참고 자료다. 아직 검증할 항목은 current3/current2 전환, 같은 사진 마스크 경계의 틈과 포인터 복귀, milestone 정·역방향, reduced-motion 읽기 순서다. 이 QA 결과로 Phase 4 전체 통과를 판정하지 않는다.

# Phase 3 Visual Refinement — 2026-10-01 완료

이 항목이 최신 결과다. 아래의 contained TODAY/서로 다른 공업탑 프레임 설명은 이전 Archive 단계의 이력이다. 이번 범위는 Visual Refinement와 검증이며 Phase 4는 시작하지 않았다.

환경: Windows / Playwright 1.63.0 Chromium headless / DPR 1 / production `next start :3100`. 기존 구현을 검사한 production build는 `GqLDgQCer7SWnhJKcbFkH`, Intro 국소 수정 후 최종 build는 `0cne2SaUIFiThdeQig5X_`다. 빌드와 브라우저 검사는 겹치지 않았다.

## 결과

| 검사 | 결과 |
|---|---|
| 1280×720 / 1440×900 / 1600×900 / 1920×1080 | Archive 4 PASS + 최종 Intro 4 PASS |
| Intro DOT → RIVER → ULSAN | 중앙 DOT 위치 오차 2px 미만, 18px 이상; 큰 강 선과 제목 등장, 역스크롤 복원 PASS |
| 공업탑 dissolve | hold 중 old/new 프레임 x/y/width/height 차이 및 이전 샘플 대비 이동 1px 미만; 0/.3/.5/.7/1/.5/0 정·역방향 opacity 전환 PASS |
| TODAY fullscreen climax | 네 해상도에서 surface 원점 오차 2px 미만, 폭/높이 viewport 일치; 컬러 reveal와 Dead River 진입 PASS |
| reverse / fast scroll | Archive ±2400 wheel, 처음 복귀 x=0, 전 장면 정·역방향 및 빠른 점프 PASS |
| navigation jump | 네 해상도 CHAPTERS industry/history/dead-river 왕복, focus/active scene PASS; 기존 전체 내비·Back/Forward·Replay PASS |
| resize / reload / reduced motion | Archive 1440/1920 진입 후 1600 resize, 위치 복원, pin 제거, 두 공업탑 세로 읽기 PASS |
| JS 없는 읽기 | 1280×720 / 1440×900 / 320×720 / 640×360, 이미지 원비율 및 가로 넘침 없음 PASS |
| console / runtime error | production 검사에서 0 |
| image 404 | 0; 전체 66 URL HTTP 200 및 bytes 일치 |
| 이미지 무결성 / 콘텐츠 | `npm run validate-content` PASS, 66개 원본·사본·manifest hash 일치 |
| lint / typecheck | Intro 수정 후 모두 PASS, lint 오류·경고 0 |
| production build | Intro 수정 후 PASS, 정적 prerender |
| StrictMode / lifecycle | 최종 코드에서 별도 dev 검사 1 PASS: 3회 profile 전환 후 runtime 1 / ticker 1 / 고유 trigger 14, dispose 후 모두 0 및 pin spacer 0 |

## 실행 구분과 시각 검수

전체 production 검사는 중간 서버 재시작으로 분할했다. 첫 실행에서 Archive 6개와 Core Scroll 1280/1440/1920 3개의 PASS 출력을 확인했다. 재시작 후 동일 build로 완료 결과가 없는 나머지 13개만 실행해 13 PASS(2.0분)를 확인했다. 따라서 22개 production 사례 전체의 결과를 확보했지만, 한 번의 중단 없는 실행에서 22 PASS가 나온 것으로 기록하지 않는다.

자동 검사 통과 후 스크린샷에서 Intro 강 선의 중앙 끊김을 발견했다. `introMotion.ts`의 확대 SVG dash reveal만 연속 stroke + clip reveal로 수정했다. 최종 build에서 `tests/visual-refinement.spec.ts` 네 해상도 4 PASS(57.3초)를 확인했고, 새 1280/1920 RIVER 스크린샷을 직접 열어 중앙 끊김이 사라진 것을 검수했다. 그 외 Archive/Core/Foundation 결과는 이 Intro 국소 수정 직전 결과이며 해당 코드에는 변경이 없다. 별도 dev lifecycle은 최종 코드에서 1 PASS(9.7초).

`.tools/phase3-qa/`의 Intro DOT/RIVER/title, history, 패널, dissolve, fullscreen 스크린샷을 갱신했다. 1280 Intro 제목, 1440 history/dissolve, 1280/1920 fullscreen을 직접 확인했다. Navy/White/Black UI와 Mint 선·점·활성 표시를 유지하며 사진 색상은 보존했다. TODAY는 fullscreen이므로 하단 액션이 사진 위에 표시된다. 이전의 사진/링크 비겹침 기준은 contained 버전에 대한 기록이며 현재 화면에 적용하지 않는다.

## 남은 제한과 종료 범위

TODAY 원본 `울산 야경3.jpg`는 1600×1067이다. 최신 fullscreen 요구에 따른 cover와 1920 폭의 1.2배 확대/세로 크롭을 허용한 화면이며 고해상도 원본이나 DPR 2 선명도를 확보했다는 뜻이 아니다. 다른 기록사진의 원비율 및 원본은 보존했다. 공업탑의 같은 바깥 프레임은 사진 앵글 정합을 뜻하지 않는다.

Safari/Firefox, 물리 트랙패드, 화면낭독기, 실제 200% 브라우저 zoom, DPR 2, GPU/메모리 성능은 이번 검증 범위 밖이다. Source→Upper의 별도 공간 전환은 이전 범위 밖 상태를 유지한다. 요청된 Phase 3 Visual Refinement의 잔여 수정·검증·기록은 완료했으며 Phase 4 작업은 수행하지 않았다.

# Foundation QA — 2026-09-29

## 실행 결과

| 검사 | 결과 |
|---|---|
| npm run typecheck | PASS |
| npm run lint | PASS, 오류/경고 0 |
| npm run build | PASS, / 정적 prerender 생성 |
| npm run validate-content | PASS |
| npx playwright test | PASS, 5 tests / 26.3초 |
| npm ls --depth=0 | PASS, missing/invalid 없음 |

Windows 로컬 환경, production next start 포트 3100, Playwright 1.63.0의 설치된 Chromium을 사용했다. build 중 샌드박스 spawn EPERM은 승인된 동일 build 명령으로 재실행하여 통과했다. 패키지/폰트 다운로드도 샌드박스 ENOTCACHED 이후 승인된 명령으로 실행했다.

## 데이터와 에셋

- 원본 66개, 20,686,753 bytes. 각 원본 SHA-256이 작업 전부터 존재한 manifest와 일치한다.
- 배포 사본 66개도 같은 hash. JPEG 해상도/바이트/파일명/URL 및 부록 A 분류·폭 상한 모두 일치.
- active 36 / reserve 26 / hold 4. 실제 DOM은 active만 표시한다. 보류 자료가 파일 URL로 배포되어 있는 것은 원 명세의 66개 동일 사본 계약에 따른 것으로, UI 노출과 구분한다.
- 모든 이미지 URL을 production 서버에 요청: 66/66 HTTP 200 및 기대 바이트 수 일치.
- 14장면 순서, 7장소, 6회복 milestone, source 참조, 한·영 확정 장면 카피 검사 통과.
- 과거 태화강3 alt는 명세 문구와 일치, capturedAt/visibleCredit null, U04 불확실성 유지. 1996/BOD는 별도 DOM에 표시한다.

## 정적 화면과 접근성

1280×720 / 1440×900 / 320×720 / 640×360에서 JavaScript를 끈 독립 브라우저 context로 확인했다. 640×360은 1280×720의 200% 확대에 해당하는 CSS viewport 대용 검사이며 브라우저 실제 zoom 조작 검사는 아니다.

- 모든 14장면 제목 표시, 단일 h1, 장면 순서 일치.
- 7개 장소 상세를 각각 열어 본문과 공식 링크 접근 가능.
- 제목/본문/사진/상세/링크의 viewport 바깥 또는 내부 가로 넘침 없음.
- 열린 상세를 포함한 모든 사진이 원비율 유지, 원본 폭과 maxCssWidth 이하.
- JS 활성화 시 pageerror/console error 없음, skip link 키보드 포커스와 main 이동, Intro→Source hash 이동 통과.
- reduced-motion에서 Ending 한·영 콘텐츠 유지, Canvas/보류 이미지 DOM 없음.
- 1440px 및 320px Intro 스크린샷 직접 열람. 자동 생성 화면 증거: test-results/foundation-{1280,1440,320,640}.png (재생성 가능, Git 제외).

## 남은 제한

- 브라우저 검증은 Chromium만 실행. Edge/Firefox/Safari, 실제 화면낭독기, axe, 실제 200% zoom은 이번 검사에 포함하지 않았다.
- LCP/CLS/INP, GPU/메모리/왕복 스크롤 성능, 전체 사진의 DPR 2 시각 품질은 Phase 7에서 측정한다. 성능 예산 달성을 주장하지 않는다.
- DPR 2에서 원본 수준 선명도 보장은 원본 가로 폭/2까지다. Foundation은 DPR 1 원본 폭 상한을 적용했으며 업스케일/cover/크롭을 하지 않았다.
- 이미지 오류용 전용 UI 및 모달 실패 복구는 후속 단계. 현재 SSR 문구와 링크는 이미지와 독립적으로 제공되고 사진의 비율 공간은 예약된다.
- 공식 URL 레지스트리는 기존 명세를 보존했다. S04는 기존 resolver에 따라 S05 연혁으로 연결한다. 이번에 외부 15개 링크의 도착 본문을 새로 검증한 것은 아니다.
- 고래는 기존 공용 좌표 기반 정적 placeholder. 강 내비/Loading/모션/가로 아카이브/3D/상호작용 지도는 이번 범위에서 활성화하지 않았다.
- Git 추적 기준점이 없어 Cursor 이력에 대한 diff 복원은 불가능하다. 구현 변경 내역은 IMPLEMENTATION_LOG.md에 기록했다.

# Phase 2 Core Scroll QA — 2026-09-30

Windows 로컬 / Playwright 1.63.0 Chromium / headless / DPR 1. production `next start` 포트 3100, StrictMode 수명 검사는 별도 `next dev`와 NEXT_PUBLIC_SCROLL_DEBUG=1 사용. 서버와 브라우저는 테스트 종료 시 정리한다.

## 수락 기준 검증

| 검사 | 결과 |
|---|---|
| 전체 production 회귀 | 12 PASS, 개발 전용 수명 검사 1 SKIP (별도 dev 실행 PASS) |
| 최종 문구 복원 후 production 재검사 | Foundation 5 PASS / 12.7초 |
| 최종 npm run lint | PASS, 오류/경고 0 |
| 최종 npm run typecheck | PASS |
| 최종 npm run build | PASS, / 정적 prerender 생성 |
| 최종 npm run validate-content | PASS |
| StrictMode / runtime lifecycle | 1 PASS, 3회 reduced↔desktop 재빌드 후 runtime 1, ticker 1, 고유 scene trigger 14; dispose 후 모두 0, pin spacer 0 |
| desktop 전 장면 스크롤 | 1280×720, 1440×900, 1920×1080, 2560×1440 PASS |
| 장면 진행 위치 | 각 해상도 14장면의 p=0/.25/.5/.75/.99, 역순 .5, 장거리 점프 PASS; 경계는 다음 장면 p=0으로 확인 |
| 내비 | 12개 CHAPTERS 링크 focus+Enter, 제목 focus, hash, Back/Forward PASS |
| 복원 | 직접 #source, 중간 위치 reload, resize 후 동일 장면/지역 진행률 오차 .02 미만 PASS |
| Intro / Ending | 시작 링크, 사용자 Replay로 intro/scrollY=0, 엔딩 링크 간격, 영어·한국어 정적 fallback PASS |
| 실제 입력 | wheel 이동, jump 도중 ArrowUp 취소, pointer cursor→Tab native cursor 복귀 PASS |
| Loading | decode 무기한 대기→5초 continue→reduced 읽기, inert 해제 PASS; 직접 hash의 대기 fallback 및 decode reject PASS |
| compact / reduced | 실행 중 설정 전환, 320px CSS viewport, pin spacer 제거 PASS |
| JS 없음 | 1280×720, 1440×900, 320×720, 640×360의 기존 14장면·7상세·가로 넘침·사진 비율 검사 PASS |
| runtime / console error | 전 장면 production 브라우저 검사 0 |
| 이미지 404 | 0; 전체 66 URL HTTP 200 및 기대 bytes 일치 |
| 데이터/원본 무결성 | 원본·사본 66개 SHA-256/규격/manifest/상태 및 카피 검사 PASS |

## 발견 후 수정한 문제

1. 실제 강 내비와 Intro 시작 링크 누락: 기존 registry/scrollToScene에 연결.
2. 모션 profile 전환 후 ResizeObserver의 이전 크기 캐시가 재빌드를 유발하여 Replay 진입 위치를 되돌림: 재빌드 시작 시 캐시 초기화. 실패했던 keyboard/history/replay 테스트 통과.
3. CHAPTERS 목록 클릭을 뒤쪽 강 내비가 가로챔: CHAPTERS z-index 분리. wheel/cursor/cancel/replay-actions 테스트 통과.
4. CSS 파일 선두 BOM이 번들 중간에 남아 첫 selector를 무효화: 17개 CSS의 BOM만 제거. 커서 고정 위치/클릭 투과와 Ending 링크 간격 복구, 스크린샷 확인.
5. 후속 timeline이 없는 사진을 desktop에서 숨김: 기존 사진열을 표시하고 긴 장면은 pin 없이 세로 읽기 유지. Phase 3 효과 미구현.
6. hash 진입 시 critical decode가 끝나지 않을 때 엔진도 대기: 5초 후 읽기 fallback으로 진입.
7. Intro 카피의 이전 예외를 현재 MASTER 우선 요청에 맞춰 복원. 검사기도 명세와 직접 비교하도록 복원.

## 화면 증거와 한계

1440×900의 14개 장면 대표 screenshot 및 Ending actions는 `.tools/phase2-qa/core-*.png`에 보관했다. 14장면 이미지를 직접 열람했고, 최종 엔딩의 링크 간격/물방울 및 강 내비를 확인했다. 긴 미완성 후속 장면은 자연 스크롤 중 화면 위·아래로 콘텐츠가 이어진다. 이를 Phase 3 collage/가로 트랙의 완성 화면이라고 간주하지 않는다.

production 검사에서 console.error/pageerror와 이미지 HTTP 실패는 없었다. 개발 모드에서는 Next Image의 동적 크기 변경/aspect-ratio 및 deep-link LCP 안내 warning이 관찰됐다. 실제 원비율 검사는 통과했으며 이미지 우선순위를 모든 사진으로 확대하지 않았다. Next priority 전달은 설치 문서의 preload API로 교체했다.

최종 빌드의 샌드박스 TypeScript spawn EPERM은 동일 명령을 승인된 실행으로 재시도하여 통과했다. 스크린샷은 전체 회귀 시점의 화면 증거이며 Intro 한국어 문구만 그 후 MASTER 원문으로 복원했다. 마지막 production 재검사와 validate-content는 복원된 코드로 통과했다.

브라우저는 Chromium만 실행했다. Firefox/Edge/Safari, 실제 200% 브라우저 zoom, 스크린리더, 실기기 GPU/프레임 타임/메모리, DPR 2 품질, 외부 공식 링크 도착 내용은 이번에 검증하지 않았다. 640×360은 200%에 해당하는 CSS viewport 대용이다. 성능 예산 달성을 주장하지 않는다. 원본 품질의 DPR 2 보장은 원본 폭/2까지다.

## 단계 경계

Phase 2의 기반 스크롤·내비·Intro/Ending·Loading·커서는 완료. Phase 3 Source 공간 전환, archive collage, Industry horizontal/TODAY/time dissolve는 미착수. Recovery/Garden 애니메이션, 실제 고래/WebGL, Explore 지도/preview/dialog, Night 연출도 후속 범위다. 기존 정적 콘텐츠와 고래 placeholder는 유지했다.

# Phase 3 Archive / Industrialization QA — 2026-09-30

아래는 중단 당시 기록이다. 최종 재개 검증 결과는 문서 끝의 2026-10-01 항목을 우선한다.

Windows / Chromium headless / DPR 1 / production next start, port 3100. Phase 3 테스트는 최초 5 PASS 후 시각 보정 및 이미지 원비율/로딩 검사를 추가하여 다시 실행했다. 테스트 도구 실행의 sandbox spawn EPERM은 승인된 동일 Playwright 명령으로 재실행했다.

| 검사 | 결과 |
|---|---|
| 1280×720 | PASS: history 진입/종료, pin, 전 패널 이동, 첫/끝 경계, TODAY, reverse/fast wheel, overflow |
| 1440×900 | PASS: 위 항목 및 7개 패널 / 공업탑 0/.3/.5/.7/1 상태 스크린샷 |
| 1600×900 | PASS: 동일 항목 |
| 1920×1080 | PASS: 동일 항목 |
| Phase 3 전용 테스트 | 5 PASS, 최종 production 재실행 포함 |
| 기존 Phase 1~2 포함 전체 production 회귀 | 17 PASS / 4.1분, 개발 전용 수명 검사 1 SKIP |
| 별도 development 수명 검사 | 1 PASS / 13.5초, 반복 profile rebuild 후 runtime 1 / ticker 1 / trigger 14; dispose 후 모두 0 |
| 공업탑 | 정방향/역방향 opacity 끝값 확인; 다른 위치·크기의 프레임; grain·프레임 소거·컬러·scale 단계 육안 확인 |
| 이동 거리 | scrollWidth-clientWidth 실측; 마지막 x=-overflow 오차 2px 미만 |
| 첫/마지막 패널 | 각 폭에서 둘 다 viewport 내부. 시작 lead .5H, 마지막 reveal 1.2H + settle .5H 확보 |
| 빠른 입력 | wheel +2400/-2400, 역방향 실제 scrollY 감소 및 처음 복귀 x=0 확인 |
| 세로 복귀 | 마지막 panel 이후 dead-river active scene 확인 |
| resize | 1440→1600, 산업화 중간 위치 진행률 오차 .025 미만 |
| 새로고침 | 산업화 중간 위치 복원, 진행률 오차 .025 미만 |
| keyboard | industry hash 제목 focus → Tab으로 화면 내 SKIP → Enter로 dead-river 제목 focus |
| reduced motion | 모든 pin spacer 제거, history/industry DOM 순서대로 세로 배치, 사진 opacity/transform 복구, 공업탑 두 사진 모두 표시 |
| image | 모든 트랙 이미지 decode 완료/naturalWidth>0, 원본 폭 이하·원비율 오차 .02 미만 |
| console/runtime/HTTP | Phase 3 네 해상도에서 오류 0, image 404 0 |
| body horizontal overflow | 네 해상도 / reduced 모드 모두 0 |
| lint | PASS, 오류/경고 0 |
| typecheck | PASS |
| production build | PASS, / 정적 prerender |
| validate-content | PASS, 원본/복사본 66개 SHA-256 및 manifest 일치. 승인된 시가지3·5 상태 변경만 validator 예외 |

테스트의 추가 이미지 검사에서 HTMLImageElement 타입 단언 누락을 발견했고 수정 후 typecheck/build를 재실행해 통과했다. 앱 runtime 오류는 아니었다.

최종 시각 검토에서 GSAP quickSetter의 복합 `scale` alias가 기대한 확대를 적용하지 않는 점을 발견했다. scaleX/scaleY를 각각 갱신하도록 수정하고 공업탑/TODAY의 최종 matrix scale=1 검증을 추가했다. TODAY 사진과 하단 링크의 겹침도 확인해 사진 상한을 낮추고 비겹침 검사를 추가했다. 새 검사에서 1280/1440/1600의 8–12px 겹침이 남는 것을 확인해 TODAY 패널의 60px 상단 padding을 제거했다. 이후 production build를 다시 통과했다. 전체 17개 회귀 및 dev 수명 검사는 이 국소 setter/이미지 크기 보정 직전 결과다.

중간 재검사 중 build 산출물을 교체해 실행 환경이 바뀐 회차는 1920 pin 검사에서 실패했으므로 최종 결과로 채택하지 않았다. 중단 시점에는 새 production 서버에서 Phase 3 다섯 테스트 재실행이 남아 있었다. 이 항목은 2026-10-01 재개 검증으로 해소했다.

## 화면 확인

`.tools/phase3-qa/`에 네 해상도의 history(.12/.5/.85), industry entry, TODAY, 1440의 모든 패널과 공업탑 전환 스크린샷을 보관했다. 대표 파일을 직접 열어 사진 원비율·negative space·캡션·공업탑 비정합 전환·현대 이미지 상한을 확인했다. 초기 생산 사진의 색 강도를 낮추고 규칙적인 grain 패턴을 미세한 SVG/CSS noise로 교체했다. 새 사진 파생 파일은 없다.

## 한계와 단계 경계

자동 입력은 Playwright wheel 및 키보드다. 실제 물리 트랙패드, Safari/Firefox, 화면낭독기, DPR 2 선명도, 실제 브라우저 200% zoom, GPU/메모리/프레임 타임은 이번 검증에 포함하지 않았다. 성능 예산 달성이나 모든 브라우저 통과를 주장하지 않는다. 원본 저해상도/촬영일/출처 불확실성은 ASSET_AUDIT대로 남아 있다.

최신 요청에 따라 MASTER의 history 6장 대신 시가지2·1·3·5·옛 공업탑 5장, 균일 패널 폭 대신 가변 폭을 사용했다. 공업탑 위치/산업화 순서/거리 공식은 MASTER를 따른다. 역사사진 확대·회전은 적용하지 않았다. ASSET_AUDIT의 이미지 제한 위반 없음. Source의 후속 공간 전환과 Phase 4 이후는 이번에 시작하지 않았다.

# Phase 3 최종 재개 검증 — 2026-10-01

기존 구현과 마지막 scale/TODAY 보정을 보존했다. 중단 당시 build를 대상으로 새 production 서버에서 기존 Archive 5개 검사 모두 통과(2.3분). 이후 발견한 SKIP 링크의 최소 클릭 높이 누락만 44px로 보정하고 production build를 완료했다. 빌드 실행과 브라우저 검사를 겹치지 않았다.

최종 검증 환경: Windows, Playwright Chromium headless, DPR 1, production next start :3100. 이 아래 결과는 접근성 CSS 보정까지 포함한 최종 빌드 기준이다.

| 검사 | 최종 결과 |
|---|---|
| npm run build | PASS, 정적 prerender |
| npm run lint / npm run typecheck | 모두 PASS |
| npm run validate-content | PASS, 66개 원본/사본/manifest 해시 및 콘텐츠 일치 |
| npx playwright test | 18 PASS / 4.1분, 개발 전용 수명 검사 1 SKIP |
| Archive 1280/1440/1600/1920 | 4 PASS, pin/모든 패널/공업탑 정·역방향/TODAY/빠른 wheel/세로 복귀 |
| Archive 접근성 1440/1920 진입 | 2 PASS, 제목 focus→Tab SKIP→Tab 공식 링크→Shift+Tab SKIP→Enter Dead River 제목 focus |
| 클릭 영역·포커스 | SKIP 높이 ≥44px, SKIP/공식 링크 viewport 내부 |
| resize/reload/reduced | 두 접근성 검사에서 1600으로 resize·진행률 복원·reload, reduced 전환 후 pin 제거·DOM 세로 순서·두 공업탑 표시 PASS |
| TODAY·이미지 | 네 해상도에서 하단 링크와 비겹침, 마지막 scale=1, 원비율/원본 폭/이미지 완료/가로 넘침 검사 PASS |
| 기존 Core Scroll | 1280/1440/1920/2560 전 장면 순·역방향 및 점프, keyboard/history/replay, wheel/cursor, loader fallback PASS |
| JS 없는 읽기 | 1280×720, 1440×900, 320×720, 640×360 PASS |
| 런타임/콘솔/HTTP | Archive 네 해상도 오류 0, 기존 manifest URL 검사 PASS |

1920의 history(.5), industry entry, TODAY 스크린샷을 직접 확인했다. 최종 TODAY에서도 사진과 하단 링크가 분리되고 원비율이 유지된다. 네 해상도 archive 증거는 `.tools/phase3-qa/`에 갱신했다.

개발 전용 StrictMode 수명 검사는 이번에 재실행하지 않았다. 이전 PASS 기록을 유지하며, 위 production의 SKIP를 PASS로 계산하지 않는다. 앱 모션/runtime 코드는 이번에 변경하지 않았다.

이번 요청의 Archive / Industrialization 구현 및 로컬 Chromium QA 잔여 작업은 완료했다. 전체 MASTER Phase 3의 Source→Upper 전환은 이전 범위 결정에 따른 미구현 항목으로 유지한다. Phase 4 인계 사항은 IMPLEMENTATION_LOG의 「12. Phase 4 전에 확인해야 할 사항」에 기록했다. 실제 화면낭독기·Safari/Firefox·물리 트랙패드·실제 200% zoom·DPR 2·실기기 성능과 사진 출처/권리 불확실성은 기존 제한 그대로이며, 이번 통과 결과에 포함하지 않는다.

## Phase 4 verification addendum — 2026-10-01

This addendum supersedes the earlier Phase 4 note that browser verification was pending. Chromium Playwright run: `npx.cmd playwright test tests/phase4.spec.ts` — 4/4 passed at 1280x720, 1440x900, 1600x900, and 1920x1080. The scenarios verify the TODAY darkening, undated/unsourced pollution archive image treatment, separate 1996 BOD 11.3 moment, all six Recovery milestones, the current Taehwa 3 to Taehwa 2 image transition, Green Heart frames, Bamboo Walk depth motion, reverse scrolling, chapter navigation, reduced motion, loaded images, and zero page/console/HTTP errors. New checks confirm the Bamboo Walk pointer parallax reaches its expected range and returns to zero with a 250ms transition.

Reviewed Chromium screenshots include TODAY dark, DEAD RIVER, BOD, the six-year sequence, the current-Taehwa transition, garden reveals, and BAMBOO WALK. Verified captures are in `.tools/phase4-qa/` and are local QA artifacts. `npm.cmd run validate-content`, `npm.cmd run lint`, and `npm.cmd run typecheck` pass. The latest production build had already passed before this test-only change. No Phase 5 work was started; Three.js was not used by Phase 4.
Final npm.cmd run build also passes with static prerender of /.

## Continuous Phase 4 journey — 2026-10-01

Ran the whole requested passage as one scroll sweep in Chromium instead of seeking to each scene: TODAY / industry to DEAD RIVER, the 1996 BOD 11.3 moment, RECOVERY and all six river milestones, then GREEN HEART / BAMBOO WALK; then repeated the sweep in reverse. The browser advanced in 90px scroll increments and the test asserted scene order in both directions, TODAY darkening, archive reveal, the BOD moment, each milestone, current-Taehwa 3-to-2 handoff, garden reveal, fully opened Bamboo Walk image/title, and no page, console, or HTTP errors. `npx.cmd playwright test tests/phase4.spec.ts` passes 5/5: four viewport journeys plus the continuous forward/reverse journey. Reviewed continuous captures are `.tools/phase4-qa/1440-continuous-{industry,dead-river,recovery,garden}.png`.
Reverse-pass addendum: the continuous reverse sweep also confirms the Recovery milestones are encountered in exact reverse order (2019 to 1996), both Taehwa current-image frames reappear through the handoff, BOD and the archive return, TODAY saturation restores, and the reverse continuous Chromium test passes.

## Fast-scroll Phase 4 verification — 2026-10-01

Added a real Chromium wheel-fling scenario with rapid 700px wheel inputs from TODAY through DEAD RIVER and RECOVERY into GREEN HEART/BAMBOO WALK, followed by rapid reverse inputs back to TODAY. It checks forward/reverse chapter order, monotonic scroll direction, the garden photograph remains loaded and visible, pin runtime remains active, the TODAY surface restores, viewport width stays contained, and no page/console/HTTP errors occur. Full Phase 4 spec now passes 6/6, including four viewport runs, the continuous round trip, and the fast-wheel round trip.

## River Navigation jump verification — 2026-10-01

From TODAY, used the visible CHAPTERS navigation to jump to RECOVERY, GREEN HEART, and DEAD RIVER. Each jump updates the URL hash, focuses the destination heading, sets the active chapter and current-link state, and moves the SVG river progress in the matching direction; the Recovery river displays the Mint accent. No browser errors occurred. Final Phase 4 Playwright suite: 7/7 passed.

## Mid-scroll refresh verification — 2026-10-01

Reloaded Chromium while parked at the 11.3 BOD moment and again within the Recovery timeline. Both reloads restore the same active scene and progress (within 0.03), keep River Navigation on the restored scene, and restore the same BOD/milestone visual state. Session position persistence and reload restoration passed in the dedicated Phase 4 test.

## Phase 4 body horizontal overflow — 2026-10-01

Checked `body.scrollWidth` and `document.documentElement.scrollWidth` at DEAD RIVER, RECOVERY, and GARDEN across 320x720, 640x360, 1280x720, 1440x900, and 1920x1080 Chromium viewports. No width exceeded the viewport; the dedicated overflow test passes all 15 scene/viewport combinations.

## Phase 4 image 404 verification — 2026-10-01

Explicitly decoded all six Phase 4 images in Chromium: the DEAD RIVER archive photo, current Taehwa 3 and 2 transition images, and National Garden 1, 2, and 4. Each image has a non-zero natural width and URL; no image HTTP 4xx/5xx response or failed image request occurred. Dedicated test passes.

## Console/runtime error verification — 2026-10-01

A dedicated Chromium session monitored `pageerror`, console errors, failed requests, and HTTP error responses while moving through TODAY darkening, DEAD RIVER/BOD, Recovery/current-image transition, BAMBOO WALK, a River Navigation jump, and a mid-scroll refresh. Result: zero runtime errors, console errors, failed requests, or HTTP errors; the dedicated test passes.

## prefers-reduced-motion verification — 2026-10-01

Loaded Phase 4 with Chromium's system `prefers-reduced-motion: reduce` preference set before navigation. Confirmed the reduced profile, zero pin spacers, no enhanced pinned-scrolling class, visible archive/BOD/timeline/garden content, no image depth layers, no horizontal overflow, and zero runtime/console errors. Dedicated test passes.

## Phase 4 keyboard accessibility — 2026-10-01

Used keyboard input only to open the CHAPTERS disclosure, Tab through links to Recovery and Garden, activate Recovery with Enter, and close the menu with Escape. Confirmed the destination heading receives focus and the disclosure returns focus to its summary when closed. Dedicated Chromium keyboard test passes.

## Desktop viewport sweep — 2026-10-01

Re-ran the complete Phase 4 continuous river journey at 1280x720, 1440x900, 1600x900, and 1920x1080 Chromium viewports. All four passed. Reviewed BOD 11.3 and BAMBOO WALK screenshots at 1600 and 1920; composition remains within the viewport and the Bamboo photo/title reveal is intact.
Final `npm.cmd run lint` passes with zero errors and zero warnings after removing one unused test locator.
Final `npm.cmd run typecheck` passes after widening the browser-test visibility helper to accept optional elements; lint remains clean.
Final `npm.cmd run build` passes; the `/` route is statically prerendered.
Final Phase 4 regression run after all test refinements: `npx.cmd playwright test tests/phase4.spec.ts` — 13/13 passed; no unresolved Phase 4 issues found.

## Phase 5 integrated Chromium QA — 2026-10-01

`npx.cmd playwright test tests/phase5.spec.ts` — **5/5 passed** against the production build. Continuous 1440×900 review covered Green Heart/Bamboo → Whale → Jangsaengpo → Port → Sea. The whale canvas mounted and rendered without WebGL/runtime/console errors; scroll scrub showed formation and swim, and the point/line whale remained recognizable. Native wheel forward/reverse movement and River Navigation jump to Whale passed. Canvas pointer events are disabled so scrolling is not intercepted.

All required files decoded in the browser: `태화강 국가정원4.jpg`, `장생포1.jpg`, and `울산항1.jpg` / `울산항2.jpg` / `울산항3.jpg`; no image 404 or HTTP failure was recorded. Document/body horizontal overflow remained zero. Responsive composition/image checks passed at 1280×900, 1600×900, and 1920×900. Under reduced motion, there are no pin spacers or WebGL Canvas; the static whale fallback and Jangsaengpo image remain available. Captures in `.tools/phase5-qa/` were visually reviewed.

Final static checks: lint pass (zero warnings), typecheck pass, production build pass (static `/`), and content/asset integrity validator pass. Phase 5 has no outstanding issue from this verification; no Phase 6 work was started.
The Motion control was also exercised at Whale: system reduced motion removes Canvas and pins; returning to no-preference loads the Canvas, and selecting Reduce Motion from the in-app control removes it again.

## Phase 45 refinement QA — 2026-10-01

Chromium against the existing local Next dev server: `tests/refinement45.spec.ts` initially passed 5/5. Visual review found the large Jangsaengpo title behind the photo; after its layer correction, the affected 1440 integrated journey passed 1/1 and updated 1280×720 / 1600×900 / 1920×900 layout captures passed 3/3. Reviewed video, Dead River/BOD, River seam, Bamboo, whale/crossing, ripple/+ MORE, Jangsaengpo and Port captures in `.tools/refinement45-qa/`.

Verified video decoding/playback and offscreen pause; enlarged archive retained behind BOD; monotonically continuing single River path at the pin boundary; forward/reverse and fast wheel inputs; River Navigation with heading focus; full-bleed Jangsaengpo and unclipped title/body at all four widths; hovered ripple and + MORE; keyboard activation of the preserved link (destination request intercepted for deterministic QA); system reduced motion with no pins/Canvas/video download; removed motion button and official-information captions; no document/body horizontal overflow. Integrated monitoring recorded zero page/console errors or HTTP ≥400 responses. Three/R3F emits an upstream THREE.Clock deprecation warning; no GPU profiling or multi-browser claim is made.

Final lint: PASS with the pre-existing installed Collection Surfer img-element warning (0 errors, 1 warning). Typecheck: PASS after typing the Three texture image dimensions. Production build: PASS, static `/`. The full historical suite was not rerun because the focused refinement scenarios cover the changed behavior.

Remaining requirement: actual whale-video motion/hybrid cannot be implemented or verified because `assets/video` contains only `태화강 영상.mp4`; recursive media inventory found no whale video. Procedural whale and engraved crossing remain available. Refinement is therefore partially complete; Phase 6 remains untouched.

## Phase 45 final Global UI / Motion QA — 2026-10-01

Supersedes the preceding missing-whale-video status. Fresh filesystem inventory found `고래.mp4`; source/public SHA-256 match, Chromium decoded 1280×720 / 10.005s. Inspected the original frame: engraving-based whale animation, rather than wildlife footage. The actual asset is now scroll-scrubbed, masked and monochrome across Whale → Jangsaengpo; forward/reverse seek checks confirm frame movement and restoration, with one video instance and offscreen pause.

Final `ULSAN_TEST_EXTERNAL=1 npx.cmd playwright test tests/refinement45.spec.ts`: **5/5 PASS** on local Next development server :3100. 1440×900 integration checks Intro/ULSAN → Taehwa video → Source; absence of Upper Stream video; enlarged Dead River retained behind BOD explanation; monotonic shared river through Recovery; Green Heart/Bamboo → Whale → Jangsaengpo → Port; unboxed CHAPTERS; no reduced-motion button/FOLLOW; global pointer ripple responses in all 14 scenes; + MORE hover and keyboard activation with original URL; reverse/fast wheel; navigation heading focus; BOD mid-scroll reload restoration; one primary WebGL Canvas; no horizontal overflow or page/console/HTTP errors. Keyboard official-link destination is intercepted for deterministic QA, not an external-page content audit.

1280×720 / 1600×900 / 1920×900 layout regressions passed, including all Jangsaengpo title/Korean/English text bounds and BOD compositions. Visually reviewed final captures in `.tools/refinement45-qa/`. After final crop cleanup, a focused Chromium check confirmed viewport-width Intro video, nontransparent rendered ripple pixels and pointer-events:none. OS reduced motion keeps readable content and keyboard photo links, with no Canvas, pinning or video source/download.

Final static checks, each executed once: lint PASS (0 errors, 1 pre-existing installed Collection Surfer img-element warning); typecheck PASS; production build PASS (static `/`). Existing Next image advisory and upstream THREE.Clock deprecation warnings remain; no runtime/hydration errors were recorded. Hardware GPU/FPS profiling and other browsers were not tested. Phase 6 remains untouched.

## Final Whale → Jangsaengpo verification — 2026-10-01

`ULSAN_TEST_EXTERNAL=1 npx.cmd playwright test tests/whale-transition.spec.ts`: **5/5 PASS** on the existing local Next dev server :3000. Supersedes the previous hybrid whale and reduced-motion-video behavior: no procedural/SVG whale or whale WebGL Canvas remains; the actual video is the only subject, with a paused still in reduced/reading mode.

1440×900 continuous chapter review: GREEN HEART → distant/approaching whale → very close body → complete foreground conceal at the Jangsaengpo seam → rightward pass → full-bleed Jangsaengpo with delayed title/description → PORT. Verified increasing depth/scale with restrained early horizontal movement, constant video-layer opacity through exit, actual video frame movement and reverse restoration, smooth native-scroll transform samples, fast-wheel round trip, no abstract whale DOM or hidden WebGL Canvas, one whale video, unobstructed pointer events and preserved Global Ripple beneath the main subject. No page/console/HTTP errors or body/document horizontal overflow.

1280×720, 1600×900 and 1920×900 regressions passed; inspected approach/conceal and fully revealed text/image captures. Reduced-motion cold load and live OS preference round trip preserve one actual-video still, content and zero pins/Canvas, without runtime errors. Evidence is `.tools/whale-final-qa/`. The original 1280×720 video remains soft during the intentional brief body-filling crop; no artificial sharpening or external media was used.

Final lint: PASS, 0 errors and the existing Collection Surfer img-element warning. Final typecheck/build: PASS after correcting the HTMLElement query type; production `/` statically prerendered. GPU hardware/FPS profiling and other browsers are outside this verification. No known blocking transition defect in tested paths; other scenes and Phase 6 were not changed.

## Whale native playback / complete Jangsaengpo exit QA — 2026-10-01

Supersedes previous scroll-seek/zoom assertions. `ULSAN_TEST_EXTERNAL=1 npx.cmd playwright test tests/whale-transition.spec.ts`: 5/5 PASS on existing Next dev server :3000. Final smoothing adjustment: affected 1440 test PASS again. Evidence: `.tools/whale-native-qa/`.

1440×900: verified one decoded video, full-viewport bounds at multiple scroll positions, unchanged transform/object-fit, no radial mask, constant 0.8 playback rate, advancing time while scroll is stationary, zero scroll-induced seeking events, and the same DOM video element across forward/reverse scene navigation. Confirmed source-led motion and coordinated rightward wipe, delayed Jangsaengpo typography, full-bleed photograph, all title/Korean/English text bounds, actual next composition already behind the departing layer, and Jangsaengpo wrapper x >= viewport width at exit completion. Reverse/fast-wheel paths, pointer-events:none and retained Global Ripple checked. No page errors, console errors, HTTP >=400 responses or horizontal overflow. No procedural whale or hidden WebGL Canvas.

1280×720, 1600×900 and 1920×900 regression scenarios passed, including native playback/frame stability, Jangsaengpo text bounds, right exit and reverse restoration. Reduced-motion cold load retains accessible reading content and a paused source poster with no pinning or Canvas. Screenshots visually reviewed. Original source/public video hashes match.

Final static checks, each once: lint PASS (0 errors, 1 existing Collection Surfer img warning); typecheck PASS; production build PASS (static `/`). No blocking defect observed in tested paths. The supplied animation includes a baked engraving background and is not natural ocean footage; color treatment cannot remove that background. Fast scroll may bypass the source's exact close-pass frame, by design, while preserving the composition transition. Hardware GPU/FPS profiling and other browsers were not tested. Phase 6 was not started.

## Componentry Global Ripple QA — 2026-10-01

Final focused Chromium global/Whale 1440 tests: 2/2 PASS on :3000. One installed ImageRippleEffect WebGL Canvas replaces the 2D layer. Verified window-pointer response, active wave expiry/idle stop, pointer-events:none, working CHAPTERS keyboard focus/navigation, reduced-motion unmount/remount without duplicate Canvas, and resize bounds at 1280/1920. Actual displacement and output GPU pixels were sampled during debugging; the visible low-contrast Navy/Mint crests were reviewed against black, then GPU readback diagnostics removed. Captures: .tools/global-componentry-qa/. The global mode is a transparent brush overlay and does not distort underlying DOM content.

Existing Whale/Jangsaengpo 1440 regression passed: fixed fullscreen native video, continuous playback, full-bleed image/text, full right exit, reverse/fast scroll, no horizontal overflow, no page/console/HTTP errors. Final lint PASS (0 errors, existing Collection Surfer img warning), typecheck PASS, production build PASS (static /). Hardware GPU/FPS profiling not performed. Phase 6 remains unstarted.

## Actual pixel/content displacement QA — 2026-10-01

Supersedes the overlay-only Global Ripple result. Final global-ripple Chromium suite passed 4/4 (1440 plus 1280×720 / 1600×900 / 1920×900); final stronger 1440 test passed again. Browser-composited backdrop pixels are displaced by the installed Componentry displacement field, not by translating DOM elements. Cropped PNG comparisons measured changed white glyph edges at all six requested text targets and verified unchanged element bounds and recovery after waves expired. Final examples: ULSAN 3542 moved glyph-edge pixels; 11.3 4647; FLOWING AGAIN 6581; CHAPTERS 455. Reviewed before/after captures in .tools/content-distortion-qa/.

Actual photos, Explore disclosure photographs and plain background highlights verified. Isolated same-frame video comparisons changed 21930 Whale pixels and 10951 Taehwa pixels; native playback was restored after QA-only frame holding. A separate photograph/background boundary comparison changed 4207 pixels and visibly curved the straight image edge. + MORE remains above distortion and its existing official URL opens through a real mouse click (destination intercepted only for deterministic QA). CHAPTERS, native Explore disclosure, River Navigation, fast/reverse wheel and reduced-motion live round trip passed. Exactly one low-resolution WebGL map Canvas, no old Whale Canvas/duplicate video. No page, console, HTTP, hydration or WebGL errors observed in monitored scenarios. Collection Surfer source is unchanged; it is currently not mounted, so no live collection UI claim is made.

Full-viewport backdrop processing initially cost 29–51ms mean frames at wider widths. Restricting composition to live wave bounds reduced active headless means to 16.9ms / 16.5ms / 17.0ms at 1280/1600/1920, p95 25.4ms / 24.4ms / 24.4ms. Simulation/map work is capped 30Hz and max 512px width; idle/hidden work is skipped. These are short Chromium headless observations, not hardware FPS guarantees. SVG backdrop-reference behavior is not interoperable: Chrome/Edge are enabled, Safari/Firefox keep readable undistorted content. No multi-browser quality claim.

Final lint PASS (0 errors, 1 existing Collection Surfer img warning), typecheck PASS, production build PASS (static /), each executed once after implementation. Other scenes, Phase 6 and all existing navigation/video timelines were left unchanged.

## Phase 6 integrated QA — 2026-10-01

Chromium scenarios passed at 1440×900, 1280×720, 1600×900 and 1920×900, plus reduced motion. Continuous Garden/Bamboo → Whale → Jangsaengpo → Port → To The Sea → Explore checked with screenshots in .tools/phase6-qa/. Bamboo mask reverses without a scale reset; Whale starts softly with a fixed fullscreen frame and one continuously playing video (.8 rate), with zero additional seek events during scroll. Jangsaengpo remains full-bleed and centered while its mask opens; the actual Port inner stays at y=0 behind it. Port starts at opacity 1 and recedes into negative space. Explore has seven centered depth planes and one selected official image link; all seven selections, arrows/keyboard, actual official-link click, reverse/fast wheel, CHAPTERS, River Navigation and mid-scroll refresh passed. No horizontal overflow or monitored HTTP/page/console/hydration/WebGL errors in the final scenarios.

Explore pointer QA measured actual typography glyph-edge migration (9656 pixels) and image displacement (87644 changed pixels), followed by filter expiry/restoration. The existing wave graphic and content displacement still use the same unmodified field. Exactly one global map Canvas; no duplicate Whale video or wheel trap. Short active headless frame mean at 1440 was 16.4ms; this is not hardware GPU profiling. Wider layouts were inspected for center alignment and selected-copy bounds.

QA caught and corrected reduced-motion first-load hydration differences by using an identical server/initial-client snapshot. The final 1440 and reduced-motion scenarios were rerun and passed after that correction; 1280/1600/1920 regression scenarios also passed. The navigation probe was corrected to use the River rail in Garden, where the existing design exposes it, rather than Sea, where it is intentionally hidden. Older Whale/global-ripple assertions were updated for the new mask handoff and live collection instead of the retired slide/disclosure UI.

Final static checks executed once: lint PASS (0 errors, existing @next/next/no-img-element warning in collection-surfer.tsx:286, original variant only); typecheck PASS; production build PASS (static /). Existing Three.Clock deprecation and development LCP guidance were left unchanged. Existing Chrome/Edge-only global backdrop distortion fallback and the supplied Whale video's baked background remain limitations; other browsers and hardware GPU profiling were not tested. Night/Ending redesign was not started.
