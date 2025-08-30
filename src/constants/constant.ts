import type { ColumnDef } from "@tanstack/react-table";

export interface TokenI {
    url: string;
    name: string;
    symbol: string;
    price: number;
    changePercentage: number;
    holdings: number;
}


export const columns: ColumnDef<TokenI>[] = [
  {
    accessorKey: "url",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "symbol",
    header: "Amount",
  },
];
