import { gql } from 'apollo-server';

const schema = gql`
	type Subscription {
		carCreated: Car
	}
`;

export default schema;
