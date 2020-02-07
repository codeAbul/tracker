import { useMutation } from "@apollo/react-hooks";
import React, { useRef } from "react";
import gql from "graphql-tag";
import { GET_HABITS, THabit, THabits } from "../HabitList";

const ADD_EVENT = gql`
  mutation addEvent($date: DateTime, $habitId: ID) {
    addEvent(date: $date, habitId: $habitId) {
      _id
     n
      events {
        _id
        date
      }
    }
  }
`;

const REMOVE_EVENT = gql`
  mutation removeEvent($habitId: ID, $eventId: ID) {
    removeEvent(habitId: $habitId, eventId: $eventId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const HabitButton = ({ date, habitId }: Iprops) => {
  const [addEvent] = useMutation(ADD_EVENT);
  const [removeEvent] = useMutation(REMOVE_EVENT);
  let eventId = useRef<string | null>(null);

  const found = false;

  return (
    <>
      <span className={"habit__date"}>
        {date.getMonth() + 1}/{date.getDate()}
      </span>
      {found ? (
        <button type="button" onClick={remove} className={"habit__status"}>
          x
        </button>
      ) : (
        <button type={"button"} className={"habit__status"} onClick={add}>
          0
        </button>
      )}
    </>
  );

  function remove() {
    removeEvent({
      variables: {
        habitId,
        eventId: eventId.current
      },
      update(store, { data: { removeEvent } }) {
        if (removeEvent) {
          const modifiedHabit = removeEvent as THabit;
          const { habits: currentHabits } = store.readQuery({
            query: GET_HABITS
          }) as THabits;
          store.writeQuery<THabits>({
            query: GET_HABITS,
            data: {
              habits: [...currentHabits, modifiedHabit]
            }
          });
        }
      }
    });
  }

  function add() {
    addEvent({
      variables: {
        date,
        habitId
      },

      update(store, { data: { addEvent } }) {
        if (addEvent) {
          const modifiedHabit = addEvent as THabit;
          let noOfEvents, recentEvent;
          if (modifiedHabit.events) {
            noOfEvents = modifiedHabit.events.length;
            recentEvent = modifiedHabit.events[noOfEvents - 1];
            eventId.current = recentEvent._id;
            const { habits: currentHabits } = store.readQuery({
              query: GET_HABITS
            }) as THabits;
            store.writeQuery({
              query: GET_HABITS,
              data: [...currentHabits, modifiedHabit]
            });
          }
        }
      }
    });
  }
};

interface Iprops {
  date: Date;
  habitId: string;
}

export default HabitButton;
