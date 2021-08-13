const seller = async (parent, args, context, info) => {
	const userController = context.userController;
	const user = await userController.findUserById(parent.userId);
	return user;
};

const bids = async (parent, args, context, info) => {
	const carId = parent.id;
	const car = await context.carController.findCarById(carId);
	return car.getBids();
};

const interiorImages = async (parent, args, context, info) => {
	const carController = context.carController;
	const car = await carController.findCarById(parent.id);
	return getImageByType(car, 'INTERIOR');
};

const exteriorImages = async (parent, args, context, info) => {
	const carController = context.carController;
	const car = await carController.findCarById(parent.id);
	return getImageByType(car, 'EXTERIOR');
};

const paperImages = async (parent, args, context, info) => {
	const carController = context.carController;
	const car = await carController.findCarById(parent.id);
	return getImageByType(car, 'PAPER');
};

const videos = async (parent, args, context, info) => {
	const carController = context.carController;
	const car = await carController.findCarById(parent.id);
	return getImageByType(car, 'VIDEO');
};

const getImageByType = async (car, type) => {
	const images = await car.getImages();
	return images.filter((value) => value.type === type);
};

export default {
	seller,
	bids,
	interiorImages,
	paperImages,
	exteriorImages,
	videos,
};
