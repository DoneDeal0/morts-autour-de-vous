import React from "react";
import styled from "styled-components";
import { Pagination } from "@mui/material";
import Color from "components/theme/colors";

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
`;

export default function Footer({ onClickPage, page, total }: IFooter) {
  return (
    <Root>
      <p style={{ padding: 12, fontSize: 10 }}>
        <strong>morts-autour-de-vous.fr</strong> est un annuaire de personnes
        décédées en France depuis 1970. <br />
        Il est basé sur les données officielles du gouvernement Français et le
        projet open-source matchID. <br />
        Les résultats renvoyés par ce site n'ont aucune valeur officielle et
        n'ont qu'une valeur informative.
      </p>
      {total > 0 && (
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
