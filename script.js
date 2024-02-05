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

// Objects
class Ball {
  constructor(x, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    //hits the bottom
    if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy;
    } else {
      //increase acceleration by +1;
      this.dy += 1;
    }
    this.y += this.dy;
    this.draw();
  }
}

// Implementation
let balls;
function init() {
  balls = [];

  for (let i = 0; i < 1; i++) {
    balls.push(new Ball(canvas.width / 2, Math.random() * 1000, 1, 10, "red"));
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
