import { Event } from './Event';

import { StApi } from '../Api';
import { ChangeNotification, setChangesCallback } from '../Changes';
import { setTripConflictHandler } from '../Settings';
import { Trip, TripConflictClientResolution, TripConflictInfo } from '../Trip';
import { setUserSession } from '../User';

export { Event };

let externalEventHandler: (event: Event) => any;

export function setEventsHandler(handler: (event: Event) => any): void {
	externalEventHandler = handler;
}

export function initalize(): void {
	setChangesCallback(handleUserDataChanges);
	setTripConflictHandler(handleTripConflict);
	StApi.setInvalidSessionHandler(handleInvalidSession);
}

function handleUserDataChanges(changes: ChangeNotification[]): void {
	if (!externalEventHandler) {
		return;
	}

	const event: Event = {
		type: 'user_data_changes',
		payload: changes
	};

	externalEventHandler(event);
}

async function handleTripConflict(conflictInfo: TripConflictInfo, trip: Trip): Promise<TripConflictClientResolution> {
	if (!externalEventHandler) {
		return 'server';
	}

	const event: Event = {
		type: 'trip_conflict',
		payload: {
			conflictInfo,
			trip
		}
	};

	const conflictResolution = externalEventHandler(event);
	if (!conflictResolution) {
		return 'server';
	}
	return conflictResolution;
}

async function handleInvalidSession(): Promise<void> {
	const event: Event = {
		type: 'invalid_session',
		payload: null
	};

	await setUserSession(null);

	if (externalEventHandler) {
		externalEventHandler(event);
	}
}