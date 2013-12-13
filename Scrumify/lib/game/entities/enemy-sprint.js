ig.module(
	'game.entities.enemy-sprint'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityEnemySprint = ig.Entity.extend({
	size: {x: 70, y: 100},
	//offset: {x: 5, y: 0},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},

	type: ig.Entity.TYPE.B, //Unfriendly character
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,

	//Custom properties for this particular enemy
	speed: 400,
	health: 1,
	damage: 1,
	flip: false,
	dead: false,

	animSheet: new ig.AnimationSheet('media/sprite_minion_3.png', 70, 100),

	init: function(x, y, settings) {
		this.parent(x, y, settings);

		this.addAnim('sprint', 0.05, [15,16,17,18,19,20,21,22,23]);
	},

	receiveDamage: function(amount, from) {
		if(this.health - amount <= 0) {
			this.kill();
		} else {
			this.health -= amount;
		}
	},

	update: function() {
		// Near an edge? return!
		if(!ig.game.collisionMap.getTile(
				this.pos.x + (this.flip ? +4 : this.size.x -4),
				this.pos.y + this.size.y+1
			)
		) {
			this.flip = !this.flip;
		}

		var xdir = this.flip ? 1 : -1;
		this.vel.x = this.speed * xdir;
		this.currentAnim.flip.x = !this.flip;	
			
		this.parent();
	},

	handleMovementTrace: function(res) {
		this.parent(res);
		
		// Collision with a wall? return!
		if(res.collision.x) {
			this.flip = !this.flip;
		}
	},

	kill: function() {
		this.parent();
	},

	check: function(other) {
		other.receiveDamage(1, this);
	}
});
});