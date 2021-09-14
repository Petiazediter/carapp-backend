import { getConnection } from './Database';
import Sequelize from 'sequelize';

export class CommentController {
	connection: Sequelize.Sequelize;
	comments: any;

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
				allowNull: true,
			},
			commentId: {
				type: Sequelize.INTEGER,
				field: 'commentId',
				allowNull: true,
			},
			message: {
				type: Sequelize.STRING,
				field: 'comment',
				allowNull: false,
			},
		});
	}

	getCommentsTable() {
		return this.comments;
	}

	async createComment(
		message: string,
		userId: number,
		carId: number | null,
		commentId: number | null
	) {
		return await this.comments.sync().then(() => {
			return this.comments.create({
				userId: userId,
				carId,
				commentId,
				message,
			});
		});
	}

	async getCommentById(id: number) {
		return await this.comments.sync().then(() => {
			return this.comments.findByPk(id);
		});
	}

	async getCommentsToComment(id: number) {
		return await this.comments.sync().then(() => {
			return this.comments.findAll({
				where: {
					commentId: id,
				},
			});
		});
	}
}
