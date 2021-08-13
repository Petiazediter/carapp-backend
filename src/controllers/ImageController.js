import Sequelize from 'sequelize';
import { getConnection } from './Database.js';

class ImageController {
	constructor() {
		this.connection = getConnection();
		this.images = this.connection.define('images', {
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
			carId: {
				type: Sequelize.INTEGER,
				field: 'carId',
				allowNull: false,
			},
			type: {
				type: Sequelize.STRING,
				field: 'type',
				allowNull: false,
			},
		});
	}

	getImagesTable() {
		return this.images;
	}

	async getImageUrlById(id) {
		return await this.images.sync().then(() => {
			return this.images.findByPk(id);
		});
	}

	async createImage(url, carId, imageType) {
		return await this.images.sync().then(() => {
			return this.images.create({
				url,
				carId,
				type: imageType,
			});
		});
	}
}

export default ImageController;
