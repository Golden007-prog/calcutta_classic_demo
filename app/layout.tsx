import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Noto_Serif_Bengali } from "next/font/google";

import { ChiliCursor } from "@/components/fx/ChiliCursor";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Preloader } from "@/components/preloader/Preloader";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { TopBarLoader } from "@/components/TopBarLoader";
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
        {/* Steam Ritual gate — runs before paint so repeat visitors never
            see a preloader frame (feature 86). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!sessionStorage.getItem('cc-steam-ritual')){document.documentElement.setAttribute('data-preload','1')}}catch(e){}",
          }}
        />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only z-[60] rounded-full bg-momo-gold px-4 py-2 text-sm font-medium text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <SmoothScroll />
          <ChiliCursor />
          <TopBarLoader />
          <Preloader />
          <Navbar />
          <div className="pb-24 md:pb-0">
            <main id="main" className="min-h-screen pt-16">
              <AnnouncementBar />
              {children}
            </main>
            <Footer />
          </div>
          <BottomTabBar />
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}
