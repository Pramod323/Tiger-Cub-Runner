//.. 
var bI, b;
var END = 2;
var PLAY = 1;
var BS = 0;
var gameState = BS;
var scopeImage, scope;
var tiger, tigerImage;
var invisibleGround;
var randomForSpawningObstacles;
var randomForSpawningFoods, rdheight;
var cactus, cage, cactusImage, cageImage, foodGroup;
var food, meat1Image, meat2Image, meat3Image, obstacleGroup;
var right, rightImage;
var restart, restartImage, boxx, boxImage, reddot;
var score = 0;
var ft = 0;

function preload(){
  bI = loadImage("bground.png");
  scopeImage = loadImage("scopeImage.png");
  tigerImage = loadImage("fhhqwqsphqy.gif");
  cactusImage = loadImage("cactus.png");
  cageImage = loadImage("cage.png");
  meat1Image = loadImage("meat1.png");
  meat2Image = loadImage("meat2.png");
  meat3Image = loadImage("meat3.png");
  boxImage = loadImage("box.png")
  restartImage = loadImage("restart.png");
  rightImage = loadImage("right.png");
}

function setup() {
  createCanvas(600,200);
  
  b = createSprite(600,100);
  
  right = createSprite(570,180);
  right.addImage(rightImage);
  right.scale = 0.1;
  
  tiger = createSprite(80,150);
  tiger.addImage(tigerImage);
  tiger.scale = 0.15;
  tiger.setCollider("rectangle",160,135,610,370);
  
  reddot = createSprite(305,110,8,8)
  reddot.shapeColor = "red";
  scope = createSprite(247,165);
  scope.addImage("scopeim",  scopeImage);
  scope.scale = 0.45;
  boxx = createSprite(405,50);
  boxx.addImage(boxImage);
  boxx.scale = 0.014;
  
  invisibleGround = createSprite(300,210,600,20);
  invisibleGround.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  restart = createSprite(300,160);
  restart.addImage(restartImage);
  restart.scale = 0.5;
}

function draw() {
  background(220);
 if(gameState===BS){
    drawSprites();
    restart.visible = false;
    tigerImage.pause();
    tiger.x = 288;
    tiger.y = 90;
    b.addImage(bI);
      textSize(13);
      text("Oh! I Think",368, 30);
      text("someone is ",366, 42);
      text("aiming ME!!",368, 54);  
      text("Help Me!!",371, 68); 
    if(keyDown("enter")||mousePressedOver(right)&&gameState===BS){
      gameState = PLAY;
      tiger.x = 80;
      tiger.y = 150;
    }
  }
  else if(gameState===PLAY){
    right.destroy();
    reddot.destroy();
    boxx.destroy();
    scope.destroy();
    tigerImage.play();
    restart.visible = false;
    b.addImage(bI);
    b.velocityX = -(8.4+score/8000);
    if(b.x < -1150){b.x = 120}
    if(keyDown("space")&&tiger.y>150){
      tiger.velocityY -= 16; 
    }
    tiger.velocityY += 0.886 
    tiger.collide(invisibleGround);
    spawnObstacles();
    spawnFoods();
    drawSprites();
    score = score + Math.round(getFrameRate()/60);
    fill("red")
    stroke(2)
    text("Score: "+ score,520,25);
    text("Food Eaten: "+ ft,520,45);
    if(tiger.isTouching(foodGroup)){
      ft += 1;
      foodGroup[0].destroy();
    }
    if(tiger.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  else if(gameState===END){
    drawSprites();
    restart.visible = true;
    tiger.velocityY = 0;
    b.velocityX = 0;
    b.x = 513.9999999999987
    tigerImage.pause();
    food.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    textSize(29);
    fill("red");
    stroke(3);
    text("Final Score: "+ score,205,70);
    text("Food Eaten: "+ ft,210,117);
    if(keyDown("r")||mousePressedOver(restart)){
      if(gameState===END){
        reset();
      }
    }
  }
}

function spawnObstacles(){
  if(frameCount%100===0){
    randomForSpawningObstacles = Math.round(random(1,2));
    if(randomForSpawningObstacles===1){
      cage = createSprite(650,165);
      cage.addImage(cageImage);
      cage.velocityX = -(8.4+score/100);
      cage.scale = 0.18;
      cage.lifetime = 100;
      obstacleGroup.add(cage);
      cage.depth = tiger.depth;
      tiger.depth += 1;
      cage.setCollider("rectangle",0,0,400,400)
    }
    if(randomForSpawningObstacles===2){
      cactus = createSprite(650,174);
      cactus.addImage(cactusImage);
      cactus.velocityX = -(8.4+score/100);
      cactus.scale = 0.048;
      cactus.lifetime = 100;
      obstacleGroup.add(cactus);
      cactus.depth = tiger.depth;
      tiger.depth += 1;
      cactus.setCollider("rectangle",-185,0,680,2200);
    }
  }
}


function spawnFoods(){
  if(frameCount%60===0){
    randomForSpawningFoods = Math.round(random(1,3));
    rdheight = Math.round(random(20,95));
    food = createSprite(650,rdheight);
    food.velocityX = -(8.4+score/100);
    food.depth = tiger.depth;
    tiger.depth += 1; 
    foodGroup.add(food)
    food.lifetime = 86;
    if(randomForSpawningFoods===1){
      food.addImage(meat1Image);
      food.scale = 0.2;
    }
    if(randomForSpawningFoods===2){
      food.addImage(meat2Image);
      food.scale = 0.067;
    }
    if(randomForSpawningFoods===3){
      food.addImage(meat3Image);
      food.scale = 0.035;
    }
  }
}

function reset(){
  score = 0;
  ft = 0;
  gameState = PLAY;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  tigerImage.play();
}