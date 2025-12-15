import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import "./globals.css";

const prompt = Prompt({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://prayertime.example.com'), // เปลี่ยนเป็น domain จริง
  title: {
    default: "เวลาละหมาดไทย - ดูเวลาละหมาดแม่นยำทุกจังหวัด",
    template: "%s | เวลาละหมาดไทย",
  },
  description: "เวลาละหมาดแม่นยำสำหรับทุกจังหวัดในประเทศไทย พร้อมเครื่องมือคำนวณซะกาตและมรดกตามหลักอิสลาม อัพเดททุกวัน",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo.svg',
  },
  keywords: [
    "เวลาละหมาด",
    "เวลาละหมาดวันนี้",
    "เวลาละหมาดกรุงเทพ",
    "เวลาละหมาดไทย",
    "prayer times thailand",
    "waktu solat",
    "ซะกาต",
    "คำนวณซะกาต",
    "มรดกอิสลาม",
    "ฟะรออิฎ",
    "มุสลิมไทย",
  ],
  authors: [{ name: "เวลาละหมาดไทย" }],
  creator: "เวลาละหมาดไทย",
  publisher: "เวลาละหมาดไทย",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://prayertime.example.com",
    siteName: "เวลาละหมาดไทย",
    title: "เวลาละหมาดไทย - ดูเวลาละหมาดแม่นยำทุกจังหวัด",
    description: "เวลาละหมาดแม่นยำสำหรับทุกจังหวัดในประเทศไทย พร้อมเครื่องมือคำนวณซะกาตและมรดก",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "เวลาละหมาดไทย",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "เวลาละหมาดไทย - ดูเวลาละหมาดแม่นยำทุกจังหวัด",
    description: "เวลาละหมาดแม่นยำสำหรับทุกจังหวัดในประเทศไทย",
    images: ["/og-image.svg"],
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
    // google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://prayertime.example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#1e293b" />
      </head>
      <body
        className={`${prompt.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
