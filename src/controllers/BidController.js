import { getConnection } from './Database.js';
import Sequelize from 'sequelize';

export class BidController {
	constructor() {
		this.connection = getConnection();
		this.bids = this.connection.define('bids', {
			id: {
				type: Sequelize.STRING,
				field: 'id',
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			bid: {
				type: Sequelize.INTEGER,
				field: 'bid',
				allowNull: false,
			},
			sellerId: {
				type: Sequelize.INTEGER,
				field: 'seller_id',
				allowNull: false,
			},
		});
	}

	getBidsTable() {
		return this.bids;
	}
}
