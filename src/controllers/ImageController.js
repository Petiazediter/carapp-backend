import Sequelize from 'sequelize';

class ImageController {
	constructor() {
		this.connection = getConnection();
		this.bids = this.connection.define('images', {
			id: {
				type: Sequelize.INTEGER,
				field: 'id',
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			url: {
				type: Sequelize.STRING,
				field: 'url',
				allowNull: false,
			},
		});
	}

	getImagesTable() {
		return this.bids;
	}

	async getImageUrlById(id) {
		return await this.bids.sync().then(() => {
			return this.bids.findByPk(id);
		});
	}

	async createImage(url) {
		return await this.bids.sync().then(() => {
			return this.bids.create({
				url,
			});
		});
	}
}
