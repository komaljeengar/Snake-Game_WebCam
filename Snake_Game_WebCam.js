let snake 
let rez = 20
let food 
let w 
let h
let label = "waiting..."
let video
let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/GeLH-0yRG/';
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }
function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  w = floor(width/rez)
  h = floor(height/rez)
  frameRate(5)
  snake = new Snake()
  foodLocation()
}
function classifyVideo() {
    //flippedVideo = ml5.flipImage(video)
    classifier.classify(video, gotResult);
   // flippedVideo.remove();
}
function foodLocation (){
  let x = floor(random(w))
  let y = floor(random(h))
  food = createVector(x,y)
}
function controlSnake(){
  if(label==='left'){
    snake.setDir(-1,0)
  }
 else if(label==='right'){
    snake.setDir(1,0)
  }
 else if(label==='down'){
    snake.setDir(0,1)
  }
 else if(label==='up'){
    snake.setDir(0,-1)
  }
}
function draw() {
  background(220);
  image(video,0,0)
  textSize(32)
  fill(0)
  text(label,width/2,20)
  scale(rez)
  
  if(snake.eat(food)){
    foodLocation()
  }
  snake.update()
  snake.show()
  if (snake.endGame()){
    print('gameover')
   // showGO()
    background(255,0,0)
    noLoop()
  }
  noStroke()
  fill(0)
  rect(food.x,food.y,1,1)
}
function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
  controlSnake()
    classifyVideo();
  }
