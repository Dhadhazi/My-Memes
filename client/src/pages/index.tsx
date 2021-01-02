import * as React from "react";
import { NextPage } from "next";
import { useAuth0 } from "../lib/auth0-spa";
import Login from "../components/Login";
import Link from "next/link";
import Layout from "../components/Layout";

interface Props {}

const Page: NextPage<Props> = () => {
  const { user } = useAuth0();

  return <Layout>{user && <div>Upload picture</div>}</Layout>;
};

export default Page;
