import { FC } from "react";
import { Outlet } from "react-router-dom";
import { OGP } from "~/components/OGP";
import Header from "~/components/Header";
import Layout from "~/components/Layout";

const Root: FC = () => (
  <>
    <OGP />
    <Header />
    <Layout>
      <Outlet />
    </Layout>
  </>
);

export default Root;
