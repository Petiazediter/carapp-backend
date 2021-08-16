const user = async (parent, args, context) => {
	const answerId = parent.id;
	const answer = context.answerController.getAnswerById(answerId);
	return answer.getUser();
};

const comment = async (parent, args, context) => {
	if (!parent.commentId) return null;
	const answerId = parent.id;
	const answer = await context.answerController.getAnswerById(answerId);
	return answer.getComment();
};

const answer = async (parent, args, context) => {
	const answerId = parent.answerId;
	if (!answerId) return null;
	const answer = context.answerController.getAnswerById(answerId);
	return answer;
};

const answers = async (parent, args, context) => {
	const id = parent.id;
	const answers = context.answerController.getAnswersToAnswer(id);
	return answers;
};

export default {
	user,
	comment,
	answer,
	answers,
};
