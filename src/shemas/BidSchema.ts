import { gql } from 'apollo-server';

const schema = gql`
	type Bid {
		id: Int
		userId: Int
		buyer: User
		bid: Int
		carId: Int
		car: Car
	}
`;

export default schema;
