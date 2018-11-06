# GraphQL Backend

### import GraphQL

There's no such way to import GraphQL files inside each other. For this uses a lib which allow you do it by comment:

```graphql
# import * from './generated/prisma.graphql'
type Mutation {
  createItem(title: String): Item!
}
```

In the code above, `Item` comes from `prisma.graphql` file.

### schema.graphql

The file which GraphQL Yoga will read and contains all our schema
