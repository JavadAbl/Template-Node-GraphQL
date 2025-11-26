// server.ts
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

const app = express();
const httpServer = http.createServer(app);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // IMPORTANT for Apollo Sandbox
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await apolloServer.start();

// REST routes
app.get("/api/test", (req: Request, res: Response) => {
  res.json({ msg: "REST working" });
});

// GraphQL route (IMPORTANT!)
app.use("/graphql", cors(), express.json(), expressMiddleware(apolloServer));

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 REST  at http://localhost:4000/api/test`);
console.log(`🚀 GraphQL at http://localhost:4000/graphql`);
