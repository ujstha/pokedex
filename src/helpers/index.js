import { POKEMON_IMAGE_ANIMATED_URL, POKEMON_IMAGE_BASE_URL, POKEMON_SPECIES_URL } from '../constants'

export * from './fetchPokemon'

export const toLowerCase = (string) => string.toLowerCase()

export const getPokemonImageURL = (id) => `${POKEMON_IMAGE_BASE_URL}/${id}.png`

export const getPokemonAnimatedImageURL = (id) => `${POKEMON_IMAGE_ANIMATED_URL}/${id}.gif`

export const increaseImageHeightInPx = (height, increment) => `${height * increment}px`

export const formatString = (str, splitter = '-') => {
  let splitStr = str.toLowerCase().split(splitter);
  return splitStr.join(' ');
}

export const filterIdFromSpeciesURL = (url) => {
  return url.replace(`${POKEMON_SPECIES_URL}/`, '').replace('/', '');
};

