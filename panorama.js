var pos_x = 0;
var pos_y = 0;

var play_arg = 0;

var turn_right = true; //true = right, false = left

var img = new Image();
img.src="example.jpg";

var min_scale = 0.2621;
var max_scale = 1;
var current_scale = min_scale;
var scale_both = current_scale;

var mouseClick = false;
var initX = 0;
var initY = 0;

var draw = function(){

	var c = document.getElementById("panorama");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)

	if(pos_x>=img.width){
		pos_x -=img.width;
	} else {
		if((Math.abs(pos_x))>=img.width){
			pos_x += img.width;
		}
	}

	if(scale_both!=1){
		ctx.scale(scale_both, scale_both);
		scale_both = 1;
	}
	if(2*((Math.abs(pos_x)+ctx.canvas.width))>img.width){
		ctx.drawImage(img, (pos_x+img.width), pos_y);
	}
	if(pos_x > 0){
		ctx.drawImage(img, (pos_x-img.width), pos_y);
	}
	ctx.drawImage(img, pos_x, pos_y);
};

var move_pic_right = function(pix, i){
	setTimeout(function(){
		if(i<=pix){
			pos_x -= 5;
			draw();
			self.move_pic_right(pix, i+5);
		}
	},10);
}

var move_pic_left = function(pix, i){
	setTimeout(function(){
		if(i<=pix){
			pos_x += 5;
			draw();
			self.move_pic_left(pix, i+5)
		}
	}, 10);
}

var move = function(pix){
	if(turn_right){
		move_pic_right(pix, 0);
	} else {
		move_pic_left(pix, 0);
	}
}

var play = function(){
	play_arg = 0;
	go_round();
}

var go_round = function(){
	if(play_arg!=1){
		setTimeout(function(){
			if(turn_right){
				pos_x -= 4;
			} else {
				pos_x += 4;
			}
			draw();
			self.go_round();
		},20);
	}
}

var stop_play = function(){
	play_arg = 1;
}

var change_dir = function(){
	turn_right = !turn_right;
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
	mouseClick = true;
	initX = n.clientX;
	initY = n.clientY;
	draw();
}

var mouseUp = function(n){
	mouseClick = false;
	initX = n.clientX;
	initY = n.clientY;
	draw();
}

var mouseMove = function(n){
	if(mouseClick){
		var movepix = (n.clientX - initX);
		if(movepix < 0){
			turn_right = false;
		} else {
			turn_right = true;
		};
		move(Math.abs(movepix));
	}
}

var mouseWheel = function(n){
	var new_scale;
	if(n.wheelDelta > 0){
		if(current_scale === min_scale){
			new_scale = 0.3/current_scale;
			current_scale = 0.3;
		} else {
			if(current_scale < 1.0){
				new_scale = (current_scale+0.1)/current_scale;
				current_scale += 0.1;
			}
		}
	} else {
		if(current_scale === 0.3){
			new_scale = min_scale/current_scale;
			current_scale = min_scale;
		} else {
			if(current_scale > min_scale){
				new_scale = (current_scale-0.1)/current_scale;
				current_scale -= 0.1;
			}
		}
	}
	scale_both = new_scale;
	draw();
}