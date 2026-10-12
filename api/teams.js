
const cache = {};
const storageDuration = 86400000;

export default async function handler(req, res) {
    const search = req.query.search.toLowerCase();
    if (cache[search] && (Date.now() - cache[search].date) < storageDuration) {
        return res.status(200).json(cache[search].data);
    }
    const result = await fetch(
        `https://v3.football.api-sports.io/teams?search=${search}`,
        { headers: { 'x-apisports-key': process.env.FOOTBALL_API_KEY} }
    );
    const data = await result.json();
    if (data.results > 0) {
        cache[search] = { data: data, date: Date.now() };
    }
    res.status(200).json(data);
}