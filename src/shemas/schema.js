import { gql } from 'apollo-server-core';
import UserSchema from './UserSchema.js';
import CarSchema from './CarSchema.js';
import BidSchema from './BidSchema.js';

const schema = gql`
	${CarSchema}
	${UserSchema}
	${BidSchema}
	type Query {
		cars: [Car]!
	}
`;

export default schema;
