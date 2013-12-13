ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'game.entities.sword'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 40, y: 88},
	offset: {x: 17, y: 10},
	
	maxVel: {x: 400, y: 800},
	friction: {x: 800, y: 0},
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/sprite_hero_master.png', 70, 100 ),	
	
	
	health: 3,

	// Custom Properties
	flip: false,
	accelGround: 1200,
	accelAir: 600,
	jump: 600,
	doubleJump: 800,	
	maxHealth: 3,

	pages: 0,
	points: 0,
	swordSpawn: false,

	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0,0,0,0,0,0] );
		this.addAnim('run', 0.09, [16,17,18,19,20,21,22,23,24,25,26,26]);
		this.addAnim('attack', 0.06, [0,1,2,3,4,5,6,7,8,9,10,11,12,13]);
		this.addAnim('sprint', 0.06, [29,30,31,32,33,34,35,36,37])
		this.addAnim( 'jump', 1, [44], true );
		this.addAnim( 'fall', 1, [56], true ); // stop at the last frame

		// Set a reference to the player on the game instance
		ig.game.player = this;
	},
	
	
	update: function() {

		// Handle user input; move left or right
		var accel = this.standing ? this.accelGround : this.accelAir;
		if( ig.input.state('left') ) {
			this.accel.x = -accel;
			this.flip = true;
		}
		else if( ig.input.state('right') ) {
			this.accel.x = accel;
			this.flip = false;
		}
		else if(ig.input.state('attack')) {
			this.anims.attack.rewind();
			this.currentAnim = this.anims.attack;
		} 
		else {
			this.accel.x = 0;
		}


		if(this.health <= 0) {
			this.kill();
		}
		else if(this.currentAnim == this.anims.attack && this.currentAnim.loopCount < 1) {
			this.currentAnim = this.anims.attack;
			if(this.currentAnim.frame == 8 && this.swordSpawn == false) {
				ig.game.spawnEntity(EntitySword, this.pos.x, this.pos.y-10, {flip: this.flip});
				this.swordSpawn = true;
			}
		}
		else if((this.standing && ig.input.pressed('jump')) || (this.vel.y < 0 && ig.input.pressed('jump'))) {
			if(this.vel.y < 0) {
				if(ig.game.collisionMap.getTile(this.pos.x + this.size.x, this.pos.y + this.size.y) || ig.game.collisionMap.getTile(this.pos.x - this.size.x, this.pos.y - this.size.y)) {
					this.vel.y = -this.jump;

					
					if(this.flip == false) {
					this.flip = true;
					this.vel.x = -this.doubleJump;
					}else {
						this.flip = false;
						this.vel.x = this.doubleJump;
					}
					
				}
			}
			else {
				this.vel.y = -this.jump;
			}
		}
		else if(this.vel.y < 0) {
			this.currentAnim = this.anims.jump;
		}
		else if( this.vel.y > 0 ) {
			if( this.currentAnim != this.anims.fall ) {
				this.currentAnim = this.anims.fall.rewind();
			}
		}
		else if( this.vel.x != 0 ) {
			this.currentAnim = this.anims.sprint;
		}
		else {
			this.currentAnim = this.anims.idle;
			this.swordSpawn = false;
		}
		
		this.currentAnim.flip.x = this.flip;
	

		// Move!
		this.parent();
	},

	kill: function() {
		this.parent();

		// Reload this level
		
	},

	receiveDamage: function( amount, from ) {
		// Knockback
		this.health -= amount;
		this.vel.x = (from.pos.x > this.pos.x) ? -200 : 200;
		this.vel.y = -200;
	}
});


});