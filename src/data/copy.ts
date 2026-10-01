/**
 * Locked bilingual copy — MASTER_BUILD_SPEC §7.
 * Do not invent slogans, stats, or place lists beyond this registry.
 */
import type { Localized, SceneId } from './types';

export type SceneCopy = {
  id: SceneId | 'loading';
  title: Localized;
  body: Localized;
};

export const sceneCopy: SceneCopy[] = [
  {
    id: 'loading',
    title: { ko: '물길을 준비하고 있습니다.', en: 'PREPARING THE JOURNEY.' },
    body: { ko: '', en: '' },
  },
  {
    id: 'intro',
    title: { ko: '울산', en: 'ULSAN' },
    body: {
      ko: '강을 따라, 시간을 따라, 울산을 만나다.',
      en: "FOLLOW THE RIVER THROUGH ULSAN'S TIME.",
    },
  },
  {
    id: 'source',
    title: { ko: '돌에 새겨진 바다.', en: 'THE SEA CARVED IN STONE.' },
    body: {
      ko: '수천 년 전, 사람들은 바위 위에 자신들이 바라본 동물과 사냥의 모습을 남겼다. 그 안에는 고래와 배, 그리고 고래잡이의 과정까지 기록되어 있다.',
      en: 'Thousands of years ago, people carved the animals they saw and scenes of hunting into rock. Whales, boats and whaling scenes remain in these images.',
    },
  },
  {
    id: 'upper-stream',
    title: {
      ko: '모든 것은 물길에서 시작되었다.',
      en: 'EVERYTHING BEGAN WITH THE RIVER.',
    },
    body: {
      ko: '숲과 바위 사이를 흐르는 물길을 따라, 도시의 시간을 향해 나아간다.',
      en: 'Follow the water through forests and rocks, toward the unfolding story of the city.',
    },
  },
  {
    id: 'history',
    title: {
      ko: '강 곁에 도시가 있었다.',
      en: 'A CITY LIVED BESIDE THE RIVER.',
    },
    body: {
      ko: '사람들은 강 곁에 모여 살고, 오가고, 일했다. 남겨진 사진 속에서 도시의 일상이 이어진다.',
      en: 'People lived, travelled and worked beside the river. Their everyday lives continue in the photographs they left behind.',
    },
  },
  {
    id: 'industry',
    title: { ko: '산업도시의 시작.', en: 'THE INDUSTRIAL CITY BEGINS.' },
    body: {
      ko: '1962년 1월 27일, 울산은 특정공업지구로 지정됐다. 같은 해 6월 울산시로 승격된 뒤, 자동차·조선·석유화학을 중심으로 산업도시로 성장했다.',
      en: 'Ulsan was designated a special industrial district on January 27, 1962. It became a city that June and grew around automobile manufacturing, shipbuilding and petrochemicals.',
    },
  },
  {
    id: 'dead-river',
    title: {
      ko: '성장의 뒤편에서, 강은 숨을 잃어갔다.',
      en: 'WHILE THE CITY GREW, THE RIVER FADED.',
    },
    body: {
      ko: '산업화와 도시화가 빠르게 진행되면서 태화강의 수질은 악화됐다. 1996년 기록된 BOD는 11.3 mg/L였다.',
      en: 'Rapid industrialization and urban growth put pressure on the Taehwa River. Its recorded BOD reached 11.3 mg/L in 1996.',
    },
  },
  {
    id: 'recovery',
    title: { ko: '다시 흐르기 시작하다.', en: 'FLOWING AGAIN.' },
    body: {
      ko: '2004년 에코폴리스 울산 선언과 2005년 태화강 마스터플랜을 거치며 강을 되살리는 노력이 이어졌다. 수질이 개선되고, 강은 다시 생명을 품기 시작했다.',
      en: "The 2004 Ecopolis Ulsan declaration and the 2005 Taehwa River Master Plan marked steps in the river's recovery. Water quality improved, and life began to return.",
    },
  },
  {
    id: 'garden',
    title: {
      ko: '강은 다시 도시의 중심이 되었다.',
      en: 'THE RIVER RETURNED TO THE CITY.',
    },
    body: {
      ko: '2019년 대한민국 제2호 국가정원으로 지정된 태화강. 태화지구와 삼호지구에 걸친 정원은 강과 도시의 일상을 잇는다.',
      en: "Designated Korea's second national garden in 2019, the Taehwa River garden spans the Taehwa and Samho districts, connecting the river with everyday city life.",
    },
  },
  {
    id: 'whale',
    title: {
      ko: '고래는 울산의 시간 속에서 계속 헤엄쳐 왔다.',
      en: "THE WHALE SWIMS THROUGH ULSAN'S TIME.",
    },
    body: {
      ko: '바위에 남은 선은 고래의 형상이 되어, 서로 다른 시대의 울산을 연결한다.',
      en: "Lines left in stone take the shape of a whale, connecting different chapters of Ulsan's history.",
    },
  },
  {
    id: 'jangsaengpo',
    title: {
      ko: '고래의 기억이 머무는 곳.',
      en: 'WHERE THE MEMORY OF WHALES REMAINS.',
    },
    body: {
      ko: '장생포는 한국 포경산업의 주요 장소였다. 오늘날 고래문화마을은 1960~70년대 장생포의 생활상을 재현하며, 고래와 도시의 관계를 돌아보게 한다.',
      en: "Jangsaengpo was a major centre of Korea's whaling industry. Today, the Whale Culture Village recreates local life in the 1960s and 1970s and invites reflection on the city's relationship with whales.",
    },
  },
  {
    id: 'sea',
    title: {
      ko: '강은 결국 바다와 만난다.',
      en: 'THE RIVER MEETS THE SEA.',
    },
    body: {
      ko: '항만을 지나, 시선은 열린 바다로 향한다.',
      en: 'Beyond the port, the view opens toward the sea.',
    },
  },
  {
    id: 'explore',
    title: {
      ko: '이제, 당신의 울산을 만날 시간.',
      en: 'EXPLORE ULSAN.',
    },
    body: {
      ko: '산과 강, 도시와 바다 사이에서 다음 장소를 골라보세요.',
      en: 'Choose your next place among the mountains, river, city and sea.',
    },
  },
  {
    id: 'night',
    title: {
      ko: '밤에도, 강은 흐른다.',
      en: 'THE RIVER FLOWS THROUGH THE NIGHT.',
    },
    body: {
      ko: '도시의 불빛 아래에서 울산의 시간은 이어진다.',
      en: "Beneath the city lights, Ulsan's story continues.",
    },
  },
  {
    id: 'ending',
    title: { ko: '강은 계속 흐른다.', en: 'THE RIVER CONTINUES.' },
    body: { ko: '울산도 계속 변한다.', en: 'AND SO DOES ULSAN.' },
  },
];

