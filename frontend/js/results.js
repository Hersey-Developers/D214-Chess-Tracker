var matchId;

const roundHeader = document.getElementById("round");
const tableData = document.getElementById("table-data");

function loadAdminButton() {
    const accessLevel = localStorage.getItem("accessLevel");   
    if (accessLevel === "admin") {
        document.getElementById("admin").style.display = "block";
    }
}

function loadHeader() {
    const token = localStorage.getItem("token");

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
            roundHeader.innerHTML = `${match.name}`;
        })
        .then(() => {
            loadResults();
        })
}

function loadResults() {
    const token = localStorage.getItem("token");

    fetch("https://d214-chess-tracker.herokuapp.com/tables/results", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }).then(response => response.json())
    .then(data => {
        let datas = ""
        for (let i = 0; i < data.length; i++) {
            const dataItem = data[i];
            const html = `
                <tr class=${i % 2 ? "rowEven" : "rowOdd"}>
                    <td class="rank">${dataItem.rank}</td>
                    <td class="city">${dataItem.school}</td>
                    <td class="points">${dataItem.wins.toFixed(1)}</td>
                    <td class="TBK">${dataItem.tbk.toFixed(1)}</td>
                </tr>
            `
            datas += html;
        }

        console.log("datas", datas);

        tableData.innerHTML = datas;

    })
    .catch((error) => {
        console.log(error);
    })
    
}

window.onload = function() {
    loadAdminButton();
    loadHeader();
}