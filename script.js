var canvas = document.getElementById('display');
var context = canvas.getContext('2d');
var box = 32;
var snake = [];
snake[0] = {
	x: 7 * box,
	y: 7 * box
}
let direction = "";
let food = {
	x: Math.floor(Math.random() * 19 + 1) * box,
	y: Math.floor(Math.random() * 19 + 1) * box
}
let len = 0;

function createBG(){
	context.fillStyle = 'lightgreen';
	context.fillRect(0,0, 20*box, 20*box);
}

function createSnake(){
	for( i=0; i<snake.length; i++){
		context.fillStyle = 'green';
		context.fillRect(snake[i].x, snake[i].y, box, box);
	}
}

function createfood(){
	context.fillStyle = 'darkgreen';
	context.fillRect(food.x, food.y, box, box)
}


document.addEventListener('keydown', update);

function update (event){
	if(event.keyCode == 37 && direction != 'right') direction = 'left';
	if(event.keyCode == 38 && direction != 'up') direction = 'down';
	if(event.keyCode == 39 && direction != 'left') direction = 'right';
	if(event.keyCode == 40 && direction != 'down') direction = 'up';
}

function start(){
	for ( i = 1; i < snake.length; i++ ){
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			clearInterval(jogo)
			alert("FIM DE JOGO !!!")
		}
	}

	if(snake[0].x > 19 * box && direction == 'right') snake[0].x = 0;
	if(snake[0].x < 0 && direction == 'left') snake[0].x = 20 * box;
	if(snake[0].y > 19 * box && direction == 'up') snake[0].y = 0;
	if(snake[0].y < 0 && direction == 'down') snake[0].y = 20 * box;

	createBG();
	createSnake();
	createfood();

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(direction =="right") snakeX += box;
	if(direction =="left") snakeX -= box;
	if(direction =="up") snakeY += box;
	if(direction =="down") snakeY -= box;

	if(snakeX == food.x && snakeY == food.y){
		food.x = Math.floor(Math.random() * 19 + 1) * box;
		food.y = Math.floor(Math.random() * 19 + 1) * box;
	}else{snake.pop()}

	let newHead = {
		x: snakeX,
		y: snakeY
	}
	snake.unshift(newHead);
}

let jogo = setInterval(start, 150)