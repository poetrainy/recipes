import { FC } from "react";
import { Helmet } from "react-helmet-async";

const HeadOgp: FC = () => {
  return (
    <>
      <Helmet>
        <title>react-vite-template</title>
        <meta property="og:title" content="react-vite-template" />
        <meta property="og:url" content="/" />
        <meta property="og:description" content="react-vite-template" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="react-vite-template" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
    </>
  );
};

export default HeadOgp;
