import { StringLiteralLike } from 'typescript';

type DbImage = {
	id: number;
	url: StringLiteralLike;
	carId: number;
	type: string;
};
export default DbImage;
