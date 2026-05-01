/**
 * 희귀도별 “대략적인” 확률 힌트.
 * - Pocket: 가이드/커뮤니티에 정리된 Regular 팩 기준(초기 세트·밸런스 패치로 변동 가능).
 * - 실물 TCG: 세트·제품마다 슬롯 구조가 달라 단일 수치로 고정 불가 → notes 위주.
 */
export type RarityPullHint = {
  /** Regular 부스터 1팩을 열었을 때, 해당 희귀도 등급이 “최소 한 번” 등장할 대략적 확률 (0~1). Pocket 전용 의미. */
  chanceInRegularPack?: number | null;
  /** Pocket 레어 팩(일명 갓팩)에서 슬롯 1장이 해당 등급일 때의 대략 확률 (0~1). */
  chancePerSlotInRarePack?: number | null;
  game: "pocket" | "physical" | "both" | "unknown";
  notes: string;
  /** 수치 출처 요약 (앱 패치 시 갱신 필요) */
  sourceNote?: string;
};
