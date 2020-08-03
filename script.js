let countdown;
const timerDisplay = document.querySelector('.display-time-left');
const endTime = document.querySelector('.display-end-time');
const buttons = document.querySelectorAll('[data-time]');


// Main timer function
function timer(seconds) {
    // Clear any exisisting timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        // Check if the countdown has to stop
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        // Display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}


// Displays the time left in the countdown
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    var display = '00:00';

    if (remainderSeconds < 10) {
        display = minutes + ':0' + remainderSeconds;
    } else {
        display = minutes + ':' + remainderSeconds;
    }
    document.title = display;
    timerDisplay.textContent = display;
    console.log(timerDisplay.textContent);
}


// Displays the ending time of the countdown
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    if (minutes < 10) {
        endTime.textContent = 'Ending at ' + hour + ':0' + minutes;
    } else {
        endTime.textContent = 'Ending at ' + hour + ':' + minutes;
    }
}


// Get the time and start the timer
function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}


// Start event listener
buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    if (mins <= 60) {
        timer(mins * 60);
    }
    this.reset();
})