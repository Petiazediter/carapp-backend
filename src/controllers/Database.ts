import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('car_app_backend', 'root', 'peter133', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000,
	},
});

export const getConnection = () => sequelize;
