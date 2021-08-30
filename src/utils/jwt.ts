import jwt from 'jsonwebtoken';

export const SECRET_KEY: string = 'json_secret_key1233444';

export const getIdFromToken = (
	token: string | undefined | null
): number | null => {
	if (!token) {
		return null;
	}

	let vToken: string = token.replace('Bearer ', '');
	try {
		const decoded = jwt.verify(vToken, SECRET_KEY);
		try {
			return Number(decoded);
		} catch {
			return null;
		}
	} catch {
		return null;
	}
};
