import { ApolloServer } from 'apollo-server';
import schema from './schema.js';
import Query from './resolvers/Query.js';

const resolvers = { Query };

const apolloServer = new ApolloServer({ typeDefs: schema, resolvers });

apolloServer
	.listen()
	.then(({ url }) => console.log(`🚀️ Apollo server runs on ${url}`));
