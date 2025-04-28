
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const box = document.getElementById('stopwatchBox');
const timeDisplay = document.getElementById('timeDisplay');

let timer = null;
let startTime = 0;
let breakTime = 0;
let elapsedTime = 0;
let isRunning = false;
let isBreakCount = false;


// this function implements the start and pause button
function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        
        // set unique ID of the running timer every 10 miliseconds to call upon later (when stopping or pausing)
        timer = setInterval(update, 1000);
        
        startBtn.textContent = "Pause";
        isRunning = true;

        box.classList.toggle('active', true);
    }
    else{
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;

        startBtn.textContent = "Start";
        isRunning = false;
    }
}

// stop the timer and calculate breaktTime which is 1/3rd of the total time
function stop(){
    if(timeDisplay.textContent != "00:00:00"){
        breakTime = Date.now() + (elapsedTime / 3);
        isBreakCount = true;
        if(!isRunning){
            start();
        }

        box.classList.toggle('active', false);
        startBtn.classList.add('hidden');
        stopBtn.classList.add('hidden');
    }
}

function reset(){
    clearInterval(timer);
    timer = null;
    startTime = 0;
    elapsedTime = 0;
    breakTime = 0;
    isRunning = false;
    isBreakCount = false;
    startBtn.textContent = "Start";
    timeDisplay.textContent = "00:00:00";

    box.classList.toggle('active', false);
    startBtn.classList.remove('hidden');
    stopBtn.classList.remove('hidden');
}

function update(){
    const currentTime = Date.now();
    
    if(!isBreakCount){
        updateForwards(currentTime);
    }
    else{
        updateBackwards(currentTime);
    }

    formatTime();
}

// sets count time forward
function updateForwards(currentTime){
    elapsedTime = currentTime - startTime;
}

// sets count time backwards
function updateBackwards(currentTime){
    if((breakTime - currentTime) <= 0){
        reset();
    }
    else{
        elapsedTime = breakTime - currentTime;
    }
}

function formatTime(){
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);

    // pad with 0
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}