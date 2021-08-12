import jwt from 'jsonwebtoken';
import pubsub from '../pubsub.js';
import { SECRET_KEY } from '../utils/jwt.js';
import bcrypt from 'bcrypt';

const createCar = (parent, args, context, info) => {
	if (!context.userId)
		throw new Error('You have no access to reach this endpoint!');
	const myCar = { ...args };
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
	console.log(`USER::::::::::::::::::: ${user}`);
	if (user) {
		return {
			isSuccess: true,
			errorMessage: null,
			token: jwt.sign(user.id, SECRET_KEY),
			payload: null,
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

const login = (parent, { username, password }, context, info) => {};

export default {
	register,
	login,
	createCar,
	deleteCar,
};
