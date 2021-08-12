import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import Query from './resolvers/Query.js';
import Bid from './resolvers/Bid.js';
import Car from './resolvers/Car.js';
import Subscription from './resolvers/Subscription.js';
import Mutation from './resolvers/Mutation.js';
import typeDefs from './shemas/schema.js';
import { CarController } from './controllers/CarController.js';
import process from 'process';
import { BidController } from './controllers/BidController.js';
import { getIdFromToken } from './utils/jwt.js';
import { UserController } from './controllers/UserController.js';

process.on('beforeExit', () => {
	console.log('👋️ Bye bye! Exit application!');
});

const resolvers = { Query, Car, Mutation, Subscription, Bid };

const createRelations = (userController, carController, bidController) => {
	const Cars = carController.getCarsTable();
	const Bids = bidController.getBidsTable();
	const Users = userController.getUsersTable();

	Cars.hasMany(Bids);
	Bids.belongsTo(Cars);

	Cars.hasMany(Bids);
	Bids.belongsTo(Users);
};

(async () => {
	const userController = new UserController();
	const carController = new CarController();
	const bidController = new BidController();

	createRelations(userController, carController, bidController);

	const app = express();
	const httpServer = createServer(app);

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	});

	const server = new ApolloServer({
		schema,
		context: ({ req }) => {
			const token = req.headers.authorization || undefined;
			const userId = getIdFromToken(token);
			return {
				userController,
				carController,
				bidController,
				userId,
			};
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
