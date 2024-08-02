var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var starimg,star, stargroup 
function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  starimg = loadImage("star.png")
} 

function setup() {  
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost= createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale= 0.3
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  stargroup = new Group()
  
}

function draw() {
  background("black");
if(gameState== "play"){
  if (tower.y > 400) {
    tower.y = 300
  }
  if (keyDown("left_arrow")) {
    ghost.x = ghost.x -3
  }
  if (keyDown("right_arrow")) {
    ghost.x = ghost.x +3
  }
  if (keyDown("space")) {
    ghost.velocityY= -5
  }
  ghost.velocityY +=0.8
  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end"
  }
  for (let i = 0; i < stargroup.length; i++) {
    if(stargroup[i].isTouching(ghost)){
      stargroup[i].destroy()

    }
    
  }

  spanwndoors()
  drawSprites()
}
if (gameState === "end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over", 230,250)
}

}
function spanwndoors() {
  if (frameCount % 200 == 0) {
    var door = createSprite(200, -50)
    var star = createSprite(200,-10)
    var climber = createSprite(200, 10)
    door.addImage(doorImg)
    climber.addImage(climberImg)
    star.addImage(starimg)
    star.scale = 0.02
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.velocityY = 1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1
    star.velocityY = 1
           
    door.x = Math.round(random(120, 400))
    climber.x = door.x
    invisibleBlock.x = door.x
    star.x= door.x

    ghost.depth = door.depth
    ghost.depth+=1
    door.lifetime = 800
    climber.lifetime = 800
    star.lifetim = 800
    
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
    stargroup.add(star)

  }
}