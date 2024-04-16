interface abilities {
  ability: {
    name: string;
    url: string;
  };
}

interface species {
  name: string;
}

interface stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonInfoType {
  abilities: abilities[];
  species: species;
  stats: stats[];
  name: string;
}

export type { abilities, species, stats, PokemonInfoType };
