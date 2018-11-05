const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");

// Create the GraphQL Yoga Server

const createServer = () => {
  return new GraphQLServer({
    /* GraphQL schema */
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    /* Return request data and the database (prisma) connection */
    context: req => ({ ...req, db })
  });
};

module.exports = createServer;
