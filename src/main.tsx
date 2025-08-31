import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { WagmiProviders } from "./lib/wagmiProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <WagmiProviders>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </WagmiProviders>
);
