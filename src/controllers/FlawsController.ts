import { getConnection } from './Database';
import Sequelize from 'sequelize';

export class FlawsController {
	connection: Sequelize.Sequelize;
	flaws: any;

	constructor() {
		this.connection = getConnection();
		this.flaws = this.connection.define('flaws', {
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
			flaw: {
				type: Sequelize.STRING,
				field: 'flaw',
				allowNull: false,
			},
		});
	}

	getFlawsTable() {
		return this.flaws;
	}

	async createFlaw(flaw: { carId: number; flaw: string }) {
		return this.flaws.sync().then(() => {
			return this.flaws.create(flaw);
		});
	}
}
