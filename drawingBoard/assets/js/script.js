$('#canvas').mousedown(function(e) {
	paint = true;
	var x = e.pageX - this.offsetLeft;
	var y = e.pageY - this.offsetTop;
	color = "rgb("+ red + ", " + green + ", " + blue + ")";
	drawLine(x,y, false, color);
	reload();
});

$('#canvas').mousemove(function(e) {
	if(paint) {
		color = "rgb("+ red + ", " + green + ", " + blue + ")";
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

$('#reset').click(function() {
	posx = [];
	posy = [];
	drag = [];
	reload();
});



$(document).on('change', '#redcolor', function() {
	red = this.value;
	console.log('red', red);
});

$(document).on('change', '#greencolor', function() {
	green = this.value;
	console.log('green', green);
});

$(document).on('change', '#bluecolor', function() {
	blue = this.value;
	console.log('blue', blue);
});



var red = 0; 
var blue = 0;
var green = 0;

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
  
  color = "rgb("+ red + ", " + green + ", " + blue + ")";

  // ctx.strokeStyle = color;
  // ctx.lineJoin = "round";
  // ctx.lineWidth = 5;
			
  for(var i=0; i < posx.length; i++) {
  	ctx.strokeStyle = colorArr[i];
  	ctx.lineJoin = "round";
  	ctx.lineWidth = 5;

    ctx.beginPath();
    if(drag[i] && i) {
	    ctx.moveTo(posx[i-1], posy[i-1]);
    } else {
    	ctx.moveTo(posx[i], posy[i]);
    }
    ctx.lineTo(posx[i], posy[i]);
    ctx.closePath();
    ctx.stroke();
  }
}