import type { Metadata, Viewport } from "next";
import { Baloo_2, Quicksand } from "next/font/google";
import "./globals.css";
import TimeTracker from "@/components/shared/TimeTracker";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

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
  metadataBase: new URL("https://kid.jbai.vn"),
  title: "JBAIkid ⭐ Bé Học Tiếng Anh & Hát Vui Nhộn",
  description:
    "Ứng dụng học tiếng Anh, hát karaoke và chơi mini-game thông minh dành cho bé mầm non & tiểu học. 100% miễn phí, an toàn, sinh động!",
  keywords: ["kids", "learn english", "vietnamese songs", "nursery rhymes", "bé học tiếng anh", "jbaikid", "jbai"],
  alternates: {
    canonical: "https://kid.jbai.vn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  openGraph: {
    title: "JBAIkid ⭐ Bé Học Tiếng Anh & Hát Vui Nhộn",
    description: "Ứng dụng học tiếng Anh, hát karaoke và chơi mini-game thông minh cho bé. 100% miễn phí & an toàn!",
    url: "https://kid.jbai.vn",
    siteName: "JBAIkid",
    images: [
      {
        url: "/app_icon.png",
        width: 512,
        height: 512,
        alt: "JBAIkid - Bé Học Tiếng Anh",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "JBAIkid ⭐ Bé Học Tiếng Anh & Hát Vui Nhộn",
    description: "Ứng dụng học tiếng Anh, hát karaoke và chơi mini-game thông minh cho bé.",
    images: ["/app_icon.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/app_icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFF1F5",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${baloo.variable} ${quicksand.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <GoogleAnalytics />
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
