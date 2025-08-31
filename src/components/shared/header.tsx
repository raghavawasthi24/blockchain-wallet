import { Wallet } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";

export default function Header() {
  const { isConnected } = useAccount();

  return (
    <div className="flex justify-between p-2">
      <div className="flex items-center gap-2">
        <img src="/assets/logo.png" alt="Portfolio" className="w-6" />
        <p className="font-semibold text-lg">Token Portfolio</p>
      </div>

      {isConnected ? (
        <div className="flex items-center gap-2 bg-[#A9E851] px-4 py-2 rounded-2xl">
          <Wallet className="w-4 h-4" />
        </div>
      ) : (
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
           <Button className="bg-[#A9E851] rounded-2xl" onClick={openConnectModal}> <Wallet /> Connect Wallet </Button>
          )}
        </ConnectButton.Custom>
      )}
    </div>
  );
}
