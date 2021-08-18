import Context from '../types/ContextModel';

const car = async (parent: any, args: {}, context: Context) => {
	const imageController = context.controllers.imageController;
	const image = await imageController.getImageUrlById(parent.id);
	return image.getCar();
};

export default {
	car,
};
