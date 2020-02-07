import { ApolloServer } from "apollo-server-micro";
import connectToDB from "../../database/mongoose";
import typeDefs from "../../apollo/schema";
import resolvers from "../../apollo/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

export const config = {
  api: {
    bodyParser: false
  }
};

const server = apolloServer.createHandler({ path: "/api/graphql" });

export default connectToDB(server);
