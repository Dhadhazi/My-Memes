import * as React from "react";
import { NextPage } from "next";
import { useAuth0 } from "../lib/auth0-spa";
import Layout from "../components/Layout";

import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("../components/Display"), {
  ssr: false,
});

interface Props {}

const Page: NextPage<Props> = () => {
  const { user } = useAuth0();

  return (
    <Layout>
      {user && (
        <>
          <DynamicComponent />
        </>
      )}
    </Layout>
  );
};

export default Page;
