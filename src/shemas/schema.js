import { gql } from 'apollo-server';
import UserSchema from './UserSchema.js';
import CarSchema from './CarSchema.js';
import BidSchema from './BidSchema.js';
import Subscription from './Subscription.js';
import Query from './QuerySchema.js';
import Mutation from './MutationSchema.js';
import Comment from './CommentSchema.js';

const typeDefs = gql`
	${Query}
	${Mutation}
	${Subscription}
	${CarSchema}
	${UserSchema}
	${BidSchema}
	${Comment}
`;

export default typeDefs;
