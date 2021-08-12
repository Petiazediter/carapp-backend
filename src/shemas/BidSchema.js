import { gql } from 'apollo-server';

const schema = gql`
	type Bid {
		userId: Int
		buyer: User
		bid: Int
		carId: Int
		car: Car
	}
`;

export default schema;
