import { DataTable } from "../ui/dataTable";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import SearchCard from "./searchCard";
import { columns, type TokenI } from "../../constants/constant";


export default function Table({data}: {data: TokenI[]}) {
  console.log("DATA --------", data)
  return (
    <div>
      <div className="flex justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Star className="text-[#A9E851]" />
          <span className="text-xl">Watchlist</span>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-[#A9E851] rounded-xl">
            <RefreshCw />
            Refresh Prices
          </Button>

          <Dialog>
            <DialogTrigger>
              <Button className="bg-[#A9E851]">
                <Plus />
                Add Token
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <SearchCard />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <DataTable columns={columns} data={data}/>
    </div>
  );
}
