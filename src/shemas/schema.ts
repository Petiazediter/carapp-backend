import { gql } from 'apollo-server';
import UserSchema from './UserSchema';
import CarSchema from './CarSchema';
import BidSchema from './BidSchema';
import Subscription from './Subscription';
import Query from './QuerySchema';
import Mutation from './MutationSchema';
import Comment from './CommentSchema';

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
