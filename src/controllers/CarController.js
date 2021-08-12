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
			sellerId: {
				type: Sequelize.INTEGER,
				field: 'seller_id',
				allowNull: false,
			},
			brand: {
				type: Sequelize.STRING,
				field: 'brand_name',
				allowNull: false,
			},
			model: {
				type: Sequelize.STRING,
				field: 'model',
				allowNull: false,
			},
			minBid: {
				type: Sequelize.INTEGER,
				field: 'min_bid',
				allowNull: false,
				defaultValue: 0,
			},
			country: {
				type: Sequelize.STRING,
				field: 'country',
				allowNull: false,
			},
			city: {
				type: Sequelize.STRING,
				field: 'city',
				allowNull: false,
			},
			vin: {
				type: Sequelize.STRING,
				field: 'vin',
				allowNull: false,
			},
			km: {
				type: Sequelize.BIGINT,
				field: 'km',
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

	async findCarById(id) {
		return await this.cars.sync().then(() => {
			return this.cars.findByPk(id);
		});
	}

	async insertCar(car) {
		return await this.cars.sync().then(() => {
			return this.cars.create(car);
		});
	}

	async deleteCarById(id) {
		await this.cars.sync().then(() => {
			this.cars.findByPk(id).then((dbCar) => {
				return dbCar.destroy();
			});
		});
	}
}
