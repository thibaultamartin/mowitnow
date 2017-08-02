const expect = require('chai').expect

const Grid = require('./grid')

describe('The grid representing the surface to mow', function(){
	it('returns whether the coordinates given are in or out of bounds', function(){
		grid = new Grid(5,6);

		expect(grid.is_within_bounds( 2,  3)).to.be.true;
		expect(grid.is_within_bounds( 5,  6)).to.be.true;
		expect(grid.is_within_bounds(-1,  3)).to.be.false;
		expect(grid.is_within_bounds( 2, -5)).to.be.false;
		expect(grid.is_within_bounds( 7,  2)).to.be.false;
		expect(grid.is_within_bounds( 4, 28)).to.be.false;
	})
})