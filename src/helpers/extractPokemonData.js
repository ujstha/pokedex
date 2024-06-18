import { filterIdFromSpeciesURL, formatString } from ".";
import { POKEMON_STAT_NAMES } from "../constants";

export const extractAbilities = (abilities = []) => {
  let extractedAbilities = [];
  abilities.map(({ ability }) =>
    extractedAbilities.push(formatString(ability.name)),
  );

  return extractedAbilities;
};

export const extractEvolutionChain = (evolutionChain) => {
  let extractedChain = [];
  const { chain } = evolutionChain;

  const pushEvoData = (evo) => {
    return extractedChain.push({
      id: filterIdFromSpeciesURL(evo.species.url),
      name: evo.species.name,
    });
  };

  pushEvoData(chain);

  if (chain.evolves_to.length > 0) {
    pushEvoData(chain?.evolves_to[0]);
  }

  if (chain.evolves_to[0].evolves_to.length > 0) {
    pushEvoData(chain?.evolves_to[0]?.evolves_to[0]);
  }

  return extractedChain;
};

export const extractTypes = (types) => {
  let extractedTypes = [];
  types.map(({ type }) => extractedTypes.push(formatString(type.name)));

  return extractedTypes;
};

export const extractStats = (stats) => {
  let extractedStats = [];
  stats.map(({ base_stat, stat: { name } }) =>
    extractedStats.push({ name: POKEMON_STAT_NAMES[name], base_stat }),
  );

  return extractedStats;
};

export const extractDescription = (species) => {
  let desc = species.flavor_text_entries
    .filter((item) => item.language.name === "en")
    .map((item) => item.flavor_text)[0];
  return desc.replace("", " ");
};
