ig.module(
	'game.entities.skull'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntitySkull = ig.Entity.extend({
	size: {x: 70, y: 70},
	gravityFactor: 0,

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet('media/SPRITE_level1.png', 70, 70),

	init: function(x, y, settings) {
		this.parent(x, y, settings);

		this.addAnim('sitting', 1, [62]);
	},

	check: function(other) {
		this.kill();
		ig.game.player.points += 10;
	}
});
});