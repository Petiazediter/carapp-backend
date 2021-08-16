import pubsub from '../pubsub.js';
import Context from '../types/ContextModel.js';
import User from '../types/resolvers/UserModel.js';

const carCreated = {
	subscribe: (parent: any, args: {}, context: Context) => {
		return pubsub.asyncIterator(['CAR_CREATED']);
	},
	resolve: (payload: User) => {
		return payload;
	},
};

export default {
	carCreated,
};
