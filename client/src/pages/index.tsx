import * as React from "react";
import { NextPage } from "next";
import { useAuth0 } from "../lib/auth0-spa";
import NavigationBar from "../components/NavBar";

interface Props {}

const Page: NextPage<Props> = () => {
  const { user } = useAuth0();

  return (
    <div>
      <h1>Initial Page</h1>

      <div>
        {user && user.nickname}
        <NavigationBar />
      </div>
    </div>
  );
};

export default Page;
