
var monkey , monkey_running, monkeyCollide;
var ground, invisibleGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){

  monkey_running =     loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeyCollide = loadAnimation("monkey_1.png");
  
  
  groundImg = loadAnimation("ground.jpg") 
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup(){
  
 createCanvas(600,300);
  
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  
  monkey = createSprite(50,250,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
   
  ground = createSprite(0,325,600,20);
  ground.scale = 0.9; 
  ground.addAnimation("ground", groundImg);
  
  
  invisibleGround = createSprite(width/2,height-25,width,7);
  invisibleGround.visible = false;
  
}

function draw(){
  
  background("white");
  
  
  
  
  if (gameState === PLAY){
  
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(4 + score * 1.5/100);
    if(touches.length > 0 || keyDown("space") && monkey.y >=              height - 70) {
      monkey.velocityY = -14; 
      touches = [];
    }
    monkey.velocityY = monkey.velocityY + 0.8
    
    if (ground.x < width/2 - 100){
      ground.x = width/2; 
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore = bananaScore + 1;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    textSize(30);
    text("Game OveR",300,100);
    
    textSize(15);
    text("Press 'r' to restart",300,120);
    
    
    if (keyDown("r")) {
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
      touches = [];
    }
  }
  
  
  drawSprites(); 
  
  
  monkey.collide(invisibleGround);
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(width,height-160,50,50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);
  }
  }


function obstacles(){
  if (frameCount % 200 === 0){
    
    obstacle = createSprite(width,height-50,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4 + score * 1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }
  }