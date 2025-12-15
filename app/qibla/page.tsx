'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import Footer from '@/components/Footer';

// Dynamic import เพื่อปิด SSR สำหรับ component ที่ใช้ browser APIs
const QiblaCompass = dynamic(() => import('@/components/QiblaCompass'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
      <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg">กำลังโหลด compass...</p>
    </div>
  ),
});

export default function QiblaPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-800 pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center">
              <Compass className="w-5 h-5 text-emerald-400" />
            </div>
            ทิศกิบละห์
          </h1>
          <p className="text-slate-400 mt-2">หาทิศทางสู่กะอ์บะห์ ณ มัสยิดอัลฮะรอม เมืองมักกะห์</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <QiblaCompass />
        </div>

        {/* Notes */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-5">
          <h4 className="font-semibold text-slate-800 mb-3">วิธีใช้งาน</h4>
          <ul className="text-sm text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">•</span>
              ถือโทรศัพท์ในแนวราบ ขนานกับพื้น
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">•</span>
              หมุนตัวให้เข็มสีเขียวชี้ตรงหน้า
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">•</span>
              หลีกเลี่ยงบริเวณที่มีสนามแม่เหล็ก
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">•</span>
              สำหรับไทย ทิศกิบละห์อยู่ทางตะวันตกเฉียงเหนือ (~290°)
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
