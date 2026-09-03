import { supabase } from "./supabase.js";

const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    signupMessage.textContent = "Creating your account...";

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                name: name
            }
        }
    });

    if (error) {
        console.error("Signup error:", error);
        signupMessage.textContent = error.message;
        return;
    }

    if (data.session) {
        signupMessage.textContent =
            "Account created successfully! 🌷";

        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 1000);

    } else {
        signupMessage.textContent =
            "Account created! Check your email to confirm your account. 💜";
    }
});