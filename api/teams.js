
export default async function handler(req, res) {
    const search = req.query.search;
    const result = await fetch(
        `https://v3.football.api-sports.io/teams?search=${search}`,
        { headers: { 'x-apisports-key': process.env.FOOTBALL_API_KEY} }
    );
    const data = result.json();
    res.status(200).json({ status: result.status, data: data });
}