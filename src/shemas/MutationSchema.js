import { gql } from 'apollo-server-express';

const mutations = gql`
	type Mutation {
		createCar(
			name: String!
			sellerId: Int!
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
			equipmentTitle: String!
			serviceHistroy: String!
			ownerShipHistory: String!
		): Car

		deleteCar(id: Int!): String!

		register(
			username: String!
			password: String!
			emailAddress: String!
		): AuthPayload!
		login(username: String!, password: String!): AuthPayload!
	}

	type AuthPayload {
		isSuccess: Boolean
		token: String
		payload: User
	}
`;

export default mutations;
