import jwt from 'jsonwebtoken';
import { UserController } from '../controllers/UserController';
import dotenv from 'dotenv';
dotenv.config();

export const SECRET_KEY: string = process.env.SECRET_KEY
	? process.env.SECRET_KEY
	: '';

if (SECRET_KEY === '') {
	throw new Error('PLEASE INTRODUCE A SECRET_KEY variable in your .env file!');
}

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
