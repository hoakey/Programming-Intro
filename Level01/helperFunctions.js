function initialize() {
	var c = document.getElementById("canvas");
	c.height = screenHeight;
	c.width = screenWidth;
	
	screen = c.getContext("2d");
	screen.fillStyle = "#FFFFFF";
	
	startPlay();
	//Set a timer to call gameLoop
    loopTimer = setInterval(gameLoop, 1000 / framesPerSecond);
}

function startPlay() {
	ball.xPosition = screenWidth / 2;
	ball.yPosition = screenHeight / 2;
	
	ball.xSpeed = selectRandom(ballSpeed * -1, ballSpeed);
	ball.ySpeed = selectRandom(ballSpeed * -1, ballSpeed);
	
	playerPaddle.position = screenHeight / 2;
	aiPaddle.position = screenHeight / 2;
}

function setAiSpeed() {
	if (isBallBelowAIPaddle()) {
		//If ball is below the paddle on screen, move the paddle down at its allowed speed
		aiPaddle.speed = paddleSpeed;
	} else {
		//If ball is below the paddle on screen, move the paddle up at a negative of allowed speed
		aiPaddle.speed = paddleSpeed * -1;
	}
}

// Updates the position of each movable object
function moveAllObjects() {
	movePlayer();
	moveAI();
	moveBall();
}

function movePlayer() {
	playerPaddle.position = playerPaddle.position + playerPaddle.speed;
	// If the player is above the screen, move it back onto the screen
	if (playerPaddle.position < 0) {
		playerPaddle.position = 0;
	}
	// If the end of the player paddle is below the screen, move it back onto the screen
	else if (playerPaddle.position + paddleLength > screenHeight) {
		playerPaddle.position = screenHeight - paddleLength;
	}
}

function moveAI() {
	aiPaddle.position = aiPaddle.position + aiPaddle.speed;
	// If the AI is above the screen, move it back onto the screen
	if (aiPaddle.position < 0) {
		aiPaddle.position = 0;
	}
	// If the end of the AI paddle is below the screen, move it back onto the screen
	else if (aiPaddle.position + paddleLength > screenHeight) {
		aiPaddle.position = screenHeight - paddleLength;
	}
}

function moveBall() {
	ball.xPosition = ball.xPosition + ball.xSpeed;
	ball.yPosition = ball.yPosition + ball.ySpeed;
}

function tryToScoreBall() {
	if (ball.xPosition < 0) {
		// Increment player's score
		playerScore = playerScore + 1;
		
		// Restart the game
		startPlay();
	}
	else if (ball.xPosition > screenWidth) {
		// Increment AI's score
		aiScore = aiScore + 1;
		
		// Restart the game
		startPlay();
	}
}

/**** DRAW FUNCTIONS ****/
//Blanks out the screen so it is ready for another draw
function clearScreen() {
	screen.clearRect(0, 0, screenWidth, screenHeight);
}

//Draws both AI and Player paddles by calling drawPaddle() twice
function drawPaddles() {
	drawPaddle(0, aiPaddle.position);
	drawPaddle(screenWidth - paddleWidth, playerPaddle.position);
}

//Draws a generic paddle when given the X and Y position on screen
function drawPaddle(paddleXPosition, paddleYPosition) {
	screen.fillRect(paddleXPosition, paddleYPosition, paddleWidth, paddleLength);
}

function drawBall() {
	// Drawn a circle 5 pixels in radius
	screen.beginPath();
	screen.arc(ball.xPosition, ball.yPosition, 5, 0,Math.PI*2);
	screen.closePath();
	screen.fill();
}

//Draws both player and AI score by calling drawScore() twice
function drawScores() {
	drawScore(aiScore, 20);
	drawScore(playerScore, screenWidth - 20);
}

function drawScore(score, xPosition) {
	screen.font = '22px sans-serif';
	screen.fillText(score, xPosition, 20);
}
/**** END DRAW FUNCTIONS ****/

/**** INPUT FUNCTIONS ****/
function getMousePosition() {
	return inputState.mousePos;
}

function isUpPressed() {
	return inputState.up;
}

function isDownPressed() {
	return inputState.down;
}

function isLeftPressed() {
	return inputState.left;
}

function isRightPressed() {
	return inputState.right;
}

function isSpacePressed() {
	return inputState.space;
}

var inputState = {
	up: false,
	down: false,
	left: false,
	right: false,
	space: false
}

//Add keyboard event listeners
window.addEventListener("keydown", function (e) {
   var keyCode = e.code;
   if (keyCode == "ArrowRight" || keyCode == "KeyD") //right OR d
      inputState.right = true;
	
   else if (keyCode == "ArrowDown" || keyCode == "KeyS") //down OR s
      inputState.down = true;
	
   else if (keyCode == "ArrowLeft" || keyCode == "KeyA") //left OR a
      inputState.left = true;
	
   else if (keyCode == "ArrowUp" || keyCode == "KeyW") //up OR w
      inputState.up = true;
	
	else if (keyCode == "ArrowUp") //space bar
		inputState.space = true;
}, false);

//Add keyboard event listeners
window.addEventListener("keyup", function (e) {
   var keyCode = e.code;
   if (keyCode == "ArrowRight" || keyCode == "KeyD") //right OR d
      inputState.right = false;
	
   else if (keyCode == "ArrowDown" || keyCode == "KeyS") //down OR s
      inputState.down = false;
	
   else if (keyCode == "ArrowLeft" || keyCode == "KeyA") //left OR a
      inputState.left = false;
	
   else if (keyCode == "ArrowUp" || keyCode == "KeyW") //up OR w
      inputState.up = false;
	
	else if (keyCode == "ArrowUp") //space bar
		inputState.space = false;
}, false);
/**** END INPUT FUNCTIONS ****/

/**** MISC. FUNCTIONS ****/
function isBallBelowAIPaddle() {
	return ball.yPosition > aiPaddle.position + (paddleLength / 2)
}

// Check if ball has hit AI's paddle
function isBallTouchingAIPaddle() {
	if (
		// Is the ball in the right spot to hit the paddle on the X-Axis
		ball.xPosition < paddleWidth
		&&	// "&&" means AND. It is only true if condition A and condition B are both true
		// Is the ball between the paddle's start and end on the Y-Axis
		(ball.yPosition > aiPaddle.position && ball.yPosition < aiPaddle.position + paddleLength)
		)
		return true;
	else
		return false;
}

// Check if ball has hit Player's paddle
function isBallTouchingPlayerPaddle() {
	if (
		// Is the ball in the right spot to hit the paddle on the X-Axis
		ball.xPosition > screenWidth - paddleWidth
		&&	// "&&" means AND. It is only true if condition A and condition B are both true
		// Is the ball between the paddle's start and end on the Y-Axis
		(ball.yPosition > playerPaddle.position && ball.yPosition < playerPaddle.position + paddleLength)
	)
		return true;
	else 
		return false;
}

//Randomly picks between two arguments
function selectRandom(argA, argB) {
	
	if (Math.random() < 0.5)
	{
		return argA;
	}
	else
	{
		return argB;
	}
}

//Returns a random decimal number between min and max
function getRandomDecimal(min, max) {
  return Math.random() * (max - min) + min;
}

//Returns a random whole number that is less than max and greater than or equal to min
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
/**** END MISC. FUNCTIONS ****/
