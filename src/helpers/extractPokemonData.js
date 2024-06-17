import { filterIdFromSpeciesURL, formatString } from "."
import { POKEMON_STAT_NAMES } from "../constants"

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