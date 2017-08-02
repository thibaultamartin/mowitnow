function Mower(grid, initial_x, initial_y, orientation) {
	if(grid === undefined) return new Error("The grid provided cannot be undefined");
	if(!grid.is_within_bounds(initial_x,initial_y)) return new Error("The mower must be within the grid bounds");

	if(orientation != Mower.orientation.NORTH &&
	   orientation != Mower.orientation.EAST  &&
	   orientation != Mower.orientation.SOUTH &&
	   orientation != Mower.orientation.WEST) return new Error("The mower orientation provided is not supported");

	this.grid = grid;
	this.x_coordinate = initial_x;
	this.y_coordinate = initial_y;
	this.current_orientation = orientation;
	this.grid.add_to_grid(this);
}

Object.defineProperty(Mower, 'orientation', {
	value: {
		NORTH: 'N',
		EAST : 'E',
		SOUTH: 'S',
		WEST : 'W'
	},
	writeable: false,
	enumerable: true,
	configurable: false
})

Object.defineProperty(Mower, 'order', {
	value: {
		TURN_LEFT : 'G',
		TURN_RIGHT: 'D',
		GO_FORWARD: 'A'
	},
	writeable: false,
	enumerable: true,
	configurable: false
})

Mower.prototype.turn_left = function() {
	switch(this.current_orientation) {
		case Mower.orientation.NORTH:
			this.current_orientation = Mower.orientation.WEST;
			break;
		case Mower.orientation.EAST:
			this.current_orientation = Mower.orientation.NORTH;
			break;
		case Mower.orientation.SOUTH:
			this.current_orientation = Mower.orientation.EAST;
			break;
		case Mower.orientation.WEST:
			this.current_orientation = Mower.orientation.SOUTH;
			break;
		default:
			return new Error("Mower orientation was in invalid state");
	}
}

Mower.prototype.turn_right = function() {
	switch(this.current_orientation) {
		case Mower.orientation.NORTH:
			this.current_orientation = Mower.orientation.EAST;
			break;
		case Mower.orientation.EAST:
			this.current_orientation = Mower.orientation.SOUTH;
			break;
		case Mower.orientation.SOUTH:
			this.current_orientation = Mower.orientation.WEST;
			break;
		case Mower.orientation.WEST:
			this.current_orientation = Mower.orientation.NORTH;
			break;
		default:
			return new Error("Mower orientation was in invalid state");
	}
}

Mower.prototype.go_forward = function() {
	var next_x = this.x_coordinate;
	var next_y = this.y_coordinate;

	switch(this.current_orientation) {
		case Mower.orientation.NORTH:
			next_y++;
			break;
		case Mower.orientation.EAST:
			next_x++;
			break;
		case Mower.orientation.SOUTH:
			next_y--;
			break;
		case Mower.orientation.WEST:
			next_x--;
			break;
		default:
			return new Error("Mower orientation was in invalid state");
	}

	if(this.grid.is_within_bounds(next_x, next_y) &&
	   !this.grid.a_mower_is_already_here_by_coordinates(next_x, next_y)) {
		this.x_coordinate = next_x;
		this.y_coordinate = next_y;
		return true;
	} else {
		return !this.grid.a_mower_is_already_here_by_coordinates(next_x, next_y);
	}
}

Mower.prototype.load_orders = function(array_of_orders) {
	if(this.orders_to_come === undefined) {
		this.orders_to_come = array_of_orders;
	} else {
		this.orders_to_come.concat(array_of_orders);
	}
}

Mower.prototype.execute_order = function(order) {
	switch(order) {
		case Mower.order.TURN_LEFT:
			this.turn_left();
			return true;
			break;
		case Mower.order.TURN_RIGHT:
			this.turn_right();
			return true;
			break;
		case Mower.order.GO_FORWARD:
			return this.go_forward();
			break;
		default:
			break;
	}
}

Mower.prototype.pretend_to_go_forward = function() {
	var next_x = this.x_coordinate;
	var next_y = this.y_coordinate;

	switch(this.current_orientation) {
		case Mower.orientation.NORTH:
			next_y++;
			break;
		case Mower.orientation.EAST:
			next_x++;
			break;
		case Mower.orientation.SOUTH:
			next_y--;
			break;
		case Mower.orientation.WEST:
			next_x--;
			break;
		default:
			return new Error("Mower orientation was in invalid state");
	}

	if(this.grid.is_within_bounds(next_x, next_y) &&
	   !this.grid.a_mower_is_already_here_by_coordinates(next_x, next_y)) {
		return [next_x, next_y];
	} else {
		return [this.x_coordinate, this.y_coordinate];
	}
}

module.exports = Mower;