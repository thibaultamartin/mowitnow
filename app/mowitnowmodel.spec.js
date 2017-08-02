const expect = require('chai').expect

const Parser = require('../parser')
const Grid   = require('../grid') 
const Mower  = require('../mower')
const Model  = require('./mowitnowmodel')


describe('The model', function(){
	it('can tell whether there are orders left to execute or not', function(){
		var parser = new Parser('./test_config.conf');
		var model = new Model(parser);
		expect(model.orders_left_to_execute()).to.be.true;
	})

	it('can tell if an execution generates locks', function() {
		var parser = new Parser('./test_config.conf');
		var model = new Model(parser);
		var grid = new Grid(5,6);
		var m1 = new Mower(grid, 1,1,'E');
		m1.load_orders(['A','G','A']);
		var m2 = new Mower(grid, 3,1,'W');
		m2.load_orders(['A','G','A']);
		model.grid   = grid;
		model.mowers = [m1,m2];
		console.log(m1.pretend_to_go_forward())
		console.log(m2.pretend_to_go_forward())
		expect(model.generate_locks(0)).to.be.true;

		var parser = new Parser('./test_config.conf');
		var model = new Model(parser);
		var grid = new Grid(5,6);
		var m1 = new Mower(grid, 1,1,'N');
		m1.load_orders(['A','G','A']);
		var m2 = new Mower(grid, 3,1,'E');
		m2.load_orders(['A','G','A']);
		model.grid   = grid;
		model.mowers = [m1,m2];
		console.log(m1.pretend_to_go_forward())
		console.log(m2.pretend_to_go_forward())
		expect(model.generate_locks(0)).to.be.false;
	})	
})