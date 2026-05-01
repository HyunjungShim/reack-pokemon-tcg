import TCGdex from "@tcgdex/sdk";
import { PokemonAPIParams, PokemonAPIResponse } from "../types/pokemon/api-types";

export const handleFetch = async <T>(url: string): Promise<T | null> => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const handleSDK = async <T>(params: PokemonAPIParams): Promise<PokemonAPIResponse<T | null>> => {
    try {
        const { sdk, options } = params;
        const { type, id } = options;
        if(!sdk) throw new Error('SDK is not initialized');
        
        let response;

        switch (type) {
            case "series":
                response = id ? await sdk.serie.get(id) : await sdk.serie.list();
                break;
            case "sets":
                response = id && (await sdk.set.get(id));
                break;
            case "cards":
                response = id && (await sdk.card.get(id));
                break;
            default:
                throw new Error(`Unsupported sdk type: ${type}`);
        }

        return { response: response as T | null, error: null };
    } catch (error) {
        console.error(error);
        return { response: null, error: error as Error };
    }
}