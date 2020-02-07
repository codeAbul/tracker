import Head from "next/head";
import React, { Fragment } from "react";
const Layout: React.FC = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Track your habits</h1>
      </header>
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
