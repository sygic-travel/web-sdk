import { getPlaceDetailed, getPlaceDetailedBatch } from '../Places/index';
import * as Dao from './DataAccess';
import * as TripManipulator from './Manipulator';
import { putPlacesToTrip } from './Mapper';
import {
	Day,
	ItineraryItem,
	TransportAvoid,
	TransportMode,
	TransportType,
	Trip,
	TripMedia,
	TripPrivileges,
	TripUpdateData
} from './Trip';

export {
	Day,
	Dao,
	ItineraryItem,
	TransportAvoid,
	TransportMode,
	TransportType,
	Trip,
	TripMedia,
	TripPrivileges,
	TripUpdateData
};

export async function getTrips(dateFrom: string, dateTo: string): Promise<Trip[]> {
	return await Dao.getTrips(dateTo, dateFrom);
}

export async function getTripDetailed(id: string): Promise<Trip> {
	const tripWithoutPlaces: Trip = await Dao.getTripDetailed(id);
	if (tripWithoutPlaces.days) {
		const placesGuids: string[] = getPlacesIdsFromTrip(tripWithoutPlaces);
		return putPlacesToTrip(tripWithoutPlaces, await getPlaceDetailedBatch(placesGuids, '300x300'));
	}
	return tripWithoutPlaces;
}

export function getPlacesIdsFromTrip(trip: Trip): string[] {
	if (!trip.days) {
		return [];
	}

	const initAcc: string[] = [];
	return trip.days.reduce((acc, day: Day): string[] => ([
		...acc,
		...day.itinerary.map((itineraryItem: ItineraryItem): string => (itineraryItem.placeId))
	]), initAcc);
}

export async function updateTrip(id: string, dataToUpdate: TripUpdateData): Promise<Trip> {
	const tripToBeUpdated: Trip = await getTripDetailed(id);

	if (dataToUpdate.name) {
		tripToBeUpdated.name = dataToUpdate.name;
	}

	if (dataToUpdate.startsOn) {
		tripToBeUpdated.startsOn = dataToUpdate.startsOn;
	}

	if (dataToUpdate.privacyLevel) {
		tripToBeUpdated.privacyLevel = dataToUpdate.privacyLevel;
	}

	return await Dao.updateTrip(tripToBeUpdated);
}

export async function addDay(id: string): Promise<Trip> {
	return TripManipulator.addDay(await getTripDetailed(id));
}

export async function addDayToBeginning(id: string): Promise<Trip> {
	return TripManipulator.addDayToBeginning(await getTripDetailed(id));
}

export async function removeDay(id: string, dayIndex: number): Promise<Trip> {
	return TripManipulator.removeDay(await getTripDetailed(id), dayIndex);
}

export async function swapDays(id: string, firstDayIndex: number, secondDayIndex: number): Promise<Trip>  {
	return TripManipulator.swapDays(await getTripDetailed(id), firstDayIndex, secondDayIndex);
}

export async function movePlaceInDay(
	id: string,
	dayIndex: number,
	positionFrom: number,
	positionTo: number): Promise<Trip> {
	return TripManipulator.movePlaceInDay(await getTripDetailed(id), dayIndex, positionFrom, positionTo);
}

export async function removePlaceInDay(id: string, dayIndex: number, positionInDay: number): Promise<Trip> {
	return TripManipulator.removePlaceInDay(await getTripDetailed(id), dayIndex, positionInDay);
}

export async function addPlaceToDay(
	tripId: string,
	placeId: string,
	dayIndex: number,
	positionInDay?: number): Promise<Trip> {
	return TripManipulator.addPlaceToDay(
		await getTripDetailed(tripId),
		await getPlaceDetailed(placeId, '300x300'),
		dayIndex,
		positionInDay
	);
};
