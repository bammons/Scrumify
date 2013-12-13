ig.module(
	'game.entities.page'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPage = ig.Entity.extend({
	size: {x: 70, y: 70},
	gravityFactor: 0,

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet('media/SPRITE_level2.png', 70, 70),

	init: function(x, y, settings) {
		this.parent(x, y, settings);

		this.addAnim('sitting', 1, [25]);
	},

	check: function(other) {
		ig.game.newPage = true;
		ig.game.drawingScene = true;
		ig.game.sceneName = this.page;
		this.kill();
	}
});
});