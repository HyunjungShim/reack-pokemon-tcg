/**
 * TCGdex `rarity` 문자열 → 화면용 짧은 표기 (커뮤니티/한국에서 흔한 약어 위주).
 * 공식 표준이 아니며, 필요하면 수정해 쓰면 됨.
 * 매핑 없으면 `fallback`으로 원문 반환.
 */

const ABBREV: Record<string, string> = {
  common: "C",
  uncommon: "U",
  rare: "R",
  "holo rare": "HR",
  "rare holo": "RH",
  "ultra rare": "UR",
  "secret rare": "SR",
  "double rare": "RR",
  "illustration rare": "AR",
  "special illustration rare": "SAR",
  "holo rare v": "V",
  "holo rare vmax": "VMAX",
  "holo rare vstar": "VSTAR",
  "amazing rare": "A",
  "radiant rare": "K", // Radiant
  "shiny rare": "Shiny",
  "shiny rare v": "SV",
  "shiny rare vmax": "SVMAX",
  "shiny ultra rare": "SUR",
  "hyper rare": "HyR", // 골드 Hyper 등 (Holo Rare HR과 구분)
  "mega hyper rare": "MHR",
  "ace spec rare": "ACE",
  "full art trainer": "FA",
  "classic collection": "CC",
  "black white rare": "BW",
  "rare prime": "Prime",
  "rare holo lv.x": "LV.X",
  legend: "LEGEND",
  none: "—",
  // Pocket (기호 대신 짧은 글자)
  "one diamond": "♦1",
  "two diamond": "♦2",
  "three diamond": "♦3",
  "four diamond": "♦4",
  "one star": "★1",
  "two star": "★2",
  "three star": "★3",
  crown: "♔",
  "one shiny": "✦1",
  "two shiny": "✦2",
};

function norm(s: string): string {
  return s.trim().toLowerCase();
}

/**
 * @param rarity TCGdex 카드의 `rarity`
 * @param fallback 매핑 없을 때: `'original'`이면 원문, 아니면 해당 문자열로 표시
 */
export function getRarityAbbrev(
  rarity: string | undefined | null,
  fallback: "original" | string = "original"
): string {
  if (rarity == null || rarity === "") return "";
  const key = norm(rarity);
  if (ABBREV[key]) return ABBREV[key];
  return fallback === "original" ? rarity : fallback;
}
