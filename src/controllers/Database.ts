import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_NAME ? process.env.DB_NAME : '',
	process.env.DB_USER ? process.env.DB_USER : '',
	process.env.DB_PASS ? process.env.DB_PASS : '',
	{
		host: process.env.DB_HOST ? process.env.DB_HOST : '',
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			idle: 10000,
		},
	}
);

export const getConnection = () => sequelize;
