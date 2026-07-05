import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Noto_Serif_Bengali } from "next/font/google";

import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { site } from "@/data/site";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "The Calcutta Classics — Street Food in Shyambazar, Kolkata",
    template: "%s · The Calcutta Classics",
  },
  description: site.description,
  keywords: [
    "momos in Shyambazar",
    "street food North Kolkata",
    "Bhetki fish fry Kolkata",
    "Belgian coffee ₹20",
    "The Calcutta Classics",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0F0F10" },
    { media: "(prefers-color-scheme: light)", color: "#F6F1E7" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} ${notoBengali.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only z-[60] rounded-full bg-momo-gold px-4 py-2 text-sm font-medium text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Navbar />
          <div className="pb-24 md:pb-0">
            <main id="main" className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
          </div>
          <BottomTabBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
