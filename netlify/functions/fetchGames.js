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

    // 🧭 Call API-Sports Football endpoint (single fetch)
    const apiRes = await fetch(
      `https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}&from=${from}&to=${to}`,
      {
        headers: {
          "x-apisports-key": process.env.API_SPORTS_KEY,
        },
      }
    );

    const data = await apiRes.json();

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
      body: JSON.stringify({
        error: "Server error",
        details: err.message,
      }),
    };
  }
}
