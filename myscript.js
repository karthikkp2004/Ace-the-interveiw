const API_BASE = "http://localhost:5000";

document.querySelector(".sign-up-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission
  const name = document.getElementById("name").value;
  const email = document.getElementById("email_signup").value;
  const password = document.getElementById("psw_signup").value;

  try {
    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration successful! Please sign in.");
      document.querySelector("#sign-in-btn").click(); // Switch to sign-in view
    } else {
      alert(data.message || "Registration failed!");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred. Please try again.");
  }
});

document.querySelector(".sign-in-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email_signin").value;
  const password = document.getElementById("psw_signin").value;

  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Login successful!");
      window.location.href = "/placement"; // Redirect to placement.html
    } else {
      alert(data.message || "Login failed!");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred. Please try again.");
  }
});
