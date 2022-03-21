import React from "react";
import styled from "styled-components";
import { Pagination } from "@mui/material";
import Color from "components/theme/colors";
import { Breakpoint } from "components/theme";

interface IFooter {
  onClickPage: (page: number) => void;
  page: number;
  total: number;
}

const Root = styled.footer`
  background: black;
  width: 100vw;
  height: 10vh;
  border-top: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${Breakpoint.tabletMax}) {
    justify-content: center;
  }
`;

const Text = styled.p<{ showPagination: boolean }>`
  padding: 12px;
  font-size: 10px;
  max-width: 400px;
  @media (max-width: ${Breakpoint.tabletMax}) {
    text-align: center;
    display: ${({ showPagination }) => showPagination && "none"};
    > br {
      display: none;
    }
  }
`;

export default function Footer({ onClickPage, page, total }: IFooter) {
  const showPagination = total > 0;
  return (
    <Root>
      <Text showPagination={showPagination}>
        <strong>morts-autour-de-vous.fr</strong> est un annuaire de personnes
        décédées en France depuis 1970. <br />
        Il est basé sur les données officielles du gouvernement Français et le
        projet open-source matchID. <br />
        Les résultats renvoyés par ce site n'ont aucune valeur officielle et
        n'ont qu'une valeur informative.
      </Text>
      {showPagination && (
        <Pagination
          sx={[{ "& .MuiPaginationItem-root": { color: Color.white } }]}
          count={total}
          page={page}
          onChange={(_, value) => onClickPage(value)}
          color="primary"
        />
      )}
    </Root>
  );
}
