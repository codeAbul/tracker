import React, { Fragment } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import HabitInputField from "../HabitInputField";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { HabitInput } from "../../apollo/resolvers";
import { GET_HABITS, THabits } from "../HabitList";

const ADD_HABIT = gql`
  mutation addHabit($habit: HabitInput) {
    addHabit(habit: $habit) {
      _id
      name
    }
  }
`;

const HabitForm = () => {
  const [addHabit] = useMutation<{ addHabit: HabitInput }, HabitInput>(
    ADD_HABIT
  );

  return (
    <div className={"habit-form-container"}>
      <h2 id={"form-label"}>Add a new habit</h2>
      <Formik initialValues={{ newHabit: "" }} onSubmit={onFormSubmit}>
        <Form aria-labelledby={"form-label"}>
          <HabitInputField id="new-habit" name="newHabit" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );

  async function onFormSubmit(
    values: { newHabit: string },
    { resetForm }: FormikHelpers<{ newHabit: string }>
  ) {
    await addHabit({
      variables: {
        habit: {
          name: values.newHabit
        }
      },
      update(store, { data }) {
        if (data?.addHabit) {
          const newHabit = data.addHabit;
          let { habits } = store.readQuery({
            query: GET_HABITS
          }) as any;
          store.writeQuery<THabits>({
            query: GET_HABITS,
            data: {
              habits: [...habits, newHabit]
            }
          });
        }
      }
    });
    resetForm({ values: { newHabit: "" } });
  }
};

export default HabitForm;
