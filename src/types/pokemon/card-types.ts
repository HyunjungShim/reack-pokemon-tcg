import { Card } from "@tcgdex/sdk";

export type VariantDetailed = {
    type: string;
    size: string;
};
export type ExtendedCard = Card & {
    variants_detailed?: VariantDetailed[];
    rarity_class?: string;
    classType?: string;
    subTypes?: string;
};
  