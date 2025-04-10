document.addEventListener('DOMContentLoaded', () => {
    const timeInput = document.getElementById('timeInput');
    const startButton = document.getElementById('startButton');
    const timeLeftDisplay = document.getElementById('timeLeft');
    const alarmSound = document.getElementById('alarmSound');
    
    let countdownInterval;
    let isRunning = false;

    function startCountdown() {
        if (isRunning) return;

        const seconds = parseInt(timeInput.value);
        if (isNaN(seconds) || seconds <= 0) {
            alert('Please enter a valid number of seconds');
            return;
        }

        isRunning = true;
        startButton.textContent = 'Stop Countdown';
        startButton.style.background = '#ff4444';
        
        const endTime = Date.now() + (seconds * 1000);
        
        countdownInterval = setInterval(() => {
            const timeLeft = Math.ceil((endTime - Date.now()) / 1000);
            
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                timeLeftDisplay.textContent = "Time's up!";
                timeLeftDisplay.style.color = '#ff4444';
                alarmSound.play();
                resetTimer();
            } else {
                timeLeftDisplay.textContent = timeLeft.toString().padStart(2, '0');
                timeLeftDisplay.style.color = '#ffffff';
            }
        }, 1000);
    }

    function resetTimer() {
        isRunning = false;
        startButton.textContent = 'Start Countdown';
        startButton.style.background = '#4CAF50';
        timeInput.value = '';
    }

    startButton.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(countdownInterval);
            resetTimer();
        } else {
            startCountdown();
        }
    });

    // Handle Enter key press
    timeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isRunning) {
            startCountdown();
        }
    });

    // Prevent negative numbers and non-numeric input
    timeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
}); 