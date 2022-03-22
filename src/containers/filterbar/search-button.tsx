import React from "react";
import { Button } from "@mui/material";
import { Font } from "components/theme";

interface ISearchButton {
  onClick: () => void;
  disabled: boolean;
}

export default function SearchButton({ onClick, disabled }: ISearchButton) {
  return (
    <Button
      sx={{ width: "100%", fontFamily: Font.primary }}
      variant="contained"
      onClick={onClick}
      disabled={disabled}
    >
      CHERCHER
    </Button>
  );
}
