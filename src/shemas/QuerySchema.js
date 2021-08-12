import { gql } from 'apollo-server-core';

const query = gql`
	type Query {
		cars: [Car]!
		car(id: Int!): Car
	}
`;

export default query;
