import Context from '../types/ContextModel';

const cars = async (parent: any, args: {}, context: Context) => {
	return await context.controllers.carController.getCars();
};

const car = async (parent: any, { id }: { id: number }, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(id);
	return car;
};

const me = async (parent: any, args: {}, context: Context) => {
	const userId = context.userId;
	console.log(`MEEEEE :::: ${userId}`);
	if (!userId) throw new Error('You are not authorized!');
	return context.controllers.userController.findUserById(userId);
};

export default {
	cars,
	car,
	me,
};
