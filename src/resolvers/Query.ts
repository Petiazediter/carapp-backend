import Context from '../types/ContextModel';

const cars = async (parent: any, args: {}, context: Context) => {
	return await context.controllers.carController.getCars();
};

const car = async (parent: any, { id }: { id: number }, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(id);
	return car;
};

export default {
	cars,
	car,
};
