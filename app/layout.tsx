import type { Metadata } from "next";
import { Inter, Fredoka, Poppins } from "next/font/google";
import "./globals.css";
import MuiClientProvider from './MuiClientProvider';
import BackgroundDecorations from "./components/BackgroundDecorations"; // Import the new component

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const fredoka = Fredoka({ subsets: ["latin"], weight: ['400','500','600','700'], variable: '--font-fredoka' });
const poppins = Poppins({ subsets: ["latin"], weight: ['400','500','600','700'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: "Agape Quiz",
  description: "Personality Development Test App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fredoka.variable} ${poppins.variable}`}>
      <MuiClientProvider>
  <div className="relative min-h-screen flex items-center justify-center">
    <BackgroundDecorations />

    {/* This wrapper ensures children stay centered */}
    <main className="relative z-10 w-full max-w-3xl px-4">
      {children}
    </main>
  </div>
</MuiClientProvider>
      </body>
    </html>
  );
}
