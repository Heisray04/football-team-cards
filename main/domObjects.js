// DOM Elements

// dialog box
export const dialog = document.getElementById('welcome-dialog');
export const closeDialogButton = document.getElementById('close-dialog');

// search section
const searchSection = document.querySelector('.search-section');
export const searchInput = document.getElementById('search-bar');
export const searchBtn = document.getElementById('search-btn');

// errors and feedback
export const feedback = document.createElement('p');

// page navigation
export const viewWorkBtn = document.getElementById('view-work-btn');
export const otherWorksBox = document.querySelector('.other-works')

// search result team name
export const clubInfo = document.querySelector('.team-metadata');
export const teamName = document.getElementById('team-name');
export const teamDetailsBtn = document.getElementById('view-team-details-btn');
export const stadiumDetailsBtn = document.getElementById('view-stadium-details-btn');

// dropdown
export const positionField = document.getElementById('position-field');
export const selectBox = document.getElementById('filter-box');

// player details
export const playerCards = document.getElementById('player-cards');
export const playerDetails = document.querySelector('.player-details');

// cache
export const searchedTeams = {};

searchSection.append(feedback);