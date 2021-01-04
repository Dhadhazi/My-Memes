import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { requireUser, useAuth0 } from "../lib/auth0-spa";
import Link from "next/link";
import Login from "../components/Login";
import Layout from "../components/Layout";
import { getAllMemes } from "../api/memeapi";
import { MemeCategory } from "../types/MemeCategory";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const DashboardPage: NextPage<Props> = ({ data }) => {
  const auth = useAuth0();
  const [memes, setMemes] = useState<MemeCategory[]>();

  async function getIdToken(): Promise<string> {
    const token = await auth.getIdTokenClaims();
    return token.__raw;
  }

  async function loadMemes(): Promise<MemeCategory[]> {
    const token = await getIdToken();
    const allMeme = await getAllMemes(token);
    return allMeme;
  }

  function thisIsCalled() {
    console.log("called");
    setMemes(data);
  }

  useEffect(() => {
    async function initialLoad() {
      const allMemes = await loadMemes();
      thisIsCalled();
    }
    initialLoad();
  });
  console.log(memes);

  return <Layout>Only visible when logged in</Layout>;
};

export default requireUser(DashboardPage);
