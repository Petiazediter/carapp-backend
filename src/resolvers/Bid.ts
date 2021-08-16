import Context from '../types/ContextModel';
import Bid from '../types/resolvers/Bid';

const buyer = async (parent: Bid, args: {}, context: Context) => {
	const bidController = context.controllers.bidController;
	const bid = await bidController.getBidById(parent.id);
	if (!bid) return null;
	return bid.getUser();
};

const car = async (parent: Bid, args: {}, context: Context) => {
	const bidController = context.controllers.bidController;
	const bid = await bidController.getBidById(parent.id);
	if (!bid) return null;
	return bid.getCar();
};

export default {
	buyer,
	car,
};
