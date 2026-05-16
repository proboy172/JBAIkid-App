import type { Metadata, Viewport } from "next";
import { Baloo_2, Quicksand } from "next/font/google";
import "./globals.css";
import TimeTracker from "@/components/shared/TimeTracker";

const baloo = Baloo_2({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const quicksand = Quicksand({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "JBAIkid ⭐ Bé Học Tiếng Anh & Hát",
  description:
    "Ứng dụng học tiếng Anh, hát tiếng Anh và tiếng Việt dành cho bé 3 tuổi. Thiết kế sinh động, an toàn, miễn phí.",
  keywords: ["kids", "learn english", "vietnamese songs", "nursery rhymes", "bé học tiếng anh"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFF1F5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${baloo.variable} ${quicksand.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <div id="app-container" className="min-h-dvh relative overflow-hidden">
          {/* Floating clouds background */}
          <div className="cloud cloud-1" aria-hidden="true" />
          <div className="cloud cloud-2" aria-hidden="true" />
          <div className="cloud cloud-3" aria-hidden="true" />

          {children}
          <TimeTracker />
        </div>
      </body>
    </html>
  );
}
