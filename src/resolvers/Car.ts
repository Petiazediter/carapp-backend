import Context from '../types/ContextModel';
import DbImage from '../types/controllers/ControllerImage';
import Car from '../types/resolvers/CarModel';
import { ImageType } from '../types/resolvers/ImageMode';

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
	return await getImageByType(car, ImageType.INTERIOR);
};

const exteriorImages = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return await getImageByType(car, ImageType.EXTERIOR);
};

const paperImages = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return await getImageByType(car, ImageType.PAPER);
};

const videos = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return await getImageByType(car, ImageType.VIDEO);
};

const getImageByType = async (car: any, type: ImageType) => {
	const images = await car.getImages();
	console.log('PAPER IMAGES:');
	console.log(type.valueOf());
	images.forEach((img: DbImage) => {
		if (img.type === type.valueOf()) {
			console.log(img.url);
		}
	});
	const filteredList = images.filter(
		(value: DbImage) => value.type === type.valueOf()
	);
	console.log(filteredList.length);
	console.log('======================');
	return filteredList;
};

const comments = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return car.getComments();
};

const highlightsItems = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return car.getHighlights();
};

const flaws = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return car.getFlaws();
};

const extraItems = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return car.getExtraItems();
};

const equipmentItems = async (parent: Car, args: {}, context: Context) => {
	const carController = context.controllers.carController;
	const car = await carController.findCarById(parent.id);
	return car.getEquipments();
};

export default {
	seller,
	bids,
	interiorImages,
	paperImages,
	exteriorImages,
	videos,
	comments,
	highlightsItems,
	flaws,
	extraItems,
	equipmentItems,
};
