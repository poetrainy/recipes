import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useOGPContext } from "~/context/useOGPContext";

export const OGP: FC = () => {
  const ogp = useOGPContext();

  return (
    <Helmet>
      {ogp ? (
        <>
          <title>{`${ogp.title}｜poetrainy-recipes`}</title>
          <meta
            property="og:title"
            content={`${ogp.title}｜poetrainy-recipes`}
          />
          <meta property="og:url" content={ogp.path} />
        </>
      ) : (
        <>
          <title>poetrainy-recipes</title>
          <meta property="og:title" content="poetrainy-recipes" />
          <meta property="og:url" content="/" />
        </>
      )}
      <meta
        property="og:description"
        content="個人的に気に入ったレシピをまとめています。"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="poetrainy-recipes" />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
};
