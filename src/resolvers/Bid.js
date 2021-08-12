const buyer = async (parent, _, context) => {
	const bidController = context.bidController;
	const bid = await bidController.getBidById(parent.id);
	if (!bid) return null;
	return bid.getUser();
};

const car = async (parent, _, context) => {
	const bidController = context.bidController;
	const bid = await bidController.getBidById(parent.id);
	if (!bid) return null;
	return bid.getCar();
};

export default {
	buyer,
	car,
};
