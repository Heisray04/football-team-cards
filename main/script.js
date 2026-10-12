// Primary script file

import * as domElement from "./domObjects.js"
import * as func from "./coreFuncs.js";


let searchWord = null;
domElement.dialog.showModal();
domElement.closeDialogButton.blur();

domElement.closeDialogButton.addEventListener('click', () => {
  domElement.dialog.close();
});

domElement.viewWorkBtn.addEventListener('click', () => {
  domElement.otherWorksBox.style.display = 'flex';
});

domElement.otherWorksBox.addEventListener('click', (e) => {
  if (e.target.closest('.work-box')) return;
  domElement.otherWorksBox.style.display = 'none';
});

async function display(input) {
  input = input.trim().toLowerCase();
  func.resetSearch();
  if (!func.verifyInput(input)) return;
  const result = await func.retrieveClubPlayersData(input);
  if (!result) return;
  searchWord = input;
  func.displayContent(result.players, result.teamName);
}

domElement.searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') display(domElement.searchInput.value);
});

domElement.searchInput.addEventListener('click', () => {
  domElement.feedback.textContent = '';
});

domElement.searchBtn.addEventListener('click', () => {
  domElement.feedback.textContent = '';
  display(domElement.searchInput.value);
});

domElement.playerCards.addEventListener('click', (e) => {
  const eachCard = e.target.closest('.player-card');
  if (!eachCard) return;
  const playerName = eachCard.querySelector('h2').textContent;
  const eachPlayer = func.getPlayerDetails(playerName, searchWord);
  domElement.playerDetails.innerHTML = '';
  domElement.playerDetails.innerHTML = eachPlayer;
  domElement.playerDetails.style.display = 'flex';
});

domElement.teamDetailsBtn.addEventListener('click', () => {
  domElement.playerDetails.innerHTML = '';
  domElement.playerDetails.innerHTML = func.getTeamDetails(searchWord);
  domElement.playerDetails.style.display = 'flex';
});

domElement.stadiumDetailsBtn.addEventListener('click', () => {
  domElement.playerDetails.innerHTML = '';
  domElement.playerDetails.innerHTML = func.getStadiumDetails(searchWord);
  domElement.playerDetails.style.display = 'flex';
});

domElement.selectBox.addEventListener('change', (e) => {
  const players = func.getPlayersByPosition(e, searchWord);
  domElement.playerCards.innerHTML = players.join('');
});

domElement.playerDetails.addEventListener('click', (e) => {
  if (e.target.closest('.for-each')) return;
  domElement.playerDetails.style.display = 'none';
});
