/**
 * Explore places — MASTER_BUILD_SPEC §9.
 * mapPoint values are schematic design coordinates, not lat/lng.
 */
import type { Place } from './types';

export const places: Place[] = [
  {
    id: 'bangucheon',
    name: { ko: '반구대 암각화', en: 'Bangudae Petroglyphs' },
    mapPoint: [410, 220],
    location: {
      ko: '울산 울주군 언양읍 대곡리',
      en: 'Daegok-ri, Eonyang-eup, Ulju-gun, Ulsan',
    },
    type: { ko: '선사유산', en: 'PREHISTORIC HERITAGE' },
    description: {
      ko: '대곡천 절벽에 남은 동물과 사냥의 기록. 반구천의 암각화는 2025년 세계유산에 등재됐다.',
      en: 'Animal figures and hunting scenes remain on the cliffs beside Daegokcheon. The Petroglyphs along the Bangucheon Stream were inscribed as World Heritage in 2025.',
    },
    highlight: {
      ko: '바위에 남은 고래와 배의 기록.',
      en: 'Whales and boats recorded in stone.',
    },
    visit: {
      ko: '관람 방법과 현장 안내는 공식 정보를 확인하세요.',
      en: 'Check the official information for viewing guidance and site access.',
    },
    assetIds: ['bangudae-3', 'bangudae-2'],
    sourceId: 'S01',
  },
  {
    id: 'taehwa',
    name: { ko: '태화강 국가정원', en: 'Taehwa River National Garden' },
    mapPoint: [650, 355],
    location: {
      ko: '울산 태화지구·삼호지구',
      en: 'Taehwa and Samho districts, Ulsan',
    },
    type: { ko: '강·정원', en: 'RIVER & GARDEN' },
    description: {
      ko: '강과 대숲, 정원의 산책로가 도시의 일상을 잇는 공간. 2019년 대한민국 제2호 국가정원으로 지정됐다.',
      en: "Riverbanks, bamboo groves and garden paths connect with everyday city life. Designated Korea's second national garden in 2019.",
    },
    highlight: {
      ko: '물길과 대숲 사이를 걷는 시간.',
      en: 'A walk between the river and bamboo groves.',
    },
    visit: {
      ko: '구역별 안내와 이용 정보를 공식 페이지에서 확인하세요.',
      en: 'Check the official page for garden areas and visitor information.',
    },
    assetIds: ['garden-1', 'garden-2', 'garden-4'],
    sourceId: 'S06',
  },
  {
    id: 'jangsaengpo',
    name: { ko: '장생포', en: 'Jangsaengpo' },
    mapPoint: [765, 465],
    location: {
      ko: '울산 남구 장생포',
      en: 'Jangsaengpo, Nam-gu, Ulsan',
    },
    type: {
      ko: '고래 문화·지역의 기억',
      en: 'WHALE CULTURE & LOCAL HISTORY',
    },
    description: {
      ko: '포경의 역사와 오늘의 고래 문화가 만나는 곳. 고래문화마을은 1960~70년대 장생포 생활상을 재현한다.',
      en: 'A place to reflect on whaling history and whale culture today. The Whale Culture Village recreates local life in the 1960s and 1970s.',
    },
    highlight: {
      ko: '고래와 도시의 관계 돌아보기.',
      en: 'Reflect on the relationship between whales and the city.',
    },
    visit: {
      ko: '시설별 운영시간과 관람 정보를 공식 페이지에서 확인하세요.',
      en: 'Check official opening hours and visitor information for each facility.',
    },
    assetIds: ['jangsaengpo-1'],
    sourceId: 'S07',
  },
  {
    id: 'daewangam',
    name: { ko: '대왕암공원', en: 'Daewangam Park' },
    mapPoint: [900, 415],
    location: {
      ko: '울산 동구 일산동',
      en: 'Ilsan-dong, Dong-gu, Ulsan',
    },
    type: { ko: '해안공원', en: 'COASTAL PARK' },
    description: {
      ko: '소나무 숲과 바위 해안을 따라 바다를 만나는 공원. 해안 산책로와 울기등대가 풍경을 잇는다.',
      en: 'A park where pine woods meet a rocky coast. Coastal paths and Ulgi Lighthouse connect the landscape.',
    },
    highlight: {
      ko: '바위 해안과 바다를 향한 산책.',
      en: 'Walk toward the sea along a rocky shore.',
    },
    visit: {
      ko: '시설 운영과 통제 여부는 공식 안내를 확인하세요.',
      en: 'Check official notices for facility access and closures.',
    },
    assetIds: ['daewangam-1', 'daewangam-2', 'daewangam-3'],
    sourceId: 'S08',
  },
  {
    id: 'ganjeolgot',
    name: { ko: '간절곶', en: 'Ganjeolgot' },
    mapPoint: [760, 675],
    location: {
      ko: '울산 울주군 서생면',
      en: 'Seosaeng-myeon, Ulju-gun, Ulsan',
    },
    type: { ko: '해안·전망', en: 'COAST & OPEN VIEWS' },
    description: {
      ko: '넓은 하늘과 바다를 향해 열린 해안 공원. 등대와 산책로를 따라 수평선을 바라본다.',
      en: 'A coastal park open to wide skies and the sea. Follow the lighthouse and walking paths toward the horizon.',
    },
    highlight: {
      ko: '수평선을 바라보는 여유.',
      en: 'Time to take in the horizon.',
    },
    visit: {
      ko: '방문 안내와 현장 정보를 공식 페이지에서 확인하세요.',
      en: 'Check the official page for visitor guidance and local information.',
    },
    assetIds: ['ganjeolgot-3', 'ganjeolgot-1', 'ganjeolgot-2'],
    sourceId: 'S09',
  },
  {
    id: 'ganwoljae',
    name: { ko: '간월재', en: 'Ganwoljae' },
    mapPoint: [170, 405],
    location: {
      ko: '울산 울주군 영남알프스 일대',
      en: 'Yeongnam Alps area, Ulju-gun, Ulsan',
    },
    type: { ko: '산·능선', en: 'MOUNTAINS & RIDGES' },
    description: {
      ko: '산의 능선과 열린 초지를 만나는 영남알프스의 고개. 도시와 다른 속도로 풍경을 바라본다.',
      en: 'A mountain saddle in the Yeongnam Alps, surrounded by ridgelines and open grassland. Experience the landscape at a different pace.',
    },
    highlight: {
      ko: '능선 위에서 만나는 넓은 풍경.',
      en: 'Open views from the ridge.',
    },
    visit: {
      ko: '탐방로와 기상·출입 정보를 확인한 뒤 방문하세요.',
      en: 'Check trail guidance, weather and access information before visiting.',
    },
    assetIds: ['ganwoljae-1', 'ganwoljae-2'],
    sourceId: 'S10',
  },
  {
    id: 'seongnamsa',
    name: { ko: '석남사', en: 'Seongnamsa Temple' },
    mapPoint: [190, 190],
    location: {
      ko: '울산 울주군 상북면',
      en: 'Sangbuk-myeon, Ulju-gun, Ulsan',
    },
    type: { ko: '사찰·숲', en: 'TEMPLE & FOREST' },
    description: {
      ko: '가지산 자락, 숲과 사찰의 공간이 이어지는 곳. 문과 마당, 숲길 사이에서 조용한 시간을 만난다.',
      en: 'At the foot of Gajisan, temple spaces meet the forest. Find a quieter rhythm among gates, courtyards and woodland paths.',
    },
    highlight: {
      ko: '산과 건축 사이의 고요.',
      en: 'Quiet moments between mountain and architecture.',
    },
    visit: {
      ko: '관람 안내를 확인하고 사찰의 예절을 지켜주세요.',
      en: 'Check visitor guidance and respect temple etiquette.',
    },
    assetIds: ['seongnamsa-1', 'seongnamsa-2', 'seongnamsa-3', 'seongnamsa-4'],
    sourceId: 'S11',
  },
];

export const placesById = Object.fromEntries(places.map((p) => [p.id, p])) as Record<
  Place['id'],
  Place
>;

/** Explore map viewBox — schematic, not geographic */
export const EXPLORE_MAP_VIEWBOX = { width: 1000, height: 760 } as const;
