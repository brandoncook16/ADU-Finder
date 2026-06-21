export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { location, page = 1 } = req.query;
  if (!location) return res.status(400).json({ error: "location required" });

  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  const ZILLOW_HOST = "zillow-com-live-data-scraper-api.p.rapidapi.com";

  try {
    const url = `https://${ZILLOW_HOST}/bylocation?location=${encodeURIComponent(location)}&listType=for-rent&page=${page}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": ZILLOW_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
