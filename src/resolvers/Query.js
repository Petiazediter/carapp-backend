const cars = (parent, args, context, info) => {
	return [
		{
			id: 0,
			name: 'Car1',
			model: 'BMW',
		},
		{
			id: 1,
			name: 'Car2',
			model: 'Audi',
		},
	];
};

export default {
	cars,
};