export const uiCopy = {
  scrollToExplore: { ko: '스크롤하여 이동', en: 'SCROLL TO EXPLORE' },
  more: { ko: '+ MORE', en: '+ MORE' },
  close: { ko: '닫기', en: 'CLOSE' },
  selectPlace: { ko: '지도에서 선택', en: 'SELECT A PLACE' },
  previousImage: { ko: '이전 사진', en: 'PREVIOUS IMAGE' },
  nextImage: { ko: '다음 사진', en: 'NEXT IMAGE' },
  imageLoading: { ko: '사진 준비 중', en: 'IMAGE LOADING' },
  imageUnavailable: {
    ko: '이미지를 불러오지 못했습니다.',
    en: 'IMAGE UNAVAILABLE',
  },
  chapters: { ko: '장면 이동', en: 'CHAPTERS' },
  reduceMotion: { ko: '모션 줄이기', en: 'REDUCE MOTION' },
  enableMotion: { ko: '모션 켜기', en: 'ENABLE MOTION' },
  startJourney: { ko: '이야기 시작', en: 'START THE JOURNEY' },
  skipToContent: { ko: '본문으로 건너뛰기', en: 'SKIP TO CONTENT' },
  continueViewing: { ko: '계속 보기', en: 'CONTINUE' },
  continueToNight: { ko: '밤의 울산으로', en: 'CONTINUE TO NIGHT' },
  replay: { ko: '다시 흐르기', en: 'REPLAY' },
  exploreUlsan: { ko: '울산 더 둘러보기', en: 'EXPLORE ULSAN' },
  skipArchive: { ko: '산업 아카이브 건너뛰기', en: 'SKIP ARCHIVE' },
  officialInfoKorean: {
    ko: '공식 정보(한국어)',
    en: 'OFFICIAL INFORMATION (KOREAN)',
  },
} as const satisfies Record<string, Localized>;

export const sourceFactRow: Localized[] = [
  { ko: '약 312점의 그림', en: 'AROUND 312 FIGURES' },
  { ko: '약 20여 종의 동물', en: 'AROUND 20 ANIMAL SPECIES' },
  { ko: '최소 7종의 고래', en: 'AT LEAST 7 WHALE SPECIES' },
  {
    ko: '반구천의 암각화 · 2025 세계유산 등재',
    en: 'PETROGLYPHS ALONG THE BANGUCHEON STREAM · INSCRIBED IN 2025',
  },
];

export const historyCaptions: { assetId: string; caption: Localized }[] = [
  { assetId: 'old-city-2', caption: { ko: '옛 시가지', en: 'THE OLD CITY' } },
  { assetId: 'old-city-1', caption: { ko: '시장과 사람', en: 'A MARKET AND ITS PEOPLE' } },
  { assetId: 'old-city-3', caption: { ko: '공업축제', en: 'INDUSTRIAL FESTIVAL' } },
  { assetId: 'old-city-5', caption: { ko: '넓은 평지와 낮은 산', en: 'OPEN FIELDS AND LOW HILLS' } },
  { assetId: 'old-tower', caption: { ko: '산업도시의 상징', en: 'A SYMBOL OF INDUSTRY' } },
];

export const copyBySceneId = Object.fromEntries(
  sceneCopy.map((c) => [c.id, c]),
) as Record<SceneCopy['id'], SceneCopy>;
