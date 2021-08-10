import pubsub from '../pubsub.js';

const carCreated = {
	subscribe: (parent, args, context, info) => {
		return pubsub.asyncIterator(['CAR_CREATED']);
	},
	resolve: (payload) => {
		return payload;
	},
};

export default {
	carCreated,
};
