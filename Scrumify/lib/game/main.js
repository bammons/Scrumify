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
	sceneName: null,
	chageLevel: false,
	newScene: false,
	drawingScene: false,
	newPage: false,
	newQuestion: false,
	passed: false,
	responded: false,

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

		if(ig.input.pressed('ok')) {
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
			if(ig.input.pressed('A')) {
				this.myScenes.answer = 'A';
				this.myScenes.nextLine = true;
			}
			else if(ig.input.pressed('B')) {
				this.myScenes.answer = 'B';
				this.myScenes.nextLine = true;
			}
			else if(ig.input.pressed('C')) {
				this.myScenes.answer = 'C';
				this.myScenes.nextLine = true;
			}
			else if(ig.input.pressed('D')) {
				this.myScenes.answer = 'D';
				this.myScenes.nextLine = true;
			}
			else if(ig.input.pressed('TRUE')) {
				this.myScenes.answer = 'TRUE';
				this.myScenes.nextLine = true;
			}
			else if(ig.input.pressed('FALSE')) {
				this.myScenes.answer = 'FALSE'
				this.myScenes.nextLine = true;
			}

			if(this.myScenes.nextLine) {
				this.myScenes.runQuestion(this.sceneName);
			}
		}

		if(this.passed) {
			this.myScenes.nextLine = false;
			this.myScenes.runResponse(this.responded);
		}
		else if(!this.passed && !this.newQuestion && this.drawingScene) {
			//TODO: Make Player take damage
				//call to run results
			console.log('failed');
			if(!this.responded) {
				this.myScenes.nextLine = false;
			}
			this.myScenes.runResponse(this.responded);
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
