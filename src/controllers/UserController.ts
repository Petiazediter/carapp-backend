import { getConnection } from './Database';
import Sequelize from 'sequelize';

export class UserController {
	connection: Sequelize.Sequelize;
	users: any;

	constructor() {
		this.connection = getConnection();
		this.users = this.connection.define('users', {
			id: {
				type: Sequelize.INTEGER,
				field: 'id',
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: Sequelize.STRING,
				field: 'username',
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				field: 'password',
				allowNull: false,
			},
			emailAddress: {
				type: Sequelize.STRING,
				field: 'email',
				allowNull: false,
			},
		});
	}

	getUsersTable() {
		return this.users;
	}

	async getUserByEmailOrUsername(emailAddress: string, username: string) {
		return await this.users.findOne({
			where: {
				[Sequelize.Op.or]: [
					{ emailAddress: emailAddress },
					{ username: username },
				],
			},
		});
	}

	async createUser(user: {
		emailAddress: string;
		username: string;
		password: string;
	}) {
		if (user) {
			const dbUser = await this.getUserByEmailOrUsername(
				user.emailAddress,
				user.username
			);
			if (!dbUser) {
				return await this.users.create(user);
			}
		} else {
			throw new Error('Error while create user! Field(s) missing.');
		}
	}

	async findUserByUsername(username: string) {
		return await this.users.sync().then(() => {
			return this.users.findOne({
				where: {
					username: username,
				},
			});
		});
	}

	async findUserById(id: number) {
		return await this.users.sync().then(() => {
			return this.users.findOne({
				where: {
					id: id,
				},
			});
		});
	}
}
