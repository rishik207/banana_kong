//Global Variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey,monkey_running;

var bananaImg;
var ground;
var obstacleImg;
var backImg;

var score;
var gameOver,restart,GameOverImg,RestartImg;

//DEFINING SOME VARIABLES
var groundImg;

function preload(){
  backImg = loadImage("jungle.jpg");
  groundImg = loadImage("ground.jpg");
  //CORRECTED THE NAME OF THE MONKEY IMAGE
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImg = loadImage("Banana.png");
  obstacle_Img = loadImage("stone.png"); 
  GameOverImg = loadImage("gameOver.png");
  RestartImg = loadImage("restart.png");
}

function setup() {
  //changed the canvas
  createCanvas(800,400);
  
  ground = createSprite(600,600,800,10);
  ground.addImage("ground",groundImg);
  //ground.x = ground.width/2;
  ground.scale = 0.5;
  
  back = createSprite(0,0,800,400);
  back.addImage("back",backImg);
  back.x = back.width /2;
  back.velocityX = 3;
  //scaled the ground
  back.scale=1.5;
    
  monkey = createSprite(50,300,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.5;
  
  //GameOverImg and RestartImg are not loaded in function prelaod
    gameOver = createSprite(300,200);
    restart = createSprite(300,250);
    gameOver.addImage("gameover", GameOverImg);
    gameOver.scale = 0.5;
    restart.addImage("restart", RestartImg);
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;

    score = 0;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
}


function draw(){
 background(255);
  
  if (gameState === PLAY) {
  score = score + Math.round(getFrameRate()/60);
   
    if(keyDown("space") && monkey.y >= 250) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8
    
   // ground.velocityX = -(6 + 3*score/100);
   // if (ground.x < 0){
   //   ground.x = ground.width/4;
  //  }
    
  back.velocityX = -(6 + 3*score/100);
  if (back.x < 0){
    back.x = back.width/2;
  }
    
    
  if (monkey.isTouching(bananaGroup)) {
    banana.visible = false;
    
  switch(score) {
      case 10: monkey.scale = 0.12;
              break;
      case 20: monkey.scale = 0.14;
              break;
      case 30: monkey.scale = 0.16;
              break;
      case 40: monkey.scale = 0.18;
              break;
      default: break;
  }
}
    //istouching --> isTouching
  if (stoneGroup.isTouching(monkey)){
      monkey.scale = 0.2;
  }
 
    spawnBanana();
    spawnStone();
    
  monkey.collide(ground);  
    
} else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
   drawSprites();
  
}

function spawnBanana(){
if (frameCount % 120 === 0) {
    banana = createSprite(600,230,40,10);
    banana.y = Math.round(random(160,210));
    banana.addImage("banana", bananaImg);
    banana.scale = 0.06;
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

function spawnStone(){
if (frameCount % 60 === 0) {
  stone = createSprite(50,300,10,40);
  stone.velocityX = -(6 + 3*score/100);
  stone.scale = 0.5;
  stone.lifetime = 300;
  stoneGroup.add(stone);
 }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  monkey.changeAnimation("running",monkey_running);
  
  score = 0;
}