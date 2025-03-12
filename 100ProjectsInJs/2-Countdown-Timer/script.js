const timeInSecondsInput = document.getElementById("timeInSeconds"),
    startCountDownButton = document.getElementById("startCountDown"),
    pauseCountDown = document.getElementById("pauseCountDown"),
    resumeCountDown = document.getElementById("resumeCountDown"),
    countDownText = document.getElementById("countDownText"),
    pauseText = document.getElementById("pauseText");

let seconds, timer;
function executeCountDown() {
    seconds--;
    countDownText.innerText = `Remaining Time is ${seconds}`;
    if (seconds === 0) {
        
        clearTimeout(timer);
        timeInSecondsInput.value= 0;
        timeInSecondsInput.removeAttribute("disabled");
    }
}
startCountDownButton.addEventListener('click', function (e) {
    seconds = Number(timeInSecondsInput.value);
    if (seconds) {
        timeInSecondsInput.setAttribute('disabled', true);
        countDownText.innerText = `Remaining Time is ${seconds}`;
        timer = setInterval(executeCountDown, 1000);
    } else alert("Please enter a valid time");
});
pauseCountDown.addEventListener('click', function (e) {
    countDownText.innerText = `Remaining Time is ${seconds}`;
    pauseText.innerText = `Countdown pause at ${seconds}`;
    clearTimeout(timer);
});
resumeCountDown.addEventListener('click', function (e) {
    countDownText.innerText = `Remaining Time is ${seconds}`;
    pauseText.innerText  = '';
    timer = setInterval(executeCountDown, 1000);
});