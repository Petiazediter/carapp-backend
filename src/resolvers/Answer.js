const user = async (parent, args, context) => {
	const answerId = parent.id;
	const answer = context.answersController().getAnswerById(answerId);
	return answer.getUser();
};

const comment = async (parent, args, context) => {
	const answerId = parent.id;
	const answer = context.answersController().getAnswerById(answerId);
	return answer.getComment();
};

export default {
	user,
	comment,
};
