import * as React from "react";
import App from "next/app";
import Head from "next/head";
import { Auth0Provider } from "../lib/auth0-spa";

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    const onRedirectCallback = (appState) => {
      console.log("appState", appState);

      router.push(appState && appState.targetUrl ? appState.targetUrl : "/");
    };

    return (
      <React.Fragment>
        <Head>
          <title>My App</title>
        </Head>
        <Auth0Provider
          domain="dev-7aw7hycc.eu.auth0.com"
          clientId="vWm5tra1gXti6P48WuXEYHSiqI6Pcps6"
          redirectUri={"http://localhost:3000/callback"}
          onRedirectCallback={onRedirectCallback}
        >
          <Component {...pageProps} router={router} />
        </Auth0Provider>
      </React.Fragment>
    );
  }
}
