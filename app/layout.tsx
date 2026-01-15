import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elemta | Smart Digital Solutions",
  description: "Elemta builds software, AI solutions, and brands.",
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-files/favicon.ico', sizes: 'any' },
      { url: '/favicon-files/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-files/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-files/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicon-files/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicon-files/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon-files/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased layout-body`}
      >
        <div className="layout-content">
          {children}
        </div>
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
