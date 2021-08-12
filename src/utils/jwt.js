import jwt from 'jsonwebtoken';

export const SECRET_KEY = 'json_secret_key1233444';

export const getIdFromToken = (token) => {
	if (!token) return null;
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		return decoded ? decoded : null;
	} catch {
		return null;
	}
};
