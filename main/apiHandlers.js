// API handler script - retrieves available team info

const BASE = "/api/";


async function arrangeData(res) {
    const data = await res.json();
    if (data.results === 0) return null;
    return {
        results: data.results, // number
        response: data.response[0], // Object
        parameters: data.parameters // Object
    };
}

async function findTeamData(clubName) {
    let res = null;
    try {
        res = await fetch(`${BASE}teams?search=${clubName}`);
    } catch (error) {
        return 'error';
    }
    const result = await arrangeData(res);
    return result;
}

async function getTeamCurrentPlayers(id) {
    let res = null;
    try {
        res = await fetch(`${BASE}players/squads?team=${id}`);
    } catch (error) {
        return 'error';
    }
    const result = await arrangeData(res);
    return result;
}

export async function getPlayersData(clubName) {
    const teamData = await findTeamData(clubName);
    if (!teamData || teamData === 'error') return null;
    const teamId = teamData.response.team.id
    const teamPlayers = await getTeamCurrentPlayers(teamId)
    if (!teamPlayers || teamPlayers === 'error') return null;
    teamPlayers.response["team details"] = teamData.response;
    return teamPlayers.response;
}

/*async function getTeamPlayersBySeason(id, year) {
    // keys: [ 'get', 'parameters', 'errors', 'results', 'paging', 'response' ]
    let page = 1;
    let players = [];
    let currentResults = 0
    while (true) {
        const res = await fetch(
            `${BASE}players?team=${id}&season=${year}&page=${page}`,
            { headers : { "x-apisports-key": API_KEY } }
        );
        const data = await res.json();
        if (data.results === 0) break;
        currentResults += data.results
        players.push(...data.response)
        if (page >= data.paging.total) break;
        page++;
    }
    return {
        results: currentResults,
        response: players,
        parameters: { team: id, season: year, page: page }
    };
}*/