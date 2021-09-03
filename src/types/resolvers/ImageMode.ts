type Image = {
	id: number;
	url: string;
	type: ImageType;
	carId: number;
};

export enum ImageType {
	EXTERIOR = 'EXTERIOR',
	INTERIOR = 'INTERIOR',
	PAPER = 'PAPER',
	VIDEO = 'VIDEO',
}

export default Image;
