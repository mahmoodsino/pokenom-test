import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const NewCard = styled.div`
background-color:  #91989f;
border-radius: 8px;
padding: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
transition: box-shadow 0.3s ease;
text-align: center; 

&:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
`;

const Card: FC<Props> = ({ children }) => {
  return <NewCard>{children}</NewCard>;
};

export default Card;
