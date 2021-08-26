import { gql } from 'apollo-server';

const query = gql`
	type Query {
		cars: [Car]!
		car(id: Int!): Car
		me: User
	}
`;

export default query;
