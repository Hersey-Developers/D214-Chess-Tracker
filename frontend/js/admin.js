const nameInput = document.getElementById('input1');
const roundInput = document.getElementById('input2');
const participantInput = document.getElementById('participant');
const participantSchoolInput = document.getElementById('participantSchool');

const updateNameButton = document.getElementById('updateName');
const updateRoundButton = document.getElementById('updateRound');
const addParticipant = document.getElementById('addParticipant');
const contestantsList = document.getElementById('participants');
const tablesList = document.getElementById('tables');
const resetButton = document.getElementById('reset');

const successName = document.getElementById('successName');
const successRound = document.getElementById('successRound');

var matchId;
var contestants;
var tableAssignments = {};
var contestants = {};



function getOngoingMatch() {
    const token = localStorage.getItem("token");
    // get the ongoing matches
    fetch("http://localhost:5000/matches", {
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
            nameInput.value = match.name;
            roundInput.value = match.round;

        })
}

function deleteContestant(id) {

    console.log("ID", id);

    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/contestants/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }).then((response) => response.json())
        .then(() => {
            loadContestants();
        })
        .catch((error) => {
            alert(error.message)
        })
}

const deselectStudent = (tableId, fieldNo) => {
    tableAssignments[tableId][fieldNo] = undefined;
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/tables/${tableId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            contestant1: tableAssignments[tableId][1],
            contestant2: tableAssignments[tableId][2]
        })
    })
    .then((response) => response.json())
    .then(() => {
        
    })
    .catch((error) => {
        alert(error.message)
    })

}




function selectStudent(tableId, contestantId, fieldNo) {
    console.log("tableId", tableId);

    const tableData = tableAssignments[tableId]
    if (tableData) {
        if (tableData[1] === contestantId) {
            alert("Student already selected for table")
            return false;
        }
        if (tableData[2] === contestantId) {
            alert("Student already selected for table")
            return false;
        }
        // alert if the student is already selected for another table

    } else {
        tableAssignments[tableId] = {};
    }

    console.log("tableAssignments", tableAssignments)

    for (const table in tableAssignments) {

        console.log("TABLE", tableAssignments[table]);

        if (tableAssignments[table]) {
            if (tableAssignments[table][1] === contestantId) {
                alert("Student already selected for table")
                return false;
            }
            if (tableAssignments[table][2] === contestantId) {
                alert("Student already selected for table")
                return false;
            }
        }
    }

    tableAssignments[tableId][fieldNo] = contestantId;

    tableAssignments[tableId] = {

        ...tableAssignments[tableId],
        [fieldNo]: contestantId
    }

    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/tables/${tableId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            contestant1: tableAssignments[tableId][1],
            contestant2: tableAssignments[tableId][2]
        })
    }).then((response) => response.json())
        .then(() => {
        })
        .catch((error) => {
            alert(error.message)
            const tableSelect = document.getElementById(`${tableId}-${fieldNo}`);
            tableSelect.value = "deselect";
            return false;
        })


    return true;

}

function assignTable(event, tableId, fieldNo) {
    const contestantId = event.target.value;
    if (contestantId === "deselect") {
        deselectStudent(tableId, fieldNo);
        return;
    }
    const tableSelect = document.getElementById(`${tableId}-${fieldNo}`);

    const success = selectStudent(tableId, contestantId, fieldNo);
    if (!success) {
        tableSelect.value = "deselect";
        return;
    }
}


