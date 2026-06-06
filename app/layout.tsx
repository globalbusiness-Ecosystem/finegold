import type React from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppWrapper } from "@/components/app-wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finegold",
  description: "Global gold & jewelry marketplace on Pi Network. Buy, sell and invest in gold, diamonds and NFT jewelry using Pi cryptocurrency. Verified sellers worldwide.",
  keywords: ["gold", "jewelry", "Pi Network", "NFT", "diamonds", "marketplace"],
  generator: 'v0.app'
};

export const viewport: Viewport = {
  themeColor: "#0F0D08",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script src="https://sdk.minepi.com/pi-sdk.js"></script>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="bg-background antialiased">
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
