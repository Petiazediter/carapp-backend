import User from './UserModel';

type AuthPayload = {
	isSuccess: boolean;
	errorMessage?: string;
	token?: string;
	payload?: User;
};

export default AuthPayload;
