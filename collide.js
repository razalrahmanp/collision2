var canvas = document.querySelector('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined

}
var maxRadius = 40;
// var minRadius = 10;

var colorArray = [
    '#ffaa33',
    '#99fffaaa',
    '#00ff00',
    '#4411aa',
    '#ff1100'
];

var gravity = 1;
var friction = 0.95;
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function Circle(x, y, dy, radius) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function() {
        /* Making the circle bounce off the walls. */

        if (this.y + this.radius > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        this.y += this.dy;


        this.draw();

    }
}

var particles = [];

let circle2 = new Circle(undefined, undefined, 25, 20);

function init() {


    particles = [];

    for (var i = 0; i < 500; i++) {

        var radius = Math.random() * 10 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerWidth - radius * 2) + radius;
        var dy = (Math.random() - 0.5) * 8;

        particles.push(new Circle(x, y, dy, radius));

    }


}



/* Clearing the canvas so that the circle can move. */
function animate() {

    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    /* Looping through the array and calling the update function on each element. */

    for (var i = 0; i < particles.length; i++) {
        particles[i].draw();
    }
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.draw();

    if (getDistance(particles.x, particles.y, circle2.x, circle2.y) < particles.radius + circle2.radius) {
        particles.color = circle2.color;
    } else {
        particles.color = 'black';
    }
}

animate();
init();