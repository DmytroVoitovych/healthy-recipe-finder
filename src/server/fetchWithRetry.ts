export const fetchWithRetry = async (url: string): Promise<Response> => {
  const API_KEYS = [
    process.env.SPOONACULAR_API_KEY,
    process.env.SPOONACULAR_API_KEY_2,
    process.env.SPOONACULAR_API_KEY_3,
    process.env.SPOONACULAR_API_KEY_4,
    process.env.SPOONACULAR_API_KEY_5,
    process.env.SPOONACULAR_API_KEY_6,
    process.env.SPOONACULAR_API_KEY_7,
    process.env.SPOONACULAR_API_KEY_8,
    process.env.SPOONACULAR_API_KEY_9,
    process.env.SPOONACULAR_API_KEY_10,
    process.env.SPOONACULAR_API_KEY_11,
    ];

  for (let i = 0; i < API_KEYS.length; i++) {
    const key = API_KEYS[i];

    const res = await fetch(url, {
      headers: { "x-api-key": key || "" },
    });

    if (res.ok) return res;

    if (res.status === 402 || res.status === 401) {
      console.warn(
        `⚠️ API key rate limited or invalid (${res.status}) on key API_KEY_#${
          i + 1
        }, trying next...`
      );
      continue;
    }

    return res;
  }

  throw new Error("All API keys are rate limited or invalid");
};