const Parser = require('../parser')
const Grid   = require('../grid') 
const Mower  = require('../mower')

const winston = require('winston')
winston.level = process.env.LOG_LEVEL

function MowItNowModel(parser) {
	this.grid = parser.grid;
	this.mowers = parser.mowers;
	winston.log('debug','Model constructed wuth characteristics',this)
}

MowItNowModel.prototype.orders_left_to_execute = function() {
	for(var i=0; i<this.mowers.length; i++) {
		if(this.mowers[i].orders_to_come.length > 0) {
			winston.log('debug', 'Some orders left to execute');
			return true;
		}
	}
	winston.log('debug', 'No orders left to execute');
	return false;
}

MowItNowModel.prototype.execute_step = function() {
	for(var i=0; i<this.mowers.length; i++) {
		var mower = this.mowers[i];
		if(mower.orders_to_come.length > 0 && !this.generate_locks(i)) {
			var order = mower.orders_to_come[0];
			if(mower.execute_order(order)) {
				mower.orders_to_come.shift();
			}
		}
	}
}

MowItNowModel.prototype.generate_locks = function(mower_position) {
	if(this.mowers[mower_position].orders_to_come[0] == Mower.order.GO_FORWARD) {
		for(var i=mower_position+1; i<this.mowers.length; i++) {
			if(this.mowers[i].orders_to_come[0] == Mower.order.GO_FORWARD &&
			   this.mowers[i].orders_to_come.length > 1) {
				var other_next_coordinates = this.mowers[i].pretend_to_go_forward();
				var my_next_coordinates = this.mowers[mower_position].pretend_to_go_forward();
				if(other_next_coordinates[0] == my_next_coordinates[0] &&
				   other_next_coordinates[1] == my_next_coordinates[1]) {
				   	winston.log('debug', 'This step generates locks');
					return true;
				}
			}
		}
	}
	return false;
}

module.exports = MowItNowModel;