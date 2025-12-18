import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const prompt = Prompt({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://prayertime.in.th'),
  title: {
    default: "เวลาละหมาดไทย - ดูเวลาละหมาดแม่นยำทุกจังหวัด",
    template: "%s | เวลาละหมาดไทย",
  },
  description: "เวลาละหมาดแม่นยำสำหรับทุกจังหวัดในประเทศไทย พร้อมเครื่องมือคำนวณซะกาตและมรดกตามหลักอิสลาม อัพเดททุกวัน",
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/logo.svg', sizes: '16x16' },
      { url: '/logo.svg', sizes: '32x32' },
    ],
    apple: '/logo.svg',
    shortcut: '/logo.svg',
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
    url: "https://prayertime.in.th/",
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
    // ยืนยันผ่าน DNS แล้ว
  },
  alternates: {
    canonical: "https://prayertime.in.th/",
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
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <meta name="theme-color" content="#1e293b" />
        
        {/* Organization Schema for Google */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "เวลาละหมาดไทย",
              "url": "https://prayertime.in.th",
              "logo": "https://prayertime.in.th/logo.svg",
              "description": "เวลาละหมาดแม่นยำสำหรับทุกจังหวัดในประเทศไทย พร้อมเครื่องมือคำนวณซะกาตและมรดกตามหลักอิสลาม",
              "sameAs": [
                "https://prayertime.in.th"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "availableLanguage": ["Thai", "English"]
              },
              "areaServed": {
                "@type": "Country",
                "name": "Thailand"
              },
              "serviceType": "Religious Information Services"
            })
          }}
        />
        
        {/* Website Schema for Google */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "เวลาละหมาดไทย",
              "url": "https://prayertime.in.th",
              "description": "เวลาละหมาดแม่นยำสำหรับทุกจังหวัดในประเทศไทย",
              "publisher": {
                "@type": "Organization",
                "name": "เวลาละหมาดไทย",
                "logo": "https://prayertime.in.th/logo.svg"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://prayertime.in.th/prayertime/{search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2812903229696322"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${prompt.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
