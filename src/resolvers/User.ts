import Context from '../types/ContextModel';
import User from '../types/resolvers/UserModel';

const cars = async (parent: User, args: {}, context: Context) => {
	const userController = context.controllers.userController;
	const user = await userController.findUserById(parent.id);
	return user.getCars();
};

const bids = async (parent: User, args: {}, context: Context) => {
	const userController = context.controllers.userController;
	const user = await userController.findUserById(parent.id);
	return user.getBids();
};

const answers = async (parent: User, args: {}, context: Context) => {
	const userId = parent.id;
	const user = await context.controllers.userController.findUserById(userId);
	return user.getAnswers();
};

const comments = async (parent: User, args: {}, context: Context) => {
	const userId = parent.id;
	const user = await context.controllers.userController.findUserById(userId);
	return user.getComments();
};

export default {
	cars,
	bids,
	answers,
	comments,
};
