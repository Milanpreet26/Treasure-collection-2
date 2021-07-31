//creating variables
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  //loading images
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  //creating canvas
  createCanvas(windowWidth,windowHeight);
  
  // Moving background
  path=createSprite(width/2,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70,height-20,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.addAnimation("endImg", endImg);
  boy.scale=0.08;
  
  //creating groups  
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();
 
}

function draw() {

  //gamestate play
  if(gameState===PLAY){
  //background
  background(0);
    
  //boy x position = mouse x position
  boy.x = World.mouseX;
  
  //edges
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 586 ){
    path.y = height/2;
  }
  
    //calling functions
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    //adding points
    if (cashG.isTouching(boy)) {
        cashG.destroyEach();
        treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
             diamondsG.destroyEach();
             treasureCollection = treasureCollection+75;
      
    }else if(jwelleryG.isTouching(boy)) {
             jwelleryG.destroyEach();
             treasureCollection = treasureCollection+100;
      
    }else{
      if(swordGroup.isTouching(boy)) {
         gameState = END;
    }
  } 
}
  
  //gamestate END
  if (gameState === END) {
     //treasure collection
     treasureCollection = 0;
  
    //changing animation of boy
    boy.changeAnimation("endImg", endImg);
    boy.scale = 0.75;
    boy.x = width/2;
    boy.y = 200;
    
    //destroying groups
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
 
    //setting velocity of each group to 0
    cashG.setVelocityEachY = (0);
    diamondsG.setVelocityEachY = (0);
    jwelleryG.setVelocityEachY = (0);
    swordGroup.setVelocityEachY = (0);
    
    //setting path velocity to 0
    path.velocityY = 0;
    
  }
   
//drawing sprites
drawSprites();
  
//creating text
textSize(20);
fill(255);
 text("Treasure: "+ treasureCollection,width-125,30);
  
}

//creating cash
function createCash() {
  if (World.frameCount % 200 == 0) {
      var cash = createSprite(Math.round(random(50, width-350),40, 10, 10));
      cash.addImage(cashImg);
      cash.scale=0.12;
      cash.velocityY = 4;
      cash.lifetime = 300;
      cashG.add(cash);
     }
}

//creating Diamonds
function createDiamonds() {
  if (World.frameCount % 320 == 0) {
      var diamonds = createSprite(Math.round(random(50, width-350),40, 10, 10));
      diamonds.addImage(diamondsImg);
      diamonds.scale=0.03;
      diamonds.velocityY = 4;
      diamonds.lifetime = 300;
      diamondsG.add(diamonds);
     }
}

//Creating jwellery
function createJwellery() {
  if (World.frameCount % 410 == 0) {
      var jwellery = createSprite(Math.round(random(50, width-350),40, 10, 10));
      jwellery.addImage(jwelleryImg);
      jwellery.scale=0.13;
      jwellery.velocityY = 4;
      jwellery.lifetime = 300;
      jwelleryG.add(jwellery);
     }
}

//creating sword
function createSword(){
  if (World.frameCount % 530 == 0) {
      var sword = createSprite(Math.round(random(50, width-350),40, 10, 10));
      sword.addImage(swordImg);
      sword.scale=0.1;
      sword.velocityY = 4;
      sword.lifetime = 300;
      swordGroup.add(sword);
     }
}

// TO BE CONTINUED...