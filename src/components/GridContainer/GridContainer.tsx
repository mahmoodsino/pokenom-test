import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import Link from "next/link";

const NewGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 20px;
  padding: 20px;
`;
interface Props {
  children: ReactNode;
}

const GridContainer: FC<Props> = ({ children }) => {
  return <NewGridContainer>{children}</NewGridContainer>;
};

export default GridContainer;
