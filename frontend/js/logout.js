function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("accessLevel");
    window.location.href = "/frontend/html/login.html";
}