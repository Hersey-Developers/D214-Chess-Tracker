

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementByClass("login");
const coachButton = document.getElementById("option1");
const adminButton = document.getElementById("option2");

var coachMode = true;
var adminMode = false;

function coachClicked() {
    console.log("coach button clicked")
    coachMode = true;
    adminMode = false;
}

function adminClicked() {
    console.log("admin button clicked")
    adminMode = true;
    coachMode = false;
}

function submitFunction(event) {

    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    // Validate that the email and password are not empty

    if (email.trim() === "" || password.trim() === "") {
        alert("Please enter an email and password");
        return;
    }

    if (!coachMode && !adminMode) {
        alert("Please select a login type");
        return;
    }

    let accessLevel;
    if (coachMode) {
        accessLevel = "coach";
    } else {
        accessLevel = "admin";
    }

    fetch(`https://d214-chess-tracker.herokuapp.com/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, accessLevel })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                alert(data.message);
            } else {
                // Save the token in local storage
                localStorage.setItem("token", data.token);
                localStorage.setItem("accessLevel", coachMode ? "coach" : "admin");
                // Redirect to the home page
                window.location.href = "/frontend/index.html";
            }
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        })



}