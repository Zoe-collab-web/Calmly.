import { supabase } from "./supabase.js";


/* ================================
   LOGIN
================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value;

            const loginMessage =
                document.getElementById("loginMessage");


            loginMessage.textContent =
                "Logging you in...";


            const { error } =
                await supabase.auth.signInWithPassword({

                    email: email,

                    password: password

                });


            if (error) {

                loginMessage.textContent =
                    error.message;

                return;
            }


            loginMessage.textContent =
                "Welcome back 💜";


            window.location.href =
                "dashboard.html";

        }
    );

}


/* ================================
   FORGOT PASSWORD
================================= */

const forgotPassword =
    document.getElementById("forgotPassword");


if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();


            const emailInput =
                document.getElementById("email");

            const email =
                emailInput.value.trim();


            if (!email) {

                alert(
                    "Please enter your email address first."
                );

                emailInput.focus();

                return;
            }


            const { error } =
                await supabase.auth.resetPasswordForEmail(
                    email,
                    {
                        redirectTo:
                            "https://calmly-nine.vercel.app/reset-password.html"
                    }
                );


            if (error) {

                console.error(
                    "Password reset error:",
                    error
                );

                alert(
                    "Couldn't send the reset email. Please try again."
                );

                return;
            }


            alert(
                "Password reset email sent! Check your inbox. 💜"
            );

        }
    );

}