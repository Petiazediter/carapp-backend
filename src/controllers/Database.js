import mysql from 'mysql';
import { Sequelize } from 'sequelize';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'peter133',
	database: 'car_app_backend',
});

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

/*
export const connectToDatabase = async () => {
	connection.connect((error) => {
		if (error) {
			console.log('❌️ Connection error!');
			throw error;
		}
		console.log('✅️ Connected!');
	});
};

export const shutDownConnection = () => {
	connection.end();
}; */
