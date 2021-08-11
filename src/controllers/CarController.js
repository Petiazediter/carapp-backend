import Sequelize from 'sequelize';
import { getConnection } from './Database.js';

export class CarController {
	constructor() {
		this.connection = getConnection();
		this.cars = this.connection.define('cars', {
			id: {
				type: Sequelize.INTEGER,
				field: 'id',
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				field: 'car_name',
				allowNull: false,
			},
			brand: {
				type: Sequelize.STRING,
				field: 'brand_name',
				allowNull: false,
			},
		});
	}

	getCarsTable() {
		return this.cars;
	}

	async getCars() {
		return this.cars.sync().then(() => {
			return this.cars.findAll();
		});
	}

	async insertCar(car) {
		this.cars.sync().then(() => {
			return this.cars.create(car);
		});
	}
}
