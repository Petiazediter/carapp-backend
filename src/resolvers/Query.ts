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
	if (!userId) throw new Error('You are not authorized!');
	if (!(await context.controllers.userController.findUserById(userId)))
		throw new Error('You have no access to reach this endpoint!');
	return context.controllers.userController.findUserById(userId);
};

const carByTitle = async (
	parent: any,
	args: { titleFragment: string },
	context: Context
) => {
	return await context.controllers.carController.getCarByTitleFragment(
		args.titleFragment
	);
};

export default {
	cars,
	car,
	me,
	carByTitle,
};
