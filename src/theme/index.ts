import { extendTheme } from "@chakra-ui/react";

const colors = {
};
const styles = {
  global: {
    body: {
      color: "black",
      fontSize: "14px",
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
});

export default theme;
