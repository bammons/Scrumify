ig.module(
	'game.entities.fireball'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityFireball = ig.Entity.extend({
	_wmIgnore: true, // This entity will not be available in Weltmeister

	size: {x: 22, y: 60},
	maxVel: {x: 800, y: 400},

	bounciness: 0.8, 

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet('media/sprite_minion_2.png', 70, 100),

	bounceCounter: 0,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = 200;
		this.addAnim( 'idle', 1, [23] );
	},

	reset: function(x, y, settings) {
		// This function is called when an instance of this class is resurrected
		// from the entity pool. (Pooling is enabled at the bottom of this file).
		this.parent(x, y, settings);
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = 200;
		
		// Remember, this a used entity, so we have to reset our bounceCounter
		// as well
		this.bounceCounter = 0;
	},

	update: function() {
		this.parent();

		this.currentAnim.angle += ig.system.tick * 10;
	},
		
	handleMovementTrace: function(res) {
		this.parent( res );
		
		// Kill this fireball if it bounced more than 3 times
		if( res.collision.x || res.collision.y || res.collision.slope ) {
			this.bounceCounter++;
			if( this.bounceCounter > 3 ) {
				this.kill();
			}
		}
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the A group.
	check: function(other) {
		other.receiveDamage( 1, this );
		this.kill();
	}	
});
});