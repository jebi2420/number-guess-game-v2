// 랜덤 번호지정
// 유저가 번호를 입력 -> go 버튼 누름
// 랜덤 번호 < 유저 번호  -> Down
// 랜덤 번호 > 유저 번호 -> Up
// Reset 버튼을 누르면 게임이 Reset
// 5번의 기회를 다쓰면 게임이 끝난다 (더 이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다

let computerNum = 0;
let playBtn = document.getElementById("play-btn");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetBtn = document.getElementById("reset-btn")
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];
let gameImg = document.getElementById('game-img');
let audio = document.getElementById('myAudio')
let audioCtrl = document.getElementById('audio-ctrl')

audioCtrl.addEventListener("click", bgmCtrl)
playBtn.addEventListener("click", play)
resetBtn.addEventListener("click", reset)
userInput.addEventListener("focus", resetInput)

function bgmCtrl(){
    if(audio.paused){
        audio.play();
        audioCtrl.src = '/asset/images/audio.png';
    }else{
        audio.pause();
        audioCtrl.src = '/asset/images/mute.png';
    }
}


function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 10)+1;
    console.log("정답", computerNum);
}
chanceArea.textContent = `남은 기회: ${chances}번`;

function play(){
   let userValue = userInput.value;

    // 유효성 검사
    if(userValue < 1 || userValue > 10){
        resultArea.textContent = "\"1과 10 사이 숫자를 입력하라.\""
        return; // 종료
    }

    if(history.includes(userValue)){
        resultArea.textContent = "\"이미 입력한 숫자이다. 다른 숫자를 입력하라.\""
        return;
    }

   // playBtn 누를 때마다 chances가 하나씩 까임
   chances--;
   chanceArea.textContent = `남은 기회: ${chances}번`;
   if(chances < 2){
        chanceArea.style.color = 'red';
   }

   if(userValue < computerNum){
        resultArea.textContent = "\"위로.\""
   }else if(userValue > computerNum){
        resultArea.textContent = "\"아래로.\""
   }else{
        resultArea.textContent = "\"너의 승리이다.\""
        // 숫자를 맞춘 후로는 더 이상 플레이 못하게
            playBtn.disabled = true;
   }
   // 입력했던 값을 배열에 저장
   history.push(userValue);
   console.log(history)

   if(chances < 1){
       resultArea.textContent = "\"너의 목숨은 이제 나의 것이다.\""
       resultArea.style.color = 'red';
       gameImg.src = '/asset/images/lose.webp'
       gameOver = true
   }
   if(gameOver){
       playBtn.disabled = true;
   }
}

function resetInput(){
    userInput.value = "";
}

function reset(){
    // user input창이 깨끗하게 정리되고
    userInput.value = "";
    // 새로운 번호가 생성되고
    pickRandomNum();
    resultArea.textContent = "\"목숨을 걸 준비는 되었는가?\""
    userInput.value = "";
    // 다시 게임 플레이 가능
    gameOver = false;
    playBtn.disabled = false;
    chances = 5;
    chanceArea.textContent = `남은 기회: ${chances}번`;
    history = [];
    resultArea.style.color = 'chartreuse';
    chanceArea.style.color = 'chartreuse';
    gameImg.src = '/asset/images/normal.webp'
}

pickRandomNum();

