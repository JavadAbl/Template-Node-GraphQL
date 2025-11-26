// GraphQL schema
export const typeDefs = `#graphql
  type Query {
    user(id: ID): User
    users: [User!]!
  }

  input CreateUserInput{
    name: String!
  }

  type Mutation {
    createUser(payload: CreateUserInput!): User!
  }

  type User {
  id: ID!
  name: String!
  car: Car
  
  }

  type Car {
    name: String!
  }
`;
