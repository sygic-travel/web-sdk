import { Bounds, Location } from '../Geo';
import { Place } from '../Places';
import { TripDayRoutes } from '../Route';

export interface PdfQuery {
	tripId: string;
	mainMapWidth: number;
	mainMapHeight: number;
	gridRowsCount: number;
	gridColumnsCount: number;
	secondaryMapWidth: number;
	secondaryMapHeight: number;
}

export interface PdfData {
	destinations: PdfDestination[];
	routes: TripDayRoutes[];
	tripStaticMapUrl: string;
}

export interface PdfDestination {
	destination: Place;
	mainMap: PdfStaticMap | null;
	secondaryMaps: PdfStaticMap[];
	places: Place[];
	placeSources: Map<string, PlaceSource>;
}

export interface PdfStaticMapSector {
	id: string;
	bounds: Bounds;
	places: Place[];
}

export interface PdfStaticMap extends StaticMap {
	id: string;
	sectors: PdfStaticMapSector[];
}

export interface StaticMapPoint extends Location {
	image?: string;
}

export interface StaticMap {
	url: string;
	bounds: Bounds;
}

export interface GeneratingState {
	generatingId: string;
	state: 'generating' | 'done' | 'not_found' | 'timeout';
	url: string | null;
}

export enum PlaceSource {
	FROM_TRIP = 'FROM_TRIP',
	FROM_COLLECTION = 'FROM_COLLECTION',
	FROM_FAVORITES = 'FROM_FAVORITES'
}
