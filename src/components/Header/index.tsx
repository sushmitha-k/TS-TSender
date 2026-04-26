"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm" />
          
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            TSender
          </h1>

          <a
            href="https://github.com/cyfrin/TSender"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 hidden md:flex items-center justify-center rounded-lg border border-zinc-300 bg-zinc-900 p-2 text-white shadow-sm transition-all hover:bg-zinc-800 hover:shadow-md"
          >
            <FaGithub className="h-4 w-4" />
          </a>
        </div>

        <nav className="hidden md:flex items-center">
          <span className="text-sm text-zinc-600">
            The most gas efficient airdrop contract on earth, built in huff 🐎
          </span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="scale-95 hover:scale-100 transition-transform">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};