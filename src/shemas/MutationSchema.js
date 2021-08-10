import { gql } from 'apollo-server-express';

const mutations = gql`
	type Mutation {
		createCar(
			name: String!
			brand: String!
			model: String!
			minBid: Int!
			country: String!
			city: String!
			km: Int!
			body: Body!
			driveTrain: DriveTrain!
			transmission: Transmission!
		): Car
	}
`;

export default mutations;
