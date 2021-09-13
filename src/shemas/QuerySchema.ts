import { gql } from 'apollo-server';

const query = gql`
	type Query {
		cars: [Car]!
		car(id: Int!): Car
		me: User
		carByTitle(titleFragment: String!): [Car]
	}
`;

export default query;
