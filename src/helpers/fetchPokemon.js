import { POKEMON_TYPES_URL, POKEMON_URL } from "../constants"


let pokemons = []

const fetchAllTypes = async () => {
  for (let i = 0; i < 18; i++) {
    let response = await fetch(`${POKEMON_TYPES_URL}/${i + 1}`)
    let responseAsJson = await response.json()

    const pokemonInType = responseAsJson.pokemon

    for (let j = 0; j < pokemonInType.length; j++) {
      const pokemonId = pokemonInType[j].pokemon.url.replace(`${POKEMON_URL}/`, '').replace('/', '');

      if (pokemonId <= pokemons.length && pokemons[pokemonId]) {
        pokemons[pokemonId - 1].types.push(responseAsJson.name);
      };
    };
  };
}

export const fetchAllPokemons = async () => {
  let response = await fetch(`${POKEMON_URL}?limit=1026&offset=0`);
  let responseAsJson = await response.json();

  for (let i = 0; i < responseAsJson.results.length; i++) {
    pokemons.push({
      id: i + 1,
      name: responseAsJson.results[i].name,
      types: []
    });
  };

  await fetchAllTypes()

  return pokemons.splice(0, 1025)
}
