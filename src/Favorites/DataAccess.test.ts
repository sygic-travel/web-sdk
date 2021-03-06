import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { assert, sandbox as sinonSandbox, SinonSandbox, SinonStub } from 'sinon';

import { ApiResponse, StApi } from '../Api';
import { favoritesCache } from '../Cache';
import { setEnvironment } from '../Settings';

import * as Dao from './DataAccess';

let sandbox: SinonSandbox;
chai.use(chaiAsPromised);

describe('FavoritesDataAccess', () => {
	before((done) => {
		setEnvironment({ stApiUrl: 'api', integratorApiKey: '987654321' });
		done();
	});

	beforeEach(() => {
		sandbox = sinonSandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
		favoritesCache.reset();
	});

	const apiData = {
		favorites: [
			{ place_id: 'poi:1'},
			{ place_id: 'poi:2'}
		]
	};

	const favoritesData = ['poi:1', 'poi:2'];

	describe('#shouldNotifyOnFavoritesUpdate', () => {
		it('should reload all favorites guids from api', () => {
			const stub: SinonStub = sandbox.stub(StApi, 'get').returns(new Promise<ApiResponse>((resolve) => {
				resolve(new ApiResponse(200, apiData));
			}));

			return Dao.shouldNotifyOnFavoritesUpdate('').then(() => {
				assert.calledOnce(stub);
				chai.expect(favoritesCache.getAll()).to.eventually.deep.equal(favoritesData);
			});
		});
	});

	describe('#addPlaceToFavorites', () => {
		it('should add place to favorites and also to cache', async () => {
			sandbox.stub(StApi, 'post');
			await Dao.addPlaceToFavorites('poi:530');
			return chai.expect(favoritesCache.getAll()).to.eventually.deep.equal(['poi:530']);
		});
	});

	describe('removePlaceFromFavorites', () => {
		it('should remove a place from favorites and also from cache', async () => {
			sandbox.stub(StApi, 'delete_').returns(new Promise<ApiResponse>((resolve) => {
				resolve(new ApiResponse(200, {}));
			}));
			favoritesCache.set('poi:530', 'poi:530');
			favoritesCache.set('poi:531', 'poi:531');
			await Dao.removePlaceFromFavorites('poi:530');
			return chai.expect(favoritesCache.getAll()).to.eventually.deep.equal(['poi:531']);
		});
	});
});
