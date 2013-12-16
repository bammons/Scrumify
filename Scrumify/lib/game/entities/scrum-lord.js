ig.module(
	'game.entities.scrum-lord'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityScrumLord = ig.Entity.extend({
	size: {x: 140, y: 200},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},

	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,

	speed: 60,
	health: 15,
	damage: 1,
	transform: false,
	flip: false,
	dead: false,

	animSheet: new ig.AnimationSheet('media/sprite_boss.png', 140, 200),

	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim('transform', 0.09, [0,1,2,3,4,5,6,7,8,9,10,11,12,13], true);
		this.addAnim('stomp', 0.09, [15,16,17,18,19,20,21,22,23], true);
		this.addAnim('kick', 0.09, [46,47,48], true);
		this.addAnim('flash', 0.09, [24,25,26,27,28,29,30,31,32,33,34,35], true);
		this.addAnim('walk', 0.14, [37,38,39,40,41,42,43]);

		this.currentAnim = this.anims.walk;
	},

	receiveDamage: function(amount, from) {
		if(this.health - amount <= 0) {
			this.kill();
		} else {
			this.health -= amount;
		}
	},

	update: function() {
		var randomKick = Math.floor(Math.random()*400);
		var randomStomp = Math.floor(Math.random()*400);
		var randomFlash = Math.floor(Math.random()*400);

		if(transform) {
			
		}
		else if(randomKick == 5) {
			this.anims.kick.rewind();
			this.currentAnim = this.anims.kick;
		}
		else if(randomStomp == 5) {
			this.anims.stomp.rewind();
			this.currentAnim = this.anims.stomp;
		}
		else if(randomFlash == 5) {
			this.anims.flash.rewind();
			this.currentAnim = this.anims.flash;
		}

		if(this.currentAnim == this.anims.kick && this.currentAnim.loopCount < 1) {
			this.currentAnim = this.anims.kick;
		}
		else if(this.currentAnim == this.anims.stomp && this.currentAnim.loopCount < 1) {
			this.currentAnim = this.anims.stomp;
		}
		else if(this.currentAnim == this.anims.flash && this.currentAnim.loopCount < 1) {
			this.currentAnim = this.anims.flash;
		}
		else {
			this.currentAnim = this.anims.walk;
		}

		if(this.currentAnim != this.anims.kick && this.currentAnim != this.anims.stomp && this.currentAnim != this.anims.flash) {
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
			this.anims.kick.flip.x = !this.flip;
			this.anims.stomp.flip.x = !this.flip;
			this.anims.flash.flip.x = !this.flip;
		}

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