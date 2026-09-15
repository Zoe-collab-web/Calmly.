// Calmly dashboard — corrected to use public.mood_entries
import { supabase } from "./supabase.js";


async function initDashboard() {

    /* ================================
       CHECK USER
    ================================= */

    const {
        data: { user },
        error
    } = await supabase.auth.getUser();


    if (error || !user) {

        window.location.href = "login.html";

        return;
    }


    /* ================================
       SHOW DASHBOARD
    ================================= */

    const dashboard =
        document.querySelector(".dashboard");

    if (dashboard) {
        dashboard.style.display = "block";
    }


    /* ================================
       USER NAME
    ================================= */

    const userName =
        document.getElementById("userName");


    const name =
        user.user_metadata?.name;


    if (name) {

        userName.textContent = name;

    } else {

        userName.textContent =
            user.email.split("@")[0];
    }


    /* ================================
       DAILY QUOTE
    ================================= */

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


    const quoteElement =
        document.getElementById("dashboardQuote");


    const today =
        new Date().getDate();


    if (quoteElement) {

        quoteElement.textContent =
            quotes[today % quotes.length];

    }


    /* ================================
       LOGOUT
    ================================= */

    const logoutButton =
        document.getElementById("logoutButton");


    const logoutMessage =
        document.getElementById("logoutMessage");


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            async function () {

                logoutButton.disabled = true;

                logoutButton.textContent =
                    "Logging out...";


                const { error } =
                    await supabase.auth.signOut();


                if (error) {

                    console.error(
                        "Logout error:",
                        error
                    );


                    if (logoutMessage) {

                        logoutMessage.textContent =
                            "Something went wrong.";

                    }


                    logoutButton.disabled = false;

                    logoutButton.textContent =
                        "Log out";

                    return;
                }


                if (logoutMessage) {

                    logoutMessage.textContent =
                        "Logged out successfully 💜";

                }


                setTimeout(function () {

                    window.location.href =
                        "index.html";

                }, 800);

            }
        );

    }


    /* ================================
       MOODS
    ================================= */

    const moods = {

        1: {
            emoji: "😌",
            name: "Calm"
        },

        2: {
            emoji: "🙂",
            name: "Okay"
        },

        3: {
            emoji: "😐",
            name: "A little anxious"
        },

        4: {
            emoji: "😟",
            name: "Anxious"
        },

        5: {
            emoji: "😣",
            name: "Very anxious"
        }

    };


    let selectedLevel = null;


    const moodButtons =
        document.querySelectorAll(
            ".dashboard-mood-button"
        );


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


    /* ================================
       LOCAL DATE
    ================================= */

    function getLocalDate() {

        const now = new Date();

        const year =
            now.getFullYear();

        const month =
            String(
                now.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                now.getDate()
            ).padStart(2, "0");


        return `${year}-${month}-${day}`;
    }


    /* ================================
       GET MOOD ENTRIES
    ================================= */

    async function getCheckIns() {

        const {
            data,
            error
        } = await supabase

            .from("mood_entries")

            .select("*")

            .eq(
                "user_id",
                user.id
            )

            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {

            console.error(
                "Could not get mood entries:",
                error
            );

            return [];
        }


        return data || [];
    }


    /* ================================
       DISPLAY DASHBOARD
    ================================= */

    async function displayDashboard() {

        const checkIns =
            await getCheckIns();


        const totalCheckins =
            document.getElementById(
                "totalCheckins"
            );


        const dashboardAverage =
            document.getElementById(
                "dashboardAverage"
            );


        const todayMood =
            document.getElementById(
                "todayMood"
            );


        const todayMoodText =
            document.getElementById(
                "todayMoodText"
            );


        const dashboardHistory =
            document.getElementById(
                "dashboardHistory"
            );


        /* ================================
           TOTAL CHECK-INS
        ================================= */

        if (totalCheckins) {

            totalCheckins.textContent =
                checkIns.length;

        }


        /* ================================
           AVERAGE
        ================================= */

        if (checkIns.length > 0) {

            const total =
                checkIns.reduce(
                    function (
                        sum,
                        checkIn
                    ) {

                        return sum +
                            Number(
                                checkIn.mood_score
                            );

                    },
                    0
                );


            const average =
                total / checkIns.length;


            if (dashboardAverage) {

                dashboardAverage.textContent =
                    average.toFixed(1);

            }

        } else {

            if (dashboardAverage) {

                dashboardAverage.textContent =
                    "—";

            }

        }


        /* ================================
           TODAY
        ================================= */

        const today =
            getLocalDate();


        const todayCheckIn =
            checkIns.find(
                function (checkIn) {

                    return checkIn.date === today;

                }
            );


        if (todayCheckIn) {

            const mood =
                moods[
                    todayCheckIn.mood_score
                ];


            if (mood) {

                if (todayMood) {

                    todayMood.textContent =
                        mood.emoji;

                }


                if (todayMoodText) {

                    todayMoodText.textContent =
                        mood.name;

                }

            }

        } else {

            if (todayMood) {

                todayMood.textContent =
                    "—";

            }


            if (todayMoodText) {

                todayMoodText.textContent =
                    "You haven't checked in today.";

            }

        }


        /* ================================
           HISTORY
        ================================= */

        if (!dashboardHistory) {
            return;
        }


        if (checkIns.length === 0) {

            dashboardHistory.innerHTML = `

                <p class="empty-history">

                    Your check-ins will appear here.

                </p>

            `;

            return;
        }


        dashboardHistory.innerHTML = "";


        checkIns.forEach(
            function (checkIn) {

                const mood =
                    moods[
                        checkIn.mood_score
                    ];


                if (!mood) {
                    return;
                }


                const historyCard =
                    document.createElement(
                        "div"
                    );


                historyCard.className =
                    "history-card";


                historyCard.innerHTML = `

                    <span>
                        ${checkIn.date}
                    </span>

                    <strong>
                        ${mood.emoji}
                        ${mood.name}
                    </strong>

                `;


                dashboardHistory.appendChild(
                    historyCard
                );

            }
        );

    }


    /* ================================
       SAVE CHECK-IN
    ================================= */

    const saveButton =
        document.getElementById(
            "dashboardSaveCheckin"
        );


    const checkinMessage =
        document.getElementById(
            "dashboardCheckinMessage"
        );


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            async function () {

                if (!selectedLevel) {

                    if (checkinMessage) {

                        checkinMessage.textContent =
                            "Please choose how you're feeling first.";

                    }

                    return;
                }


                saveButton.disabled = true;

                saveButton.textContent =
                    "Saving...";


                const date =
                    getLocalDate();


                /* ================================
                   CHECK TODAY'S ENTRY
                ================================= */

                const {
                    data: existingEntry,
                    error: existingError
                } = await supabase

                    .from("mood_entries")

                    .select("id")

                    .eq(
                        "user_id",
                        user.id
                    )

                    .eq(
                        "date",
                        date
                    )

                    .maybeSingle();


                if (existingError) {

                    console.error(
                        "Could not check previous entry:",
                        existingError
                    );


                    if (checkinMessage) {

                        checkinMessage.textContent =
                            "Couldn't check your previous entry.";

                    }


                    saveButton.disabled = false;

                    saveButton.textContent =
                        "Save my check-in →";

                    return;
                }


                let saveError;


                /* ================================
                   UPDATE TODAY'S ENTRY
                ================================= */

                if (existingEntry) {

                    const result =
                        await supabase

                            .from("mood_entries")

                            .update({
                                mood_score: selectedLevel,
                                updated_at:
                                    new Date().toISOString()
                            })

                            .eq(
                                "id",
                                existingEntry.id
                            );


                    saveError =
                        result.error;


                } else {

                    /* ================================
                       CREATE NEW ENTRY
                    ================================= */

                    const result =
                        await supabase

                            .from("mood_entries")

                            .insert({

                                user_id:
                                    user.id,

                                mood_score:
                                    selectedLevel,

                                date:
                                    date

                            });


                    saveError =
                        result.error;

                }


                /* ================================
                   SAVE ERROR
                ================================= */

                if (saveError) {

                    console.error(
                        "Save error:",
                        saveError
                    );


                    if (checkinMessage) {

                        checkinMessage.textContent =
                            "Something went wrong. Please try again.";

                    }


                    saveButton.disabled = false;

                    saveButton.textContent =
                        "Save my check-in →";

                    return;
                }


                /* ================================
                   SUCCESS
                ================================= */

                const mood =
                    moods[selectedLevel];


                if (checkinMessage) {

                    checkinMessage.textContent =
                        `${mood.emoji} Check-in saved. Take care of yourself today.`;

                }


                saveButton.disabled = false;

                saveButton.textContent =
                    "Saved ✓";


                await displayDashboard();


                setTimeout(function () {

                    saveButton.textContent =
                        "Save my check-in →";

                }, 1800);

            }
        );

    }


    /* ================================
       INITIAL LOAD
    ================================= */

    await displayDashboard();

}


/* ================================
   START DASHBOARD
================================= */

initDashboard();