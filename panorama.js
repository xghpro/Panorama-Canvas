
var scale_both = 0.2621;

var pos_x = 0;
var pos_y = 0;

var play_arg = 0;

var img = new Image();
img.onload = draw;
img.src="example.jpg";

var draw = function(){

	var c = document.getElementById("panorama");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)

	if(pos_x >= img.width){
		pos_x = pos_x - img.width;
	}
	if(scale_both!=1){
		ctx.scale(scale_both, scale_both);
		scale_both = 1;
	}
	ctx.drawImage(img, pos_x, pos_y);
};

var move_pic_right = function(pix, i){
	setTimeout(function(){
		if(i<=pix){
			pos_x -= 1;
			draw();
			self.move_pic_right(pix, i+1);
		}
	},10);
}

var play_right = function(){
	play_arg = 0;
	go_right();
}

var go_right = function(){
	if(play_arg!=1){
		setTimeout(function(){
			pos_x -= 1;
			draw();
			self.go_right();
		},10);
	}
}

var stop_play = function(){
	play_arg = 1;
}
