ig.module(
	'game.entities.scene-trigger'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntitySceneTrigger = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 0, 255, 0.7)',
	target: {},

	checkAgainst: ig.Entity.TYPE.A,
	
	size: {x: 20, y: 200},
	level: null,
	first: true,

	check: function(other) {
		ig.game.newScene = true;
		ig.game.drawingScene = true;
		ig.game.sceneName = this.sceneKey;
		this.kill();
	}
});

});