import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "~/components/Header";
import Layout from "~/components/Layout";

const Root: FC = () => (
  <>
    <Header />
    <Layout>
      <Outlet />
    </Layout>
  </>
);

export default Root;
