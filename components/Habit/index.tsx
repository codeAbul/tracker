import React from "react";
import HabitButton from "../HabitButton";
import { THabit } from "../HabitList";

const Habit = ({ habit }: Iprops) => {
  const dates = getLastFiveDates();
  return (
    <article className={"habit"}>
      <h3 className={"habit__title"}>{habit.name}</h3>
      <div className={"habit__history"}>
        {dates.map(date => (
          <HabitButton key={date.getDate()} habitId={habit._id} date={date} />
        ))}
      </div>
    </article>
  );
};

function getLastFiveDates() {
  return Array.from("01234").map(nthDayBeforeToday);

  function nthDayBeforeToday(n: string) {
    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - Number(n));
    return tempDate;
  }
}

interface Iprops {
  habit: THabit;
}

export default Habit;
