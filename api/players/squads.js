
const cache = {};
const storageDuration = 43200000;

export default async function handler(req, res) {
    const team = req.query.team;
    if (cache[team] && (Date.now() - cache[team].date) < storageDuration) {
        return res.status(200).json(cache[team].data);
    }
    const result = await fetch(
        `https://v3.football.api-sports.io/players/squads?team=${team}`,
        { headers: { 'x-apisports-key': process.env.FOOTBALL_API_KEY } }
    );
    const data = await result.json();
    if (data.results > 0) {
        cache[team] = { data: data, date: Date.now() };
    }
    res.status(200).json(data);
}