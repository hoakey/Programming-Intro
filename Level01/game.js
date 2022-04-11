function gameLoop() {	
	/*** WRITE YOUR OWN CODE HERE ***/
	// STEP 1: Draw the ball, both paddles, and both scores.
	//1a: Clear existing objects off the screen by calling clearScreen()
	
	
	
	//1b: Draw all game objects by calling the following functions:
	// drawPaddles(), drawBall(), drawScores()
	
	
	
	
	// STEP 2: 
	// Take the next step of the game with moveAllObjects()
	
	
	
	
	// STEP 3: Move AI by calling moveAI()
	
	
	
	
	// STEP 4: Bounce ball off either paddle with logic:
	// IF isBallTouchingAIPaddle() OR isBallTouchingPlayerPaddle()
	//   THEN ball.xSpeed = ball.xSpeed * -1
	
	
	
	
	// STEP 5: Bounce ball off top or bottom with logic:
	// IF ball.yPosition IS LESS THAN 0 OR ball.yPosition IS GREATER THAN screenHeight
	// THEN ball.ySpeed IS ball.ySpeed * -1
	
	
	
	
	// STEP 6: Move the player paddle with the arrow keys. Use the following logic:
	// IF isUpPressed()
	//   THEN playerPaddle.speed IS paddleSpeed * -1
	// ELSE IF isDownPressed()
	//   THEN playerPaddle.speed IS paddleSpeed
	// ELSE playerPaddle.speed IS 0
	
	
	
	
	// STEP 7: Check if the ball has scored on either side with tryToScoreBall()
	
	
	
	/*** STOP WRITING CODE HERE ***/
}


/**** GLOBAL VARIABLES ****/
// Configuration Variables
var framesPerSecond = 25;
var screenHeight = 200;
var screenWidth = 400;

var paddleWidth = 8;
var paddleLength = 40;
var paddleSpeed = 2;
var ballSpeed = 5;

// Game Variables
//These will be set when the game starts. Note that in examples this is often called "ctx"
var screen;
var loopTimer;
//Number of goals scored by the AI
var aiScore = 0;
//Number of goals scored by the AI
var playerScore = 0;
// An Object to keep track of the AI
var aiPaddle = {
	// Current Y-Axis position on the screen
	position: 0,
	// Current Y-Axis moving speed
	speed: 0
};

var playerPaddle = {
	// Current Y-Axis position on the screen
	position: 0,
	// Current Y-Axis moving speed
	speed: 0
};

var ball = {
	// Current Y-Axis position on the screen
	xPosition: 0,
	// Current Y-Axis position on the screen
	yPosition: 0,
	// Current X-Axis moving speed
	xSpeed: 0,
	// Current Y-Axis moving speed
	ySpeed: 0
}

/**** END GLOBAL VARIABLES ****/
