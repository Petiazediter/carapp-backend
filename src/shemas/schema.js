import { gql } from 'apollo-server-core';
import Userscheme from './Userscheme.js';

const schema = gql`
	type Car {
		id: ID!
		name: String
		sellerId: Int
		seller: User
		brand: String
		model: String
		minBid: Int
		country: String
		city: String
		vin: String
		km: Int
		body: Body
		driveTrain: DriveTrain
		transmission: Transmission
		exterior: String
		interior: String
		highlightsTitle: String
		highlightsItems: [String]
		equipmentTitle: String
		equipmentItems: [String]
		flaws: [String]
		serviceHistroy: String
		extraItems: [String]
		ownerShipHistory: String
		videos: [String]
		exteriorImages: [String]
		interiorImages: [String]
		paperImages: [String]
		bids: [Bid]
	}

	enum Transmission {
		MANUAL
		AUTOMATIC
	}

	enum DriveTrain {
		REAR
		FRONT
	}

	enum Body {
		COUPE
		CONVERTIBLE
		HATCHBACK
		SEDAN
		SUV
		TRUCK
		VAN
		WAGON
	}

	${Userscheme}

	type Bid {
		buyerId: Int
		buyer: User
		bid: Int
		carId: Int
		car: Car
	}

	type Query {
		cars: [Car]!
	}
`;

export default schema;
