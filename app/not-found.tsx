import Link from 'next/link';
import { Home, MapPin } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-slate-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-2">ไม่พบหน้านี้</h2>
        <p className="text-slate-500 mb-8">หน้าที่คุณกำลังค้นหาอาจถูกย้ายหรือไม่มีอยู่</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-slate-900 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
          >
            <Home className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
          <Link
            href="/prayertime"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            ดูเวลาละหมาด
          </Link>
        </div>
      </div>
    </div>
  );
}
