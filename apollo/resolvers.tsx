import Habits from "./models";
import { DateTimeResolver } from "graphql-scalars";

export type HabitInput = {
  habit: {
    name: string;
  };
};

const queryResolvers = {
  Query: {
    async habits() {
      try {
        const allHabits = await Habits.find();
        return allHabits;
      } catch (e) {
        console.log(e);
      }
    }
  }
};

const dateTimeResolver = {
  DateTime: DateTimeResolver
};

const mutationResolvers = {
  Mutation: {
    async addHabit(_: null, { habit }: HabitInput) {
      try {
        const newHabit = await Habits.create({
          ...habit
        });
        return newHabit;
      } catch (e) {
        console.log(e);
      }
    },
    async addEvent(
      _: null,
      { habitId, date }: { habitId: string; date: Date }
    ) {
      try {
        date.setHours(0, 0, 0, 0);
        const habit = await Habits.findOneAndUpdate(
          {
            _id: habitId,
            "events.date": {
              $ne: date
            }
          },
          {
            $addToSet: {
              events: {
                date
              }
            }
          }
        );
        return habit;
      } catch (e) {
        console.log(e);
      }
    },

    async removeEvent(
      _: null,
      { habitId, eventId }: { habitId: string; eventId: string }
    ) {
      const habit = await Habits.findOneAndUpdate(
        {
          _id: habitId
        },
        {
          $pull: {
            events: {
              eventId
            }
          }
        }
      );
      return habit;
    }
  }
};

export default { ...queryResolvers, ...dateTimeResolver, ...mutationResolvers };
