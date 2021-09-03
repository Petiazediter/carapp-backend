import pubsub from '../pubsub';
import Bid from '../types/resolvers/Bid';
import Car from '../types/resolvers/CarModel';

const carCreated = {
	subscribe: () => {
		return pubsub.asyncIterator(['CAR_CREATED']);
	},
	resolve: (payload: Car) => {
		return payload;
	},
};

const bidAdded = {
	subscribe: (parent: any, args: { carId: number }) => {
		return pubsub.asyncIterator([`BID_CREATED_${args.carId}`]);
	},
	resolve: (payload: Bid) => {
		return payload;
	},
};

export default {
	carCreated,
	bidAdded,
};
