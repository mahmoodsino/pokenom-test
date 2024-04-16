import { useFetch } from "@/api/hooks/useFetch";
import PokemonInformation from "@/components/modal/PokemonInfo";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Input = styled.input<{ $inputColor?: string }>`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.$inputColor || "#BF4F74"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width:100%
`;

const Container = styled.div`
margin:50px;
position: relative;
`;

const SearchContent = styled.div`
position: absolute;
top:40px;
left:6px;
width:100%;
max-height:500px;
background-color:  white;
border-radius: 3px;
overflow-y: auto;
padding: 0.5em;
`;

const PokemonTitle = styled.p`
color:black;
padding: 0.2em;
font-weight:700;
background-color:  white;
&:hover {
    background-color:  #91989f;
  }

`;

const Search = () => {
  const [text, setText] = useState("");
  const { data } = useFetch<any>(
    "https://pokeapi.co/api/v2/pokemon?limit=10000"
  );
  const [result, setResult] = useState<{ name: string; url: string }[]>([]);
  const [selectedUrl, setSelectedUrl] = useState("");

  useEffect(() => {
    if (data) {
      if (text) {
        const res: { name: string; url: string }[] =
          data?.results?.filter((item: any) => item.name.includes(text)) || [];
        setResult(res);
      } else {
        setResult([]);
      }
    }
  }, [text, data]);

  return (
    <>
      <PokemonInformation url={selectedUrl} setSelectedUrl={setSelectedUrl} />

      <Container>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pokemon Search"
          type="text"
        />
        {result.length !== 0 && (
          <SearchContent>
            {result.map((item) => {
              return (
                <PokemonTitle onClick={() => setSelectedUrl(item.url)}>
                  {item.name}
                </PokemonTitle>
              );
            })}
          </SearchContent>
        )}
      </Container>
    </>
  );
};

export default Search;
