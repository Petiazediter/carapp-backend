import pubsub from '../pubsub';
import Context from '../types/ContextModel';
import Car from '../types/resolvers/CarModel';

const carCreated = {
	subscribe: (parent: any, args: {}, context: Context) => {
		return pubsub.asyncIterator(['CAR_CREATED']);
	},
	resolve: (payload: Car) => {
		return payload;
	},
};

export default {
	carCreated,
};
