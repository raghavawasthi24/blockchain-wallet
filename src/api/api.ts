import axios from "axios";

export const getTrendingTokens = async () => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending",
      {
        headers: {
          accept: "application/json",
          // If you have a CoinGecko Pro key, uncomment the next line:
          // "x-cg-pro-api-key": process.env.COINGECKO_API_KEY,
        },
      }
    );

    return res.data; // trending tokens list
  } catch (error: any) {
    console.error("Error fetching trending tokens:", error.message);
    return null;
  }
};

export const searchToken = async (query: string) => {
  if (!query.trim()) return null; // avoid empty requests

  try {
    const res = await axios.get("https://api.coingecko.com/api/v3/search", {
      headers: {
        accept: "application/json",
        // If you have a CoinGecko Pro key, uncomment the next line:
        // "x-cg-pro-api-key": process.env.COINGECKO_API_KEY,
      },
      params: {
        query, // 🔹 required by CoinGecko
      },
    });

    return res.data; // { coins: [...], exchanges: [...], ... }
  } catch (error: any) {
    console.error("Error searching tokens:", error.message);
    return null;
  }
};

export const getTokenData = async (id: string) => {
  if (!id.trim()) return null; // avoid empty requests

  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false
  &tickers=false
  &market_data=true
  &community_data=false
  &developer_data=false
  &sparkline=true`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-sxmGPNBMkG9iquoib5edwAB7",
        },
      }
    );

    return res.data; // { coins: [...], exchanges: [...], ... }
  } catch (error: any) {
    console.error("Error searching tokens:", error.message);
    return null;
  }
};
