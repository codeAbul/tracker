import React from "react";
import Habit from "../Habit";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const GET_HABITS = gql`
  query getHabits {
    habits {
      _id
      name
    }
  }
`;

const HabitList = () => {
  const { data, loading, error } = useQuery<THabits>(GET_HABITS);
  console.log("I am here");
  console.log(data);
  if (loading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  if (data) {
    const { habits } = data!;
    return (
      <article className={"habit-list"}>
        <h2 className={"habit-list__title"}>Habits</h2>
        {habits.map(habit => (
          <Habit key={habit._id} habit={habit} />
        ))}
      </article>
    );
  }
  return null;
};

export type THabit = {
  _id: string;
  name: string;
  events?: Array<{ name: string; _id: string }>;
};

export type THabits = {
  habits: THabit[];
};

export default HabitList;
