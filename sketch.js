var trex, trex_running, ground, ground_img, invisGround,cloud, cloudImg,ob1, ob2, ob3, ob4, ob5, ob6,rand, ObstaclesGroup, gameover, gameover_img, restart, restart_img, trex_collided, gameState, jumpSound, checkSound, dieSound,rand;
function preload(){
  trex_running = loadAnimation('trex1.png','trex3.png','trex4.png');
  ground_img = loadImage('ground2.png');
  cloudImg = loadImage('cloud.png');
  obl = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  gameover_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
  trex_collided = loadImage("trex_collided.png");
  jumpSound = loadSound("jump.mp3");
  checkSound = loadSound("checkPoint.mp3");
  restart = createSprite(300,200,10,10)
  restart.visible = false;
  gameover = createSprite(300,170,10,10);
  gameState = play;
}
function setup() {
  createCanvas(600,200);
  trex = createSprite(50,150,10,10);
  trex.addAnimation("t1", trex_running);
  trex.scale = 0.6;
  ground = createSprite(300,180,600,5);
  ground.addImage(ground_img);
  invisGround = createSprite(300,185,600,5);
  invisGround.visible = false;
  CloudsGroup = createGroup();
  ObstaclesGroup = createGroup();
}
function spawnClouds(){
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 234;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
}
}
if(gameState = play){
  ground.velocityX = -6;
  spawnObstacles();
  spawnClouds();
}
if(gameState = end){
  ground.velocityX = 0;
  ObstaclesGroup.destroyEach();
restart.visible = true;
gameOver.visible = true;
}

function spawnObstacles(){
if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - 6
    
    //generate random obstacles
     rand = Math.round(random(1,6));
  switch(rand){
    case 1: obstacle.addImage(ob1);
      break;
    case 2: obstacle.addImage(ob2);
      break;
    case 3: obstacle.addImage(ob3);
      break;
    case 4: obstacle.addImage(ob4);
      break;
    case 5: obstacle.addImage(ob5);
      break;
    case 6: obstacle.addImage(ob6);  
      break;
      default: break;
  }

  
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 120;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  } 
}
function draw() {
  background(255);
  console.log(trex.y);
  ground.velocityX = -6
 if(ground.x < 0){
   ground.x = ground.width/2;
 }
  if(frameCount%100 === 0){
    checkSound.play();
  }
  if(keyDown("space") && trex.y > 154){
    trex.velocityY = -13;
    jumpSound.play();
  }
  trex.velocityY = trex.velocityY + 0.67;
  trex.collide(invisGround);
  drawSprites();
}
