import {
	Optional,
	Model,
	HasOneGetAssociationMixin,
	HasOneCreateAssociationMixin,
} from 'sequelize';
import { User } from './User';

export interface AnswerAttrs {
	id: number;
	userId: number;
	commentId: number | null;
	answerId: number | null;
	text: string;
}

export interface AnswerCreateAttrs extends Optional<AnswerAttrs, 'id'> {}

export class Answer
	extends Model<AnswerAttrs, AnswerCreateAttrs>
	implements AnswerAttrs
{
	public id!: number;
	public userId!: number;
	public commentId!: number | null;
	public answerId!: number | null;
	public text!: string;

	//timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public readonly getUser!: HasOneGetAssociationMixin<User>;
	public readonly createUser!: HasOneCreateAssociationMixin<User>;
	public readonly getComment!: HasOneGetAssociationMixin<>;
	public readonly createComment!: HasOneCreateAssociationMixin<>;
}
