import React from "react";
import styled from "styled-components";
import { Color, Font } from "components/theme";
import Filters from "assets/svg/filters.svg";
interface IHeader {
  onClick?: () => void;
  isMobile?: boolean;
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

const Button = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
`;

export default function Header({ onClick, isMobile }: IHeader) {
  return (
    <Root isMobile={isMobile}>
      <Button onClick={onClick}>
        <Filters color={Color.blue} width={32} height={32} />
      </Button>
      <Title>FILTRES</Title>
    </Root>
  );
}
