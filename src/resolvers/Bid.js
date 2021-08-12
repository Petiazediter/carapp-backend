const buyer = async (parent, _, context) => {
	const userController = context.userController;
	const buyerId = parent.userId;
	if (buyerId) {
		return await userController.findUserById(buyerId);
	}
};

const car = async (parent, _, context) => {
	const bidController = context.bidController;
	const bid = await bidController.getBidById(parent.id);
	return bid.getCar();
};

export default {
	buyer,
	car,
};
