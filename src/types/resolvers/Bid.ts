import Car from './CarModel';
import User from './UserModel';

type Bid = {
	id: number;
	userId: number;
	buyer: User;
	bid: number;
	carId: number;
	car: Car;
};

export default Bid;
