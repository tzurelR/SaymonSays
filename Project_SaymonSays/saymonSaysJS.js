// definitions:
const timer = document.querySelector('.timer');
let secondsT = 0;
let flag = false;
let minute = 0;
let signsComp = [];
let signsPlayer = [];
let gameLevel = 1;
const game = document.getElementById('id');
const redAudio = document.getElementById('1_audio');
const greenAudio = document.getElementById('2_audio');
const yellowAudio = document.getElementById('4_audio');
const blueAudio = document.getElementById('3_audio');
const level = document.querySelector('.item-level');
const redBtn = document.getElementById('redBtn');
const greenBtn = document.getElementById('greenBtn');
const yellowBtn = document.getElementById('yellowBtn');
const blueBtn = document.getElementById('blueBtn');
const comments = document.querySelector('.comments');
const score = document.querySelector('.item-score');
const points = 5;
let sumScore = 0;
const startBtn = document.querySelector('.startBtn');
let player = 0; // 0 for computer 1 for player
level.textContent = "Level📈: " + gameLevel;
let tick = 0;

// function that set a countUp timer
function upTimer() {

    secondsT++;
    if(secondsT === 60) {
        secondsT = 0;
        flag = false;
        minute++;
    }
    let sec = secondsT;

    if(minute < 10 && !flag) {
        minute = '0' + minute;
        flag = true;
    }
    if(sec < 10) {
        sec = '0' + sec;
    }
    // reset timer:
    if(minute === 99 && sec === 60) {
        minute = 0;
        sec = 0;
        secondsT = 0;
    }

    timer.textContent = minute + ":" + sec;
}


startBtn.addEventListener('click', function () {
    startBtn.style.display = 'none';
    setInterval(upTimer, 1000);
    gameFunc();
})

const colorsFunction = function (e) {
    if(e.target.id === 'redBtn') {
        redAudio.play();
        (player === 1) ? signsPlayer.push(1) : console.log("player = 0");
    } else if (e.target.id === 'greenBtn') {
        greenAudio.play();
        (player === 1) ? signsPlayer.push(2) : console.log("player = 0");
    } else if (e.target.id === 'blueBtn') {
        blueAudio.play();
        (player === 1) ? signsPlayer.push(3) : console.log("player = 0");
    } else if (e.target.id === 'yellowBtn') {
        yellowAudio.play();
        (player === 1) ? signsPlayer.push(4) : console.log("player = 0");
    }
}

redBtn.addEventListener('click', function (e) {colorsFunction(e)})
greenBtn.addEventListener('click', function (e) {colorsFunction(e)})
blueBtn.addEventListener('click', function (e) {colorsFunction(e)})
yellowBtn.addEventListener('click', function (e) {colorsFunction(e)})


// switch player method- 0 for computer, 1 for user
const switchPlayer = function () {
    if(player === 0) {
        player = 1;
        playerFunc();
    } else {
        player = 0;
        compFunc();
    }
}


let intervalId;
// this is the game function
function gameFunc () {
    console.log("level:" + gameLevel)
    signsComp = [];
    signsPlayer = [];
    tick = 0;
    if (player === 0) {
        compFunc();
    } else {
        playerFunc();
    }
}

// function for computer turn
const compFunc = function () {
    console.log("player" + player)
    // this is computer turn
    intervalId = setInterval(function () {
        compPlayAudio(switchPlayer);
    }, 1500);
}

// function for player turn
async function playerFunc() {
    await waitForPlayer();
    console.log("player" + player)
    let bool = true;
    console.log("s1 " + signsPlayer.length)
    console.log("s2 " + signsComp.length)

    // compare the arrays:
    for (let i = 0; i < signsPlayer.length; i++) {
        if (signsPlayer[i] !== signsComp[i]) {
            bool = false;
            break;
        }
    }

    if (bool) {
        gameLevel++;
        level.textContent = "Level📈: " + gameLevel;
        comments.textContent = "Good Job🏆";
        sumScore += points;
        score.textContent = "Score: " + sumScore;
    } else {
        comments.textContent = "Try Again!😒";
        if(sumScore > 0) {
            sumScore -= 1;
            score.textContent = "Score: " + sumScore;
        }
    }
    player = 0;
    gameFunc();
}

// This is necessary! I want that before playerFunc start The user will click on 'gameLevel' clicks
function waitForPlayer() {
    return new Promise(resolve => {
        let sum = 0;

        const handleClick = (e) => {
            sum++;
            if (sum === gameLevel) {
                e.target.removeEventListener('click', handleClick);
                resolve();
            }
        };

        redBtn.addEventListener('click', handleClick);
        greenBtn.addEventListener('click', handleClick);
        yellowBtn.addEventListener('click', handleClick);
        blueBtn.addEventListener('click', handleClick);

    });
}

// function for play the audio
function compPlayAudio(callback) {
    let rand = Math.floor(Math.random() * 4) + 1;
    if(rand === 1) {
        redBtn.classList.add('specialHover');
        let audio = new Audio('1.m4a');
         audio.play();
        audio.addEventListener('ended', function () {
            redBtn.classList.remove('specialHover');
        })
        signsComp.push(1);
    } else if (rand === 2) {
        greenBtn.classList.add('specialHover');
        let audio = new Audio('2.m4a');
         audio.play();
        audio.addEventListener('ended', function () {
            greenBtn.classList.remove('specialHover');
        })
        signsComp.push(2);
    } else if (rand === 3) {
        blueBtn.classList.add('specialHover');
        let audio = new Audio('3.m4a');
         audio.play();
        audio.addEventListener('ended', function () {
            blueBtn.classList.remove('specialHover');
        })
        signsComp.push(3);
    } else if (rand === 4) {
        yellowBtn.classList.add('specialHover');
        let audio = new Audio('4.m4a');
         audio.play();
        audio.addEventListener('ended', function () {
            yellowBtn.classList.remove('specialHover');
        })
        signsComp.push(4);
    }
    tick++;

    if(tick > gameLevel - 1) {
        clearInterval(intervalId);
        callback();
    }
}
