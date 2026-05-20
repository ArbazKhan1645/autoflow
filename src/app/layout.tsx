import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "AutoFlow Parts",
  title: {
    default: "AutoFlow CRM | Auto Parts Inventory, Ordering and AI",
    template: "%s | AutoFlow CRM",
  },
  description:
    "A premium automotive SaaS platform for auto parts catalog, CRM, inventory, ordering, analytics and AI operations.",
  keywords: [
    "auto parts CRM",
    "inventory management",
    "automotive SaaS",
    "AI calling agent",
    "parts catalog",
  ],
  metadataBase: new URL("https://autoflow.example.com"),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "AutoFlow Parts",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "AutoFlow CRM",
    description:
      "Complete Auto Parts CRM, Inventory, Ordering and AI command center.",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "AutoFlow" }],
    type: "website",
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
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
