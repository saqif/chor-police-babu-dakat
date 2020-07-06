console.log("cheers!");

var c;
var myGameArea;
var animateStart = true;
var gutis = [{name: "Babu", points: 100},
			 {name: "Police", points: 90},
			 {name: "Dakat", points: 80},
			 {name: "Chor", points: 70}];

var randomGuti = [0,1,2,3];
var rectWidth = 100;
var rectHeight = 100;
var pawns = [];
var gutiCoordinates = [(window.innerWidth-((4*rectWidth)+20))/2,
					   (window.innerWidth-(2*rectWidth))/2,
					   (window.innerWidth+20)/2,
					   (window.innerWidth+(2*rectWidth)+40)/2];


var colors = [  'blue', 
				'green', 
				'black', 
				'yellow', 
				'#FFE4C4', 
				'#A52A2A', 
				'#FF7F50', 
				'#CD5C5C', 
				'#FFA07A',
				'#FF1493',
				'#FF8C00', 
				'#FFC0CB' 
			];

var mouse = {
	x: undefined,
	y: undefined
}

function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
}  

function gamearea() {
	this.canvas = document.createElement("canvas");
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;    
	document.getElementById("canvascontainer").appendChild(this.canvas);
	c = this.canvas.getContext("2d");
	
	this.start = function() {
		shuffle(randomGuti);
		initializeBoard();
		animateStart = true;
		animate();
	}

	this.stop = function() {
		animateStart = false;
	}

	this.clear = function(){
		c.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

window.addEventListener('click', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});

function RectOverlay(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = colors[Math.floor(Math.random()*colors.length)];

	this.draw = function(){
		c.fillStyle = this.color;
		c.fillRect(this.x, this.y, this.w, this.h);
	}

	this.update = function(dy, sy){
		if(this.y > sy-h){
			this.y = this.y - dy;
		}

		this.draw();
	}

}

function Pawn(x, y, w, h, color, guti){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
	this.guti = guti;
	this.text = gutis[this.guti].name;
	this.rectO = new RectOverlay(this.x, this.y, this.w, this.h);

	this.draw = function(){
		c.fillStyle = this.color;
		c.fillRect(this.x, this.y, this.w, this.h);
		c.fillStyle = "white";
      	c.font = "20pt sans-serif";
		c.fillText(this.text, this.x+10, this.y+50);
		this.rectO.draw();
	}

	this.update = function(dx, dy, pos){
		
		if(pos == 0){
			if(this.x > gutiCoordinates[0]){
				this.x -= dx;
				this.rectO.x -= dx;
			}
		}

		if(pos == 1){ 
			if(this.x > gutiCoordinates[1]){
				this.x -= dx;
				this.rectO.x -= dx;
			}
		}

		if(pos == 2){ 
			if(this.x < gutiCoordinates[2]){
				this.x += dx;
				this.rectO.x += dx;
			}
		}

		if(pos == 3){ 
			if(this.x < gutiCoordinates[3]){
				this.x += dx;
				this.rectO.x += dx;
			}
		}

		if(this.x < mouse.x && mouse.x < this.x+this.w){
			if(this.y < mouse.y && mouse.y < this.y+this.h){
				if(this.guti == 0 || this.guti == 1){
					this.rectO.update(10, this.y);
				}

				c.font = "20px Arial";
				c.fillStyle = "white";
				c.fillText("Player 1", this.x, this.y+this.h+30);
			}
		}

		this.draw();
	}
}


function initializeBoard(){
	for(var i = 0; i < 4; i++){
		pawns.push(new Pawn((window.innerWidth-rectWidth)/2, 
			(window.innerHeight-rectHeight)/2, rectWidth, 
			rectHeight, 
			colors[Math.floor(Math.random()*colors.length)], 
			randomGuti[i]));
	}
}

function animate(){
	if(animateStart){
		requestAnimationFrame(animate);
	}
	
	c.clearRect(0, 0, innerWidth, innerHeight);
	pawns[0].update(4,0,0);
	pawns[1].update(1,0,1);
	pawns[2].update(2,0,2);
	pawns[3].update(4,0,3);
}

function reset(){
	console.log("reset");
	myGameArea.stop();
    myGameArea.clear();
	myGameArea = {};
	pawns = [];
	document.getElementById("canvascontainer").innerHTML = "";
    start();
}

function start(){
	console.log("starting game...");
	myGameArea = new gamearea();
	myGameArea.start();
	document.getElementById("play").style.display = "none";
	document.getElementById("reset").style.display = "block";
}
