import Comment from './CommentModel';
import User from './UserModel';

type Answer = {
	id: number;
	userId: number;
	user: User;
	commentId?: number;
	comment: Comment;
	answerId?: number;
	answer: Answer;
	answers: Answer[];
	text: string;
};

export default Answer;
