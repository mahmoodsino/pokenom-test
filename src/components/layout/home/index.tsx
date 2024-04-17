import React from "react";
import { Card } from "@/components";
import styled from "styled-components";
import Link from "next/link";
import { useCategories } from "@/context/auth/CategoriesContext";
import Search from "./Search";

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
`

const HomePage = () => {
  const { categories } = useCategories();

  return (
    <div>
      <Search />
      <Title>ALL CATEGORIES</Title>
      <GridContainer>
        {Object.keys(categories).map((item,i) => {
          return (
            <Link key={i} href={`./${item}`}>
              <Card>{item}</Card>
            </Link>
          );
        })}
      </GridContainer>
    </div>
  );
};

export { HomePage };
