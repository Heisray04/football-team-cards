# Team Squad

Team Squad is a web app where you type a football team's name (club/country) and see its players as cards. You can filter the players by position, open a player's details, and view the team's team and stadium details.

**Live site:** https://football-team-cards-ten.vercel.app

## What it does

- Search for a club by typing its name, then press **Enter** or click **Search**
- See the squad as player cards
- Filter players by position: Goalkeeper, Defender, Midfielder, Attacker
- Click a card to see that player's details
- Open Team Details and Stadium Details for the club
- Browse my other practice projects from the **"View other works"** panel

## Technologies

- HTML, CSS and JavaScript (ES modules).
- API-Football for the data.
- Vercel serverless functions to keep the API key hidden.
- **Git** and **GitHub**, with Vercel deploying from the repo.

## How it works

The front end is plain HTML, CSS and JavaScript (ES modules), with no frameworks. The data comes from [API-Football](https://api-sports.io).

The API key is not in the front-end code. The page calls two serverless functions in the `api` folder, hosted on Vercel. They add the key, which is stored as an environment variable in Vercel, and ask API-Football for the data.

- `api/teams.js` finds a team by name and returns its details and stadium.
- `api/players/squads.js` returns the squad for a team id.

Both functions keep a cache so repeated searches do not use up the API's request limit. Team results are kept for 24 hours and squads for 12 hours. Error replies are never saved.

## Project structure

- `index.html` - the page
- `main/` - front-end JavaScript (`domObjects.js`, `coreFuncs.js`, `apiHandlers.js`, `script.js`) and `styles.css`
- `api/` - the serverless functions
- `others/` - contains my other practice projects

## Known limitations

- The free API plan allows **100 requests** per day.
- A club name must be at least 4 characters long.
- [API-Football](https://api.sports.io) stores some clubs under different names from the ones people type, so a search can return the wrong team, such as a women's or youth team. Searching "Inter Milan" is one example. I am working on a fix.

## Author

Created by **Raymond**.