const Query = {
  async items(parent, args, context, info) {
    const items = await context.db.query.items();
    return items;
  }
};

module.exports = Query;
