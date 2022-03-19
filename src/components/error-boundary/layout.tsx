import React from "react";
import styled from "styled-components";
import Button from "components/button";
import { Color } from "components/theme";

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  color: ${Color.white};
`;

const Title = styled.h1`
  text-transform: uppercase;
  margin-bottom: 32px;
  text-align: center;
`;

export default function ErrorLayout() {
  return (
    <Root>
      <Title>Une erreur est survenue</Title>
      <Button label="Rafraichir" onClick={() => window.location.assign("/")} />
    </Root>
  );
}
