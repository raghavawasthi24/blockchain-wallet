import { Button } from "../ui/button";
import { Wallet } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex justify-between p-2">
      <div className="flex items-center gap-2">
        <img src="/assets/logo.png" alt="Portfolio" className="w-6" />
        <p className="font-semibold text-lg">Token Portfolio</p>
      </div>

      <Button className="bg-[#A9E851] rounded-2xl">
        <Wallet/>
        Connect Wallet</Button>
    </div>
  );
}
