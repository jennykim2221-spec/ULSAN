/**
 * Official +MORE URL registry — MASTER_BUILD_SPEC §10.2
 * Checked as of 2026-09-29. S04 may fail; use S05 fallback.
 */
import type { OfficialSource } from './types';

export const sources: OfficialSource[] = [
  {
    id: 'S01',
    purpose: '반구대 공식 설명',
    url: 'https://ulsan.go.kr/s/bangucheonpetroglyphs/contents.ulsan?mId=001001002000000000',
    statusNote: '본문 확인',
  },
  {
    id: 'S02',
    purpose: 'UNESCO 등재',
    url: 'https://whc.unesco.org/en/list/1740/',
    statusNote: '본문 확인',
  },
  {
    id: 'S03',
    purpose: '국가기록원 산업단지 역사',
    url: 'https://theme.archives.go.kr/next/industry/special1960.do',
    statusNote: '검색 본문 확인',
  },
  {
    id: 'S04',
    purpose: '태화강 살리기',
    url: 'https://www.ulsan.go.kr/s/garden/contents.ulsan?mId=001005003003000000',
    fallbackId: 'S05',
    statusNote: '재접속 필요, fallback S05',
  },
  {
    id: 'S05',
    purpose: '국가정원 연혁',
    url: 'https://ulsan.go.kr/s/garden/contents.ulsan?mId=001001007000000000',
    statusNote: '본문 확인; S04 fallback',
  },
  {
    id: 'S06',
    purpose: '국가정원 소개·면적',
    url: 'https://garden.koagi.or.kr/cpage/garden/national/Detail.do?garden_id=NTG00002',
    statusNote: '본문 확인',
  },
  {
    id: 'S07',
    purpose: '고래문화마을',
    url: 'https://tour.ulsan.go.kr/tour/kor/unit/attrctn/view.ulsan?mId=001002001000000000&unqId=123',
    statusNote: '본문 확인',
  },
  {
    id: 'S08',
    purpose: '대왕암공원',
    url: 'https://tour.ulsan.go.kr/tour/kor/unit/attrctn/view.ulsan?mId=001002001000000000&unqId=27',
    statusNote: '검색 본문 확인',
  },
  {
    id: 'S09',
    purpose: '간절곶',
    url: 'https://tour.ulsan.go.kr/tour/korean/unit/attrctn/view.ulsan?mId=001001000000000000&unqId=14',
    statusNote: '공식 추천코스에서 링크 확인',
  },
  {
    id: 'S10',
    purpose: '간월산·간월재',
    url: 'https://tour.ulsan.go.kr/tour/korean/unit/attrctn/view.ulsan?mId=001001000000000000&unqId=2',
    statusNote: '검색 본문 확인',
  },
  {
    id: 'S11',
    purpose: '석남사',
    url: 'https://tour.ulsan.go.kr/tour/kor/unit/attrctn/view.ulsan?mId=001002001000000000&unqId=20',
    statusNote: '검색 본문 확인',
  },
  {
    id: 'S12',
    purpose: '울산문화원 자료 연표',
    url: 'https://www.ulsanmunhwa.com/download/write_02.pdf',
    statusNote: '검색 추출 확인',
  },
  {
    id: 'S13',
    purpose: '울산시 웹진 공업탑',
    url: 'https://webzine.ulsan.go.kr/contents/view.do?bbsId=BBSMSTR_000000000180&nttId=15454',
    statusNote: '본문 확인',
  },
  {
    id: 'S14',
    purpose: '국회도서관 수록 정책자료의 태화강 수질',
    url: 'https://clik.nanet.go.kr/clikr-collection/policyinfo/50/217/1900/CLIKC404944214241373_attach_1.pdf',
    statusNote: '검색 추출 확인, 원 측정자료 아님',
  },
  {
    id: 'S15',
    purpose: '공유마당 수록 태화강 생태관광지역 지정 자료',
    url: 'https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?menuNo=200019&wrtSn=12158437',
    statusNote: '검색 본문 확인',
  },
];

export const sourcesById = Object.fromEntries(sources.map((s) => [s.id, s])) as Record<
  string,
  OfficialSource
>;

/** Resolve preferred URL with S04→S05 fallback preference for dead-river / recovery */
export function resolveSourceUrl(id: string): { href: string; labelId: string } {
  const source = sourcesById[id];
  if (!source) {
    throw new Error(`Unknown source id: ${id}`);
  }
  if (id === 'S04' && source.fallbackId) {
    const fallback = sourcesById[source.fallbackId];
    return { href: fallback.url, labelId: fallback.id };
  }
  return { href: source.url, labelId: source.id };
}

/** Scene → default +MORE mapping from §10.2 */
export const sceneMoreSource: Partial<Record<string, string>> = {
  source: 'S01',
  industry: 'S03',
  'dead-river': 'S04',
  recovery: 'S04',
  garden: 'S06',
  jangsaengpo: 'S07',
};
