import mongoose, { Schema } from "mongoose";

export const EventsSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  }
});

export const HabitsSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

export default mongoose.models.habits ?? mongoose.model("habits", HabitsSchema);
