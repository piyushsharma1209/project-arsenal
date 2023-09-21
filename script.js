// Add a variable to keep track of whether all teams are shown
let allTeamsShown = false;
let standingsData = null; // Store the fetched standings data

// Add an event listener to the "See More" button
document.getElementById('seeMoreBtn').addEventListener('click', toggleTableDisplay);

async function fetchStandings() {
    const apiUrl = 'http://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=2023&sort=asc';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status) {
            standingsData = data.data.standings; // Store the fetched data
            updateTable(standingsData.slice(0, 5)); // Show only the top 5 teams initially
            // If there are more than 5 teams, show the "See More" button
            if (standingsData.length > 5) {
                document.getElementById('seeMoreBtn').style.display = 'block';
            }
        } else {
            console.error('Failed to fetch data from the API.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Function to update the table with a given set of standings data
function updateTable(data) {
    // Create the table HTML
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const headers = ['', 'Team', 'Wins', 'Draws', 'Losses', 'Points'];

    // Create table headers
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Populate the table rows with data
    data.forEach(standing => {
        const row = table.insertRow();
        const logoCell = row.insertCell();
        const teamCell = row.insertCell();
        const winsCell = row.insertCell();
        const drawsCell = row.insertCell();
        const lossesCell = row.insertCell();
        const pointsCell = row.insertCell();

        logoCell.innerHTML = `<img src="${standing.team.logos[0].href}" alt="${standing.team.name}" width="40" height="40">`;
        teamCell.textContent = standing.team.displayName;
        winsCell.textContent = standing.stats.find(stat => stat.name === 'wins').displayValue;
        drawsCell.textContent = standing.stats.find(stat => stat.name === 'ties').displayValue;
        lossesCell.textContent = standing.stats.find(stat => stat.name === 'losses').displayValue;
        pointsCell.textContent = standing.stats.find(stat => stat.name === 'points').displayValue;
    });

    // Replace the existing table with the updated one
    const tableContainer = document.getElementById('standingsTableContainer');
    const existingTable = tableContainer.querySelector('table');
    if (existingTable) {
        tableContainer.removeChild(existingTable);
    }
    tableContainer.appendChild(table);

    // Adjust the container's height based on the number of teams displayed
    const containerHeight = data.length * 80 + 50; // Adjust as needed
    tableContainer.style.maxHeight = `${containerHeight}px`;
}

// Function to toggle table display when the "See More" button is clicked
function toggleTableDisplay() {
    if (standingsData) {
        if (allTeamsShown) {
            // If all teams are shown, hide the extra rows
            updateTable(standingsData.slice(0, 5));
            document.getElementById('seeMoreBtn').textContent = 'See More';
        } else {
            // If only the top 5 teams are shown, expand to show all
            updateTable(standingsData);
            document.getElementById('seeMoreBtn').textContent = 'See Less';
        }
        allTeamsShown = !allTeamsShown;
    }
}

// Call the fetchStandings function to populate the table
fetchStandings();


hamburger = document.querySelector(".hamburger");
hamburger.onclick = function () {
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
}