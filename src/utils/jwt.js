import jwt from 'jsonwebtoken';

export const SECRET_KEY = 'json_secret_key1233444';

export const getIdFromToken = (token) => {
	if (!token) return null;
	try {
		const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
		try {
			return Number(decoded);
		} catch {
			return null;
		}
	} catch {
		return null;
	}
};
