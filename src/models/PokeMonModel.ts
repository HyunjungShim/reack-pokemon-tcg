import TCGdex, { Card, SerieList, SerieResume, Set } from '@tcgdex/sdk'
import { ExtendedCard, VariantDetailed } from '../types/pokemon/card-types';
import { handleSDK } from '../utils/handleFetch';
import { PokemonAPIParams, PokemonAPIResponse } from '../types/pokemon/api-types';

export default class PokeMonModel {
    tcgdex: TCGdex | null = null;
    allSeries: SerieList = [];
    eachSeries: SerieResume[] = [];
    // allSets: Set<SetResume> = new Set();
    eachSets: Map<string, Set> = new Map();
    eachCards: Map<string, Card> = new Map();
    params: PokemonAPIParams = {
        sdk: this.tcgdex,
        options: {
            type: '',
            id: undefined
        }
    }
    constructor(){
        this.tcgdex = null;
    }
    async initTCGdex() {
        if(this.tcgdex) return;
        this.tcgdex = new TCGdex('en');
        this.params.sdk = this.tcgdex;
    }
    async handleDataFetch(type: 'series' | 'sets' | 'cards', id?: string){
        if(!this.tcgdex) {
            await this.initTCGdex();
        }
        this.params = {
            ...this.params,
            options:{
                type,
                id
            }
        }
        const { response, error } = await handleSDK(this.params);
        if(error) {
            console.error(error);
            return;
        }
        return response;
    }
    async getAllSeries(){
        const response = await this.handleDataFetch('series');
        // if(response.error) {
        //     console.error(response.error);
        //     return;
        // }
        this.allSeries = response as SerieList;
        return this.allSeries;
    }
    async getIndividualSeries(id: string){
        const response = await this.handleDataFetch('series', id);
        this.eachSeries = response as SerieResume[];
        return this.eachSeries;
    }
    async getIndividualSet(id: string){
        const response = await this.handleDataFetch('sets', id);
        this.eachSets.set(id, response as Set);
        return this.eachSets.get(id);
    }
    // async getEachSeries
}