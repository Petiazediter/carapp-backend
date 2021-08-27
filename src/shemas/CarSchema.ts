import { gql } from 'apollo-server';

const schema = gql`
	type Car {
		id: ID!
		name: String!
		userId: Int!
		seller: User
		endDate: String!
		brand: String!
		model: String!
		minBid: Int!
		country: String!
		city: String!
		vin: String!
		km: Int!
		body: Body!
		driveTrain: DriveTrain!
		transmission: Transmission!
		exterior: String!
		interior: String!
		highlightsTitle: String!
		highlightsItems: [HighLight]
		equipmentTitle: String!
		equipmentItems: [Equipment]
		flaws: [Flaw]
		serviceHistory: String!
		extraItems: [ExtraItem]
		ownerShipHistory: String!
		videos: [Image]
		exteriorImages: [Image]
		interiorImages: [Image]
		paperImages: [Image]
		bids: [Bid]
		comments: [Comment]
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
`;

export default schema;
