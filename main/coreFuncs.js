import * as helper from "./domObjects.js";
import { getPlayersData } from "./apiHandlers.js";


function allPlayers(player) {
  return `<div class="player-card">
            <h2>${player.name}</h2>
            <p>Position: ${player.position}</p>
          </div>`;
}

export function getPlayersByPosition(e, searchWord) {
  if (e.target.value === 'all') {
    return helper.searchedTeams[searchWord].players.map((player) => {
      return allPlayers(player);
    });
  } else if (e.target.value === 'clear') return [];
  const players = helper.searchedTeams[searchWord].players
    .filter(player => player.position.toLowerCase().includes(e.target.value))
    .map((player) => {
      return allPlayers(player);
    });
  return players;
}

export function getPlayerDetails(playerName, teamName) {
  const playerObj = helper.searchedTeams[teamName]
    .players.filter(obj => obj.name === playerName)[0];
  return `<section class="for-each">
            <img src="${playerObj.photo}" alt="An official potrait of ${playerObj.name}"/>
            <section class="details">
              <p><b>Name: </b>${playerObj.name}</p>
              <p><b>Age: </b>${playerObj.age}</p>
              <p><b>Shirt Number: </b>${playerObj.number}</p>
              <p><b>Position: </b>${playerObj.position}</p>
            </section>
          </section>
          <button class="close-btn">&times;</button>`;
}

export function getTeamDetails(teamName) {
  const teamObj = helper.searchedTeams[teamName]['team details'].team;
  return `<section class="for-each">
            <img src="${teamObj.logo}" alt="${teamObj.name} logo"/>
            <section class="details">
              <p><b>Name: </b>${teamObj.name}</p>
              <p><b>Team Code: </b>${teamObj.code}</p>
              <p><b>Country: </b>${teamObj.country}</p>
              <p><b>Founded: </b>${teamObj.founded}</p>
            </section>
          </section>
          <button class="close-btn">&times;</button>`;
}

export function getStadiumDetails(teamName) {
  const stadiumObj = helper.searchedTeams[teamName]['team details'].venue;
  return `<section class="for-each stadium">
            <img src="${stadiumObj.image}" alt="A photo of ${stadiumObj.name} logo"/>
            <section class="details">
              <p><b>Name: </b>${stadiumObj.name}</p>
              <p><b>City: </b>${stadiumObj.city}</p>
              <p><b>Address: </b>${stadiumObj.address}</p>
              <p><b>Capacity: </b>${stadiumObj.capacity}</p>
              <p><b>Field surface: </b>${stadiumObj.surface}</p>
            </section>
          </section>
          <button class="close-btn">&times;</button>`;
}

export function toggleButton() {
  helper.searchBtn.disabled = !helper.searchBtn.disabled;
  helper.searchInput.disabled = !helper.searchInput.disabled;
}

function saveTeamInfo(fullObject, retrievedName, inputName) {
  helper.searchedTeams[retrievedName.toLowerCase()] = fullObject;
  helper.searchedTeams[inputName] = fullObject;
  helper.feedback.textContent = '';
  return { players: fullObject.players, teamName: retrievedName };
}

export async function retrieveClubPlayersData(inputName) {
  if (helper.searchedTeams[inputName]) {
    const cachedPlayers = helper.searchedTeams[inputName];
    return { players: cachedPlayers.players, teamName: cachedPlayers.team.name }; 
  }
  helper.feedback.textContent = `Searching for result...`;
  toggleButton();
  try {
    const squadInfo = await getPlayersData(inputName);
    if (!squadInfo || squadInfo.players.length === 0) {
      helper.feedback.textContent = `No result available.`;
      return null;
    }
    return saveTeamInfo(squadInfo, squadInfo.team.name, inputName);
  } catch (e) {
    helper.feedback.innerHTML = `${e.message} data!<br>Check your Network and try again.`;
    return null;
  } finally {
    toggleButton();
  }
}

export function displayContent(players, teamName) {
  helper.feedback.textContent = `Showing results for ${players.length} ${teamName} players.`;
  helper.teamName.textContent = teamName;
  helper.clubInfo.style.display = 'flex';
  helper.positionField.style.display = 'block';
  const all = players.map(player => allPlayers(player));
  helper.playerCards.innerHTML = all.join("");
}

export function verifyInput(inputName) {
  if (!inputName) {
    helper.feedback.textContent = 'Enter a club name!';
    return null;
  } else if (inputName.length <= 3) {
    helper.feedback.textContent = 'Name too short!'
    return null;
  } else return true;
}

export function resetSearch() {
  helper.searchInput.value = '';
  helper.searchInput.blur();
  helper.clubInfo.style.display = 'none';
  helper.positionField.style.display = 'none';
  helper.playerCards.textContent = '';
}