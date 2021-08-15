import { gql } from 'apollo-server';

const commentSchema = gql`
	type Comment {
		id: Int!
		userId: Int!
		user: User
		carId: Int!
		car: Car
		comment: String!
		answers: [Answer]
	}

	type Answer {
		id: Int!
		userId: Int!
		user: User
		commentId: Int!
		comment: Comment
		answer: String!
	}
`;

export default commentSchema;
