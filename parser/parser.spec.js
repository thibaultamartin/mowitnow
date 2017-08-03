const expect = require('chai').expect

const Parser = require('./parser')
const Mower  = require('../mower')

describe('The file reader/parser', function() {
	it('is able to determine the initial grid size', function() {
		parser = new Parser('./parser/test_config.conf');
		
		expect(parser.grid.width  == 5);
		expect(parser.grid.height == 5);
	})

	it('is able to determine the initial position and orientation of the first mower', function(){
		parser = new Parser('./parser/test_config.conf');

		expect(parser.mowers[0]).to.exist;
		expect(parser.mowers[0].x_coordinate).to.eql(1);
		expect(parser.mowers[0].y_coordinate).to.eql(2);
		expect(parser.mowers[0].current_orientation).to.be.eql('N');
	})

	it('is able to read orders for the first mower', function() {
		parser = new Parser('./parser/test_config.conf');
		
		expect(parser.mowers[0].orders_to_come).to.exist;
		expect(parser.mowers[0].orders_to_come).to.eql(['G','A','G','A','G','A','G','A','A']);
	})

	it('is able to tell how many mower are configured with one file', function() {
		parser = new Parser('./parser/test_config.conf');

		expect(parser.mowers.length).to.eql(3);
	})
})