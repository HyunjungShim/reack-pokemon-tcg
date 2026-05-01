
import { ExtendedCard } from "../types/pokemon/card-types";
import altArts from "../data/alternate-arts.json";

const POKE_IMAGE_API_URL = process.env.REACT_APP_POKE_IMAGE_API_URL;

export const setCardProperties = (card: ExtendedCard) => {
    let { id, rarity, variants , subTypes } = card;
    let seriesName = id.split('-')[0];
    let cardNumber = id.split('-')[1];
    // common => common
    // default options
    // glare mask x

    // Reverse Holo non-rares 

    // 1. common reverse holo
    // style-
    // filter:brightness(.7) contrast(1.5);
    // glare mask o
    // glareMaskMode: 'luminance'

    // 2. uncommon reverse holo
    // style-
    // filter:brightness(.7) contrast(1.5);
    // glare mask o
    // glareMaskMode: 'luminance'

    // 3. rare holo
    // style-
    //filter: brightness(.6) contrast(3);
    // glare-mask-mode="luminance"
    // glare-mask-composite="exclude"
    // shadow
    // shadow-blur={60}
    // blend-mode="overlay
    // glare-intensity={4}
    // glare-hue={270}
    let isShiny = cardNumber.startsWith('sv');
    let isGallery = !!cardNumber.match(/^[tg]g/i);
    let isAlternate = altArts.includes(id) && !isShiny && !isGallery;
    let isPromo = seriesName == 'swshp';
    let isReverse = variants?.reverse == true;

    let formattedRarity = () => {
        if (isReverse) {
            return rarity + " Reverse Holo"
        }
        if (isGallery) {
            if (rarity.startsWith("Trainer Gallery")) {
                return rarity.replace(/Trainer Gallery\s*/, "");
            }
            if (rarity.includes("Rare Holo V") && subTypes?.includes("VMAX")) {
                return "Rare Holo VMAX";
            }
            if (rarity.includes("Rare Holo V") && subTypes?.includes("VSTAR")) {
                return "Rare Holo VSTAR";
            }
        }

        if (isPromo) {
            if (id === "swshp-SWSH076" || id === "swshp-SWSH077") {
                return "Rare Secret";
            } else if (subTypes?.includes("V")) {
                return "Rare Holo V";
            } else if (subTypes?.includes("V-UNION")) {
                return "Rare Holo VUNION";
            } else if (subTypes?.includes("VMAX")) {
                return "Rare Holo VMAX";
            } else if (subTypes?.includes("VSTAR")) {
                return "Rare Holo VSTAR";
            } else if (subTypes?.includes("Radiant")) {
                return "Radiant Rare";
            }
        }
        return rarity;
    }
}
// glare-mask : url(https://poke-holo.b-cdn.net/foils/${seriesName}/masks/upscaled/${cardNumber}_foil_holo_reverse_2x.webp), url(https://poke-holo.b-cdn.net/foils/${seriesName}/foils/upscaled/${cardNumber}_foil_holo_reverse_2x.webp)