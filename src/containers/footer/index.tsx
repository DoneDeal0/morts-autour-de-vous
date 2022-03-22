import React from "react";
import { Pagination } from "@mui/material";
import styled from "styled-components";
import { Color, Font } from "components/theme";

interface IFooter {
  onClickPage: (page: number) => void;
  page: number;
  pages: number;
}

const Root = styled.footer`
  background: black;
  width: 100vw;
  height: 10vh;
  border-top: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p<{ showPagination: boolean }>`
  padding: 12px;
  font-size: 10px;
  max-width: 800px;
  text-align: center;
  font-family: ${Font.sansSerif};
  line-height: 16px;
  display: ${({ showPagination }) => showPagination && "none"};
`;

export default function Footer({ onClickPage, page, pages }: IFooter) {
  const showPagination = pages > 0;
  return (
    <Root>
      <Text showPagination={showPagination}>
        <strong>morts-autour-de-vous.fr</strong> est un annuaire de personnes
        décédées en France depuis 1970. Il est basé sur les données officielles
        du gouvernement Français et le projet open-source matchID. Les résultats
        renvoyés par ce site n'ont aucune valeur officielle et n'ont qu'une
        valeur informative.
      </Text>
      {showPagination && (
        <Pagination
          sx={[{ "& .MuiPaginationItem-root": { color: Color.white } }]}
          count={pages}
          page={page}
          onChange={(_, value) => onClickPage(value)}
          color="primary"
        />
      )}
    </Root>
  );
}
