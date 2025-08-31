import type { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { Line, LineChart } from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { SquarePen } from "lucide-react";
import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { editToken, removeToken } from "../redux/slices/token-slice";
import { Input } from "../components/ui/input";
import React, { useState } from "react";

export interface TokenI {
  id: string;
  name: string;
  symbol: string;
  image: { small: string };
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
    sparkline_7d?: { price: number[] };
  };
  holdings: number;
  value: number;
  isEditing: boolean;
}

export const columns: ColumnDef<TokenI>[] = [
  {
    accessorKey: "name",
    header: "Token",
    // size: 300,
    minSize: 300,
    cell: ({ row }) => {
      const coin = row.original;
      return (
        <div className="flex items-center gap-2">
          <img
            src={coin.image?.small}
            alt={coin.name}
            className="w-6 h-6 rounded-full"
          />
          <span>
            {coin.name} ({coin.symbol.toUpperCase()})
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "market_data.current_price.usd",
    header: "Price",
    size: 150,
    cell: ({ row }) => {
      const price = row.original.market_data?.current_price?.usd ?? 0;
      return <div>${price.toLocaleString()}</div>;
    },
  },
  {
    id: "change24h",
    header: "24h %",
    size: 150,
    cell: ({ row }) => {
      const change = row.original.market_data?.price_change_percentage_24h ?? 0;
      return <div>{change.toFixed(2)}%</div>;
    },
  },
  {
    id: "sparkline",
    size: 200,
    header: "Sparkline (7d)",
    cell: ({ row }) => {
      const sparklineArray =
        row.original.market_data?.sparkline_7d?.price ?? [];
      const sparklineData = sparklineArray.map((p: number, i: number) => ({
        index: i,
        price: p,
      }));

      return (
        <div className="w-8 h-8">
          <LineChart data={sparklineData} width={100} height={50}>
            <Line type="monotone" dataKey="price" strokeWidth={2} dot={false} />
          </LineChart>
        </div>
      );
    },
  },
  {
    accessorKey: "holdings",
    header: "Holdings",
    size: 200,
    cell: ({ row }) => {
      const holdings = row.original.holdings ?? 0;
      const isEditing = row.original.isEditing ?? false;
      const dispatch = useDispatch();
      const [newHoldings, setNewHoldings] = React.useState(holdings);

      return isEditing ? (
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            value={newHoldings}
            onChange={(e) => setNewHoldings(Number(e.target.value))}
            className="p-2 border-[#A9E851]"
          />
          <Button
            className="bg-[#A9E851]"
            onClick={() =>
              dispatch(
                editToken({
                  id: row.original.id,
                  field: "holdings",
                  value: newHoldings,
                })
              ) &&
              dispatch(
                editToken({
                  id: row.original.id,
                  field: "isEditing",
                  value: false,
                })
              )
            }
          >
            Save
          </Button>
        </div>
      ) : (
        <div>{holdings}</div>
      );
    },
  },
  {
    id: "value",
    header: "Value",
    size: 100,
    cell: ({ row }) => {
      const value = row.original.value;
      return <div>${(value && value.toFixed(2)) || 0}</div>;
    },
  },
  {
    id: "action",
    header: "",
    size: 50,
    cell: ({ row }) => {
      const dispatch = useDispatch();
      const [open, setOpen] = useState(false);
      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            {" "}
            <Ellipsis />
          </PopoverTrigger>
          <PopoverContent
            side="left"
            className="p-0 flex flex-col w-40 bg-[#27272A]"
            onClick={() => setOpen(false)}
          >
            <Button
              variant="ghost"
              className="border cursor-pointer justify-start"
              onClick={() =>
                dispatch(
                  editToken({
                    id: row.original.id,
                    field: "isEditing",
                    value: true,
                  })
                )
              }
            >
              <SquarePen />
              Edit Holdings
            </Button>
            <Button
              variant="ghost"
              className="text-red-400 border cursor-pointer justify-start hover:text-red-400"
              onClick={() => dispatch(removeToken(row.original.id))}
            >
              <Trash />
              Remove
            </Button>
          </PopoverContent>
        </Popover>
      );
    },
  },
];

export const COLORS = [
  "#0088FE", // blue
  "#00C49F", // teal
  "#FFBB28", // yellow
  "#FF8042", // orange
  "#829ad6ff", // deep blue
  "#ba6bebff", // purple
  "#e46fadff", // pink
  "#32CD32", // lime green
  "#bc7f53ff", // brown
  "#d5677dff", // crimson
];
