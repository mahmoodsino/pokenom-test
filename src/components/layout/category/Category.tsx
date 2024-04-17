import { _Urls } from "@/api/_Urls";
import { useFetch } from "@/api/hooks/useFetch";
import { Card } from "@/components";
import Loading from "@/components/loader/Loading";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface CategoryTypes {
  name: string;
  url: string;
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

const CategoryPage = () => {
  const { query, push } = useRouter();
  const { data, isLoading } = useFetch<any>(
    query.category ? `${_Urls.root}/${query.category}` : ""
  );
  const [types, setTypes] = useState<CategoryTypes[]>([]);

  const pokemonName = (url: string) => {
    const parts = url.split("/");
    const number = parts[parts.length - 2];
    push(`./${query.category}/${number}`);
  };

  useEffect(() => {
    if (data) {
      setTypes(data.results);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Title>{query.category} Categories</Title>
      <GridContainer>
        <Link href={`/`}>
          <Card>Go Back</Card>
        </Link>
        {types?.map((item, i) => {
          return (
            <div key={i} onClick={() => pokemonName(item.url)}>
              <Card>{item.name}</Card>
            </div>
          );
        })}
      </GridContainer>
    </div>
  );
};

export { CategoryPage };
