import { supabase } from "./supabase.js";


/* ================================
   RESET PASSWORD
================================= */

const resetPasswordForm =
    document.getElementById("resetPasswordForm");


if (resetPasswordForm) {

    resetPasswordForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const newPassword =
                document.getElementById("newPassword").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const resetMessage =
                document.getElementById("resetMessage");


            /* ================================
               CHECK PASSWORDS
            ================================= */

            if (newPassword !== confirmPassword) {

                resetMessage.textContent =
                    "Passwords do not match.";

                return;
            }


            if (newPassword.length < 6) {

                resetMessage.textContent =
                    "Password must be at least 6 characters.";

                return;
            }


            resetMessage.textContent =
                "Updating your password...";


            /* ================================
               UPDATE PASSWORD
            ================================= */

            const { error } =
                await supabase.auth.updateUser({

                    password: newPassword

                });


            if (error) {

                console.error(
                    "Password update error:",
                    error
                );

                resetMessage.textContent =
                    "Couldn't update your password. Please try again.";

                return;
            }


            /* ================================
               SUCCESS
            ================================= */

            resetMessage.textContent =
                "Password updated successfully! 💜";


            resetPasswordForm.reset();


            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 2000);

        }
    );

}