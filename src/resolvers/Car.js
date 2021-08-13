const seller = async (parent, args, context, info) => {
	const userController = context.userController;
	const user = await userController.findUserById(parent.userId);
	return user;
};

const bids = async (parent, args, context, info) => {
	const carId = parent.id;
	const car = await context.carController.findCarById(carId);
	return car.getBids();
};

export default {
	seller,
	bids,
};
