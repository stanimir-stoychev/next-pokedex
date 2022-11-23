import PokeApi from 'pokedex-promise-v2';

export type { NamedAPIResource, NamedAPIResourceList, Pokemon, Stat } from 'pokedex-promise-v2';
export type PokedexListEndpointOptions = {
    limit: number;
    offset: number;
};

export const Pokedex = new PokeApi();
