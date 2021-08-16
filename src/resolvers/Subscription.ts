import pubsub from '../pubsub';
import Context from '../types/ContextModel';
import User from '../types/resolvers/UserModel';

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
