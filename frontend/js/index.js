window.onload = function() {
    const token = localStorage.getItem("token");
    const accessLevel = localStorage.getItem("accessLevel");
    if (token && accessLevel) {
        if (accessLevel === "coach") {
            window.location.href = "/frontend/html/tables.html";
        } else {
            window.location.href = "/frontend/html/admin.html";

        }
    } else {
        window.location.href = "/frontend/html/login.html";
    }

}