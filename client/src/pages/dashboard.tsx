import * as React from "react";
import { NextPage } from "next";
import { requireUser, useAuth0 } from "../lib/auth0-spa";
import Link from "next/link";
import Login from "../components/Login";
import Layout from "../components/Layout";

interface Props {}

const DashboardPage: NextPage<Props> = () => {
  const { user } = useAuth0();

  return (
    <Layout>
      {user && (
        <div>
          {user.nickname}{" "}
          <Link href="/">
            <a>Home</a>
          </Link>
          <div>
            <img src={user.picture} alt={user.nickname} />
          </div>
        </div>
      )}
      Only visible when logged in
    </Layout>
  );
};

export default requireUser(DashboardPage);
