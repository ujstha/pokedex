import {
  extractAbilities,
  extractDescription,
  extractEvolutionChain,
  extractStats,
  extractTypes,
} from "./extractPokemonData";
import {
  POKEMON_SPECIES_URL,
  POKEMON_TYPES_URL,
  POKEMON_URL,
} from "../constants";
import { formatString } from ".";

let pokemons = [];

export const fetchData = async (url) => {
  const response = await fetch(url);
  const responseAsJson = await response.json();

  return responseAsJson;
};

const fetchAllTypes = async () => {
  for (let i = 0; i < 18; i++) {
    let responseAsJson = await fetchData(`${POKEMON_TYPES_URL}/${i + 1}`);

    const pokemonInType = responseAsJson.pokemon;

    for (let j = 0; j < pokemonInType.length; j++) {
      const pokemonId = pokemonInType[j].pokemon.url
        .replace(`${POKEMON_URL}/`, "")
        .replace("/", "");

      if (pokemonId <= pokemons.length && pokemons[pokemonId]) {
        pokemons[pokemonId - 1].types.push(responseAsJson.name);
      }
    }
  }
};

export const fetchAllPokemons = async () => {
  let responseAsJson = await fetchData(`${POKEMON_URL}?limit=1026&offset=0`);

  for (let i = 0; i < responseAsJson.results.length; i++) {
    pokemons.push({
      id: i + 1,
      name: responseAsJson.results[i].name,
      types: [],
    });
  }

  await fetchAllTypes();

  return pokemons.splice(0, 1025);
};

export const fetchPokemonById = async (id) => {
  let pokemon = await fetchData(`${POKEMON_URL}/${id}`);
  let pokemonSpecies = await fetchData(`${POKEMON_SPECIES_URL}/${id}`);
  let evolutionChain = await fetchData(pokemonSpecies.evolution_chain.url);

  const name = formatString(pokemon?.name);
  const height = `${pokemon?.height / 10}m`; // convert height from decimeter to meter
  const weight = `${pokemon?.weight / 10}kg`; // convert weight from decigram to kilogram
  const evolution_chain = extractEvolutionChain(evolutionChain);
  const abilities = extractAbilities(pokemon?.abilities);
  const types = extractTypes(pokemon?.types);
  const stats = extractStats(pokemon?.stats);
  const description = extractDescription(pokemonSpecies);

  return {
    id,
    name,
    height,
    weight,
    evolution_chain,
    abilities,
    types,
    stats,
    description,
  };
};
