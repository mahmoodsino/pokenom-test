import { _Urls } from "@/api/_Urls";
import { useFetch } from "@/api/hooks/useFetch";
import { Card } from "@/components";
import PokemonInformation from "@/components/modal/PokemonInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface PokemonTypes {
  pokemon: { name: string; url: string };
  slot: number;
}

interface chartDataType {
  options: {};
  series: number[];
  labels: string[];
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 20px;
  padding: 20px;
`;

const NamePage = () => {
  const { query } = useRouter();
  const [pokemon, setPokemon] = useState<PokemonTypes[]>([]);
  const { data } = useFetch<any>(
    query.name ? `${_Urls.root}/${query.category}/${query.name}` : ""
  );
  const [selectedUrl, setSelectedUrl] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (data) {
      setPokemon(data?.pokemon);
    }
  }, [data]);

  if (pokemon?.length == 0) {
    return <div>No Pokemon </div>;
  }
  if (isClient) {
    return (
      <>
        <PokemonInformation url={selectedUrl} setSelectedUrl={setSelectedUrl} />
        <GridContainer>
          {pokemon?.map((item) => {
            return (
              <div onClick={() => setSelectedUrl(item.pokemon.url)}>
                <Card>{item.pokemon.name}</Card>
              </div>
            );
          })}
        </GridContainer>
      </>
    );
  }
};

export { NamePage };
