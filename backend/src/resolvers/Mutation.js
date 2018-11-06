// Push data
const Mutations = {
  async createItem(parent, args, context, info) {
    // TODO: Check if they are logged in

    // Access db mutation (prisma.graphql)
    const item = await context.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info // The actual query
    );

    return item;
  }
};

module.exports = Mutations;
