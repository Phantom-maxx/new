/* =========================
EDIT THESE
========================= */

const NAME = "ENTER_NAME_HERE";
const EXTRA_MESSAGE = "";


/* =========================
ELEMENTS
========================= */

const startBtn = document.getElementById("startBtn");
const messageEl = document.getElementById("message");
const extraEl = document.getElementById("extraMessage");
const messageBox = document.getElementById("messageBox");
const cake = document.getElementById("cake");

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


/* =========================
SLOW PRINT FUNCTION
========================= */

function slowPrint(text, element, speed, done){

let i = 0;

element.innerHTML = "";

function type(){

if(i < text.length){

element.innerHTML += text.charAt(i);

i++;

setTimeout(type,speed);

}
else{

if(done) done();

}

}

type();

}


/* =========================
FIREWORK SYSTEM
========================= */

let rockets = [];
let particles = [];
let running = false;

function startFireworks(){

rockets = [];
particles = [];

running = true;

setTimeout(function(){

running = false;

},12000);

launchRocket();

}

function launchRocket(){

if(!running) return;

rockets.push({

x:Math.random()*canvas.width,

y:canvas.height,

vy:-7,

target:Math.random()*canvas.height/2

});

setTimeout(launchRocket,700);

}

function explode(x,y){

for(let i=0;i<60;i++){

particles.push({

x:x,
y:y,

vx:(Math.random()-0.5)*8,
vy:(Math.random()-0.5)*8,

life:80,

size:2+Math.random()*2

});

}

}

function update(){

ctx.clearRect(0,0,canvas.width,canvas.height);

/* rockets */

for(let i=rockets.length-1;i>=0;i--){

let r = rockets[i];

r.y += r.vy;

ctx.fillStyle="white";

ctx.beginPath();
ctx.arc(r.x,r.y,3,0,Math.PI*2);
ctx.fill();

if(r.y <= r.target){

explode(r.x,r.y);

rockets.splice(i,1);

}

}

/* particles */

for(let i=particles.length-1;i>=0;i--){

let p = particles[i];

p.x += p.vx;
p.y += p.vy;

p.life--;

ctx.fillStyle="hsl("+Math.random()*360+",100%,60%)";

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fill();

p.size *= 0.96;

if(p.life <= 0){

particles.splice(i,1);

}

}

requestAnimationFrame(update);

}

update();


/* =========================
START BUTTON
========================= */

startBtn.addEventListener("click",function(){

/* hide button */

startBtn.style.display="none";

/* start fireworks */

startFireworks();

/* show cake first */

cake.style.opacity="1";

/* wait for cake animation */

setTimeout(function(){

messageBox.style.display="block";

const mainMessage = "Happy Birthday To You " + NAME;

slowPrint(mainMessage,messageEl,60,function(){

if(EXTRA_MESSAGE.trim() !== ""){

slowPrint(EXTRA_MESSAGE,extraEl,40);

}

});

},2000);

});


/* =========================
RESPONSIVE CANVAS
========================= */

window.addEventListener("resize",function(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

});