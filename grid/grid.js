function Grid(width, height) {
	if (width  < 0      ||
	    height < 0      ||
		(width > 10 && width % 10 != 0) ||
		(height > 10 && height % 10 != 0)) return new Error("Grid coordinates must be positive integers");

	this.width = width;
	this.height = height;
	this.mowers = [];
}

Grid.prototype.mower_is_already_known = function(mower) {
	return this.mowers.indexOf(mower) != -1;
}

Grid.prototype.a_mower_is_already_here = function(mower) {
	for (var i = 0; i < this.mowers.length; i++) {
		var m = this.mowers[i];
		if(m.x_coordinate == mower.x_coordinate &&
		   m.y_coordinate == mower.y_coordinate) return true;
	}
	return false;
}

Grid.prototype.a_mower_is_already_here_by_coordinates = function(x, y) {
	for(var i = 0; i < this.mowers.length; i++) {
		var m = this.mowers[i];
		if(m.x_coordinate == x &&
		   m.y_coordinate == y) return true;
	}
	return false;	
}

Grid.prototype.is_within_bounds = function(x,y){
	return (0 <= x && x <= this.width &&
		    0 <= y && y <= this.height);
}

Grid.prototype.add_to_grid = function(mower) {
	if(this.mower_is_already_known(mower))  throw new Error("This mower is already known");
	if(this.a_mower_is_already_here(mower)) throw new Error("Two mowers cannot be at the same place");

	this.mowers.push(mower);
}

module.exports = Grid;