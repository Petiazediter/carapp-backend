import { getConnection } from './Database';
import Sequelize from 'sequelize';

export class HighLightsController {
	connection: Sequelize.Sequelize;
	highlights: any;

	constructor() {
		this.connection = getConnection();
		this.highlights = this.connection.define('highlights', {
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
			highlight: {
				type: Sequelize.STRING,
				field: 'highlight',
				allowNull: false,
			},
		});
	}

	getHighLightsTable() {
		return this.highlights;
	}

	async createHighLight(highlight: { carId: number; highlight: string }) {
		return this.highlights.sync().then(() => {
			return this.highlights.create(highlight);
		});
	}
}
