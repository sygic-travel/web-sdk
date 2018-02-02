import * as chai from 'chai';

import { RouteRequest } from '.';
import { Location } from '../Geo';
import { route as apiRoute } from '../TestData/DirectionsApiResponses';
import { route as routeEntity } from '../TestData/DirectionsEntities';
import { TransportAvoid, TransportMode } from '../Trip';

import * as Mapper from './Mapper';

describe('RouteMapper', () => {

	describe('#mapRouteFromApiResponse', () => {

		it('should correctly map api response to response', () => {
			chai.expect(Mapper.mapRouteFromApiResponse(apiRoute, [], TransportMode.car))
				.to.deep.equal(routeEntity);
		});

	});

	describe('#createRouteRequest', () => {

		it('should correctly create route request from user data', () => {
			const origin: Location = {
				lat: 48.2,
				lng: 48.2
			};
			const destination: Location = {
				lat: 48.201,
				lng: 48.201
			};
			const expected: RouteRequest = {
				origin,
				destination,
				routeId: '30:50',
				avoid: [TransportAvoid.highways],
				chosenMode: TransportMode.car,
				waypoints: [{
					placeId: 'abc',
					location: {
						lat: 1,
						lng: 1
					}
				}],
			};
			chai.expect(Mapper.createRouteRequest(
				destination,
				origin,
				'30:50',
				[{
					placeId: 'abc',
					location: {
						lat: 1, lng: 1
					}
				}],
				[TransportAvoid.highways],
				TransportMode.car
			)).to.deep.equal(expected);
		});

		it('should correctly create route request using defaults and estimates', () => {
			const origin: Location = {
				lat: 48.2,
				lng: 48.2
			};
			const destination: Location = {
				lat: 48.201,
				lng: 48.201
			};
			const expected: RouteRequest = {
				origin,
				destination,
				routeId: null,
				avoid: [TransportAvoid.unpaved],
				chosenMode: TransportMode.pedestrian,
				waypoints: [],
			};
			chai.expect(Mapper.createRouteRequest(destination, origin))
				.to.deep.equal(expected);
		});
	});

});
