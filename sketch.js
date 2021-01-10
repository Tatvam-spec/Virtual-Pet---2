//Create variables here
var dog, happyDog, dogImg;
var foodS, foodStock, database;
var milkImg;

function preload()
{
  //load images here
  dogImg = loadImage("sprites/dog1.png");
  happyDog = loadImage("sprites/dog2.png");
  milkImg = loadImage("sprites/Milk.png");


}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);

  dog = createSprie(250, 250, 50, 50);
  dog.addImage(dogImg);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}


function draw() {
  background(46, 139, 87);  

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke(2);
  text("Food remaining:", foodStock, 200, 200);
  
  fill(255, 255, 254);
  textSize(15);
  if(lastFed >= 15){
    text("Last Feed : " + lastFed%12 + " PM", 350, 30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed : " + lastFeed + " AM", 350, 30)
  }
  
}



//Function to read values from Database
function readStock(data){
  foodS = data.val();
}


//Function to write values from Database
function writeStock(x){
  if(x <= 0){
    x = 0;
  } else{
    x = x - 1;
  }
database.ref('/').update({
  Food:x
})
}

//Function to update foodStock and last Fed time
function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj, getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      feedTime:hour()
    })
}

//Function to add food in the stock
function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

