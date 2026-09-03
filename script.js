// =============================
// SUPABASE
// =============================

import { supabase } from "./supabase.js";


// =============================
// DAILY QUOTES
// =============================

console.log("script.js is working!");

const quotes = [
    "You don't have to figure everything out today.",
    "It's okay to take things one moment at a time.",
    "Be gentle with yourself today.",
    "You are allowed to slow down and breathe.",
    "Small steps are still progress.",
    "Your feelings are valid, and they will pass.",
    "You don't have to be perfect to be doing well.",
    "Give yourself the same kindness you give others.",
    "Today is another chance to take care of yourself.",
    "It's okay to pause. You can continue when you're ready."
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