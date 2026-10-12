
export default async function handler(req, res) {
    const team = req.query.team;
    const result = await fetch(
        `https://v3.football.api-sports.io/players/squads?team=${team}`,
        { headers: { 'x-apisports-key': process.env.FOOTBALL_API_KEY } }
    );
    const data = await result.json();
    res.status(200).json(data);
}