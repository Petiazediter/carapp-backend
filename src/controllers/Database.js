import mysql from 'mysql';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'peter133',
});

export const getConnection = () => connection;

export const connectToDatabase = async () => {
	connection.connect((error) => {
		if (error) {
			console.log('❌️ Connection error!');
			throw error;
		}
		console.log('✅️ Connected!');
		connection.query(
			'CREATE DATABASE IF NOT EXISTS car_app_backend;',
			(err) => {
				if (err) {
					console.log('❌️ Database creation error!');
					throw err;
				}
				console.log('✅️ Database ready!');
			}
		);
	});
};

export const updateDatabase = () => {
	connection.changeUser({ database: 'car_app_backend' }, (err) => {
		if (err) {
			console.log("❌️ Couldn't switch to new database.");
			throw err;
		}
		console.log('✅️ Switched to car_app_backend database!');
	});
};

export const shutDownConnection = () => {
	connection.end();
};
