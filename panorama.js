var scale_both = 0.2621;

var pos_x = 0;
var pos_y = 0;

var play_arg = 0;

var img = new Image();
img.src="example.jpg";

var draw = function(){

	var c = document.getElementById("panorama");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)

	if((Math.abs(pos_x))>=img.width){
				pos_x += img.width;
	}

	if((Math.abs(pos_x))<=img.width){
		pos_x -=img.width;
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

var play_right = function(){
	play_arg = 0;
	go_right();
}

var go_right = function(){
	if(play_arg!=1){
		setTimeout(function(){
			pos_x -= 4;
			draw();
			self.go_right();
		},20);
	}
}

var stop_play = function(){
	play_arg = 1;
}
