const cars = async (parent, args, context, info) => {
	return await context.carController.getCars();
};

const car = async (parent, { id }, context, info) => {
	const carController = context.carController;
	const car = await carController.findCarById(id);
	return car;
};

export default {
	cars,
	car,
};
