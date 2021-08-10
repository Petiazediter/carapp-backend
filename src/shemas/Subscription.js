import { graphql } from 'graphql';

const schema = graphql`
	type Subscription {
		carCreated: Car
	}
`;

export default schema;
