const p1won = document.getElementById('1');
const draw = document.getElementById('2');
const p2won = document.getElementById('3');
const header = document.getElementById('bigLable');
const subheader = document.getElementById('smallLable');

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
            loadInfo();
        })
        .catch((error) => {
            alert(error.message)
        })
}


function loadInfo() {
    // table id is in the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tableId = urlParams.get("tableId");
        
    fetch(`https://d214-chess-tracker.herokuapp.com/tables/${tableId}`, {
        method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
        const table = data;
        header.innerHTML = `Submit Game`;

        const contestant1Name = contestants[table.contestant1] || "-";
        const contestant2Name = contestants[table.contestant2] || "-";

        subheader.innerHTML = `Table ${table.tableNum} (${contestant1Name} vs ${contestant2Name})`;

        p1won.innerHTML = `${contestant1Name} won`;
        p2won.innerHTML = `${contestant2Name} won`;

        if (table.userWhoWon !== 0) {
            p1won.disabled = true;
            p2won.disabled = true;
            draw.disabled = true;

            if (table.userWhoWon === -1) {
                subheader.innerHTML = "Draw";
            } else {
                if (table.userWhoWon === 1) {
                    subheader.innerHTML = `${contestant1Name} won`;

                } else if (table.userWhoWon === 2) {
                    subheader.innerHTML = `${contestant2Name} won`;
                }
            }
        }
    })
    .catch((error) => {
        alert(error.message)
    })
}


function setWinner(userWhoWon) {    
    const urlParams = new URLSearchParams(window.location.search);
    const tableId = urlParams.get("tableId");
    const token = localStorage.getItem("token");
    
    fetch(`https://d214-chess-tracker.herokuapp.com/tables/${tableId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            userWhoWon: userWhoWon
        })
    }).then((response) => response.json())
    .then((data) => {
        loadInfo();
    })
}

p1won.addEventListener("click", function () {
    setWinner(1)
})

p2won.addEventListener("click", function () {
    setWinner(2)
})

draw.addEventListener("click", function () {
    setWinner(-1)
})




window.onload = function () {
    loadContestants();
}