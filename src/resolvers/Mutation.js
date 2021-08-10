import pubsub from '../pubsub.js';

const createCar = (parent, args, context, info) => {
	const myCar = {
		...args,
	};

	pubsub.publish('CAR_CREATED', myCar);

	return myCar;
};

export default {
	createCar,
};
