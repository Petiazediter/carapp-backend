import { ApolloServer } from 'apollo-server';
import schema from './shemas/schema.js';
import Query from './resolvers/Query.js';
import Car from './resolvers/Car.js';

const resolvers = { Query, Car };

const apolloServer = new ApolloServer({ typeDefs: schema, resolvers });

apolloServer
	.listen()
	.then(({ url }) => console.log(`🚀️ Apollo server runs on ${url}`));
