import { gql } from 'apollo-server-core';

const schema = gql`
	type Car {
		id: ID!
		name: String
		model: String
	}

	type Query {
		cars: [Car]!
	}
`;

export default schema;
