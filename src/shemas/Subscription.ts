import { gql } from 'apollo-server';

const schema = gql`
	type Subscription {
		carCreated: Car
		bidAdded(carId: Int!): Bid
	}
`;

export default schema;
