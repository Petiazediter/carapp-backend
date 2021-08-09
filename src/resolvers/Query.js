const cars = (parent, args, context, info) => {
	return [
		{
			id: 0,
			name: 'Car1',
			model: 'BMW',
			sellerId: 1,
		},
		{
			id: 1,
			name: 'Car2',
			model: 'Audi',
			sellerId: 2,
		},
	];
};

export default {
	cars,
};
