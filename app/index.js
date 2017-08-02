const Parser = require('../parser')
const Grid   = require('../grid') 
const Mower  = require('../mower')
const Model  = require('./mowitnowmodel')

var parser = new Parser('./instructions.conf');
var model = new Model(parser);

var display = function(model) {
	var line = '-';
	for(var i=0;i<=model.grid.width;i++) {
		line += '--';
	}

	console.log(line);
	var currline = '|'
	for(var i=model.grid.height;i>=0;i--) {
		for(var j=0; j<=model.grid.width;j++) {
			var orientation = ' '
			for(var m=0; m<model.mowers.length; m++) {
				if(model.mowers[m].x_coordinate == j &&
				   model.mowers[m].y_coordinate == i) {
					orientation = model.mowers[m].current_orientation;
				}
			}
			currline += orientation+'|';
		}
		console.log(currline);
		console.log(line);
		currline = '|'
	}
}

var watchdog = 0;
while(model.orders_left_to_execute() && watchdog < 20) {
	display(model);
	model.execute_step();
	watchdog++;
}

