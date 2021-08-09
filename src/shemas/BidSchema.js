import { gql } from 'apollo-server';

const schema = gql`
	type Bid {
		buyerId: Int
		buyer: User
		bid: Int
		carId: Int
		car: Car
	}
`;

export default schema;
