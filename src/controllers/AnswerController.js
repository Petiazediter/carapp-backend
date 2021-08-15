import { getConnection } from './Database.js';
import Sequelize from 'sequelize';

export class AnswerController {
	constructor() {
		this.connection = getConnection();
		this.answers = this.connection.define('answers', {
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
			commentId: {
				type: Sequelize.INTEGER,
				field: 'commentId',
				allowNull: false,
			},
			answer: {
				type: Sequelize.STRING,
				field: 'answer',
				allowNull: false,
			},
		});
	}

	getAnswersTable() {
		return this.answers;
	}

	async addAnswer(answer) {
		return await this.answers.sync().then(() => {
			return this.answers.create(answer);
		});
	}

	async getAnswerById(id) {
		return await this.answers.sync().then(() => {
			return this.answers.findByPk(id);
		});
	}
}
