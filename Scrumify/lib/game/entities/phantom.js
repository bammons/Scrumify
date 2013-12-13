ig.module(
	'game.entities.phantom'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPhantom = ig.Entity.extend({
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 70, y: 100},
	
	maxVel: {x: 400, y: 800},
	friction: {x: 800, y: 0},
	
	type: ig.Entity.TYPE.NONE, 
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet( 'media/sprite_phantom.png', 70, 100),	
	
	
	gravityFactor: 0,
	flip: false,
	flipMotion: -60,

	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'follow', 0.3, [0,0,0,0,0,0,0,1,2,3] );

	},
	
	
	update: function() {

		// Handle user input; move left or right
		if( ig.input.state('left') ) {
			this.flip = true;	
		}
		else if( ig.input.state('right') ) {
			this.flip = false;
		}

		if(!this.flip && this.flipMotion != -60) {
			this.flipMotion -= 2;
			this.pos.x = ig.game.player.pos.x + this.flipMotion;
		}
		else if(this.flip && this.flipMotion != 30) {
			this.flipMotion += 2;
			this.pos.x = ig.game.player.pos.x + this.flipMotion;
		}
		else {
			if(this.flip) {
				this.pos.x = ig.game.player.pos.x + this.flipMotion;
			} 
			else {
				this.pos.x = ig.game.player.pos.x + this.flipMotion;
			}
		}

		this.pos.y = ig.game.player.pos.y - 60;
		this.currentAnim.flip.x = this.flip;
	
		
		// Move!
		this.parent();
	},

});


});