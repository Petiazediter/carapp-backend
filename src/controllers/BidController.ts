import { getConnection } from './Database.js';
import Sequelize from 'sequelize';

export class BidController {
	connection: Sequelize.Sequelize;
	bids: any;

	constructor() {
		this.connection = getConnection();
		this.bids = this.connection.define('bids', {
			id: {
				type: Sequelize.INTEGER,
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
			userId: {
				type: Sequelize.INTEGER,
				field: 'seller_id',
				allowNull: false,
			},
			carId: {
				type: Sequelize.INTEGER,
				field: 'car_id',
				allowNull: false,
			},
		});
	}

	getBidsTable() {
		return this.bids;
	}

	async createBid(carId: number, bid: number, sellerId: number) {
		return await this.bids.sync().then(() => {
			return this.bids.create({
				bid: bid,
				userId: sellerId,
				carId: carId,
			});
		});
	}

	async getBidById(bidId: number) {
		return await this.bids.sync().then(() => {
			return this.bids.findByPk(bidId);
		});
	}
}
