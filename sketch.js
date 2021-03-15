var PLAY=1;
var END=0;
var gameState=1;

var sword,enemy;
var fruit1,fruit2,fruit3,fruit4;
var fruitGroup,enemyGroup,gameoverImage;
var swordImage,enemyImage;
var score,randomFruit;
var gameOverSound,knifeSwooshSound;

function preload(){
swordImage = loadImage("sword.png");
enemyImage = loadImage("alien1.png","alien2.png");
fruit1 = loadImage("fruit1.png");
fruit2 = loadImage("fruit2.png");
fruit3 = loadImage("fruit3.png");
fruit4 = loadImage("fruit4.png");
gameoverImage = loadImage("gameover.png");
gameOverSound = loadSound("gameover.mp3");
knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
}

function setup(){
//Load canvas
createCanvas (500,500);

//Create a sword
sword=createSprite(40.200,20,20);
sword.addImage(swordImage);
sword.scale=0.7;
 
//Set sword collider
sword.setCollider("rectangle",0,0,0,0);

//Create score variable and Groups
score=0;

fruitGroup=createGroup();
enemyGroup=createGroup();

}

function draw() {
  //Create a light blue background
  background("lightblue");
  
  if (gameState===PLAY){
    
   //Call fruits function and Enemy function
   fruits();
   Enemy();
    
   //Move sword with mouse
   sword.x=World.mouseX;
   sword.y=World.mouseY;
    
  //Increase score with 2 if swoerd is touching fruit
   if(fruitGroup.isTouching(sword)){
     fruitGroup.destroyEach();
     //knife sound
     knifeSwooshSound.play();
     score=score+2;
    }
    else
   { //If sword touches the enemy,go to END state 
     if(enemyGroup.isTouching(sword)){
       gameState=END
       
       //gameover sound
       gameOverSound.play();
       
       //Fruit and enemy destroys when sword touches enemy
       fruitGroup.destroyEach();
       enemyGroup.destroyEach();
       
       //Fruit and enemy stop moving when sword touches enemy
       fruitGroup.setVelocityXEach(0);
       enemyGroup.setVelocityXEach(0);
       
       //Change the image of sword to gameover image
       sword.addImage(gameoverImage);
       sword.x=250;
       sword.y=250;
       sword.scale=1.5;
     }
     }
     }
     
     
   drawSprites();
   //Dispaly score board
  text("Score: "+score,50,30)

}

function fruits(){
  if(World.frameCount%80===0){
   fruit=createSprite(400,200,20,20);
   fruit.scale=0.2;
   //fruit.debug=true;
    
    position = Math.round(random(1,2));
   if (position == 1)
   {
     fruit.x=400;
     fruit.velocityX=-(7+(score/4));
     //console.log(fruit.velocityX);
   }  
  else 
   {
     if (position == 2)
   {
     fruit.x=0;
       
     fruit.velocityX=(7+(score/4));
     //console.log(fruit.velocityX);
  }
  }
    
    r=Math.round(random(1,4));
   if (r == 1) {
     fruit.addImage(fruit1);
   } else if (r == 2) {
     fruit.addImage(fruit2);
   } else if (r == 3) {
     fruit.addImage(fruit3);
   } else {
     fruit.addImage(fruit4);
   }
     fruit.y=Math.round(random(50,340));
    
     //fruit.velocityX=-7;
     fruit.setLifetime=100;
    
     fruitGroup.add(fruit);
   }
   }

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addImage(enemyImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    //console.log(monster.velocityX);
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}