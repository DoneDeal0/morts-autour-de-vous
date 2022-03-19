import { Color } from "components/theme";

export const variants = {
  primary: {
    background: Color.red,
    color: Color.white,
    border: "transparent",
    hover_bg: Color.red_bright,
    hover_color: Color.white,
  },
  secondary: {
    background: Color.black,
    color: Color.red,
    border: Color.red,
    hover_bg: Color.black,
    hover_color: Color.red_bright,
  },
  tertiary: {
    background: "none",
    color: Color.grey_dark,
    border: "transparent",
    hover_bg: "none",
    hover_color: Color.white,
  },
  quarternary: {
    background: "none",
    color: Color.red,
    border: "transparent",
    hover_bg: Color.red,
    hover_color: Color.white,
  },
};

export const sizes = {
  large: { width: "100%", fontSize: "24px" },
  medium: { width: "150px", fontSize: "18px" },
  auto: { width: "auto", fontSize: "14px" },
};
