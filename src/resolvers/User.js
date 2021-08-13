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

export default {
	cars,
	bids,
};
