import { supabase } from "./supabase.js";

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        const loginMessage =
            document.getElementById("loginMessage");


        loginMessage.textContent =
            "Logging you in...";


        const { data, error } =
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

    });

}