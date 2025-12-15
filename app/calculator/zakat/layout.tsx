import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'คำนวณซะกาต',
  description: 'เครื่องคำนวณซะกาตออนไลน์ คำนวณซะกาตเงิน ทอง และทรัพย์สิน ตามหลักอิสลาม',
  keywords: ['คำนวณซะกาต', 'ซะกาต', 'zakat calculator', 'นิศาบ', '2.5%'],
  openGraph: {
    title: 'คำนวณซะกาต | เวลาละหมาดไทย',
    description: 'เครื่องคำนวณซะกาตออนไลน์ คำนวณซะกาตเงิน ทอง และทรัพย์สิน',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
