import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, polygon, arbitrum } from "wagmi/chains";


const config = getDefaultConfig({
  appName: "Token Portfolio",
  projectId: "Ye7bb4f2b929198539667374380bb3061", 
  chains: [mainnet, polygon, arbitrum],
});

const queryClient = new QueryClient();

export function WagmiProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
