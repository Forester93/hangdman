let startButton=document.getElementById('start-game');
let resetScore=document.getElementById('reset');
let winsCount=document.getElementById('wins-count');
let lossesCount=document.getElementById('losses-count');
let timeValue=document.getElementById('time-value');
let timeLabel=document.getElementById('time-label');
let gameWord=document.getElementById('game-word');
let bodyHTML=document.getElementsByTagName('body');
let hangedMan=document.getElementById('hangsmanimage');
//define word pool
// let wordPool=['JavaScript','variables','michaelstears','jackritchiesjokes','davidrocks','samlawparthumanpartmachine','tomdoylelaugh'];
let wordPool=['JavaScript','variables','davidimpeyrocks','bootcampspot','samlawfortutor','jackrichiesjokes'];
//define blank slate
let blankSlate=[];
let word='';
let losses;
let wins;
let hangingStage=0;

// Retrieve the player stats from the browser

function getStats(){

    if(localStorage.getItem('wins')>=0 && localStorage.getItem('losses')>=0) {
        wins=localStorage.getItem('wins');
        losses=localStorage.getItem('losses');
    }else{
        wins=0;
        losses=0;
    }
    winsCount.innerHTML=wins;
    lossesCount.innerHTML=losses;

}

//Save the player stats to the browser.

function saveStats(){
    localStorage.setItem('wins',wins);
    localStorage.setItem('losses',losses);
}

// If player loses.

function initiateGameOver(){
    timeValue.innerHTML='GAME OVER!!';
    losses++;
    saveStats();
    getStats();
    startButton.disabled=false;
    resetScore.disabled=false;
    gameWord.innerHTML='';
    for (let character in word){
        gameWord.innerHTML+='   '+word[character]+'   ';
    }

}

// Reset score function

function clearScore(){
    wins=0;
    losses=0;
    saveStats();
    getStats();
}

function setWord(){

    //Retrieve a word from the word pool
    word=wordPool[Math.floor(Math.random()* wordPool.length)].toLowerCase();
    gameWord.innerHTML='';
    blankSlate=[];
    //set the blank array to the same length of the word
    for (let character in word){
        blankSlate.push('_');
        gameWord.innerHTML+='   '+blankSlate[character]+'   ';
    }

}
function startTimer(){
    let timeCount=20000;
    timeLabel.innerHTML='seconds remaining...';
    timeValue.innerHTML=(timeCount/1000);
    let countdown= setInterval(function(){
        if(hangingStage==10){
            timeLabel.innerHTML='';
            clearInterval(countdown);
            return;
        }
        if (checkVictory()){
            clearInterval(countdown);
            initiateVictory();
            return;
        }
        timeCount-=1000;
        timeValue.innerHTML=(timeCount/1000);
        if (timeCount<0){
            clearInterval(countdown);
            timeLabel.innerHTML='';
            timeValue.innerHTML='';
            initiateGameOver();
        }
    },1000);

}

function hangTheMan(){

    hangedMan.style.display='inherit';
    if (hangingStage>=0 && hangingStage <9){
        hangingStage++;
        hangedMan.setAttribute('src','./assets/images/Drawing ('+hangingStage+').jpeg');
    } else{
        hangingStage=10;
        hangedMan.setAttribute('src','./assets/images/Drawing ('+hangingStage+').jpeg');
        timeLabel.innerHTML='';
        initiateGameOver();
    }

}

function resetHang(){
    hangingStage=0;
}

function initiateVictory(){
    timeValue.innerHTML='You WON!!';
    timeLabel.innerHTML='';
    wins++;
    saveStats();
    getStats();
    startButton.disabled=false;
    resetScore.disabled=false;
}

function checkVictory(){
    if(blankSlate.indexOf('_')<0){
        return true;
    }
}



function validateKey(event){

    event.preventDefault();
    // Check if game started
    if(startButton.disabled==false){
        return;
    }else{
        let x =event.key.toLowerCase();
        if('abcdefghijklmnopqrstuvwxyz'.split('').indexOf(x)<0){return;}
        if(word.split('').indexOf(x)>=0){
            // alert(x);
            gameWord.innerHTML='';
            for (let letter in word){
                if (word[letter]==x){
                    blankSlate[letter]=x;
                }
                gameWord.innerHTML+='   '+blankSlate[letter]+'   ';
            }
            if (checkVictory()){
                initiateVictory();
            }
        } else{
            hangTheMan();
        }

    }

}

window.addEventListener('keydown',validateKey);
window.addEventListener('load',getStats);
startButton.addEventListener('click',function(){
    getStats();
    gameWord.innerHTML='';
    setWord();
    resetHang();
    startTimer();
    hangedMan.setAttribute('src','./assets/images/Drawing.jpeg');
    startButton.disabled=true;
    resetScore.disabled=true;

});
resetScore.addEventListener('click',clearScore);