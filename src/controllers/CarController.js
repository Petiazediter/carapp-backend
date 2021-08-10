import { getConnection } from './Database.js';

export class CarController {
	constructor() {
		this.connection = getConnection();
		this.connection.query(
			'CREATE TABLE IF NOT EXISTS cars (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) NOT NULL)',
			(error) => {
				if (error) {
					console.log('❌️ Cars table is not initialized.');
					throw error;
				}
				console.log('✅️ Cars table is up to date!');
			}
		);
	}

	async insertCar(car) {}
}
