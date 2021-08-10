import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import Query from './resolvers/Query.js';
import Car from './resolvers/Car.js';
import Mutation from './resolvers/Mutation.js';
import typeDefs from './shemas/schema.js';

const resolvers = { Query, Car, Mutation };

(async () => {
	const app = express();

	const httpServer = createServer(app);

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	});

	const server = new ApolloServer({
		schema,
	});

	await server.start();

	server.applyMiddleware({ app });

	SubscriptionServer.create(
		{ schema, execute, subscribe },
		{ server: httpServer, path: server.graphqlPath }
	);

	const PORT = 4000;
	httpServer.listen(PORT, () =>
		console.log(`🚀️ Apollo Server ready at http://localhost:${PORT}/graphql`)
	);
})();
