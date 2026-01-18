import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cars Dakar | Location Voiture Luxe & Vente",
  description: "Leader de la location de voiture avec chauffeur et vente de véhicules de luxe à Dakar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable}`}>
      <body className="antialiased bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
