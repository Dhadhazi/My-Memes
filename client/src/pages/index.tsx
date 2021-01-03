import * as React from "react";
import { NextPage } from "next";
import { useAuth0 } from "../lib/auth0-spa";
import Layout from "../components/Layout";
import { UploadMeme } from "../components/UploadMeme";

interface Props {}

const Page: NextPage<Props> = () => {
  const { user } = useAuth0();

  return (
    <Layout>
      {user && (
        <div>
          <UploadMeme />
        </div>
      )}
    </Layout>
  );
};

export default Page;
