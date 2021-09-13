var path,boy,doracake,cake,cake1,rat;
var pathImg,boyImg,doracakeImg,cakeImg,cake1Img,ratImg;
var score = 0;
var food = 0;
var doracakeG,cakeG,cake1G,ratGroup;
var s;
var jump,ground;
//Game States
var PLAY=1;
var END=0;
var gameState=1;
var invisible;
var coin;
var coinim;
var flag=0;
var birdi,bird;
var gos,cos,ci;
var bombs;
function preload(){
  pathImg = loadImage("wallpaper.jpg");
  boyImg = loadAnimation("walk-0.png","walk-2.png","walk-3.png");
  doracakeImg = loadImage("energyDrink.png");
  cakeImg = loadImage("power.png");
  cake1Img = loadImage("coin.png");
  coinim= loadAnimation("coin.png");
  ratImg = loadAnimation("bomb.png");
  blasti=loadAnimation("blast.png")
  endImg =loadImage("game.png");
  s= loadSound("bgs.wav");
  jump= loadAnimation("waving-0.png","waving-1.png","waving-2.png","waving-3.png");
  jump.looping=false;
  gimg= loadImage("ground.png")
  lefti=loadAnimation("w2.png","w3.png","w4.png","w5.png")
  birdi=loadAnimation("b1.png","b2.png");
  gos=loadSound("go.wav");
  cos=loadSound("wcoin.wav");
  ci=loadImage("c.png");
}

function setup(){
  
  createCanvas(600, 600);
  s.loop();
 
  

// Moving background
path=createSprite(800,300)
path.addImage("pathi",pathImg);
path.x=path.width/2
path.velocityX = -2;
path.scale=3;

  path.x = 300;

//creating boy running
boy = createSprite(400,380,20,20);
boy.addAnimation("right",boyImg);
boy.addAnimation("left",lefti)
boy.addAnimation("jumping",jump)
boy.changeAnimation("right",boyImg)
boy.scale=0.2;
boy.setCollider("rectangle",0,0,width/2,height)

bird=createSprite(800,Math.round(random(100,300)),20,20)

cong= createSprite(width/2,height/2,50,50);
cong.addImage(ci)
cong.visible=false


bird.scale=0.5;
end=createSprite(300,300)
end.addImage(endImg)
end.visible=false;
doracakeG=new Group();
cakeG=new Group();
cake1G=new Group();
ratGroup=new Group();
groundg= new Group();
invisibleg= new Group();
coing= new Group();
b = new Group();

}

function draw() {

  background(0)
  edges= createEdgeSprites();
  boy.collide(edges);
  if(gameState===PLAY)
  {
    if(keyDown("RIGHT_ARROW"))
    {
      boy.x=boy.x+4
      boy.changeAnimation("right",boyImg)
    }
    else if(keyDown("LEFT_ARROW"))
    {
      boy.x=boy.x-4;
      boy.changeAnimation("left",lefti)
    }  
    else if(keyDown("RIGHT_ARROW"))
    {
      boy.x= boy.x+4
    }
    else if(keyDown("space") && boy.y>= 350) 
    {
      boy.velocityY = -4;
      boy.changeAnimation("jumping",jump)
      
     }
    
    else{
    boy.velocityY= boy.velocityY + 2
   // boy.changeAnimation("right",boyImg)
    }
    if(score==100)
    {
        con()
    }
   
    spawnGround()
    if(invisibleg.isTouching(boy)){
      boy.velocityY = 0;
    }
    bombcall()
    if(b.isTouching(boy))
    {
       bombs.changeAnimation("blast",blasti) 
       gameState=END
        
        s.stop();
        gos.play();

      
    }
     if(coing.isTouching(boy))
     {
       if(flag===1)
       {
         coing.destroyEach();
         s.setVolume=0.2;
         cos.play();
         bird.addAnimation("birdy",birdi)
         bird.visible=true;
         bird.velocityX=-5
          console.log("coin")
         score=score+50;
       }
      
       if(flag===2)
       {
         coing.destroyEach();
         bird.addAnimation("birdy",birdi)
          bird.visible=true;
          bird.velocityX=-5
          console.log("boda")
         score=score+50
       }
     }
  //code to reset the background
  if(path.x < 10 )
  {
    path.x = 300;
  }
  //createDoracake();
 // createCake();
 // createCake1();
 // createRat();
  }
 
      
   
    
  
  
  drawSprites();
  textSize(20);
  fill(255);
  text("DoramonScore: "+ score,150,30);
  if (gameState===END)
  {
     
     // end.visible=true;
     boy.visible=false;
     path.velocityX=0;
      coing.destroyEach()
      groundg.destroyEach()
      invisibleg.destroyEach();

      coing.setVelocityXEach(0);
      groundg.setVelocityXEach(0);
      invisibleg.setVelocityXEach(0);
      //boy.addAnimation("jumping",jump)
      gameOver()
      
  }        
    
}




function spawnGround()
{
  if(World.frameCount % 150===0)
  {
    ground=createSprite(800,100, 10, 10)
    invisible= createSprite(800,50);
    coin= createSprite(800,1);
    invisible.width =ground.width;
    coin.scale=0.09;
    invisible.height=2;
    coin.height=3
    coin.debug=true;
    ground.y= Math.round(random(200,400));
    invisible.y=ground.y;
    coing.add(coin)
    coin.addAnimation("coin",coinim)
    coin.addAnimation("bomb",ratImg)
    coin.addAnimation("soda",doracakeImg)
    coin.changeAnimation("coin",coinim)
    var rand = Math.round(random(1,2))
    console.log(rand)
    if(rand===1)
    {
      coin.changeAnimation("coin",coinim)
      coin.scale=0.5;
      flag=1
      
    }
    
    if(rand===2)
    {
      coin.changeAnimation("soda",doracakeImg)
      flag=3
    }
    

    
  
    boy.depth=ground.depth
    boy.depth=boy.depth+1;

    coin.y=ground.y -40;
    invisible.debug=true;
    ground.addImage(gimg)
    ground.scale=0.2
    ground.velocityX=-3
    invisible.velocityX=-3
    coin.velocityX=-3;

    ground.lifetime=400;
    invisible.lifetime=400;
    coin.lifetime=400;
    
    groundg.add(ground);
    invisibleg.add(invisible)

    
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "game.png",
      imageSize: "250x250",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function con() {
  swal(
    {
      title: `Congratulations!!!`,
      text: "Congratulations You Won!!",
      imageUrl:
        "c.png",
      imageSize: "250x250",
      confirmButtonText: "Level 1 complete"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function bombcall()
{
  if(World.frameCount % 150===0)
  {
  bombs= createSprite(Math.round(random(50,500)),-50,10,10)
  bombs.addAnimation("bomb",ratImg)
  bombs.addAnimation("blast",blasti)
  bombs.changeAnimation("bomb",ratImg)
  bombs.velocityY= 2;
  bombs.scale=0.06;
  bombs.lifeTime=400
  b.add(bombs)
  }
}