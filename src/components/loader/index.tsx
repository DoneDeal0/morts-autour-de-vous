import React from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Color } from "components/theme";

const spin3D = keyframes`
  0% { transform: rotate3d(.5, .5, .5, 360deg); }
  100% { transform: rotate3d(0deg); }
`;

const Root = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const Orbit = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const OrbitLarge = styled(Orbit)`
  width: 165px;
  height: 165px;
  border: 1px solid ${Color.blue};
  animation: ${spin3D} 3s linear 0.2s infinite;
`;

const OrbitMedium = styled(Orbit)`
  width: 120px;
  height: 120px;
  border: 1px solid ${Color.blue};
  animation: ${spin3D} 2s linear 0s infinite;
`;
const OrbitSmall = styled(Orbit)`
  width: 90px;
  height: 90px;
  border: 1px solid ${Color.blue};
  animation: ${spin3D} 1s linear 0s infinite;
`;

const Label = styled.p`
  color: ${Color.blue};
  font-size: 12px;
  font-weight: 600;
`;

export default function Loader() {
  return (
    <Root>
      <OrbitLarge />
      <OrbitMedium />
      <OrbitSmall />
      <Label>Recherche</Label>
    </Root>
  );
}
