import Car from './CarModel';
import User from './UserModel';

type Comment = {
	id: number;
	userId: number;
	user: User;
	carId?: number;
	car?: Car;
	commentId?: number;
	comment?: Comment;
	message: string;
	comments: Comment[];
};

export default Comment;
