import React from "react";
import { Button } from "@mui/material";

interface ISearchButton {
  onClick: () => void;
}

export default function SearchButton({ onClick }: ISearchButton) {
  return (
    <Button sx={{ width: "100%" }} variant="contained" onClick={onClick}>
      CHERCHER
    </Button>
  );
}
