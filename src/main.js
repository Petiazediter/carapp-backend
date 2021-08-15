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
import { CommentController } from './controllers/CommentController.js';

process.on('beforeExit', () => {
	console.log('👋️ Bye bye! Exit application!');
});

const resolvers = { Query, Car, Mutation, Subscription, Bid, User };

const createRelations = async (controllers) => {
	const Cars = controllers.carController.getCarsTable();
	const Bids = controllers.bidController.getBidsTable();
	const Users = controllers.userController.getUsersTable();
	const Images = controllers.imageController.getImagesTable();
	const Comments = controllers.commentController.getCommentsTable();

	await Promise.all([
		Cars.sync(),
		Users.sync(),
		Bids.sync(),
		Images.sync(),
		Comments.sync(),
	]);

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

	// Link many comment to one car
	Cars.hasMany(Comments);
	Comments.belongsTo(Cars);

	// Link many comment to one user
	Users.hasMany(Comments);
	Comments.belongsTo(Users);
};

(async (controllers) => {
	await createRelations(controllers);

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
				userController: controllers.userController,
				carController: controllers.carController,
				bidController: controllers.bidController,
				imageController: controllers.imageController,
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
})({
	userController: new UserController(),
	carController: new CarController(),
	bidController: new BidController(),
	imageController: new ImageController(),
	commentController: new CommentController(),
});
