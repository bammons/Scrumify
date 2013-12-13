ig.module(
	'game.entities.levelchange-trigger'
)
.requires(
	'impact.entity',
	'game.director.director'
)
.defines(function(){
	
EntityLevelchangeTrigger = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 0, 255, 0.7)',
	target: {},

	checkAgainst: ig.Entity.TYPE.A,
	
	size: {x: 32, y: 32},
	level: null,
	first: true,

	check: function(other) {
		ig.game.changeLevel = true;
	}
});

});