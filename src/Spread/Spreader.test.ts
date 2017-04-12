import * as chai from 'chai';
import { CanvasSize, spread, SpreadConfigSize } from '.';
import { Bounds } from '../Geo';
import { Place } from '../Places/Place';

const bounds: Bounds = {
	south: 0,
	west: 0,
	north: 1,
	east: 1
};
const canvas: CanvasSize = {
	width: 50,
	height: 50
};
const place: Place = {
	guid: 'poi:1',
	level: 'poi',
	rating: 10,
	quadkey: '0123',
	location: {lat: 0.1, lng: 0.1},
	boundingBox: null,
	name: 'Poi1',
	nameSuffix: '',
	url: '',
	price: 0,
	marker: 'resataurant',
	categories: [],
	parentGuids: [],
	perex: '',
	thumbnailUrl: 'http://example.com'
};

describe('Spreader', () => {
	describe('#spread', () => {
		it('should spread one items correctly', () => {
			const sizes: SpreadConfigSize[] = [
				{
					radius: 5,
					margin: 5,
					name: 'big'
				},
				{
					radius: 5,
					margin: 5,
					name: 'small'
				}
			];
			const spreaded = spread([place], sizes, bounds, canvas);
			chai.expect(spreaded.hidden.length).to.equal(0);
			chai.expect(spreaded.visible.length).to.equal(1);
			chai.expect(spreaded.visible[0].size.name).to.equal('big');
		});
	});

	it('should hide items correctly', () => {
		// No image
		let sizes: SpreadConfigSize[] = [
			{
				radius: 5,
				margin: 5,
				name: 'big',
				photoRequired: true
			}
		];
		const placeWithoutImage = Object.assign({}, place);
		placeWithoutImage.thumbnailUrl = null;
		let spreaded = spread([placeWithoutImage], sizes, bounds, canvas);
		chai.expect(spreaded.hidden.length).to.equal(1);
		chai.expect(spreaded.visible.length).to.equal(0);

		// Low rating
		sizes = [
			{
				radius: 5,
				margin: 5,
				name: 'big',
				minimalRating: 1000
			}
		];
		spreaded = spread([place], sizes, bounds, canvas);
		chai.expect(spreaded.hidden.length).to.equal(1);
		chai.expect(spreaded.visible.length).to.equal(0);

		// Same position
		sizes = [
			{
				radius: 5,
				margin: 5,
				name: 'big'
			}
		];
		spreaded = spread([place, place], sizes, bounds, canvas);
		chai.expect(spreaded.hidden.length).to.equal(1);
		chai.expect(spreaded.visible.length).to.equal(1);

		// Place out of canvas
		sizes = [
			{
				radius: 5,
				margin: 5,
				name: 'big'
			}
		];
		const place2 = Object.assign({}, place);
		place2.location = {lat: -0.3, lng: 10.3};
		spreaded = spread([place2], sizes, bounds, canvas);
		chai.expect(spreaded.hidden.length).to.equal(1);
		chai.expect(spreaded.visible.length).to.equal(0);
	});

	it('should use smaller size correctly', () => {
		const sizes: SpreadConfigSize[] = [
			{
				radius: 5,
				margin: 5,
				name: 'big'
			},
			{
				radius: 2,
				margin: 2,
				name: 'small'
			}
		];
		const place2 = Object.assign({}, place);
		place2.location = {lat: 0.3, lng: 0.3};
		place2.guid = 'poi:2';
		const spreaded = spread([place, place2], sizes, bounds, canvas);
		chai.expect(spreaded.hidden.length).to.equal(0);
		chai.expect(spreaded.visible.length).to.equal(2);
		chai.expect(spreaded.visible[0].size.name).to.equal('big');
		chai.expect(spreaded.visible[1].size.name).to.equal('small');
	});
});
