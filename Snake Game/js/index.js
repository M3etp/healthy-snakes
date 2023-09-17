// GAME CONSTANTS

let inputDir = {x:0, y:0};
const foodSound = new Audio('assets/eating.wav');
const gameOverSound = new Audio('assets/gameover.wav');
const moveSound = new Audio('assets/move.mp3');
const musicSound = new Audio('assets/bgm.mp3');
let lastPaintTime = 0;
let speed = 5;
let score = 0;
let snakeArr = [
    {x:13, y:15}
];
let food = { x: 6 , y:7};
let junkfood = {x: 9 , y: 16}

// GAME FUNCTIONS

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if ((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isColide(snakeArr){
    // IF YOU BUMP INTO YOUR SELF
    for (let i = 1; i < snakeArr.length; i++) {
       if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
        return true;
       }
    }
    // JUNK FOOD EATEN AT LENGTH 1
    if(snakeArr.length === 0){
        return true;
}

    // IF YOU BUMP INTO WALL
       if(snakeArr[0].x >= 18 || snakeArr[0].x <=  0 || snakeArr[0].y >= 18 || snakeArr[0].y <=  0)
       {
        return true;
       } 
    
}

function gameEngine(){
 
    // PART 1: UPDATING THE SNAKE ARRAY AND FOOD
    if(isColide(snakeArr)){
        
        setTimeout(() => {musicSound.pause();}, 200)     
        gameOverSound.play();
        inputDir = {x:0,y:0};
        setTimeout(() => {alert("Game Over, Press any key to play again!!")}, 200)    
        snakeArr = [{x:13, y:15}];
        setTimeout(() => {musicSound.play();}, 200)
        score = 0;
    }

    // if you eaten food, increament the score and regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)*Math.random())}
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscorebox.innerHTML = "High Score: " + hiscoreval;
        }
        document.querySelector("#score").innerHTML = "Score: " + score;
    }

    // IF YOU EATEN JUNK FOOD DECREMENT THE SCORE AND SNAKE ARRAY LENGTH DECRESE AND REGENERATE FOOD
    if(snakeArr[0].y === junkfood.y && snakeArr[0].x === junkfood.x){
        snakeArr.shift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        junkfood = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)*Math.random())}
        foodSound.play();
        score -= 1;
        document.querySelector("#score").innerHTML = "Score: " + score;
    }

    // MOVING THE SNAKE 
    for (let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]} ;

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // PART 2: DISPLAY THE SNAKE AND FOOD
    // DISPLAY SNAKE
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0){ 
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');    
            }
        board.appendChild(snakeElement);
    })
    // DISPLAY FOOD
       
            foodElement = document.createElement('div');
            foodElement.style.gridRowStart = food.y;
            foodElement.style.gridColumnStart = food.x;
            foodElement.classList.add('food');
            board.appendChild(foodElement); 

    // DISPLAY JUNK FOOD
            junkfoodElement = document.createElement('div');
            junkfoodElement.style.gridRowStart = junkfood.y;
            junkfoodElement.style.gridColumnStart = junkfood.x;
            junkfoodElement.classList.add('junkfood');
            board.appendChild(junkfoodElement);  
}



        // MAIN LOGIC STARTS HERE

        let hiscore = localStorage.getItem("hiscore")
        if(hiscore===null){
            let hiscoreval = 0;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
        } else {
            hiscoreval = JSON.parse(hiscore);
            hiscorebox.innerHTML = "High Score: " + hiscore;
        }

        window.requestAnimationFrame(main);
        window.addEventListener('keydown', e => {
            inputDir = {x: 0, y:1} //start the game
            musicSound.play();
            moveSound.play();
            switch (e.key) {
                case "ArrowUp":
                    inputDir.x = 0;
                    inputDir.y = -1;    
                    break;

                case "ArrowDown":
                    inputDir.x = 0;
                    inputDir.y = 1;    
                    break;

                case "ArrowLeft":
                    inputDir.x = -1;
                    inputDir.y = 0;    
                    break;
                    
                case "ArrowRight":
                    inputDir.x = 1;
                    inputDir.y = 0;    
                    break;      
                
                default:
                    break;
            }
        });