ig.module(
        'game.director.director'
)
.requires(
        'impact.impact'
)
.defines(function(){

ig.Director = ig.Class.extend({
	//Initialize level and game objects
	//Level 1 initialized by default
	init: function(theGame, initialLevels){
		this.game = theGame;
		this.levels = [];
		this.currentLevel = 0;
		this.append(initialLevels);
		return this.loadLevel(this.currentLevel);
	},

	loadLevel: function(levelNumber){
		this.currentLevel = levelNumber;
		this.game.loadLevel(this.levels[levelNumber]);
		return true;
	},

	append: function(levels){
		//append a single new level to level list or an array of levels
		newLevels = [];
		if(typeof(levels) === 'object'){
			if(levels.constructor === (new Array).constructor){
				newLevels = levels;
			}
			else{
				newLevels[0] = levels;
			}
			this.levels = this.levels.concat(newLevels);
			return true;
		}
		else{
			return false;
		}
	},

	nextLevel: function(){
		//Go to next level in array if we are not at last element
		if(this.currentLevel + 1 < this.levels.length){
			return this.loadLevel(this.currentLevel + 1);
		}
		else{
			return false;
		}
	},

	previousLevel: function(){
		//Go to previous level in array if we not at the beginning of array
		if(this.currentLevel - 1 >= 0) {
			return this.loadLevel(this.currentLevel - 1);
		}
		else{
			return false
		}
	},

	jumpTo: function(requestedLevel){
		//requestedLevel should be a Level object
		//Check if level is in the level array
		var levelNumber = null;
		for(i = 0; i < this.levels.length; i++) {
			if(this.levels[i] == requestedLevel) {
				levelNumber = i;
			}
		}
		if(levelNumber >= 0) {
			return this.loadLevel(levelNumber);
		}
		else{
			return false;
		}
	},

	firstLevel: function(){
		//Load the first level
		return this.loadLevel(0);
	},

	lastLevel: function(){
		//Load last level
		return this.loadLevel(this.levels.length - 1);
	},

	reloadLevel: function(){
		//reset current level
		return this.loadLevel(this.currentLevel);
	}
});
});