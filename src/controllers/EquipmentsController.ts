import { getConnection } from './Database';
import Sequelize from 'sequelize';

export class EquipmentsController {
	connection: Sequelize.Sequelize;
	equipments: any;

	constructor() {
		this.connection = getConnection();
		this.equipments = this.connection.define('equipments', {
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
			equipment: {
				type: Sequelize.STRING,
				field: 'equipment',
				allowNull: false,
			},
		});
	}

	getEquipmentsTable() {
		return this.equipments;
	}

	async createEquipment(equipment: { carId: number; equipment: string }) {
		return this.equipments.sync().then(() => {
			return this.equipments.create(equipment);
		});
	}
}
