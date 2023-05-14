{/* <a href="/frontend/html/admin.html" class="classLogoutButton" style="padding: 20;">Go to Admin View</a> */}
const roundHeader = document.getElementById("fix0");
const titleHeader = document.getElementById("fix1");
const tablesList = document.getElementById('tables');

function loadAdminButton() {
    const accessLevel = localStorage.getItem("accessLevel");   
    if (accessLevel === "admin") {
        document.getElementById("admin").style.display = "block";
    }
}

var matchId;
var contestants = {};



function loadContestants() {
    const token = localStorage.getItem("token");

    fetch("https://d214-chess-tracker.herokuapp.com/contestants", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("data", data);
            const newContestants = data;
            for (const contestant of newContestants) {
                contestants[contestant._id] = contestant.name;
            }
        })
        .then(() => {
            loadTables();
        })
        .catch((error) => {
            alert(error.message)
        })
}

function selectTable(event, tableId) {
    event.preventDefault();

    window.location.href = `/frontend/html/table.html?tableId=${tableId}`
}


function loadTables() {
    
    fetch("https://d214-chess-tracker.herokuapp.com/tables")
        .then((response => response.json()))
        
        .then((data) => {
            const tables = data;
            tablesList.innerHTML = "";

            tables.forEach((table) => {
                let outcome = "Ongoing";

                let neutral = true;
                let winnerPicked = false;


                if (table.userWhoWon === 1) {
                    outcome = `${contestants[table.contestant1]} won`;
                    winnerPicked = true;
                    neutral = false;
                } else if (table.userWhoWon === 2) {
                    outcome = `${contestants[table.contestant2]} won`;
                    winnerPicked = true;
                    neutral = false;
                } else if (table.userWhoWon === 0) {
                    outcome = "Ongoing";
                } else if (table.userWhoWon === -1) {
                    outcome = "Draw";
                    neutral = false;
                }

                tablesList.innerHTML += `
                    <div class="box" onclick='selectTable(event, "${table._id}")'>
                        <h2>${table.tableNum}</h2>
                        <div class="sub0">${contestants[table.contestant1]||"-"} / ${contestants[table.contestant2]||"-"}</div>
                        <div class="sub1 ${neutral ? "neutral" : ""} ${winnerPicked ? "dataAdded" : ""}">${outcome}</div>
                    </div>

                `
            })
        });
}


function loadHeaderData() {
    const token = localStorage.getItem("token");
    // get the ongoing matches
    fetch("https://d214-chess-tracker.herokuapp.com/matches", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
        .then((response) => response.json())
        .then((data) => {
            const match = data[0];
            if (!match) {
                alert("An error occured. Please contact admin (Miguel Aenlle, miguelaenlle@icloud.com) to start a match.")
            } else {
                matchId = match._id;
            }
            return match;
        })
        .then((match) => {
            console.log("match", match);
            roundHeader.innerHTML = `Round ${match.round}`;
            titleHeader.innerHTML = `${match.name}`;
    

        })
        .then(() => {
            loadContestants();
        })
}

window.onload = function() {
    loadAdminButton();
    loadHeaderData();
}