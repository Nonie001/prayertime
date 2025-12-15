import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ทิศกิบละห์ | หาทิศกิบลัตจากตำแหน่งของคุณ',
  description: 'หาทิศกิบละห์ (Qibla Direction) จากตำแหน่งปัจจุบันของคุณ ด้วย compass ดิจิทัล พร้อมคำนวณระยะทางถึงมักกะห์ แม่นยำ ใช้งานง่าย',
  keywords: ['ทิศกิบละห์', 'กิบลัต', 'Qibla', 'Qibla Direction', 'ทิศละหมาด', 'มักกะห์', 'กะอ์บะห์', 'compass', 'เข็มทิศอิสลาม'],
  openGraph: {
    title: 'ทิศกิบละห์ | หาทิศกิบลัตจากตำแหน่งของคุณ',
    description: 'หาทิศกิบละห์จากตำแหน่งปัจจุบัน ด้วย compass ดิจิทัล พร้อมคำนวณระยะทางถึงมักกะห์',
    type: 'website',
  },
};

export default function QiblaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
