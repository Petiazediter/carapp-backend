import { getConnection } from './Database';
import Sequelize from 'sequelize';
import DbAnswer from '../types/controllers/ControllerAnswer';

export class AnswerController {
	connection: Sequelize.Sequelize;
	answers: any;

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
				allowNull: true,
			},
			answerId: {
				type: Sequelize.INTEGER,
				field: 'answerId',
				allowNull: true,
			},
			text: {
				type: Sequelize.STRING,
				field: 'answer',
				allowNull: false,
			},
		});
	}

	getAnswersTable() {
		return this.answers;
	}

	async addAnswer(answer: DbAnswer) {
		return await this.answers.sync().then(() => {
			return this.answers.create(answer);
		});
	}

	async getAnswerById(id: number) {
		return await this.answers.sync().then(() => {
			return this.answers.findByPk(id);
		});
	}

	async getAnswersToAnswer(id: number) {
		return await this.answers.sync().then(() => {
			return this.answers.findAll({
				where: {
					answerId: id,
				},
			});
		});
	}
}
