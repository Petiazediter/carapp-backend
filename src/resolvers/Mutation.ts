import jwt from 'jsonwebtoken';
import pubsub from '../pubsub';
import { SECRET_KEY } from '../utils/jwt';
import bcrypt from 'bcrypt';
import Car from '../types/resolvers/CarModel';
import Context from '../types/ContextModel';
import DbCar from '../types/controllers/ControllerCar';
import { ImageType } from '../types/resolvers/ImageMode';

type CreateCar = {
	name: string;
	brand: string;
	model: string;
	minBid: number;
	country: string;
	city: string;
	vin: string;
	km: number;
	endDate: string;
	body: string;
	driveTrain: string;
	transmission: string;
	exterior: string;
	interior: string;
	highlightsTitle: string;
	equipmentTitle: string;
	serviceHistroy: string;
	ownerShipHistory: string;
	userId?: number;
};

const createCar = async (parent: any, args: CreateCar, context: Context) => {
	if (!context.userId)
		throw new Error('You have no access to reach this endpoint!');
	const myCar: DbCar = { ...args, userId: context.userId };
	const car: Car = await context.controllers.carController.insertCar(myCar);
	pubsub.publish('CAR_CREATED', car);
	return car;
};

const deleteCar = async (
	parent: any,
	args: { id: number },
	context: Context
) => {
	if (!context.userId)
		throw new Error('You have no access to reach this endpoint!');
	await context.controllers.carController.deleteCarById(args.id);
	return 'Deleted.';
};

const register = async (
	parent: any,
	{
		username,
		password,
		emailAddress,
	}: { username: string; password: string; emailAddress: string },
	context: Context
) => {
	const userController = context.controllers.userController;
	const hashedPassword = await bcrypt.hash(password, 5);

	const user = await userController.createUser({
		username,
		password: hashedPassword,
		emailAddress,
	});
	if (user) {
		return {
			isSuccess: true,
			errorMessage: null,
			token: jwt.sign(user.id, SECRET_KEY),
			payload: await userController.findUserById(user.id),
		};
	} else {
		return {
			isSuccess: false,
			errorMessage: 'Username or email already in use.',
			token: null,
			payload: null,
		};
	}
};

const login = async (
	parent: any,
	{ username, password }: { username: string; password: string },
	context: Context
) => {
	const userController = context.controllers.userController;
	const user = await userController.findUserByUsername(username);
	if (user) {
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (isPasswordValid) {
			return {
				isSuccess: true,
				errorMessage: null,
				token: jwt.sign(user.id, SECRET_KEY),
				payload: user,
			};
		}
	}
	return {
		isSuccess: false,
		errorMessage: 'Username or password invalid.',
	};
};

const bid = async (
	parent: any,
	{ carId, bid }: { carId: number; bid: number },
	context: Context
) => {
	const userId = context.userId;
	if (!userId) throw new Error('You have no access to reach this endpoint!');
	const bidController = context.controllers.bidController;
	const dbBid = await bidController.createBid(carId, bid, userId);
	return dbBid;
};

const addImageUrlToCar = async (
	parent: any,
	{
		url,
		carId,
		imageType,
	}: { url: string; carId: number; imageType: ImageType },
	context: Context
) => {
	const imageController = context.controllers.imageController;
	const image = await imageController.createImage(url, carId, imageType);
	return image;
};

const addComment = async (
	parent: any,
	{ text, carId }: { text: string; carId: number },
	context: Context
) => {
	const userId = context.userId;
	if (!userId) throw new Error('Not authenticated!');

	const commentController = context.controllers.commentController;
	const comment = await commentController.createComment(text, carId, userId);
	return comment;
};

const addAnswer = async (
	parent: any,
	{
		text,
		commentId,
		answerId,
	}: { text: string; commentId?: number; answerId?: number },
	context: Context
) => {
	const userId = context.userId;
	if (!userId) throw new Error('Not authenticated!');

	const answerController = context.controllers.answerController;
	const answer = await answerController.addAnswer({
		userId,
		commentId: commentId ? commentId : undefined,
		answerId: answerId ? answerId : undefined,
		text,
	});
	return answer;
};

const addFlaws = async (
	parent: any,
	args: { carId: number; flaws: string[] },
	context: Context
) => {
	const userId = context.userId;
	if (!userId) throw new Error('Not authorized!');
	const flawsTable = context.controllers.flawsController;
	const car = await context.controllers.carController.findCarById(args.carId);
	if (car) {
		if (car.userId === userId) {
			return args.flaws.map(async (flaw) => {
				return await flawsTable.createFlaw({ carId: args.carId, flaw: flaw });
			});
		} else {
			throw new Error('This is not your car!');
		}
	} else {
		throw new Error('Car not found!');
	}
};

const addHighLights = async (
	parent: any,
	args: { carId: number; highLights: string[] },
	context: Context
) => {
	const userId = context.userId;
	if (!userId) throw new Error('Not authorized!');

	const highlightsItems = context.controllers.highLightsController;
	const car = await context.controllers.carController.findCarById(args.carId);
	if (car) {
		if (car.userId === userId) {
			return args.highLights.map(async (highlight) => {
				return await highlightsItems.createHighLight({
					carId: args.carId,
					highlight: highlight,
				});
			});
		}
		throw new Error('This is not your car!');
	}
	throw new Error('Car not found!');
};

export default {
	register,
	login,
	createCar,
	deleteCar,
	bid,
	addImageUrlToCar,
	addComment,
	addAnswer,
	addFlaws,
	addHighLights,
};
