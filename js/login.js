function toggleForm() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm.style.display === "none") {
    loginForm.style.display = "flex";
    signupForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "flex";
  }
}

document.getElementById("toggleLoginPassword").addEventListener("click", () => {
  const input = document.getElementById("loginPassword");
  input.type = input.type === "password" ? "text" : "password";
});

document.getElementById("toggleSignupPassword").addEventListener("click", () => {
  const input = document.getElementById("signupPassword");
  input.type = input.type === "password" ? "text" : "password";
});
