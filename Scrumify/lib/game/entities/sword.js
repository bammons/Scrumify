ig.module(
	'game.entities.sword'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntitySword = ig.Entity.extend({
	_wmIgnore: true, // This entity will no be available in Weltmeister

	size: {x: 22, y: 60},
	maxVel: {x: 800, y:0},
	gravityFactor: 0,

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet('media/sprite_hero_master.png', 70, 100),

	init: function(x, y, settings) {
		this.parent(x, y, settings);
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = 0;
		this.addAnim( 'idle', 1, [57] );
	},

	reset: function(x, y, settings) {
		// This function is called when an instance of this class is resurrected
		// from the entity pool. (Pooling is enabled at the bottom of this file).
		this.parent(x, y, settings);
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = 0;

	},

	update: function() {
		if(this.vel.x > 0) {
			this.currentAnim.flip.x = false;
		}
		else {
			this.currentAnim.flip.x = true;
		}
		this.parent();
	},
		
	handleMovementTrace: function(res) {
		this.parent( res );
		
		// Kill this fireball if it bounced more than 3 times
		if( res.collision.x || res.collision.y || res.collision.slope ) {
			this.kill();
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