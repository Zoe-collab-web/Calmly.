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

        "Today is another chance to check in with yourself."

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
       GET CHECK-INS
    ================================= */

    async function getCheckIns() {

        const {
            data,
            error
        } = await supabase

            .from("check_ins")

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
                "Could not get check-ins:",
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
                                checkIn.level
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
                    todayCheckIn.level
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
                        checkIn.level
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
                   CHECK TODAY'S CHECK-IN
                ================================= */

                const {
                    data: existingCheckIn,
                    error: existingError
                } = await supabase

                    .from("check_ins")

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
                   UPDATE TODAY'S CHECK-IN
                ================================= */

                if (existingCheckIn) {

                    const result =
                        await supabase

                            .from("check_ins")

                            .update({
                                level: selectedLevel
                            })

                            .eq(
                                "id",
                                existingCheckIn.id
                            );


                    saveError =
                        result.error;


                } else {

                    /* ================================
                       CREATE NEW CHECK-IN
                    ================================= */

                    const result =
                        await supabase

                            .from("check_ins")

                            .insert({

                                user_id: user.id,

                                level: selectedLevel,

                                date: date

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
================================ */

initDashboard();