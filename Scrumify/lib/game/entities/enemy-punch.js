ig.module(
	'game.entities.enemy-punch'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityEnemyPunch = ig.Entity.extend({
	size: {x: 70, y: 100},
	//offset: {x: 5, y: 0},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},

	type: ig.Entity.TYPE.B, //Unfriendly character
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,

	//Custom properties for this particular enemy
	speed: 90,
	health: 1,
	damage: 1,
	flip: false,
	dead: false,

	animSheet: new ig.AnimationSheet('media/sprite_minion_1.png', 70, 100),

	init: function(x, y, settings) {
		this.parent(x, y, settings);

		this.addAnim('walk', 0.1, [1,2,3,4,5,6,7,8,9]);
		this.addAnim('attack', 0.08, [14,15,16,17,18,19,20,21,22]);
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
		var randomnumber=Math.floor(Math.random()*400);
    	if (randomnumber == 5) {
    		this.anims.attack.rewind();
    		this.currentAnim = this.anims.attack;
    	}

    	if(this.currentAnim == this.anims.attack && this.currentAnim.loopCount < 1) {
			this.currentAnim = this.anims.attack;
		}else {
			this.currentAnim = this.anims.walk;
		}

		if(this.currentAnim != this.anims.attack) {
			if(!ig.game.collisionMap.getTile(
					this.pos.x + (this.flip ? +4 : this.size.x -4),
					this.pos.y + this.size.y+1
				)
			) {
				this.flip = !this.flip;
				
				// We have to move the offset.x around a bit when going
				// in reverse direction, otherwise the enemy's hitbox will
				// be at the tail end.
				this.offset.x = this.flip ? 0 : 5;
			}

			var xdir = this.flip ? 1 : -1;
			this.vel.x = this.speed * xdir;
			this.currentAnim.flip.x = !this.flip;
			this.anims.attack.flip.x = !this.flip;
		}
			
		this.parent();
	},

	handleMovementTrace: function(res) {
		this.parent(res);
		
		// Collision with a wall? return!
		if(res.collision.x) {
			this.flip = !this.flip;
			this.offset.x = this.flip ? 0 : 5;
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