// =============================
// SUPABASE
// =============================

import { supabase } from "./supabase.js";


// =============================
// DAILY QUOTES
// =============================

console.log("script.js is working!");

const quotes = [

    "You don't have to have everything figured out today.",

    "Take things one moment at a time.",

    "It's okay to slow down and breathe.",

    "Be gentle with yourself today.",

    "Small steps still count.",

    "You deserve moments of peace.",

    "Today is another chance to check in with yourself.",

    "You are allowed to take things slowly.",

    "One difficult moment does not define your whole day.",

    "You can pause without falling behind.",

    "Give yourself the same kindness you give to others.",

    "There is no perfect way to have a day.",

    "Breathe in. Breathe out. Take your time.",

    "You are doing better than you think.",

    "It's okay if today feels a little different.",

    "You don't need to rush through every moment.",

    "Rest is part of moving forward.",

    "Your feelings are worth listening to.",

    "You can take today one step at a time.",

    "A small moment of calm is still progress.",

    "You are allowed to make space for yourself.",

    "It's okay to pause and reset.",

    "Not every day needs to be a productive day.",

    "Take a breath and give yourself a moment.",

    "You can start again whenever you need to.",

    "Be patient with yourself. You're learning.",

    "You don't have to do everything at once.",

    "Your pace is allowed to be your own.",

    "There is still room for good moments today.",

    "Take care of yourself, one little choice at a time.",

    "You deserve a moment to simply breathe.",

    "It's okay to have days that feel messy.",

    "You are more than one difficult moment.",

    "Give yourself permission to slow down.",

    "You can handle this moment without figuring out everything else.",

    "Today doesn't have to be perfect to be meaningful.",

    "Take a little time to check in with yourself.",

    "You are allowed to put yourself first sometimes.",

    "A quiet moment can make space for a clearer mind.",

    "Keep going gently.",

    "You don't need to compare your journey to anyone else's.",

    "Your progress doesn't have to look big to matter.",

    "It's okay to ask for support when you need it.",

    "You deserve patience, kindness, and understanding.",

    "Take another breath. You're here, and that's enough for this moment.",

    "Some days are for growing, and some days are for resting.",

    "You can make today a little softer for yourself.",

    "Listen to what you need, not just what you expect from yourself.",

    "You are allowed to have a fresh start today.",

    "Slow down. There is no need to rush this moment.",

    "Give yourself room to feel, breathe, and continue.",

    "Even a tiny step forward is still a step.",

    "You don't need to earn rest.",

    "Your wellbeing matters too.",

    "Take today as it comes.",

    "You can always pause, breathe, and try again.",

    "Be kind to the person you're becoming.",

    "You are allowed to celebrate small victories.",

    "Make room for a little peace today.",

    "One moment at a time. One breath at a time.",

    "You don't have to carry everything at once.",

    "It's okay to give yourself a break.",

    "Your journey doesn't need to happen overnight.",

    "There is nothing wrong with needing a moment.",

    "Today, choose gentleness where you can.",

    "You can take care of yourself without having all the answers.",

    "A calmer moment can begin with one slow breath.",

    "Keep choosing small moments of care.",

    "You are learning, growing, and figuring things out.",

    "It's okay to reset and begin again.",

    "Your feelings can change, and so can your day.",

    "Give yourself credit for making it through the little things.",

    "You deserve to feel safe, heard, and supported.",

    "Take a moment. Unclench your shoulders. Breathe.",

    "You can be gentle with yourself and still keep growing.",

    "Today is yours to take one moment at a time."

];
const dailyQuote =
    document.getElementById("dailyQuote");

if (dailyQuote) {

    const today = new Date();

    const dayNumber =
        today.getDate();

    const quoteIndex =
        (dayNumber - 1) % quotes.length;

    dailyQuote.textContent =
        `"${quotes[quoteIndex]}"`;
}


// =============================
// MOOD CHECK-IN
// =============================

const moodButtons =
    document.querySelectorAll(".moodbutton");

const saveButton =
    document.querySelector(".checkinbutton");

const saveMessage =
    document.querySelector("#checkin > span");

let selectedLevel = null;


moodButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            moodButtons.forEach(
                function (item) {

                    item.classList.remove(
                        "selected"
                    );

                }
            );

            button.classList.add(
                "selected"
            );

            selectedLevel =
                Number(
                    button.dataset.level
                );

        }
    );

});


// =============================
// SAVE CHECK-IN
// =============================

if (saveButton) {

    saveButton.addEventListener(
        "click",
        function () {

            if (selectedLevel === null) {

                saveMessage.textContent =
                    "Please choose how you're feeling first.";

                return;
            }


            const todayDate =
                new Date().toLocaleDateString();


            const newCheckIn = {

                date: todayDate,

                level: selectedLevel

            };


            const history =
                JSON.parse(
                    localStorage.getItem(
                        "checkIns"
                    )
                ) || [];


            history.push(newCheckIn);


            localStorage.setItem(
                "checkIns",
                JSON.stringify(history)
            );


            saveMessage.textContent =
                "Your check-in has been saved. Take care of yourself. ♡";


            displayHistory();

        }
    );

}


// =============================
// DISPLAY HISTORY
// =============================

function displayHistory() {

    const history =
        JSON.parse(
            localStorage.getItem(
                "checkIns"
            )
        ) || [];


    const averageElement =
        document.getElementById(
            "dailyAverage"
        );


    if (!averageElement) {
        return;
    }


    if (history.length === 0) {

        averageElement.textContent =
            "-";

        return;
    }


    const total =
        history.reduce(
            function (
                sum,
                checkIn
            ) {

                return sum +
                    Number(
                        checkIn.level
                    );

            },
            0
        );


    const average =
        total / history.length;


    averageElement.textContent =
        average.toFixed(1);
}


displayHistory();


// =============================
// LOGIN STATUS
// =============================

async function updateNavigation() {

    const loginLink =
        document.getElementById(
            "loginLink"
        );


    const signupLink =
        document.getElementById(
            "signupLink"
        );


    const dashboardLink =
        document.getElementById(
            "dashboardLink"
        );


    // If these elements aren't
    // on this page, stop here.

    if (
        !loginLink &&
        !signupLink &&
        !dashboardLink
    ) {

        return;
    }


    const {
        data: { user },
        error
    } =
        await supabase.auth.getUser();


    if (error) {

        console.error(
            "Could not check login status:",
            error
        );

        return;
    }


    if (user) {

        // USER IS LOGGED IN

        if (loginLink) {

            loginLink.style.display =
                "none";

        }


        if (signupLink) {

            signupLink.style.display =
                "none";

        }


        if (dashboardLink) {

            dashboardLink.style.display =
                "block";

        }

    } else {

        // USER IS LOGGED OUT

        if (loginLink) {

            loginLink.style.display =
                "block";

        }


        if (signupLink) {

            signupLink.style.display =
                "block";

        }


        if (dashboardLink) {

            dashboardLink.style.display =
                "none";

        }

    }

}


updateNavigation();
