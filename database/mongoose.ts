import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

function connectToDB(handler: THandler) {
  return async function(req: NextApiRequest, res: NextApiResponse) {
    if (mongoose.connections[0].readyState != 1) {
      await mongoose.connect(process.env.MONGO_URL as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
    return handler(req, res);
  };
}

mongoose.connection.once("open", () => {
  console.log("Connected to Mongo");
});

type THandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export default connectToDB;
