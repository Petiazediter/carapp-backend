import Context from '../types/ContextModel';
import Comment from '../types/resolvers/CommentModel';

const user = async (parent: Comment, args: {}, context: Context) => {
	const userId = parent.userId;
	const userController = context.controllers.userController;
	return await userController.findUserById(userId);
};

const car = async (parent: Comment, args: {}, context: Context) => {
	const carId = parent.carId;
	const carController = context.controllers.carController;
	return await carController.findCarById(carId);
};

const answers = async (parent: Comment, args: {}, context: Context) => {
	const commentId = parent.id;
	const comment = await context.controllers.commentController.getCommentById(
		commentId
	);
	return comment.getAnswers();
};

export default {
	user,
	car,
	answers,
};
