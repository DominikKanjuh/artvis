import type { Metadata } from "next";
import { Lora } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://artvis.pages.dev"),
  authors: [
    { name: "Dominik Kanjuh" },
    { name: "Paul Nitzke" },
    { name: "Georgios Papadopoulos" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2C1810" />
        <link rel="canonical" href="https://artvis.pages.dev" />
        <meta name="robots" content="index, follow" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${lora.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
