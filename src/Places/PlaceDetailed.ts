import { PlaceDetailMedia } from '../Media/Media';

export interface PlaceDetail {
	tags: Tag[];
	address: string;
	admission: string;
	description: Description;
	email: string;
	duration: number;
	openingHours: string;
	phone: string;
	media: PlaceDetailMedia;
	references: Reference[];
}

export interface Reference {
	id: number;
	title: string;
	type: string;
	languageId: string;
	url: string;
	offlineFile?: any;
	supplier: string;
	priority: number;
	isPremium: boolean;
	currency: string;
	price?: number;
	flags: any[];
}

export interface Tag {
	key: string;
	name: string;
}

export interface Description {
	text: string;
	provider: string;
	translationProvider?: string;
	url?: string;
}
