ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'plugins.wordwrap',

	'game.entities.enemy-fireball',
	'game.entities.enemy-punch',
	'game.entities.enemy-sprint',
	'game.entities.chest',
	'game.entities.reverse-chest',
	'game.entities.skull',
	'game.entities.player',
	'game.entities.phantom',
	'game.entities.page',

	'game.entities.levelchange-trigger',
	'game.entities.scene-trigger',

	'game.levels.level1',
	'game.levels.level2',
	'game.levels.level3',
	'game.levels.level4',

	'game.director.director',
	'game.director.scene-manager'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	gravity: 800,
	sceneName: 'None',
	chageLevel: false,
	newScene: false,
	drawingScene: false,
	isKeyDown: false,
	newPage: false,
	newQuestion: false,

	STATE: {
		GAMEOVER: 0,
		GAMEPLAYING: 1,
		PLAYERDEAD: 2,
		LEVELTRANSITION: 3,
		CUTSCENE: 4
	},
	
	
	init: function() {
		// Initialize your game here; bind keys etc.

		//Action keys
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.SPACE, 'jump');
		ig.input.bind(ig.KEY.UP_ARROW, 'double-jump');
		ig.input.bind(ig.KEY.X, 'attack');
		//Scene progression
		ig.input.bind(ig.KEY.ENTER, 'ok');
		ig.input.bind(ig.KEY.ESC, 'stop');
		//Answer questions
		ig.input.bind(ig.KEY.A, 'A');
		ig.input.bind(ig.KEY.B, 'B');
		ig.input.bind(ig.KEY.C, 'C');
		ig.input.bind(ig.KEY.D, 'D');
		ig.input.bind(ig.KEY.T, 'TRUE');
		ig.input.bind(ig.KEY.F, 'FALSE');

		this.myDirector = new ig.Director(this, [LevelLevel1,LevelLevel2,LevelLevel3]); //LevelLevel1,LevelLevel2,
		this.myScenes = new ig.SceneManager();		
	},
	
	update: function() {
		// Update all entities and backgroundMaps

		this.parent();

		this.screen.x = this.player.pos.x - ig.system.width/2;
		this.screen.y = this.player.pos.y - ig.system.height/2;

		// Add your own, additional update code here
		if(this.changeLevel) {
			this.myDirector.nextLevel();
			this.changeLevel = false;
		}

		if(ig.input.state('ok')) {
			this.isKeyDown = true;
		}

		if(!ig.input.state('ok') && this.isKeyDown) {
			this.isKeyDown = false;
			this.myScenes.nextLine = true;
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		if(this.newScene) {
			if(this.myScenes.nextLine) {
				this.myScenes.runScene(this.sceneName);
			}
		}

		if(this.newPage) {
			if(this.myScenes.nextLine) {
				this.myScenes.runPage(this.sceneName);
			}
		}

		if(this.newQuestion) {
			if(ig.input.state('A')) {
				this.myScenes.answer = 'A';
				this.isKeyDown = true;
			}
			else if(ig.input.state('B')) {
				this.myScenes.answer = 'B';
				this.isKeyDown = true;
			}
			else if(ig.input.state('C')) {
				this.myScenes.answer = 'C';
				this.isKeyDown = true;
			}
			else if(ig.input.state('D')) {
				this.myScenes.answer = 'D';
				this.isKeyDown = true;
			}
			else if(ig.input.state('TRUE')) {
				this.myScenes.answer = 'TRUE';
				this.isKeyDown = true;
			}
			else if(ig.input.state('FALSE')) {
				this.myScenes.answer = 'FALSE'
				this.isKeyDown = true;
			}

			if(this.isKeyDown && !ig.input.state('FALSE') && !ig.input.state('TRUE') && !ig.input.state('A') && !ig.input.state('B') && !ig.input.state('C') && !ig.input.state('D')) {
				this.myScenes.nextLine = true;
				this.isKeyDown = false;
			}

			if(this.myScenes.nextLine) {
				this.myScenes.runQuestion(this.sceneName);
			}
		}
		if(!this.drawingScene) {
			this.parent();
		}
	}
});
var scale = (window.innerWidth < 640) ? 2 : 1;
var width = window.innerWidth * scale,
	height = window.innerHeight * scale;

ig.main( '#canvas', MyGame, 60, width, height, 1);

});
