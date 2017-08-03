const Parser = require('../parser')
const Grid   = require('../grid') 
const Mower  = require('../mower')
const Model  = require('./mowitnowmodel')

const winston = require('winston')
winston.level = process.env.LOG_LEVEL

winston.log('info', 'Application started and ready to execute')

var display = function(model) {
	var display_string = '';
	var line = '-';
	for(var i=0;i<=model.grid.width;i++) {
		line += '--';
	}

	//console.log(line);
	display_string += line+'\n';
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
		// console.log(currline);
		// console.log(line);
		display_string += currline+'\n';
		display_string += line;
		currline = '\n|'
	}

	return display_string;
}

try {
	var parser = new Parser('./instructions.conf');
	var model = new Model(parser);

	var iteration = 0;
	const watchdog = 50;
	winston.log('debug','Watchdog set to '+watchdog+' steps.')
	while(model.orders_left_to_execute() && iteration < watchdog) {
		winston.log('debug', 'Step '+iteration+'\n'+display(model))
		model.execute_step();
		iteration++;
	}

	var final_state = '';
	for(var i=0; i<model.mowers.length; i++) {
		var mower = model.mowers[i];
		final_state += mower.x_coordinate+' '+mower.y_coordinate+' '+mower.current_orientation+'\n';
	}
	winston.log('info', 'Final state: \n'+final_state);
} catch (err) {
	winston.log('error', 'Application could not find instructions file')
}
