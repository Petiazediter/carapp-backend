import Context from '../types/ContextModel';
import Comment from '../types/resolvers/CommentModel';

const user = async (parent: Comment, args: {}, context: Context) => {
	const userId = parent.userId;
	const userController = context.controllers.userController;
	return await userController.findUserById(userId);
};

const car = async (parent: Comment, args: {}, context: Context) => {
	const carId = parent.carId;
	if (carId) {
		const carController = context.controllers.carController;
		return await carController.findCarById(carId);
	}
};

const comment = async (parent: Comment, args: {}, context: Context) => {
	const commentId = parent.commentId;
	if (commentId) {
		const commentController = context.controllers.commentController;
		return await commentController.getCommentById(commentId);
	}
};

const comments = async (parent: Comment, args: {}, context: Context) => {
	const commentId = parent.id;
	const commentController = context.controllers.commentController;
	return await commentController.getCommentsToComment(commentId);
};

export default {
	user,
	car,
	comment,
	comments,
};
