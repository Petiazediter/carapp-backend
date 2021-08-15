const user = async (parent, args, context) => {
	const userId = parent.userId;
	const userController = context.userController;
	return await userController.findUserById(userId);
};

const car = async (parent, args, context) => {
	const carId = parent.carId;
	const carController = context.carController;
	return await carController.findCarById(carId);
};

const answers = async (parent, args, context) => {
	const commentId = parent.id;
	const comment = await context.commentController.getCommentById(commentId);
	return comment.getAnswers();
};

export default {
	user,
	car,
	answers,
};
