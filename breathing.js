const breathingCircle =
    document.getElementById("breathingCircle");

const breathingText =
    document.getElementById("breathingText");

const breathingTimer =
    document.getElementById("breathingTimer");

const startButton =
    document.getElementById("startBreathing");

let isBreathing = false;
let cycleCount = 0;
let timer;
let phaseTimer;

const totalCycles = 5;
const phaseDuration = 4000; // 4 seconds

function startBreathing() {

    if (isBreathing) {
        return;
    }

    isBreathing = true;
    cycleCount = 0;

    startButton.disabled = true;
    startButton.textContent = "Breathing...";

    runCycle();
}

function runCycle() {

    if (cycleCount >= totalCycles) {
        stopBreathing();
        return;
    }

    // INHALE
    breathingText.textContent = "Breathe in 🌿";
    breathingCircle.classList.remove("exhale");
    breathingCircle.classList.add("inhale");

    phaseTimer = setTimeout(function () {

        // EXHALE
        breathingText.textContent = "Breathe out ♡";
        breathingCircle.classList.remove("inhale");
        breathingCircle.classList.add("exhale");

        phaseTimer = setTimeout(function () {

            cycleCount++;

            runCycle();

        }, phaseDuration);

    }, phaseDuration);
}


function stopBreathing() {

    isBreathing = false;

    clearTimeout(phaseTimer);
    clearInterval(timer);

    breathingCircle.classList.remove("inhale");
    breathingCircle.classList.remove("exhale");

    breathingText.textContent =
        "Well done 🌷";

    breathingTimer.textContent =
        "5 breaths completed";

    startButton.disabled = false;
    startButton.textContent =
        "Start again";
}


startButton.addEventListener(
    "click",
    startBreathing
);