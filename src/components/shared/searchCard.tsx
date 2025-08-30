import { useEffect, useState } from "react";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getTokenData, getTrendingTokens, searchToken } from "../../api/api";
import { Checkbox } from "../ui/checkbox";
import { useDispatch } from "react-redux";
import { addToken } from "../../redux/slices/token-slice";

type Token = {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
};

export default function SearchCard() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<Token[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  // 🔹 Fetch trending tokens
  const fetchTrending = async () => {
    if (trendingTokens.length > 0) {
      setTokens(trendingTokens);
      return;
    }
    setLoading(true);
    try {
      const res = await getTrendingTokens();
      if (res?.coins) {
        const mapped = res.coins.map((c: any) => ({
          id: c.item.id,
          name: c.item.name,
          symbol: c.item.symbol.toUpperCase(),
          thumb: c.item.thumb,
        }));
        setTokens(mapped);
        setTrendingTokens(mapped);
      }
    } catch (err) {
      console.error("Error loading trending tokens:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Search coins
  const searchCoin = async (q: string) => {
    if (!q.trim()) {
      fetchTrending(); // fallback to trending
      return;
    }

    setLoading(true);
    try {
      const res = await searchToken(q);
      if (res?.coins) {
        const mapped = res.coins.map((c: any) => ({
          id: c.id,
          name: c.name,
          symbol: c.symbol.toUpperCase(),
          thumb: c.thumb,
        }));
        setTokens(mapped);
      }
    } catch (err) {
      console.error("Error searching tokens:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Debounce query input
  useEffect(() => {
    const handler = setTimeout(() => {
      searchCoin(query);
    }, 500); // debounce 500ms

    return () => clearTimeout(handler); // cleanup old timer
  }, [query]);

  // Initial load → trending
  useEffect(() => {
    fetchTrending();
  }, []);

  const toggleSelection = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const onSave = async () => {
    try {
      const results = await Promise.all(
        selected.map(async (coinId) => {
          const res = await getTokenData(coinId);
          return res;
        })
      );

      console.log("Fetched token data:", results);

      dispatch(addToken(results));
      return results; // or update state
    } catch (err) {
      console.error("Error fetching token data:", err);
    }
  };

  return (
    <div className="font-light rounded-2xl overflow-hidden">
      <DialogHeader>
        <DialogTitle>
          <Input
            placeholder="Search tokens (e.g., ETH, SOL)..."
            className="font-light"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </DialogTitle>
      </DialogHeader>

      <div className="flex flex-col h-96 overflow-y-auto py-2">
        <p className="font-light text-sm px-4 py-2 opacity-50">
          {query ? "Search Results" : "Trending"}
        </p>

        {loading && (
          <p className="text-center text-sm opacity-50 py-4">Loading...</p>
        )}

        {!loading && tokens.length === 0 && (
          <p className="text-center text-sm opacity-50 py-4">No tokens found</p>
        )}

        {tokens.map((token) => (
          <label
            key={token.id}
            htmlFor={token.id}
            className="flex justify-between items-center hover:bg-[#27272A] px-4 py-2 cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <img src={token.thumb} alt={token.name} className="w-6 h-6" />
              <span className="font-light text-sm">
                {token.name} ({token.symbol})
              </span>
            </div>
            <Checkbox
              id={token.id}
              checked={selected.includes(token.id)}
              onCheckedChange={() => toggleSelection(token.id)}
              className="rounded-full w-4 h-4 border-2 border-gray-400 data-[state=checked]:bg-[#A9E851] data-[state=checked]:border-[#A9E851]"
            />
          </label>
        ))}
      </div>

      <DialogFooter className="p-4 bg-[#27272A]">
        <Button
          className="bg-[#A9E851] text-black font-medium"
          disabled={selected.length === 0}
          onClick={onSave}
        >
          Add to Watchlist
        </Button>
      </DialogFooter>
    </div>
  );
}
