"use client";

import { useEffect, useState } from "react";
import { HomeContent } from "@/components/HomeContent";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected, isDisconnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDisconnected) {
      localStorage.removeItem("tsender-form");
    }
  }, [isDisconnected]); 

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-indigo-50 flex justify-center px-4 pt-10">
      {isConnected ? <HomeContent /> : <div>Please connect a wallet...</div>}
    </div>
  );
}