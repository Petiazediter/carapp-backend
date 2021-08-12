import { gql } from 'apollo-server';

const schema = gql`
	type User {
		id: ID
		username: String
		emailAddress: String
		userType: UserType
	}

	enum UserType {
		PERSONAL
		COMPANY
	}
`;

export default schema;
