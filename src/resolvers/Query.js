const cars = async (parent, args, context, info) => {
	return await context.carController.getCars();
};

export default {
	cars,
};
