import { BaseSDK } from './BaseSDK';
import { Bounds } from './Geo';
import { Medium } from './Media';
import { getPlaceDetailed, getPlaceMedia, getPlaces, Place, PlacesFilter, PlacesFilterJSON } from './Places';
import { CanvasSize, spread, SpreadResult, SpreadSizeConfig } from './Spread';

export default class StSDK extends BaseSDK {
	public getPlaces(filter: PlacesFilterJSON): Promise<Place[]> {
		return getPlaces(new PlacesFilter(filter));
	}

	public getPlaceDetailed(guid: string, photoSize: string): Promise<Place> {
		return getPlaceDetailed(guid, photoSize);
	}

	public getPlaceMedia(guid: string): Promise<Medium[]> {
		return getPlaceMedia(guid);
	}

	public spreadPlacesOnMap(
		places: Place[],
		markerSizes: SpreadSizeConfig[],
		bounds: Bounds,
		canvas: CanvasSize
	): SpreadResult {
		return spread(places, markerSizes, bounds, canvas);
	}
}