function loadTables() {
    fetch("http://localhost:5000/tables")
        .then((response => response.json()))
        .then((data) => {
            const tables = data;
            tablesList.innerHTML = "";

            tables.forEach((table) => {

                const contestant1 = table.contestant1;
                const contestant2 = table.contestant2;

                tableAssignments[table._id] = {
                    1: contestant1,
                    2: contestant2
                }

                let studentOptions1 = `
                    <option value="deselect">Select a student</option>
                `;
                let studentOptions2 = `
                    <option value="deselect">Select a student</option>
                `;
                contestants.forEach((contestant) => {
                    if (contestant.name) {
                        let schoolString = "";
                        if (contestant.school) {
                            schoolString = `(${contestant.school})`
                        }

                        let selectedString = "";
                        if (contestant._id === contestant1) {
                            selectedString = " selected";
                        }
                        studentOptions1 += `<option value="${contestant._id}"${selectedString}>${contestant.name} ${schoolString}</option>`
                    }
                })
                contestants.forEach((contestant) => {
                    if (contestant.name) {
                        let schoolString = "";
                        if (contestant.school) {
                            schoolString = `(${contestant.school})`
                        }
                        let selectedString = "";
                        if (contestant._id === contestant2) {
                            selectedString = " selected";
                        }

                        studentOptions2 += `<option value="${contestant._id}" ${selectedString}>${contestant.name} ${schoolString}</option>`
                    }
                })

                const tableHTML = `
                <div class="table">
                    <label for="dropdown1" class="bold">Table ${table.tableNum}:</label>
                    <select id="${table._id}-1" onchange='assignTable(event,"${table._id}",1)' id="dropdown1" class="textBox">
                        ${studentOptions1}
                    </select>
                    <select id="${table._id}-2" onchange='assignTable(event,"${table._id}",2)' id="dropdown2" class="textBox">
                        ${studentOptions2}
                    </select>
                </div>
                `

                tablesList.innerHTML += tableHTML;

            })


        })
}

function resetTables() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/tables/reset-tables", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }).then(() => {
        loadTables();
    }).catch((error) => {
        alert(error.message)
    })
}

function loadContestants() {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/contestants", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("data", data);
            contestants = data;
            const contestantsTable = document.getElementById('participants');
            contestantsTable.innerHTML = "";
            contestants.forEach((contestant) => {
                if (contestant.name) {
                    let schoolString = "";
                    if (contestant.school) {
                        schoolString = `(${contestant.school})`
                    }


                    contestantsTable.innerHTML += `
            <div class="participant">
                <p>${contestant.name} ${schoolString}</p>
                <p class="delete" onclick='deleteContestant("${contestant._id}")'>Delete</p>
            </div>
            `
                }
            })
        })
        .then(() => {
            loadTables();
        })
        .catch((error) => {
            alert(error.message)
        })
}


window.onload = function () {
    getOngoingMatch()
    loadContestants()
}

updateRoundButton.addEventListener("click", function (event) {
    event.preventDefault();
    const round = roundInput.value;
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/matches/${matchId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            round: round,
        }),
    }).then(() => {
        successRound.innerHTML = "Round updated successfully!";
        setTimeout(() => {
            successRound.innerHTML = "";
        }, 3000)
    }).catch((error) => {
        alert(error.message)
    })
})


updateNameButton.addEventListener("click", function (event) {
    event.preventDefault();
    const name = nameInput.value;
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/matches/${matchId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
        }),
    }).then(() => {

        successName.innerHTML = "Name updated successfully!";
        setTimeout(() => {
            successName.innerHTML = "";
        }, 3000)
    }).catch((error) => {
        alert(error.message)
    })
})



addParticipant.addEventListener("click", function (event) {

    event.preventDefault();
    const token = localStorage.getItem("token");

    if (participantInput.value === "") {
        alert("Please enter a participant name.")
        return
    }

    if (participantSchoolInput.value === "") {
        alert("Please enter a participant school.")
        return
    }


    fetch(`http://localhost:5000/contestants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: participantInput.value,
            school: participantSchoolInput.value,
            active: true
        }),
    }).then((response) => {

        loadContestants();

        participantInput.value = "";
        participantSchoolInput.value = "";


    }).catch((error) => {
        alert(error.message)
    })


})

resetButton.addEventListener("click", function (event) {

    event.preventDefault();
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/contestants/reset-participants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }).then((response) => {

        loadContestants();

        participantInput.value = "";
        participantSchoolInput.value = "";


    }).catch((error) => {
        alert(error.message)
    })
})