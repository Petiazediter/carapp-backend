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
			highlightsItems: [String!]!
			equipmentTitle: String!
			equipmentItems: [String!]!
			flaws: [String!]!
			serviceHistroy: String!
			extraItems: [String!]!
			ownerShipHistory: String!
			videos: [String!]!
			exteriorImages: [String!]!
			interiorImages: [String!]!
			paperImages: [String!]!
		): Car

		deleteCar(id: Int!): String!
	}
`;

export default mutations;
