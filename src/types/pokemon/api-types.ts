import TCGdex from "@tcgdex/sdk";

export interface PokemonAPIParams {
    sdk: TCGdex | null;
    options: { 
        type: string, 
        id?: string 
    };
}

export interface PokemonAPIResponse<T> {
    response: T | null;
    error: Error | null;
}