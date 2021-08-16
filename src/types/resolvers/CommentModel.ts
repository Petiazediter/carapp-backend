import Answer from './AnswerModel';
import Car from './CarModel';
import User from './UserModel';

type Comment = {
	id: number;
	userId: number;
	user: User;
	carId: number;
	car: Car;
	comment: string;
	answers: Answer[];
};

export default Comment;
