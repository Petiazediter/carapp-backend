const createCar = (parent, args, context, info) => {
	const title = args.title;
	const brand = args.brand;
	const model = args.model;
	const minBid = args.minBid;
	const country = args.country;
	const city = args.city;
	const km = args.km;
	const body = args.body;
	const driveTrain = args.driveTrain;
	const transmission = args.transmission;

	return {
		title,
		brand,
		model,
		minBid,
		country,
		city,
		km,
		body,
		driveTrain,
		transmission,
	};
};

export default {
	createCar,
};
