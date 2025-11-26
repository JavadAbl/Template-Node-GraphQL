// Resolver types can be added more strictly if you use generated types.
// For a lightweight approach we type the resolvers as `any` or a minimal shape.
export const resolvers: any = {
  Query: {
    user: (_, id: number) => {
      return { id: 1, name: "name" };
    },

    users: () => {
      return [
        { id: 1, name: "name" },
        { id: 2, name: "name2" },
      ];
    },
  },

  Mutation: {
    createUser: (_: any, args: any) => {
      const { payload } = args;
      return { id: 3, name: payload.name };
    },
  },

  User: {
    car: (id) => {
      return { name: "car1" + id.id };
    },
  },
};
