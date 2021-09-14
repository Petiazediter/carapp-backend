import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import Query from './resolvers/Query';
import Bid from './resolvers/Bid';
import Car from './resolvers/Car';
import User from './resolvers/User';
import Subscription from './resolvers/Subscription';
import Mutation from './resolvers/Mutation';
import Comment from './resolvers/Comment';
import Image from './resolvers/Image';
import typeDefs from './shemas/schema';
import { CarController } from './controllers/CarController';
import process from 'process';
import { BidController } from './controllers/BidController';
import { getIdFromToken } from './utils/jwt';
import { UserController } from './controllers/UserController';
import ImageController from './controllers/ImageController';
import { CommentController } from './controllers/CommentController';
import Context, { ContextControllers } from './types/ContextModel';
import { FlawsController } from './controllers/FlawsController';
import { HighLightsController } from './controllers/HighLightsController';
import { EquipmentsController } from './controllers/EquipmentsController';
import { ExtraItemsController } from './controllers/ExtraItemsController';

process.on('beforeExit', () => {
	console.log('👋️ Bye bye! Exit application!');
});

const resolvers = {
	Query,
	Car,
	Mutation,
	Subscription,
	Bid,
	User,
	Comment,
	Image,
};

const createRelations = async (controllers: ContextControllers) => {
	const Cars = controllers.carController.getCarsTable();
	const Bids = controllers.bidController.getBidsTable();
	const Users = controllers.userController.getUsersTable();
	const Images = controllers.imageController.getImagesTable();
	const Comments = controllers.commentController.getCommentsTable();
	const Flaws = controllers.flawsController.getFlawsTable();
	const HighLights = controllers.highLightsController.getHighLightsTable();
	const Equipments = controllers.equipmentsController.getEquipmentsTable();
	const ExtraItems = controllers.extraItemsController.getExtraItemsTable();

	await Promise.all([
		Cars.sync(),
		Users.sync(),
		Bids.sync(),
		Images.sync(),
		Comments.sync(),
		Flaws.sync(),
		HighLights.sync(),
		Equipments.sync(),
		ExtraItems.sync(),
	]);

	// Link many bids to one car.
	Cars.hasMany(Bids);
	Bids.belongsTo(Cars);

	Cars.hasMany(Flaws);
	Flaws.belongsTo(Cars);

	Cars.hasMany(Equipments);
	Equipments.belongsTo(Cars);

	Cars.hasMany(ExtraItems);
	ExtraItems.belongsTo(Cars);

	Cars.hasMany(HighLights);
	HighLights.belongsTo(Cars);
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

(async (controllers: ContextControllers) => {
	await createRelations(controllers);

	const app = express();
	const httpServer = createServer(app);

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	});
	const server = new ApolloServer({
		schema,
		context: ({ req }): Context => {
			const token = req.headers.authorization || undefined;
			const userId = getIdFromToken(token);
			return {
				controllers,
				userId,
			};
		},
	});

	// https://www.apollographql.com/docs/apollo-server/data/subscriptions/
	// ???
	const subscriptionServer = SubscriptionServer.create(
		{
			schema,
			execute,
			subscribe,
		},
		{ server: httpServer, path: server.graphqlPath }
	);

	await server.start();
	server.applyMiddleware({ app });
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
	flawsController: new FlawsController(),
	highLightsController: new HighLightsController(),
	equipmentsController: new EquipmentsController(),
	extraItemsController: new ExtraItemsController(),
});
