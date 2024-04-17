import { _Urls } from "@/api/_Urls";
import { useFetch } from "@/api/hooks/useFetch";
import { Card } from "@/components";
import Loading from "@/components/loader/Loading";
import dynamic from "next/dynamic";
import Link from "next/link";
const PokemonInformation = dynamic(() => import("../../modal/PokemonInfo"), {
  ssr: false,
});
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface PokemonTypes {
  pokemon: { name: string; url: string };
  slot: number;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 20px;
  padding: 20px;
`;

const Title = styled.h1`
text-align: center;
font-weight: 700;
font-size: 25px;
`;

const LinkContent = styled.div`
text-align: center;
margin: 20px;
display: flex;
gap: 10px;
justify-content: center;
`;

const NamePage = () => {
  const { query } = useRouter();
  const [pokemon, setPokemon] = useState<PokemonTypes[]>([]);
  const { data, isLoading } = useFetch<any>(
    query.name ? `${_Urls.root}/${query.category}/${query.name}` : ""
  );
  const [selectedUrl, setSelectedUrl] = useState("");

  useEffect(() => {
    if (data) {
      setPokemon(data?.pokemon);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PokemonInformation url={selectedUrl} setSelectedUrl={setSelectedUrl} />
      {pokemon?.length == 0 || !pokemon ? (
        <div>
          <Title>No Pokemon At This Category</Title>
          <LinkContent>
            <Link href={`/${query.category}`}>
              <Card>Go Back</Card>
            </Link>
            <Link href={`/`}>
              <Card>Go Home</Card>
            </Link>
          </LinkContent>
        </div>
      ) : (
        <div>
          <Title>ALL POKEMON</Title>
          <GridContainer>
            <Link href={`/${query.category}`}>
              <Card>Go Back</Card>
            </Link>
            <Link href={`/`}>
              <Card>Go Home</Card>
            </Link>
            {pokemon?.map((item, i) => {
              return (
                <div key={i} onClick={() => setSelectedUrl(item.pokemon.url)}>
                  <Card>{item.pokemon.name}</Card>
                </div>
              );
            })}
          </GridContainer>
        </div>
      )}
    </>
  );
};

export { NamePage };
