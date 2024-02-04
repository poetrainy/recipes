import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ChakraProvider } from "@chakra-ui/react";
import App from "~/App";
import theme from "~/theme/index.ts";
import { OGPProvider } from "~/context/useOGPContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <OGPProvider>
          <App />
        </OGPProvider>
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>
);
