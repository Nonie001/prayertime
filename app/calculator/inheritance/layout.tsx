import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'คำนวณมรดก (ฟะรออิฎ)',
  description: 'เครื่องคำนวณแบ่งมรดกตามหลักอิสลาม (ฟะรออิฎ) คำนวณส่วนแบ่งทายาทอัตโนมัติ',
  keywords: ['คำนวณมรดก', 'ฟะรออิฎ', 'faraid', 'มรดกอิสลาม', 'แบ่งมรดก'],
  openGraph: {
    title: 'คำนวณมรดก (ฟะรออิฎ) | เวลาละหมาดไทย',
    description: 'เครื่องคำนวณแบ่งมรดกตามหลักอิสลาม (ฟะรออิฎ)',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
