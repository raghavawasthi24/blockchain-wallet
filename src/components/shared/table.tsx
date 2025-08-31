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
import { getTokenData } from "../../api/api";
import { useDispatch } from "react-redux";
import { editToken } from "../../redux/slices/token-slice";
import { useState } from "react";

export default function Table({ data }: { data: TokenI[] }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const refreshData = async () => {
    try {
      setLoading(true);
      await Promise.all(
        data.map(async (token) => {
          const res = await getTokenData(token.id);
          dispatch(
            editToken({
              id: token.id,
              field: "market_data",
              value: res?.market_data,
            })
          );
          return res;
        })
      );
    } catch (err) {
      console.error("Error refreshing tokens:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Star className="text-[#A9E851]" />
          <span className="text-xl">Watchlist</span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            className="bg-[#A9E851] rounded-xl"
            onClick={refreshData}
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:block">Refresh Prices</span>
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Button className="bg-[#A9E851]">
                <Plus />
                Add Token
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <SearchCard setDialogOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
