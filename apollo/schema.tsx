import gql from "graphql-tag";

const typeDefs = gql`
  scalar DateTime

  type Habit {
    _id: ID!
    name: String!
    events:[Event!]!
  }

  type Event {
    _id: ID!
    date: DateTime
  }

  input HabitInput {
    _id: ID
    name: String!
  }

  type Mutation {
    addHabit(habit: HabitInput): Habit
    addEvent(habitId: ID, date: DateTime): Habit
    removeEvent(habitId: ID, eventId: ID): Habit
  }

  type Query {
    habits: [Habit!]!
  }
`;

export default typeDefs;
