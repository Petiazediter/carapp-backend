const cars = async (parent, args, context, info) => {
	const userController = context.userController;
	const user = await userController.findUserById(parent.id);
	return user.getCars();
};

const bids = async (parent, args, context, info) => {
	const userController = context.userController;
	const user = await userController.findUserById(parent.id);
	return user.getBids();
};

const answers = async (parent, args, context) => {
	const userId = parent.id;
	const user = await context.userController.findUserById(userId);
	return user.getAnswers();
};

const comments = async (parent, args, context) => {
	const userId = parent.id;
	const user = await context.userController.findUserById(userId);
	return user.getComments();
};

export default {
	cars,
	bids,
	answers,
	comments,
};
