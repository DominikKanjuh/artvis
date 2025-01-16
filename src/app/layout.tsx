import type { Metadata } from "next";
import { Lora } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArtVis - Insight into Art",
  description: "Visualising art history for museum and gallery curators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${lora.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
