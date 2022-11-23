import PokeApi from 'pokedex-promise-v2';

export type {
    NamedAPIResource,
    NamedAPIResourceList,
    Pokemon,
    PokemonType,
    StatElement,
    Stat,
} from 'pokedex-promise-v2';
export type PokedexListEndpointOptions = {
    limit: number;
    offset: number;
};

export const Pokedex = new PokeApi();
