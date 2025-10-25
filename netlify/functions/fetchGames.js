// netlify/functions/fetchGames.js
export async function handler(event) {
  try {
    const { league, season, from, to } = event.queryStringParameters;

    if (!league || !season || !from || !to) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing parameters" }),
      };
    }

    const apiUrl = `https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}&from=${from}&to=${to}`;

    // ✅ Correct header for direct API-Sports users
    const apiRes = await fetch(apiUrl, {
      headers: {
        "x-apisports-key": process.env.API_SPORTS_KEY,
      },
    });

    const data = await apiRes.json();

    // ✅ Check for errors and log them for debugging
    if (data.errors && Object.keys(data.errors).length > 0) {
      console.error("API-Sports returned errors:", data.errors);
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("❌ fetchGames error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: err.message }),
    };
  }
}
