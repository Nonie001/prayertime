import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
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
  manifest: "/manifest.json",
  keywords: [
    "เวลาละหมาด",
    "เวลาละหมาดวันนี้",
    "เวลาละหมาดกรุงเทพ",
    "เวลาละหมาดไทย",
    "เวลาฟัจร์วันนี้",
    "เวลามัฆริบคืนนี้",
    "เวลาอีชาวันนี้",
    "เวลาซุฮร์วันนี้",
    "เวลาอัศร์วันนี้",
    "เวลาละหมาดภาคเหนือ",
    "เวลาละหมาดภาคใต้",
    "เวลาละหมาดภาคกลาง",
    "เวลาละหมาดภาคตะวันออกเฉียงเหนือ",
    "เวลาละหมาดอีสาน",
    "เวลาละหมาด 5 เวลา",
    "prayer times thailand",
    "prayer time today",
    "fajr prayer time",
    "maghrib prayer time",
    "isha prayer time",
    "waktu solat",
    "waktu solat thailand",
    "waktu sholat hari ini",
    "เช็คเวลาละหมาด",
    "ดูเวลาละหมาด",
    "แอปเวลาละหมาด",
    "เอซาน",
    "อาซาน",
    "เวลาละหมาดมุสลิม",
    "เวลาละหมาดอิสลาม",
    "ซะกาต",
    "คำนวณซะกาต",
    "ซะกาตเงิน",
    "ซะกาตทอง",
    "zakat calculator",
    "zakat thai",
    "มรดกอิสลาม",
    "ฟะรออิฎ",
    "faraid calculator",
    "แบ่งมรดกอิสลาม",
    "คำนวณมรดก",
    "ทิศกิบละห์",
    "qibla direction",
    "qibla compass",
    "มุสลิมไทย",
    "อิสลามไทย",
    "muslim thailand",
    "islamic calculator",
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
      <body
        className={`${prompt.variable} font-sans antialiased`}
      >
        {/* Organization Schema for Google */}
        <Script
          id="organization-schema"
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
        <Script
          id="website-schema"
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
        
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2812903229696322"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        
        <Header />
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
