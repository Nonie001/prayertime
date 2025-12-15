import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'เวลาละหมาดทุกจังหวัด',
  description: 'เลือกจังหวัดเพื่อดูเวลาละหมาดวันนี้ ครบทั้ง 77 จังหวัดในประเทศไทย แบ่งตามภาค ค้นหาง่าย',
  openGraph: {
    title: 'เวลาละหมาดทุกจังหวัด | เวลาละหมาดไทย',
    description: 'เลือกจังหวัดเพื่อดูเวลาละหมาดวันนี้ ครบทั้ง 77 จังหวัดในประเทศไทย',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
