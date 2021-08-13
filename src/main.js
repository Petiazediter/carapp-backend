import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import Query from './resolvers/Query.js';
import Bid from './resolvers/Bid.js';
import Car from './resolvers/Car.js';
import User from './resolvers/User.js';
import Subscription from './resolvers/Subscription.js';
import Mutation from './resolvers/Mutation.js';
import typeDefs from './shemas/schema.js';
import { CarController } from './controllers/CarController.js';
import process from 'process';
import { BidController } from './controllers/BidController.js';
import { getIdFromToken } from './utils/jwt.js';
import { UserController } from './controllers/UserController.js';
import ImageController from './controllers/ImageController.js';

process.on('beforeExit', () => {
	console.log('👋️ Bye bye! Exit application!');
});

const resolvers = { Query, Car, Mutation, Subscription, Bid, User };

const createRelations = async (
	userController,
	carController,
	bidController,
	imageController
) => {
	const Cars = carController.getCarsTable();
	const Bids = bidController.getBidsTable();
	const Users = userController.getUsersTable();
	const Images = imageController.getImagesTable();

	await Promise.all([Cars.sync(), Users.sync(), Bids.sync(), Images.sync()]);

	// Link many bids to one car.
	Cars.hasMany(Bids);
	Bids.belongsTo(Cars);

	// Link many bids to one user
	Users.hasMany(Bids);
	Bids.belongsTo(Users);

	// Link many car to one user
	Users.hasMany(Cars);
	Cars.belongsTo(Users);

	// Link many image to one car
	Cars.hasMany(Images);
	Images.belongsTo(Cars);
};

(async () => {
	const userController = new UserController();
	const carController = new CarController();
	const bidController = new BidController();
	const imageController = new ImageController();

	await createRelations(
		userController,
		carController,
		bidController,
		imageController
	);

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
				imageController,
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
