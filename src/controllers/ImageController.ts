import Sequelize from 'sequelize';
import { ImageType } from '../types/resolvers/ImageMode';
import { getConnection } from './Database';

class ImageController {
	connection: Sequelize.Sequelize;
	images: any;

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

	async getImageUrlById(id: number) {
		return await this.images.sync().then(() => {
			return this.images.findByPk(id);
		});
	}

	async createImage(url: string, carId: number, imageType: ImageType) {
		return await this.images.sync().then(() => {
			return this.images.create({
				url,
				carId,
				type: imageType.valueOf(),
			});
		});
	}
}

export default ImageController;
