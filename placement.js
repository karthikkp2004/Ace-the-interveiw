import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

const auth = getAuth();
const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("You have logged out.");
        window.location.href = "index.html";  // Redirect back to sign-in page
    }).catch((error) => {
        console.log("Error during logout: ", error);
    });
});
