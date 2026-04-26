import type { Metadata } from "next";
import { Providers } from "@/providers";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "TS Sender Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body>
        <Providers>
            <Header />
            {children}
        </Providers>
      </body>
    </html>
  );
}
