import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectDatabase } from './db.js';
import dummyResolver from './resolvers/dummy.resolver.js';
import dummyTypeDef from './type-defs/dummy.type-def.js';
import authorResolver from './resolvers/author/index.js';
import authorTypeDef from './type-defs/author.type-def.js';
import gameResolver from './resolvers/game/index.js';
import gameTypeDef from './type-defs/game.type-def.js';
import reviewResolver from './resolvers/review/index.js';
import reviewTypeDef from './type-defs/review.type-def.js';

const server = new ApolloServer({
  typeDefs: [dummyTypeDef, authorTypeDef, gameTypeDef, reviewTypeDef],
  resolvers: [dummyResolver, authorResolver, gameResolver, reviewResolver],
});

connectDatabase();

await startStandaloneServer(server, {
  listen: 4000,
});

console.log(`Server started at port`, 4000);
