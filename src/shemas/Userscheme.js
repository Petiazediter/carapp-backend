import { gql } from 'apollo-server';

const Userscheme = gql`
	type User {
		id: ID
		userName: String
		emailAddress: String
		userType: UserType
	}

	enum UserType {
		PERSONAL
		COMPANY
	}
`;

export default Userscheme;
