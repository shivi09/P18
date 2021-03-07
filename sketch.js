var path, boy, cash, diamonds, jwellery, sword;
var edges, pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg, end, endImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
const PLAY = 1;
const END = 0;
var gameState = PLAY;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  // Moving background
  path = createSprite(width / 2, height / 2);
 path.addImage(pathImg);

 //creating boy running
  boy = createSprite(width / 2, height-100);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.1;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  background(0);
  drawSprites();
 
  if (gameState === PLAY) {
    path.velocityY = 4;
    if(touches.length>0){
      boy.x= touches;
    }
    
    boy.x = mouseX;

    edges = createEdgeSprites();
    boy.collide(edges);

    //code to reset the background
    if (path.y > height) {
      path.y = height / 2;
    }

    var rand = Math.round(random(1, 4));
    if (frameCount % 80 == 0) {
      if (rand == 1)
        createCash();
      else if (rand == 2)
        createDiamonds();
      else if (rand == 3)
        createJwellery();
      else
        createSword();
    }

    if (cashG.isTouching(boy)) {
      cashG[0].destroy();
      treasureCollection = treasureCollection + 50;
    } else if (diamondsG.isTouching(boy)) {
      diamondsG[0].destroy();
      treasureCollection = treasureCollection + 50;

    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG[0].destroy();
      treasureCollection = treasureCollection + 50;
    } else {
      if (swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END;
      }
    }
  }
  if (gameState === END) {
    boy.destroy();
    path.velocityY = 0;
    end = createSprite(width/2, height/2)
    end.addAnimation("end", endImg);
    diamondsG.destroyEach();
    cashG.destroyEach();
    jwelleryG.destroyEach();
  }

//console.log(gameState)
  
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);

}

function createCash() {

  var cash = createSprite(Math.round(random(50, windowWidth - 50)), 40, 10, 10);
  cash.addImage(cashImg);
  cash.scale = 0.12;
  cash.velocityY = 3;
  cash.lifetime = windowHeight / cash.velocityY;
  cashG.add(cash);

}

function createDiamonds() {

  var diamonds = createSprite(Math.round(random(50, windowWidth - 50)), 40, 10, 10);
  diamonds.addImage(diamondsImg);
  diamonds.scale = 0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = windowHeight / diamonds.velocityY;
  diamondsG.add(diamonds);

}

function createJwellery() {

  var jwellery = createSprite(Math.round(random(50, windowWidth - 50)), 40, 10, 10);
  jwellery.addImage(jwelleryImg);
  jwellery.scale = 0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = windowHeight / jwellery.velocityY;
  jwelleryG.add(jwellery);

}

function createSword() {

  var sword = createSprite(Math.round(random(50, windowWidth - 50)), 40, 10, 10);
  sword.addImage(swordImg);
  sword.scale = 0.1;
  sword.velocityY = 3;
  sword.lifetime = windowHeight/ sword.velocityY;
  swordGroup.add(sword);

}

function deviceTurned(){
  if(turnAxis === 'X'){
    boy.x=boy.x+10;
  }
}