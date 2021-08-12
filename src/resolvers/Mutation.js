import jwt from 'jsonwebtoken';
import pubsub from '../pubsub.js';
import { SECRET_KEY } from '../utils/jwt.js';
import bcrypt from 'bcrypt';

const createCar = (parent, args, context, info) => {
	if (!context.userId)
		throw new Error('You have no access to reach this endpoint!');
	const myCar = { ...args, sellerId: context.userId };
	pubsub.publish('CAR_CREATED', myCar);
	context.carController.insertCar(myCar);
	return myCar;
};

const deleteCar = (parent, args, context, info) => {
	if (!context.userId)
		throw new Error('You have no access to reach this endpoint!');
	context.carController.deleteCarById(args.id);
	return 'Deleted.';
};

const register = async (
	parent,
	{ username, password, emailAddress },
	context,
	info
) => {
	const userController = context.userController;
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
			payload: { ...user },
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

const login = async (parent, { username, password }, context, info) => {
	const userController = context.userController;
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
		errorMessage: 'This is a sample object',
	};
};

export default {
	register,
	login,
	createCar,
	deleteCar,
};
