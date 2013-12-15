ig.module(
	'game.entities.reverse-chest'
)
.requires(
	'impact.entity',
	'game.entities.page'
)
.defines(function(){

EntityReverseChest = ig.Entity.extend({
	size: {x: 75, y: 53},

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet('media/chest_sprite.png', 75, 53),

	init: function(x, y, settings) {
		this.parent(x, y, settings);

		this.addAnim('closed', 1, [0]);
		this.addAnim('open', 0.08, [1,2], true);
		this.currentAnim.flip.x = true;
	},

	update: function() {
		this.currentAnim.flip.x = true;
	},

	check: function(other) {
		this.currentAnim = this.anims.open;
		ig.game.newQuestion = true;
		ig.game.drawingScene = true;
		ig.game.sceneName = this.question;
		ig.game.pageName = this.page;
		this.kill();
	}
});
});