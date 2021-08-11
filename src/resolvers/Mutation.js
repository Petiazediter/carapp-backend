import pubsub from '../pubsub.js';

const createCar = (parent, args, context, info) => {
	const myCar = { ...args };
	pubsub.publish('CAR_CREATED', myCar);
	context.carController.insertCar(myCar);
	return myCar;
};

const deleteCar = (parent, args, context, info) => {
	context.carController.deleteCarById(args.id);
	return 'Deleted.';
};

export default {
	createCar,
	deleteCar,
};
