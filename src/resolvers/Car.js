const seller = async (parent, args, context, info) => {
	const userController = context.userController;
	const user = await userController.findUserById(parent.sellerId);
	return user;
};

export default {
	seller,
};
