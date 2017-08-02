const expect = require('chai').expect

const Mower = require('./mower')
const Grid  = require('../grid')

describe('The mower which moves on a grid', function() {
	it('turns to the appropriate orientation given the order \'G\' or \'D\'', function() {
		grid = new Grid(5,6);

		// Testing 'G' order
		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'N');
		mower.execute_order('G');
		expect(mower.current_orientation).to.eql('W');

		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'E');
		mower.execute_order('G');
		expect(mower.current_orientation).to.eql('N');

		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'S');
		mower.execute_order('G');
		expect(mower.current_orientation).to.eql('E');

		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'W');
		mower.execute_order('G');
		expect(mower.current_orientation).to.eql('S');


		// Testing 'D' order
		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'N');
		mower.execute_order('D');
		expect(mower.current_orientation).to.eql('E')

		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'E');
		mower.execute_order('D');
		expect(mower.current_orientation).to.eql('S');

		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'S');
		mower.execute_order('D');
		expect(mower.current_orientation).to.eql('W');

		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'W');
		mower.execute_order('D');
		expect(mower.current_orientation).to.eql('N');
	})

	it('goes in the appropriate direction when instructed with order \'A\' and is in grid bounds', function() {
		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'N');
		mower.execute_order('A');
		expect(mower.x_coordinate).to.eql(1);
		expect(mower.y_coordinate).to.eql(3);

		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'E');
		mower.execute_order('A');
		expect(mower.x_coordinate).to.eql(2);
		expect(mower.y_coordinate).to.eql(2);

		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'S');
		mower.execute_order('A');
		expect(mower.x_coordinate).to.eql(1);
		expect(mower.y_coordinate).to.eql(1);

		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'W');
		mower.execute_order('A');
		expect(mower.x_coordinate).to.eql(0);
		expect(mower.y_coordinate).to.eql(2);
	})

	it('returns the appropiate coordinates when instructed to pretend to go forward', function() {
		// Testing within bounds
		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'N');
		expect(mower.pretend_to_go_forward()).to.eql([1,3]);

		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'E');
		expect(mower.pretend_to_go_forward()).to.eql([2,2]);

		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'S');
		expect(mower.pretend_to_go_forward()).to.eql([1,1]);

		grid = new Grid(5,6);
		mower = new Mower(grid, 1,2,'W');
		expect(mower.pretend_to_go_forward()).to.eql([0,2]);

		// Testing when trying to get out of bounds
		grid = new Grid(5,6);
		mower = new Mower(grid, 2,6,'N');
		expect(mower.pretend_to_go_forward()).to.eql([2,6]);

		grid = new Grid(5,6);
		mower = new Mower(grid, 5,2,'E');
		expect(mower.pretend_to_go_forward()).to.eql([5,2]);

		grid = new Grid(5,6);
		mower = new Mower(grid, 3,0,'S');
		expect(mower.pretend_to_go_forward()).to.eql([3,0]);

		grid = new Grid(5,6);
		mower = new Mower(grid, 0,2,'W');
		expect(mower.pretend_to_go_forward()).to.eql([0,2]);
	})

	it('stays within the grid bounds', function() {		
		grid = new Grid(5,6);
		mower = new Mower(grid, 2,6,'N');
		mower.execute_order('A');
		expect(mower.x_coordinate).to.eql(2);
		expect(mower.y_coordinate).to.eql(6);

		grid = new Grid(5,6);
		mower = new Mower(grid, 5,3,'E');
		mower.execute_order('A');
		expect(mower.x_coordinate).to.eql(5);
		expect(mower.y_coordinate).to.eql(3);

		grid = new Grid(5,6);
		mower = new Mower(grid, 3,0,'S');
		mower.execute_order('A');
		expect(mower.x_coordinate).to.eql(3);
		expect(mower.y_coordinate).to.eql(0);

		grid = new Grid(5,6);
		mower = new Mower(grid, 0,2,'W');
		mower.execute_order('A');
		expect(mower.x_coordinate).to.eql(0);
		expect(mower.y_coordinate).to.eql(2);	
	})

	it('cannot be at the same place as another mower', function() {
		grid = new Grid(5,6);
		mower1 = new Mower(grid, 1,2,'N');
		expect(function() {new Mower(grid, 1,2,'E')}).to.throw("Two mowers cannot be at the same place");

		grid = new Grid(5,6);
		mower1 = new Mower(grid, 1,2,'N');
		mower2 = new Mower(grid, 1,3,'W');
		mower1.execute_order('A');
		expect(mower1.x_coordinate).to.eql(1);
		expect(mower1.y_coordinate).to.eql(2);
		expect(mower2.x_coordinate).to.eql(1);
		expect(mower2.y_coordinate).to.eql(3);
	})
})