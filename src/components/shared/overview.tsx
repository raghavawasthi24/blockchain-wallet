import { Cell, Pie, PieChart } from "recharts";
import { COLORS, type TokenI } from "../../constants/constant";

export default function Overview({ data }: { data: TokenI[] }) {

  const tokensWithValue = data.map((t) => ({
    ...t,
    value: (t.holdings ?? 0) * (t.market_data?.current_price?.usd ?? 0),
  }));

  // finding top 10 coins with highest value
  const newData = [...tokensWithValue]
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  //calculating portfolio value
  const totalPortfolioValue = data.reduce((sum, t) => sum + (t.value || 0), 0);

  return (
    <div className="bg-[#27272A] p-4 rounded-2xl flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-between gap-16">
        <div>
          <p className="font-light mb-4 text-[#A1A1AA]">Portfolio Total</p>
          <p className="text-5xl">
            $
            {totalPortfolioValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <p className="font-light text-[#A1A1AA]">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center sm:flex-row sm:items-start">
        <PieChart width={200} height={200}>
          <Pie
            data={newData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
          >
            {newData.map((entry, index) => (
              <Cell
                key={`cell-${entry.id}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>

        <div className="w-full flex-1 flex flex-col gap-2 text-muted-foreground">
          {newData.map((token, key) => (
            <div
              key={token.id}
              className="flex justify-between text-sm font-light"
            >
              <p style={{ color: COLORS[key % COLORS.length] }}>
                {token.name} ({token.symbol.toUpperCase()})
              </p>
              <p>
                $
                {token.value.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
