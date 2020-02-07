import React from "react";
import Layout from "../components/Layout";
import { withApollo } from "../apollo/client";
import HabitList from "../components/HabitList";
import HabitForm from "../components/HabitForm";
import "../styles/index.scss";

const Home = () => {
  // @ts-ignore
  return (
    <Layout>
      <article className={"habit-tracker"}>
        <HabitForm />
        <br/>
        <HabitList />
      </article>
    </Layout>
  );
};

export default withApollo(Home);
