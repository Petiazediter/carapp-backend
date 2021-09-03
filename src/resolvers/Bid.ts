import Context from '../types/ContextModel';
import Bid from '../types/resolvers/Bid';

const buyer = async (parent: Bid, args: {}, context: Context) => {
	const bidController = context.controllers.bidController;
	const bid = await bidController.getBidById(parent.id);
	console.log(`BID: ${bid.id}`);
	if (!bid) return null;
	const user = await bid.getUser();
	console.log(`USER: ${user}`);
	return user;
};

const car = async (parent: Bid, args: {}, context: Context) => {
	const bidController = context.controllers.bidController;
	const bid = await bidController.getBidById(parent.id);
	console.log(bid);
	if (!bid) return null;
	return bid.getCar();
};

export default {
	buyer,
	car,
};
