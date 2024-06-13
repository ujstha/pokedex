import { POKEMON_IMAGE_BASE_URL } from '../constants'

export * from './fetchPokemon'

export const toLowerCase = (string) => string.toLowerCase()

export const getPokemonImageURL = (id) => `${POKEMON_IMAGE_BASE_URL}/${id}.png`