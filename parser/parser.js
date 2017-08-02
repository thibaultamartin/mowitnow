const fs = require('fs')
const Grid = require('../grid')
const Mower = require('../mower')

// Remove all the extra spacing, and split arround spaces
var parse_line = function(line) {
	return line.replace(/\t+/g,' ')
	           .replace(/ +/g, ' ')
	           .split(' ')
	           .filter(function(word) {
	           		return word.length>0;
	           	});
}

function Parser(path_to_config_file) {
	this.path_to_config_file = path_to_config_file;

	// Turn the file into an array of lines
	// take care of silly windows fs which uses \r\n
	var lines = fs.readFileSync(path_to_config_file)
	              .toString()
	              .replace(/\r\n/g,'\n') // Yes, I'm looking at you, Windows filesystem
	              .split('\n');

	var i=0;

	// Retrieve the grid size
	// be tolerant about extra spacing before the initial position
	var grid_width  = NaN;
	var grid_height = NaN;
	do{
		var parsed_line = parse_line(lines[i]);
		if(parsed_line.length == 2) {
			grid_width  = parseInt(parsed_line[0]);
			grid_height = parseInt(parsed_line[1]);
		}

		i++;
	}while((grid_width == NaN || grid_height == NaN) && i < lines.length);

	this.grid = new Grid(grid_width, grid_height);
	this.mowers = [];

	do{
		var parsed_line = parse_line(lines[i]);
		if(parsed_line.length == 3) {
			var mower_x = parseInt(parsed_line[0]);
			var mower_y = parseInt(parsed_line[1]);
			var orientation = parsed_line[2];

			i++;
			var orders = parse_line(lines[i]);
			if(orders.length ==1) {
				var mower = new Mower(this.grid, mower_x, mower_y, orientation);
				mower.load_orders(orders[0].split(''));
				this.mowers.push(mower);
			} else throw Error("File improperly formatted at line "+i)
			i++;
		} else throw Error("File improperly formatted at line "+i)
	}while(i < lines.length-1)
}

module.exports = Parser