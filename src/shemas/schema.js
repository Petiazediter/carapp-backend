import { gql } from 'apollo-server';
import UserSchema from './UserSchema.js';
import CarSchema from './CarSchema.js';
import BidSchema from './BidSchema.js';
import Subscription from './Subscription.js';
import Query from './QuerySchema.js';
import Mutation from './MutationSchema.js';

const typeDefs = gql`
	${CarSchema}
	${UserSchema}
	${BidSchema}
	${Query}
	${Mutation}
	${Subscription}
`;

export default typeDefs;
