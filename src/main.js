import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import Query from './resolvers/Query.js';
import Car from './resolvers/Car.js';
import Subscription from './resolvers/Subscription.js';
import Mutation from './resolvers/Mutation.js';
import typeDefs from './shemas/schema.js';
import {
	connectToDatabase,
	shutDownConnection,
} from './controllers/Database.js';
import { CarController } from './controllers/CarController.js';
import { updateDatabase } from './controllers/Database.js';
import process from 'process';

process.on('beforeExit', () => {
	console.log('👋️ Bye bye! Exit application!');
	shutDownConnection();
});

const resolvers = { Query, Car, Mutation, Subscription };

(async () => {
	const app = express();
	await connectToDatabase();
	await updateDatabase();
	const httpServer = createServer(app);

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	});

	const server = new ApolloServer({
		schema,
		context: {
			carController: new CarController(),
		},
	});

	await server.start();

	server.applyMiddleware({ app });

	SubscriptionServer.create(
		{
			schema,
			execute,
			subscribe,
		},
		{ server: httpServer, path: server.graphqlPath }
	);

	const PORT = 4000;
	httpServer.listen(PORT, () => {
		console.log(`🚀️ Apollo Server ready at http://localhost:${PORT}/graphql`);
	});
})();
