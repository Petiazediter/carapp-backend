const cars = async (parent, args, context, info) => {
	const userController = context.userController;
	const user = await userController.findUserById(parent.id);
	return user.getCars();
};

export default {
	cars,
};
