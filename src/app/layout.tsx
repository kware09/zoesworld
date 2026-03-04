import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zoe's World",
  description: "A calm, playful phonics practice world",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Zoe's World",
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#FFF8F0" />
      </head>
      <body className={`${fredoka.variable} ${nunito.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
