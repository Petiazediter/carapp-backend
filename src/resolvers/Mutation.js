import pubsub from '../pubsub.js';

const createCar = (parent, args, context, info) => {
	const myCar = {
		name: 'test_Car',
		brand: 'test_brand',
	};
	pubsub.publish('CAR_CREATED', myCar);
	context.carController.insertCar(myCar);
	return myCar;
};

export default {
	createCar,
};
