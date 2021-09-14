import Bid from './Bid';
import Car from './CarModel';
import Comment from './CommentModel';

type User = {
	id: number;
	username: string;
	emailAddress: string;
	userType: UserType;
	cars: Car[];
	bids: Bid[];
	comments: Comment[];
};

export enum UserType {
	PERSONAL,
	COMPANY,
}

export default User;
