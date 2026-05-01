import {
    createBrowserRouter,
    Outlet,
} from "react-router-dom";
import SelectSeries from "../views/SelectSeries";
import App from "../App";
import DefaultLayout from "../views/DefaultLayout";
import PokemonScreen from "../views/PokemonScreen";
import PokeMonModel from "../models/PokeMonModel";

const pokemonModel = new PokeMonModel();

const router = createBrowserRouter([
    {
        path: "/",
        element:
            (
                <DefaultLayout>
                    <Outlet />
                </DefaultLayout>
            ),
        children: [
            {
                index: true,
                element: <App />,
            },
            {
                path: "/pokemon",
                element: <PokemonScreen pokemonModel={pokemonModel} />,
                children : [
                    {
                        path:"series",
                        element: <SelectSeries />,
                    }
                ]
            },
        ],
    },
]);

export default router;