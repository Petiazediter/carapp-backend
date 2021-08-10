import { gql } from 'apollo-server-core';
import UserSchema from './UserSchema.js';
import CarSchema from './CarSchema.js';
import BidSchema from './BidSchema.js';
import Subscription from './Subscription.js';
import Query from '../resolvers/Query.js';

const typeDefs = gql`
	${CarSchema}
	${UserSchema}
	${BidSchema}
	${Subscription}
	${Query}
`;

export default typeDefs;
