import { getConnection } from './Database.js';
import Sequelize from 'sequelize';

export class CommentController {
	constructor() {
		this.connection = getConnection();
		this.comments = this.connection.define('comments', {
			id: {
				type: Sequelize.INTEGER,
				field: 'id',
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				field: 'userId',
				allowNull: false,
			},
			carId: {
				type: Sequelize.INTEGER,
				field: 'carId',
				allowNull: false,
			},
			comment: {
				type: Sequelize.STRING,
				field: 'comment',
				allowNull: false,
			},
		});
	}

	getCommentsTable() {
		return this.comments;
	}
}
