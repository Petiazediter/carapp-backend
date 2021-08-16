import Context from '../types/ContextModel';
import Answer from '../types/resolvers/AnswerModel';

const user = async (parent: Answer, args: {}, context: Context) => {
	const answerId = parent.id;
	const answer = await context.controllers.answerController.getAnswerById(
		answerId
	);
	return answer.getUser();
};

const comment = async (parent: Answer, args: {}, context: Context) => {
	if (!parent.commentId) return null;
	const answerId = parent.id;
	const answer = await context.controllers.answerController.getAnswerById(
		answerId
	);
	return answer.getComment();
};

const answer = async (parent: Answer, args: {}, context: Context) => {
	const answerId = parent.answerId;
	if (!answerId) return null;
	const answer = context.controllers.answerController.getAnswerById(answerId);
	return answer;
};

const answers = async (parent: Answer, args: {}, context: Context) => {
	const id = parent.id;
	const answers = context.controllers.answerController.getAnswersToAnswer(id);
	return answers;
};

export default {
	user,
	comment,
	answer,
	answers,
};
