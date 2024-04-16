import { _Urls } from "@/api/_Urls";
import { useFetch } from "@/api/hooks/useFetch";
import { Card } from "@/components";
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

const CategoryPage = () => {
  const { query, push } = useRouter();
  const { data } = useFetch<any>(
    query.category ? `${_Urls.root}/${query.category}` : ""
  );
  const [types, setTypes] = useState<CategoryTypes[]>([]);
  const [clickedUrl, setClickedUrl] = useState("");

  const penultimateCar = (url: string) => {
    const parts = url.split("/");
    const number = parts[parts.length - 2];
    push(`./${query.category}/${number}`);
  };

  useEffect(() => {
    if (data) {
      setTypes(data.results);
    }
  }, [data]);

  return (
    <GridContainer>
      {types?.map((item) => {
        return (
          <div onClick={() => penultimateCar(item.url)}>
            <Card>{item.name}</Card>
          </div>
        );
      })}
    </GridContainer>
  );
};

export { CategoryPage };
