import { gql } from 'apollo-server-core';

const query = gql`
	type Query {
		cars: [Car]!
	}
`;

export default query;
