import { getConnection } from './Database';
import Sequelize from 'sequelize';

export class ExtraItemsController {
	connection: Sequelize.Sequelize;
	extraItems: any;

	constructor() {
		this.connection = getConnection();
		this.extraItems = this.connection.define('extraItems', {
			id: {
				type: Sequelize.INTEGER,
				field: 'id',
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			carId: {
				type: Sequelize.INTEGER,
				field: 'carId',
				allowNull: false,
			},
			extraItem: {
				type: Sequelize.STRING,
				field: 'extraItem',
				allowNull: false,
			},
		});
	}

	getExtraItemsTable() {
		return this.extraItems;
	}

	async createExtraItems(extraItem: { carId: number; extraItem: string }) {
		return this.extraItems.sync().then(() => {
			return this.extraItems.create(extraItem);
		});
	}
}
