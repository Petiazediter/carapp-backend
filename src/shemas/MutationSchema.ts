import { gql } from 'apollo-server';

const mutations = gql`
	type BaseDetails {
		name: String!
		brand: String!
		model: String!
		minBid: Int!
		country: String!
		endDate: String!
		city: String!
		vin: String!
		km: Int!
		body: Body!
		driveTrain: DriveTrain!
		transmission: Transmission!
		exterior: String!
		interior: String!
		highlightsTitle: String!
		equipmentTitle: String!
		serviceHistory: String!
		ownerShipHistory: String!
	}

	type CarLists {
		flaws: [String!]!
		highLights: [String!]!
		extraItems: [String!]!
		equipments: [String!]!
	}

	type CreateCarObject {
		baseDetails: BaseDetails!
		lists: CarLists!
	}

	type Mutation {
		createCarV2(obj: CreateCarObject!): Car

		createCar(
			name: String!
			brand: String!
			model: String!
			minBid: Int!
			country: String!
			endDate: String!
			city: String!
			vin: String!
			km: Int!
			body: Body!
			driveTrain: DriveTrain!
			transmission: Transmission!
			exterior: String!
			interior: String!
			highlightsTitle: String!
			equipmentTitle: String!
			serviceHistory: String!
			ownerShipHistory: String!
		): Car

		deleteCar(id: Int!): String!

		register(
			username: String!
			password: String!
			emailAddress: String!
		): AuthPayload!
		login(username: String!, password: String!): AuthPayload!

		bid(carId: Int!, bid: Int!): Bid

		addImageUrlToCar(url: String!, carId: Int!, imageType: ImageType!): Image

		addComment(text: String!, carId: Int!): Comment

		addAnswer(text: String!, commentId: Int, answerId: Int): Answer

		addFlaws(carId: Int!, flaws: [String!]!): [Flaw]

		addHighLights(carId: Int!, highLights: [String!]!): [HighLight]

		addEquipments(carId: Int!, equipments: [String!]!): [Equipment]

		addExtraItems(carId: Int!, extraItems: [String!]!): [ExtraItem]
	}

	type HighLight {
		id: Int!
		carId: Int!
		highlight: String!
	}

	type ExtraItem {
		id: Int!
		carId: Int!
		extraItem: String!
	}

	type Equipment {
		id: Int!
		carId: Int!
		equipment: String!
	}

	type Flaw {
		id: Int!
		carId: Int!
		flaw: String!
	}

	type Image {
		id: Int!
		url: String!
		type: String!
		carId: Int!
		car: Car
	}

	type AuthPayload {
		isSuccess: Boolean!
		errorMessage: String
		token: String
		payload: User
	}

	enum ImageType {
		EXTERIOR
		INTERIOR
		PAPER
		VIDEO
	}
`;

export default mutations;
