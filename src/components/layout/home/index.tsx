import React from "react";
import { Card } from "@/components";
import styled from "styled-components";
import Link from "next/link";
import { useCategories } from "@/context/auth/CategoriesContext";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 20px;
  padding: 20px;
`;

const HomePage = () => {
  const { categories } = useCategories();

  return (
    <GridContainer>
      {Object.keys(categories).map((item) => {
        return (
          <Link href={`./${item}`}>
            <Card>{item}</Card>
          </Link>
        );
      })}
    </GridContainer>
  );
};

export { HomePage };
