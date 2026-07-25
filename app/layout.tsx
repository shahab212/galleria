import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Galleria Arts & Co. | Curating Beauty for Timeless Spaces",
  description: "Discover curated artworks that bring character, warmth and elegance to every space. Premium wall art, canvas paintings, framed prints & custom framing.",
  icons: {
    icon: "/images/monogram.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans bg-[#FAF7F2] text-[#1C2530] selection:bg-[#C5A059] selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
