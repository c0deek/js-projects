$('#canvas').mousedown(function(e) {
	paint = true;
	var x = e.pageX - this.offsetLeft;
	var y = e.pageY - this.offsetTop;
	drawLine(x,y, false);
	reload();
});

$('#canvas').mousemove(function(e) {
	if(paint) {
		drawLine(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true)
		reload();
	}
});

$('#canvas').mouseup(function() {
	paint = false;
});

$('#canvas').mouseout(function() {
	paint = false;
});

$(document).on('change', '#redcolor', function() {
	console.log(this.value);
});

var red = 0;
var blue = 0;
var green = 0;

var ctx = document.getElementById("canvas").getContext("2d");

var paint = false;
var posx = new Array();
var posy = new Array();
var drag = new Array();

function drawLine(x, y, dragBool) {
	posx.push(x);
	posy.push(y);
	drag.push(dragBool);
}

function reload(){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
  
  ctx.strokeStyle = "#df4b26";
  ctx.lineJoin = "round";
  ctx.lineWidth = 5;
			
  for(var i=0; i < posx.length; i++) {		
    ctx.beginPath();
    if(drag[i] && i) {
	    ctx.moveTo(posx[i-1], posy[i-1]);
    } else {
    	ctx.moveTo(posx[i]-1, posy[i]-1);
    }
    ctx.lineTo(posx[i], posy[i]);
    ctx.closePath();
    ctx.stroke();
  }
}