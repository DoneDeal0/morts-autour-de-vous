import React from "react";
import styled from "styled-components";
import { Color } from "components/theme";
import Loader from "components/loader";

interface IDataContainer {
  loading: boolean;
  error: string;
  children: React.ReactNode;
  noResult: boolean;
}

const Root = styled.main`
  overflow: hidden;
  height: 90vh;
  position: relative;
  width: 100%;
`;

const Mask = styled.div`
  z-index: 999;
  position: absolute;
  height: 100%;
  width: 100%;
  /* stylelint-disable */
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Color.blue};
`;

const Shadow = styled.div`
  z-index: 9;
  position: absolute;
  height: 100%;
  width: 100%;
  box-shadow: inset 0 0 70px #000000;
  pointer-events: none;
`;
export default function DataContainer({
  loading,
  error,
  noResult,
  children,
}: IDataContainer) {
  return (
    <Root>
      <Shadow />
      {loading && (
        <Mask>
          <Loader />
        </Mask>
      )}
      {error && (
        <Mask>
          <p style={{ fontWeight: 600 }}>{error}</p>
        </Mask>
      )}
      {noResult && (
        <Mask>
          <p style={{ fontWeight: 600 }}>Pas de résultats</p>
        </Mask>
      )}
      {children}
    </Root>
  );
}
