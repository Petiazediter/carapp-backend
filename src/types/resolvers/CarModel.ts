import Bid from './Bid';
import Comment from './CommentModel';
import Image from './ImageMode';
import User from './UserModel';

type Car = {
	id: number;
	name: string;
	userId: number;
	seller: User;
	brand: string;
	model: string;
	minBid: number;
	country: string;
	city: string;
	vin: string;
	km: number;
	body: Body;
	driveTrain: DriveTrain;
	transmission: Transmission;
	exterior: string;
	interior: string;
	highlightsTitle: string;
	highlightsItems: string[];
	equipmentTitle: string;
	equipmentItems: string[];
	flaws: string[];
	serviceHistroy: string;
	extraItems: string[];
	ownerShipHistory: string;
	videos: Image[];
	exteriorImages: Image[];
	interiorImages: Image[];
	paperImages: Image[];
	bids: Bid[];
	comments: Comment[];
};

export enum Transmission {
	MANUAL,
	AUTOMATIC,
}

export enum DriveTrain {
	REAR,
	FRONT,
}

export enum Body {
	COUPE,
	CONVERTIBLE,
	HATCHBACK,
	SEDAN,
	SUV,
	TRUCK,
	VAN,
	WAGON,
}

export default Car;
