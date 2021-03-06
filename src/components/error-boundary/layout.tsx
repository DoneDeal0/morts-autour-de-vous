import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
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
      <Button variant="contained" onClick={() => window.location.assign("/")}>
        RAFRAÎCHIR
      </Button>
    </Root>
  );
}
