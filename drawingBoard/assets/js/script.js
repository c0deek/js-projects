$('#canvas').mousedown(function(e) {
	paint = true;
	var x = e.pageX - this.offsetLeft;
	var y = e.pageY - this.offsetTop;
	if(!erase) {
		color = "rgb("+ red + ", " + green + ", " + blue + ")";
	}
	else {
		color = "rgb(255,255,255)";
	}
	$('#currenr-color').css('background-color', color)
	drawLine(x,y, false, color);
	reload();
});

$('#canvas').mousemove(function(e) {
	if(paint) {

		drawLine(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true, color);
		reload();
	}
});

$('#canvas').mouseup(function() {
	paint = false;
});

$('#canvas').mouseout(function() {
	paint = false;
});

$('#erase').click(function() {
	erase = !erase;
	$('#erase').text((erase)?"DRAW":"ERASE");
});

$('#reset').click(function() {
	posx = [];
	posy = [];
	drag = [];
	colorArr = [];
	$('#color-sliders').children().val(0);
	console.log($('#color-sliders').children().val());
	color = "rgb(0, 0, 0)";
	$('#current-color').css('background', color);
	red = 0;
	green = 0;
	blue = 0;
	reload();
});


$(document).on('change', '#redcolor', function() {
	red = this.value;
	color = "rgb("+ red + ", " + green + ", " + blue + ")";
	$('#current-color').css('background', color);
});

$(document).on('change', '#greencolor', function() {
	green = this.value;
	color = "rgb("+ red + ", " + green + ", " + blue + ")";
	$('#current-color').css('background', color);
});

$(document).on('change', '#bluecolor', function() {
	blue = this.value;
	color = "rgb("+ red + ", " + green + ", " + blue + ")";
	$('#current-color').css('background', color);
});



var red = 0; 
var blue = 0;
var green = 0;
var erase = false;
var size = 3;

var ctx = document.getElementById("canvas").getContext("2d");

var paint = false;
var posx = new Array();
var posy = new Array();
var drag = new Array();
var colorArr = new Array();

function drawLine(x, y, dragBool, color) {
	posx.push(x);
	posy.push(y);
	drag.push(dragBool);
	colorArr.push(color);
}

function reload(){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
  
  // color = "rgb("+ red + ", " + green + ", " + blue + ")";

  // ctx.strokeStyle = color;
  // ctx.lineJoin = "round";
  // ctx.lineWidth = 5;
			
  for(var i=0; i < posx.length; i++) {
  	ctx.strokeStyle = colorArr[i];
  	ctx.lineJoin = "round";
  	ctx.lineWidth = size;

    ctx.beginPath();
    if(drag[i] && i) {
	    ctx.moveTo(posx[i-1], posy[i-1]+25);
    } else {
    	ctx.moveTo(posx[i], posy[i]+25);
    }
    ctx.lineTo(posx[i], posy[i]+25);
    ctx.closePath();
    ctx.stroke();
  }
}