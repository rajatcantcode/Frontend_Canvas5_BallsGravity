import utils from "./utils.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

var gravity = 1;
var friction = 0.9;
// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;

    this.radius = radius;
    this.color = color;
    this.gravity = 1;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    //hits the bottom
    if (this.y + this.radius + this.dy > canvas.height) {
      //We need to make sure our ball velocity decreases each time it hits the ground
      //this friction will lead to stop the ball at a time
      this.dy = -this.dy * friction;
    } else {
      //increase change in speed or gravity (not exactly but give us the illusion)
      this.dy += gravity;
    }
    if (
      this.x + this.radius + 3 * this.dx > canvas.width ||
      this.x - this.radius < 0
    ) {
      this.dx = -this.dx;
    }
    //velocity
    this.y += this.dy;
    this.x += this.dx;

    this.draw();
  }
}

// Implementation
let balls;

function init() {
  //while resizing a new array will form everytime : )
  balls = [];

  for (let i = 0; i < 40; i++) {
    var radius = utils.randomIntFromRange(10, 20);
    var x = utils.randomIntFromRange(10, canvas.width - radius);
    var y = utils.randomIntFromRange(10, canvas.height - radius);
    var dx = utils.randomIntFromRange(-2, 2);
    var dy = utils.randomIntFromRange(-2, 2);
    var color = utils.randomColor(colors);
    balls.push(new Ball(x, y, dx, dy, radius, color));
  }
}

// Animation Loops
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    ball.update();
  });
}

init();
animate();

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

//resize
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

//Mobile Event listenre
addEventListener("click", () => {
  init();
});
