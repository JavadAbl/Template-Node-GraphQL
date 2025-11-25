// Resolver types can be added more strictly if you use generated types.
// For a lightweight approach we type the resolvers as `any` or a minimal shape.
export const resolvers: any = {
  Query: {
    user: (_, id: number) => {
      return { id: 1, name: "name" };
    },
  },
};
