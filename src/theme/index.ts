import { extendTheme } from "@chakra-ui/react";

const colors = {
  sub: "#4a5566",
  red: "#ff5d3d",
  yellow: "#ffab2e",
  blue: "#5e8aeb",
};
const styles = {
  global: {
    html: {
      fontSize: "62.5%",
    },
    body: {
      color: "black",
      fontSize: "1.4rem",
      fontFamily: "body",
      a: {
        textDecoration: "none",
      },
      li: {
        listStyleType: "none",
      },
      pre: {
        fontFamily: "body",
        whiteSpace: "pre-wrap",
      },
    },
    "::selection": {
      background: "tomato",
    },
    "::-moz-selection": {
      background: "tomato",
    },
  },
};
const fonts = {
  body: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif",
};
const breakpoints = {
  sm: "500px",
  md: "640px",
  lg: "820px",
  // example
};
const textStyles = {
  bodyWidth: {
    width: {
      base: "90vw",
      sm: "80vw",
    },
    mx: "auto",
  },
};

const theme = extendTheme({
  styles,
  colors,
  fonts,
  textStyles,
  breakpoints,
});

export default theme;
