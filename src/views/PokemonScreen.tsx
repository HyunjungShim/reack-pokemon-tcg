import PokeMonModel from '../models/PokeMonModel';
import { Outlet } from 'react-router-dom';

type PokemonScreenProps = {
    pokemonModel: PokeMonModel;
};

export type PokemonOutletContext = PokemonScreenProps;

export default function PokemonScreen({ pokemonModel }: PokemonScreenProps) {
    return (
        <div className="pokemon-screen">
            <Outlet context={{ pokemonModel }} />
        </div>
    )
}