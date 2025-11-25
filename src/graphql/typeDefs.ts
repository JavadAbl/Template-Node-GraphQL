// GraphQL schema
export const typeDefs = `#graphql
  type Query {
    user(id: ID!): User
  }

  type User {
  id: ID!
  name: String!
  }
`;
