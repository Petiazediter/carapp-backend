import pubsub from '../pubsub.js';

const createCar = (parent, args, context, info) => {
	if (!context.userId)
		throw new Error('You have no access to reach this endpoint!');
	const myCar = { ...args };
	pubsub.publish('CAR_CREATED', myCar);
	context.carController.insertCar(myCar);
	return myCar;
};

const deleteCar = (parent, args, context, info) => {
	if (!context.userId)
		throw new Error('You have no access to reach this endpoint!');
	context.carController.deleteCarById(args.id);
	return 'Deleted.';
};

export default {
	createCar,
	deleteCar,
};
