import axios from "axios";

export const getTrendingTokens = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v3/search/trending`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.error("Error fetching trending tokens:", error.message);
    return null;
  }
};

export const searchToken = async (query: string) => {
  if (!query.trim()) return null;

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v3/search`,
      {
        headers: {
          accept: "application/json",
        },
        params: {
          query,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.error("Error searching tokens:", error.message);
    return null;
  }
};

export const getTokenData = async (id: string) => {
  if (!id.trim()) return null;

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v3/coins/${id}?localization=false
          &tickers=false
          &market_data=true
          &community_data=false
          &developer_data=false
          &sparkline=true`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.error("Error searching tokens:", error.message);
    return null;
  }
};
