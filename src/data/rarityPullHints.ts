import type { RarityPullHint } from "../types/pokemon/rarity-pull-hint";

/**
 * TCGdex `rarities` 등에서 오는 문자열과 매칭 (대소문자 무시).
 * Pocket 수치: Regular 팩 기준 “해당 등급이 팩에 등장할 대략 확률”은
 * Wargamer / Shacknews 등에 정리된 초기 Offering Rates 재구성값(2024년 전후).
 * - 앱 업데이트·세트 추가 시 인게임 “Offering Rates”가 기준.
 *
 * 실물 TCG: 동일 문자열이라도 세트(SV, SWSH 등)마다 슬롯·박스 구성이 다름 →
 * 여기서는 참고용 notes만 제공. 티어별 수치는 Rip or Flip 등 세트 단위 API 권장.
 *
 * @see https://www.wargamer.com/pokemon-tcg-pocket/rarity
 * @see http://www.shacknews.com/article/142035/pokemon-trading-card-game-pocket-card-drop-chance-rate
 */

const HINTS: Record<string, RarityPullHint> = {
  "ace spec rare": {
    game: "physical",
    notes:
      "ACE SPEC 등급. 실물 TCG 세트·제품별로 슬롯이 다릅니다. 세트별 공개 확률 또는 Rip or Flip 등을 참고하세요.",
    sourceNote: "세트 의존",
  },
  "amazing rare": {
    game: "physical",
    notes:
      "Amazing Rare는 시리즈·세트별 삽입률이 다릅니다. 단일 %로 고정할 수 없습니다.",
    sourceNote: "세트 의존",
  },
  "black white rare": {
    game: "physical",
    notes: "BW 시대 희귀도 표기. 세트별 상이.",
    sourceNote: "세트 의존",
  },
  "classic collection": {
    game: "physical",
    notes: "클래식 컬렉션 삽입 카드. 세트·제품별 비율이 다릅니다.",
    sourceNote: "세트 의존",
  },
  common: {
    game: "physical",
    notes:
      "실물 TCG에서 흔한 베이스 레어. 팩당 복수 장·세트마다 장수 다름. ‘한 장’ 확률은 카드 풀에 따라 다름.",
    sourceNote: "세트 의존",
  },
  crown: {
    game: "pocket",
    chanceInRegularPack: 0.002,
    chancePerSlotInRarePack: 0.05263,
    notes:
      "Pocket Crown. Regular 팩에서 팩당 ‘해당 등급이 나올’ 대략 확률은 가이드 표 기준. 레어 팩 시 슬롯당 약 5.26%(가이드별 상이).",
    sourceNote: "Wargamer/Shacknews 요약, 인게임 확인 권장",
  },
  "double rare": {
    game: "both",
    notes:
      "실물(SV 등) Double Rare와 Pocket Four Diamond(EX) 표기가 혼동되기 쉬움. API에서 실제 세트(tcgp vs swsh 등)로 구분해 해석하세요.",
    sourceNote: "문맥 의존",
  },
  "four diamond": {
    game: "pocket",
    chanceInRegularPack: 0.0822,
    notes:
      "Pocket Four Diamonds (EX 등). Regular 팩 ‘등장’ 대략 ~8.2%(가이드 합산).",
    sourceNote: "Wargamer 등",
  },
  "full art trainer": {
    game: "physical",
    notes: "풀아트 서포터 등. 세트별 Illustration/Special illustration 슬롯과 연동, %는 세트별.",
    sourceNote: "세트 의존",
  },
  "holo rare": {
    game: "physical",
    notes: "홀로 레어. 시대·세트별로 슬롯 보장 방식이 다름.",
    sourceNote: "세트 의존",
  },
  "holo rare v": {
    game: "physical",
    notes: "V 카드. 세트별 Ultra/Double Rare 슬롯과 연동.",
    sourceNote: "세트 의존",
  },
  "holo rare vmax": {
    game: "physical",
    notes: "VMAX. 세트별 상이.",
    sourceNote: "세트 의존",
  },
  "holo rare vstar": {
    game: "physical",
    notes: "VSTAR. 세트별 상이.",
    sourceNote: "세트 의존",
  },
  "hyper rare": {
    game: "physical",
    notes: "골드 등 Hyper Rare. 일반적으로 낮은 슬롯 확률, 세트별 상이.",
    sourceNote: "세트 의존",
  },
  "illustration rare": {
    game: "physical",
    notes:
      "SV Illustration Rare 등. 커뮤니티에서 팩당 티어 히트 ~1/15~1/20 수준으로 자주 인용되나 세트별로 다름.",
    sourceNote: "세트·Rip or Flip 예시값 참고",
  },
  legend: {
    game: "physical",
    notes: "LEGEND 카드. 시대·세트별.",
    sourceNote: "세트 의존",
  },
  "mega hyper rare": {
    game: "physical",
    notes: "Mega Hyper Rare. 최신 세트 규칙·슬롯 확인 필요.",
    sourceNote: "세트 의존",
  },
  none: {
    game: "unknown",
    chanceInRegularPack: null,
    notes: "희귀도 없음/미분류. 확률 적용 없음.",
  },
  "one diamond": {
    game: "pocket",
    chanceInRegularPack: 1,
    notes:
      "Pocket One Diamond. 슬롯 1~3은 해당 등급 고정에 가깝게 나와 ‘팩에 포함’은 사실상 100%.",
    sourceNote: "Wargamer 등",
  },
  "one shiny": {
    game: "pocket",
    notes:
      "Pocket Shiny 계열(추가 메타). 수치는 앱 Offering Rates·최신 가이드로 확인.",
    sourceNote: "패치·세트별 변동",
  },
  "one star": {
    game: "pocket",
    chanceInRegularPack: 0.126,
    chancePerSlotInRarePack: 0.42105,
    notes:
      "Pocket One Star(Illustration 등). Regular 팩 합산 ~12.6%. 레어 팩 슬롯당 ~42%(가이드별 상이).",
    sourceNote: "Wargamer 등",
  },
  "radiant rare": {
    game: "physical",
    notes: "Radiant Rare. 세트별 삽입.",
    sourceNote: "세트 의존",
  },
  rare: {
    game: "physical",
    notes:
      "일반 Rare. 세트·시대별로 레어 슬롯 보장 방식이 다름(예: 레어+ 한 장 등).",
    sourceNote: "세트 의존",
  },
  "rare holo": {
    game: "physical",
    notes: "Rare Holo(구 시리즈). 세트별.",
    sourceNote: "세트 의존",
  },
  "rare holo lv.x": {
    game: "physical",
    notes: "LV.X 시대. 세트별.",
    sourceNote: "세트 의존",
  },
  "rare prime": {
    game: "physical",
    notes: "PRIME. 세트별.",
    sourceNote: "세트 의존",
  },
  "secret rare": {
    game: "physical",
    notes:
      "Secret Rare. 세트마다 번호·슬롯이 다르고 확률은 매우 낮음. 세트 단위 자료 권장.",
    sourceNote: "세트 의존",
  },
  "shiny ultra rare": {
    game: "physical",
    notes: "Shiny Ultra Rare 등. 세트별.",
    sourceNote: "세트 의존",
  },
  "shiny rare": {
    game: "physical",
    notes: "Shiny Rare. 세트별.",
    sourceNote: "세트 의존",
  },
  "shiny rare v": {
    game: "physical",
    notes: "Shiny Rare V. 세트별.",
    sourceNote: "세트 의존",
  },
  "shiny rare vmax": {
    game: "physical",
    notes: "Shiny Rare VMAX. 세트별.",
    sourceNote: "세트 의존",
  },
  "special illustration rare": {
    game: "physical",
    notes:
      "SIR. Illustration Rare보다 낮은 티어로 자주 분류되나 세트·슬롯마다 다름.",
    sourceNote: "세트 의존",
  },
  "three diamond": {
    game: "pocket",
    chanceInRegularPack: 0.24,
    notes: "Pocket Three Diamonds (홀로급). Regular 팩 합산 ~24%.",
    sourceNote: "Wargamer 등",
  },
  "three star": {
    game: "pocket",
    chanceInRegularPack: 0.011,
    chancePerSlotInRarePack: 0.05263,
    notes:
      "Pocket Three Stars(Immersive 등). Regular ~1.1%. 레어 팩 슬롯당 ~5.26%(가이드별).",
    sourceNote: "Wargamer 등",
  },
  "two diamond": {
    game: "pocket",
    chanceInRegularPack: 0.96,
    notes: "Pocket Two Diamonds. 슬롯 4·5 가중으로 팩에 거의 항상 등장.",
    sourceNote: "Wargamer 등",
  },
  "two shiny": {
    game: "pocket",
    notes: "Pocket Two Shiny. 수치는 앱 Offering Rates 기준.",
    sourceNote: "패치·세트별 변동",
  },
  "two star": {
    game: "pocket",
    chanceInRegularPack: 0.0249,
    chancePerSlotInRarePack: 0.47368,
    notes:
      "Pocket Two Stars. Regular ~2.5%. 레어 팩 슬롯당 ~47%(가이드별).",
    sourceNote: "Wargamer 등",
  },
  "ultra rare": {
    game: "physical",
    notes:
      "Ultra Rare(구 시리즈·세트 혼용). 실물에서는 세트별로 V/VMAX/풀아트 등과 매핑이 다름.",
    sourceNote: "세트 의존",
  },
  uncommon: {
    game: "physical",
    notes: "언커먼. 실물 팩 구조상 다수 포함, 특정 카드 1장 확률은 풀 크기에 따름.",
    sourceNote: "세트 의존",
  },
};

function normalizeRarityKey(rarity: string): string {
  return rarity.trim().toLowerCase();
}

export function getRarityPullHint(rarity: string | undefined | null): RarityPullHint | null {
  if (rarity == null || String(rarity).trim() === "") return null;
  return HINTS[normalizeRarityKey(rarity)] ?? null;
}

export function listKnownRarityKeys(): string[] {
  return Object.keys(HINTS).sort();
}
