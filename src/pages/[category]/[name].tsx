import { _Urls } from "@/api/_Urls";
import { useFetch } from "@/api/hooks/useFetch";
import { Card } from "@/components";
import GridContainer from "@/components/GridContainer/GridContainer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface PokemonTypes {
  pokemon: { name: string; url: string };
  slot: number;
}

const Name = () => {
  const { query } = useRouter();
  console.log(query);
  const [pokemon, setPokemon] = useState<PokemonTypes[]>([]);
  const { data } = useFetch<any>(
    query.name ? `${_Urls.root}/${query.category}/${query.name}` : ""
  );

  console.log(data?.pokemon);

  useEffect(() => {
    if (data) {
      setPokemon(data?.pokemon);
    }
  }, [data]);

  return (
    <GridContainer>
      {pokemon?.map((item) => {
        return <Card>{item.pokemon.name}</Card>;
      })}
    </GridContainer>
  );
};

export default Name;
