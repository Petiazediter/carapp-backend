type Image = {
	id: number;
	url: string;
	type: ImageType;
	carId: number;
};

export enum ImageType {
	EXTERIOR,
	INTERIOR,
	PAPER,
	VIDEO,
}

export default Image;
