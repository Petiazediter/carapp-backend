import pubsub from '../pubsub.js';

const createCar = (parent, args, context, info) => {
	const name = args.name;
	const brand = args.brand;
	const model = args.model;
	const minBid = args.minBid;
	const country = args.country;
	const city = args.city;
	const km = args.km;
	const body = args.body;
	const driveTrain = args.driveTrain;
	const transmission = args.transmission;

	const myCar = {
		name,
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

	pubsub.publish('CAR_CREATED', myCar);

	return myCar;
};

export default {
	createCar,
};
