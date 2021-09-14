import { gql } from 'apollo-server';

const commentSchema = gql`
	type Comment {
		id: Int!
		userId: Int!
		user: User
		carId: Int
		car: Car
		commentId: Int
		comment: Comment
		message: String!
		comments: [Comment!]
	}
`;

export default commentSchema;
