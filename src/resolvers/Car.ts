import Context from '../types/ContextModel';
import DbImage from '../types/controllers/ControllerImage';
import Car from '../types/resolvers/CarModel';

const seller = async (parent: Car, args: {}, context: Context) => {
	const userController = context.controllers.userController;
	const user = await userController.findUserById(parent.userId);
	return user;
};

const bids = async (parent: Car, args: {}, context: Context) => {
	const carId = parent.id;
	const car = await context.controllers.carController.findCarById(carId);
	return car.getBids();
};

const interiorImages = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return getImageByType(car, 'INTERIOR');
};

const exteriorImages = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return getImageByType(car, 'EXTERIOR');
};

const paperImages = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return getImageByType(car, 'PAPER');
};

const videos = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return getImageByType(car, 'VIDEO');
};

const getImageByType = async (car: any, type: string) => {
	const images = await car.getImages();
	return images.filter((value: DbImage) => value.type === type);
};

const comments = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return car.getComments();
};

export default {
	seller,
	bids,
	interiorImages,
	paperImages,
	exteriorImages,
	videos,
	comments,
};
