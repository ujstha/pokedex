import { POKEMON_IMAGE_ANIMATED_URL, POKEMON_IMAGE_BASE_URL, POKEMON_STAT_NAMES } from '../constants'

export * from './fetchPokemon'

export const toLowerCase = (string) => string.toLowerCase()

export const getPokemonImageURL = (id) => `${POKEMON_IMAGE_BASE_URL}/${id}.png`

export const getPokemonAnimatedImageURL = (id) => `${POKEMON_IMAGE_ANIMATED_URL}/${id}.gif`

export const increaseImageHeightInPx = (height, increment) => `${height * increment}px`

export const formatString = (str, splitter = '-') => {
  let splitStr = str.toLowerCase().split(splitter);
  return splitStr.join(' ');
}

export const fetchData = async (url) => {
  const response = await fetch(url)
  const responseAsJson = await response.json()

  return responseAsJson
}

export const filterIdFromSpeciesURL = (url) => {
  return url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
};


export const extractAbilities = (abilities = []) => {
  let extractedAbilities = []
  abilities.map(({ ability }) => extractedAbilities.push(formatString(ability.name)))

  return extractedAbilities
}

export const extractEvolutionChain = (evolutionChain) => {
  let extractedChain = []
  const { chain } = evolutionChain

  extractedChain.push({ id: filterIdFromSpeciesURL(chain.species.url), name: chain.species.name, level: null })

  if (chain.evolves_to.length > 0) {
    extractedChain.push({ id: filterIdFromSpeciesURL(chain.evolves_to[0].species.url), name: chain.evolves_to[0].species.name, level: chain.evolves_to[0].evolution_details[0].min_level })
  }

  if (chain.evolves_to[0].evolves_to.length > 0) {
    extractedChain.push({ id: filterIdFromSpeciesURL(chain.evolves_to[0].evolves_to[0].species.url), name: chain.evolves_to[0].evolves_to[0].species.name, level: chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level })
  }

  return extractedChain
}

export const extractTypes = (types) => {
  let extractedTypes = []
  types.map(({ type }) => extractedTypes.push(formatString(type.name)))

  return extractedTypes
}

export const extractStats = (stats) => {
  let extractedStats = []
  stats.map(({ base_stat, stat: { name } }) => extractedStats.push({ name: POKEMON_STAT_NAMES[name], base_stat }))

  return extractedStats
}

export const extractDescription = (species) => {
  let desc = species.flavor_text_entries.filter(item => item.language.name === 'en').map(item => item.flavor_text)[0]
  return formatString(desc).replace('', ' ').split('.')
}