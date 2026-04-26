"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, mainnet, zksync } from "wagmi/chains";

console.log("WalletConnect Project ID:", process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID);

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
    throw new Error("Missing WalletConnect Project ID. Please set the NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID environment variable.");
}

const config = getDefaultConfig({
    appName: "TSender",
    projectId: walletConnectProjectId,
    chains: [anvil, zksync, mainnet],
    ssr: false,
});

export default config;