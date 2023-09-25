let allTeamsShown = false;
let standingsData = null;

document.getElementById('seeMoreBtn').addEventListener('click', toggleTableDisplay);

async function fetchStandings() {
    const apiUrl = 'https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=2023&sort=asc';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status) {
            standingsData = data.data.standings;
            updateTable(standingsData.slice(0, 5));
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

function updateTable(data) {
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const headers = ['', 'Tabell 2023/24', 'Wins', 'Draws', 'Losses', 'Points'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

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

    const tableContainer = document.getElementById('standingsTableContainer');
    const existingTable = tableContainer.querySelector('table');
    if (existingTable) {
        tableContainer.removeChild(existingTable);
    }
    tableContainer.appendChild(table);

    const containerHeight = data.length * 80 + 50;
    tableContainer.style.maxHeight = `${containerHeight}px`;
}

function toggleTableDisplay() {
    if (standingsData) {
        if (allTeamsShown) {
            updateTable(standingsData.slice(0, 5));
            document.getElementById('seeMoreBtn').textContent = 'See More';
        } else {
            updateTable(standingsData);
            document.getElementById('seeMoreBtn').textContent = 'See Less';
        }
        allTeamsShown = !allTeamsShown;
    }
}

fetchStandings();


