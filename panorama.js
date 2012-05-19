// Global variables
var POS_X = 0;
var POS_Y = 0;
var INIT_X = 0;
var INIT_Y = 0;
var MINSCALE = 0.2621;
var MAXSCALE = 1;
var CURRENT_SCALE = MINSCALE;
var SCALE = CURRENT_SCALE;
var PLAY_ARG = false;
var MOUSEDOWN = false;
var TURN_RIGHT = true; //true = right, false = left

// Image information
var img = new Image();
img.src="example.jpg";

// Functions
var draw = function(){

	var c = document.getElementById("panorama");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)

	if(POS_X>=img.width){
		POS_X -=img.width;
	} else {
		if((Math.abs(POS_X))>=img.width){
			POS_X += img.width;
		}
	}

	if(SCALE!=1){
		ctx.scale(SCALE, SCALE);
		SCALE = 1;
	}
	if(2*((Math.abs(POS_X)+ctx.canvas.width))>img.width){
		ctx.drawImage(img, (POS_X+img.width), POS_Y);
	}
	if(POS_X > 0){
		ctx.drawImage(img, (POS_X-img.width), POS_Y);
	}
	ctx.drawImage(img, POS_X, POS_Y);
};

var move_pic_right = function(pix, i){
	setTimeout(function(){
		if(i<=pix){
			POS_X -= 5;
			draw();
			self.move_pic_right(pix, i+5);
		}
	},10);
}

var move_pic_left = function(pix, i){
	setTimeout(function(){
		if(i<=pix){
			POS_X += 5;
			draw();
			self.move_pic_left(pix, i+5)
		}
	}, 10);
}

var move = function(pix){
	if(TURN_RIGHT){
		move_pic_right(pix, 0);
	} else {
		move_pic_left(pix, 0);
	}
}

var play = function(){
	PLAY_ARG = true;
	go_round();
}

var go_round = function(){
	if(PLAY_ARG == true){
		setTimeout(function(){
			if(TURN_RIGHT){
				POS_X -= 4;
			} else {
				POS_X += 4;
			}
			draw();
			self.go_round();
		},20);
	}
}

var stop_play = function(){
	PLAY_ARG = false;
}

var change_dir = function(){
	TURN_RIGHT = !TURN_RIGHT;
}

var initialize = function(){
	var can = document.getElementById("panorama");
	can.onmousedown = mouseDown;
	can.onmousewheel = mouseWheel;
	window.onmouseup = mouseUp;
	window.onmousemove = mouseMove;
	draw();
}

var mouseDown = function(n){
	MOUSEDOWN = true;
	INIT_X = n.clientX;
	INIT_Y = n.clientY;
	draw();
}

var mouseUp = function(n){
	MOUSEDOWN = false;
	INIT_X = n.clientX;
	INIT_Y = n.clientY;
	draw();
}

var mouseMove = function(n){
	if(MOUSEDOWN){
		var movepix = (n.clientX - INIT_X);
		if(movepix < 0){
			TURN_RIGHT = false;
		} else {
			TURN_RIGHT = true;
		};
		move(Math.abs(movepix));
	}
}

var mouseWheel = function(n){
	var new_scale;
	if(n.wheelDelta > 0){
		if(CURRENT_SCALE === MINSCALE){
			new_scale = 0.3/CURRENT_SCALE;
			CURRENT_SCALE = 0.3;
		} else {
			if(CURRENT_SCALE < 1.0){
				new_scale = (CURRENT_SCALE + 0.1)/CURRENT_SCALE;
				CURRENT_SCALE += 0.1;
			}
		}
	} else {
		if(CURRENT_SCALE === 0.30000000000000004){
			new_scale = MINSCALE/CURRENT_SCALE;
			CURRENT_SCALE = MINSCALE;
			console.log("Reached min");
		} else {
			if(CURRENT_SCALE > 0.3){
				new_scale = (CURRENT_SCALE - 0.1)/CURRENT_SCALE;
				CURRENT_SCALE -= 0.1;
			}
		}
	}
	console.log(CURRENT_SCALE);
	SCALE = new_scale;
	draw();
}