import React, { Fragment } from "react";
import { useField } from "formik";

const HabitInputField = (props: any, { id } = props) => {
  const [field] = useField(props);
  return (
    <Fragment>
      <label htmlFor={id}>New Habit</label>
      <input type={"text"} id={id} {...field} {...props} />
    </Fragment>
  );
};

export default HabitInputField;
