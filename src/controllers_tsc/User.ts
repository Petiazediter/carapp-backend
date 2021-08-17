import {
	Optional,
	Model,
	HasManyGetAssociationsMixin,
	HasManyCreateAssociationMixin,
} from 'sequelize';
import { Answer } from './Answer';

export interface UserAttrs {
	id: number;
	username: string;
	password: string;
	emailAddress: string;
}

export interface UserCreateAttrs extends Optional<UserAttrs, 'id'> {}

export class User
	extends Model<UserAttrs, UserCreateAttrs>
	implements UserAttrs
{
	public id!: number;
	public username!: string;
	public password!: string;
	public emailAddress!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public readonly getAnswers!: HasManyGetAssociationsMixin<Answer>;
	public readonly createAnswer!: HasManyCreateAssociationMixin<Answer>;
}
