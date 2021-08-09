const seller = (parent, args, context, info) => {
	const sellerId = parent.sellerId;
	return {
		id: sellerId,
		userName: `${sellerId}-seller`,
		emailAddress: 'emailaddress@email.com',
	};
};

export default {
	seller,
};
