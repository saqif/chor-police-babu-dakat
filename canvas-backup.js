console.log("cheers!");

var animateStart = true;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//c.fillRect(x, y, width, height);
c.fillStyle = "rgba(0, 255, 0, 0.5)";
c.fillRect((window.innerWidth-100)/2, 10, 100, 100);
c.fillStyle = "rgba(0, 0, 255, 0.5)";
c.fillRect((window.innerWidth-100)/2, (window.innerHeight-100)-10, 100, 100);
c.fillStyle = "rgba(255, 255, 255, 0.5)";
c.fillRect(10, (window.innerHeight-100)/2, 100, 100);
c.fillStyle = "rgba(255, 255, 0, 0.5)";
c.fillRect((window.innerWidth-100)-10, (window.innerHeight-100)/2, 100, 100);

// c.fillStyle = "blue";
// c.fillRect((window.innerWidth-(400+20))/2, (window.innerHeight-100)/2, 100, 100);


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
				'#FFC0CB' ];

var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('click', function(event){
	mouse.x = event.x;
	mouse.y = event.y;

	//console.log(mouse);
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

	this.update = function(dy){
		if(this.y > ((window.innerHeight-rectHeight)/2)-h){
			this.y = this.y - dy;
			//console.log(this.y);
		}

		this.draw();
	}

}

// function Triangle(x, y, pos, w, h, color){
// 	this.x = x;
// 	this.y = y;
// 	this.color = color;
// 	this.pos = pos;
// 	this.w = w;
// 	this.h = h;

// 	this.draw = function(){
// 		//console.log("triangle");
// 		//triangle 1 - left
// 		if(this.pos == 1){
// 			c.beginPath();
// 			c.moveTo(this.x, this.y);
// 			c.lineTo(this.x+(this.w/2), this.y+(this.w/2));
// 			c.lineTo(this.x, this.y+this.h);
// 			c.closePath();
// 			c.strokeStyle = "black";
// 			c.stroke();
// 			c.fillStyle = this.color;
// 			c.fill();
// 		}

// 		//triangle 2 - right
// 		if(this.pos == 2){
// 			c.beginPath();
// 			c.moveTo(this.x+this.w, this.y);
// 			c.lineTo(this.x+(this.w/2), this.y+(this.h/2));
// 			c.lineTo(this.x+this.w, this.y+this.h);
// 			c.closePath();
// 			c.strokeStyle = "black";
// 			c.stroke();
// 			c.fillStyle = this.color;
// 			c.fill();
// 		}

// 		//triangle 3 - top
// 		if(this.pos == 3){
// 			c.beginPath();
// 			c.moveTo(this.x, this.y);
// 			c.lineTo(this.x+(this.w/2), this.y+(this.h/2));
// 			c.lineTo(this.x+this.w, this.y);
// 			c.closePath();
// 			c.strokeStyle = "black";
// 			c.stroke();
// 			c.fillStyle = this.color;
// 			c.fill();
// 		}

// 		//triangle 4 - bottom
// 		if(this.pos == 4){
// 			c.beginPath();
// 			c.moveTo(this.x, this.y+this.h);
// 			c.lineTo(this.x+(this.w/2), this.y+(this.h/2));
// 			c.lineTo(this.x+this.w, this.y+this.h);
// 			c.closePath();
// 			c.strokeStyle = "black";
// 			c.stroke();
// 			c.fillStyle = this.color;
// 			c.fill();
// 		}
// 	}

// 	this.update = function(dx, dy, pos){
// 		console.log("clicked", pos);

// 		if(pos == 1){
// 			if(this.x > gutiCoordinates[0])
// 				this.x -= dx;
// 			else 
// 				counter++;
// 		}

// 		if(pos == 2){ 
// 			if(this.x > gutiCoordinates[1])
// 				this.x -= dx;
// 			else 
// 				counter++;
// 		}

// 		if(pos == 3){ 
// 			if(this.x < gutiCoordinates[2])
// 				this.x += dx;
// 			else 
// 				counter++;
// 		}

// 		if(pos == 4){ 
// 			if(this.x < gutiCoordinates[3])
// 				this.x += dx;
// 			else 
// 				counter++;
// 		}
// 	}
// }

var counter = 0;

function Pawn(x, y, w, h, color, guti){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
	this.text = gutis[guti].name;
	this.tri1 = [];
	var rectO = undefined;
	this.rectO = new RectOverlay(this.x, this.y, this.w, this.h);

	this.draw = function(){
		c.fillStyle = this.color;
		c.fillRect(this.x, this.y, this.w, this.h);
		c.fillStyle = "white";
      	c.font = "20pt sans-serif";
		c.fillText(this.text, this.x+10, this.y+50);
		this.rectO.draw();
		// //triangles
		// this.tri = [];
		// for(var i = 1; i<=4; i++){
		// 	this.tri.push(new Triangle(this.x, this.y, i, this.w, this.h, "white"));
		// 	this.tri[i-1].draw();
		// }

		// this.tri1 = this.tri.slice();

	}

	this.update = function(dx, dy, pos){

		//console.log(x,y,pos);
		if(pos == 0){
			if(this.x > gutiCoordinates[0]){
				this.x -= dx;
				this.rectO.x -= dx;
			} else 
				counter++;
		}

		if(pos == 1){ 
			if(this.x > gutiCoordinates[1]){
				this.x -= dx;
				this.rectO.x -= dx;
			} else 
				counter++;
		}

		if(pos == 2){ 
			if(this.x < gutiCoordinates[2]){
				this.x += dx;
				this.rectO.x += dx;
			} else 
				counter++;
		}

		if(pos == 3){ 
			if(this.x < gutiCoordinates[3]){
				this.x += dx;
				this.rectO.x += dx;
			} else 
				counter++;
		}

		if(this.x < mouse.x && mouse.x < this.x+this.w){
			if(this.y < mouse.y && mouse.y < this.y+this.h){
				//console.log(this.text, this.x, this.x+this.w, this.y, this.y+this.h);
				this.rectO.update(10);

				// for(var i = 1; i<=4; i++){
				// 	this.tri1[i-1].update(1, 0, i);
				// }
			}
		}

		this.draw();

		if(counter == 110){
			animateStart = true;
		}
	}
}

var gutis = [{name: "Babu", points: 100},
			 {name: "Police", points: 90},
			 {name: "Dakat", points: 80},
			 {name: "Chor", points: 70}];

var randomGuti = [0,1,2,3];
shuffle(randomGuti);

var rectWidth = 100;
var rectHeight = 100;
var pawns = [];

var gutiCoordinates = [(window.innerWidth-((4*rectWidth)+20))/2,
					   (window.innerWidth-(2*rectWidth))/2,
					   (window.innerWidth+20)/2,
					   (window.innerWidth+(2*rectWidth)+40)/2];

function initializeBoard(){
	for(var i = 0; i < 4; i++){
		pawns.push(new Pawn((window.innerWidth-rectWidth)/2, (window.innerHeight-rectHeight)/2, rectWidth, rectHeight, colors[Math.floor(Math.random()*colors.length)], randomGuti[i]));
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

initializeBoard();
animate();


// c.fillStyle = "orange";
// c.fillRect((window.innerWidth-(200))/2, (window.innerHeight-100)/2, 100, 100);
// c.fillStyle = "yellow";
// c.fillRect((window.innerWidth + 20)/2, (window.innerHeight-100)/2, 100, 100);
// c.fillStyle = "white";
// c.fillRect((window.innerWidth+200+40)/2, (window.innerHeight-100)/2, 100, 100);

// //######## line ############
// c.beginPath(); //start a new path
// c.moveTo(100, 500); //move the drawing point (x, y)
// c.lineTo(500, 100); //extend the line (x, y)
// c.strokeStyle = "black"; // color the line
// c.stroke(); //give the line

// arc / circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false); // (x, y, radius, point start, end, reverse)
// c.strokeStyle = "blue";
// c.stroke();

// for(var i = 0; i<100; i++){
// 	var colors = ['white', 'green', 'black', 'yellow'];
// 	c.beginPath();
// 	c.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 50, 0, Math.PI * 2, false); // (x, y, radius, point start, end, reverse)
// 	c.strokeStyle = colors[Math.floor(Math.random()*4)]; // 0 to 3 random index
// 	c.stroke();
// }