import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import { SinonSandbox } from 'sinon';

import { setEnvironment } from '../Settings';
import * as Xhr from '../Xhr';
import { ApiResponse } from '../Xhr/ApiResponse';
import * as TripController from './index';

import * as PlaceTestData from '../TestData/PlacesApiResponses';
import * as TripTestData from '../TestData/TripApiResponses';
import * as TripExpectedResults from '../TestData/TripExpectedResults';

let sandbox: SinonSandbox;
chai.use(chaiAsPromised);

describe('TripController', () => {
	before((done) => {
		setEnvironment('api', '987654321');
		done();
	});

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('#getTrips', () => {
		it('should throw an exception when response without trips came', () => {
			sandbox.stub(Xhr, 'get').returns(new Promise<ApiResponse>((resolve) => {
				resolve(new ApiResponse(200, {}));
			}));
			return chai.expect(TripController.getTrips('2017-04-23', '2017-04-24')).to.be.rejected;
		});

		it('should return array of trips', () => {
			sandbox.stub(Xhr, 'get').returns(new Promise<ApiResponse>((resolve) => {
				resolve(new ApiResponse(200, TripTestData.tripsList));
			}));
			return chai.expect(TripController.getTrips('2017-04-23', '2017-04-24')).to.eventually.have.lengthOf(1);
		});

		it('should correctly map api response', () => {
			sandbox.stub(Xhr, 'get').returns(new Promise<ApiResponse>((resolve) => {
				resolve(new ApiResponse(200, TripTestData.tripsList));
			}));
			return chai.expect(TripController.getTrips('2017-04-23', '2017-04-24'))
				.to.eventually.deep.equal(TripExpectedResults.tripList);
		});
	});

	describe('#getTripDetailed', () => {
		it('should throw an exception when response without trip came', () => {
			sandbox.stub(Xhr, 'get').returns(new Promise<ApiResponse>((resolve) => {
				resolve(new ApiResponse(200, {}));
			}));
			return chai.expect(TripController.getTripDetailed('1234567890')).to.be.rejected;
		});

		it('should correctly map api response', () => {
			const stub = sandbox.stub(Xhr, 'get');

			stub.onCall(0).returns(new Promise<ApiResponse>((resolve) => {
				resolve(new ApiResponse(200, TripTestData.tripDetail));
			}));

			stub.onCall(1).returns(new Promise<ApiResponse>((resolve) => {
				const responsePlace1 = Object.assign({}, PlaceTestData.placeDetailedEiffelTowerWithoutMedia.place);
				responsePlace1.guid = 'poi:51098';
				resolve(new ApiResponse('200', 200, '', {
					place: responsePlace1
				}));
			}));

			stub.onCall(2).returns(new Promise<ApiResponse>((resolve) => {
				const responsePlace2 = Object.assign({}, PlaceTestData.placeDetailedEiffelTowerWithoutMedia.place);
				responsePlace2.guid = 'poi:48056';
				resolve(new ApiResponse('200', 200, '', {
					place: responsePlace2
				}));
			}));

			stub.onCall(3).returns(new Promise<ApiResponse>((resolve) => {
				const responsePlace3 = Object.assign({}, PlaceTestData.placeDetailedEiffelTowerWithoutMedia.place);
				responsePlace3.guid = 'poi:48015';
				resolve(new ApiResponse('200', 200, '', {
					place: responsePlace3
				}));
			}));

			stub.onCall(4).returns(new Promise<ApiResponse>((resolve) => {
				const responsePlace4 = Object.assign({}, PlaceTestData.placeDetailedEiffelTowerWithoutMedia.place);
				responsePlace4.guid = 'poi:48071';
				resolve(new ApiResponse('200', 200, '', {
					place: responsePlace4
				}));
			}));

			return chai.expect(TripController.getTripDetailed('1234567890'))
				.to.eventually.deep.equal(TripExpectedResults.tripDetailed);
		});
	});

	describe('#getPlacesGuidsFromTrip', () => {
		it('should get places guids from mapped trip', () => {
			return chai.expect(TripController.getPlacesGuidsFromTrip(TripExpectedResults.tripDetailed)).to.deep.equal([
				'poi:51098', 'poi:48056', 'poi:48015', 'poi:48071'
			]);
		});
	});
});
