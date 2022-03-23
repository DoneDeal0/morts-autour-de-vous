import React from "react";
import styled from "styled-components";
import { Color, Font } from "components/theme";
import Cross from "assets/svg/cross.svg";
import Filters from "assets/svg/filters.svg";
interface IHeader {
  onClick?: () => void;
  isMobile?: boolean;
  openPanel?: boolean;
}

const Root = styled.header<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ isMobile }) => (isMobile ? "0px" : "24px")};
`;

const Title = styled.h1`
  font-size: 36px;
  font-family: ${Font.primary};
  margin: 0 0 0 12px;
`;

const Button = styled.button<{ isMobile: boolean }>`
  background: transparent;
  border: 0;
  width: 44px;
  display: flex;
  align-items: center;
  cursor: ${({ isMobile }) => (isMobile ? "pointer" : "default")};
  pointer-events: ${({ isMobile }) => (isMobile ? "auto" : "none")};
`;

export default function Header({ onClick, isMobile, openPanel }: IHeader) {
  return (
    <Root isMobile={isMobile}>
      <Button onClick={onClick} isMobile={isMobile}>
        {openPanel ? (
          <Cross color={Color.blue} width={24} height={24} />
        ) : (
          <Filters color={Color.blue} width={32} height={32} />
        )}
      </Button>
      <Title>FILTRES</Title>
    </Root>
  );
}
