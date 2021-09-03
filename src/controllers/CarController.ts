import Sequelize, { Model } from 'sequelize';
import DbCar from '../types/controllers/ControllerCar';
import { getConnection } from './Database';

export class CarController {
	connection: Sequelize.Sequelize;
	cars: any;

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
			userId: {
				type: Sequelize.INTEGER,
				field: 'userId',
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
			endDate: {
				type: Sequelize.STRING,
				field: 'endDate',
				allowNull: false,
			},
			body: {
				type: Sequelize.STRING,
				field: 'body',
				allowNull: false,
			},
			driveTrain: {
				type: Sequelize.STRING,
				field: 'drive_train',
				allowNull: false,
			},
			transmission: {
				type: Sequelize.STRING,
				field: 'transmission',
				allowNull: false,
			},
			exterior: {
				type: Sequelize.STRING,
				field: 'exterior',
				allowNull: false,
			},
			interior: {
				type: Sequelize.STRING,
				field: 'exterior',
				allowNull: false,
			},
			highlightsTitle: {
				type: Sequelize.STRING,
				field: 'highlightsTitle',
				allowNull: false,
			},
			equipmentTitle: {
				type: Sequelize.STRING,
				field: 'equipmentTitle',
				allowNull: false,
			},
			serviceHistory: {
				type: Sequelize.STRING,
				field: 'serviceHistory',
				allowNull: false,
			},
			ownerShipHistory: {
				type: Sequelize.STRING,
				field: 'ownerShipHistory',
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

	async findCarById(id: number) {
		return await this.cars.sync().then(() => {
			return this.cars.findByPk(id);
		});
	}

	async insertCar(car: DbCar) {
		return await this.cars.sync().then(() => {
			return this.cars.create(car);
		});
	}

	async deleteCarById(id: number): Promise<void> {
		await this.cars.sync().then(() => {
			this.cars.findByPk(id).then((dbCar: Model | null) => {
				if (dbCar != null) return dbCar.destroy();
			});
		});
	}
}
