'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Compass, RefreshCw, Info } from 'lucide-react';
import Footer from '@/components/Footer';
import { useState } from 'react';

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
  const [showTip, setShowTip] = useState(true);

  const handleRefresh = () => {
    window.location.reload();
  };

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
        {/* Calibration Tip */}
        {showTip && (
          <div className="mb-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 shadow-lg relative overflow-hidden">
            <button 
              onClick={() => setShowTip(false)}
              className="absolute top-2 right-2 text-white/70 hover:text-white text-xl leading-none"
            >
              ×
            </button>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">8</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  เพิ่มความแม่นยำ
                </h4>
                <p className="text-white/90 text-sm">
                  หมุนโทรศัพท์เป็นรูปเลข <strong>8</strong> ช้าๆ 2-3 รอบ เพื่อปรับเทียบเข็มทิศให้แม่นยำ
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <QiblaCompass />
          
          {/* Refresh Button */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleRefresh}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              รีเฟรชหน้าเว็บ
            </button>
          </div>
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
              <span className="text-amber-500 font-bold">8</span>
              <span>หมุนโทรศัพท์เป็นเลข 8 เพื่อปรับเทียบความแม่นยำ</span>
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
