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
        {/* Calibration Tip Card */}
        {showTip && (
          <div className="mb-4 bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 flex items-center justify-between">
              <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                <Info className="w-4 h-4" />
                เคล็ดลับเพิ่มความแม่นยำ
              </h4>
              <button 
                onClick={() => setShowTip(false)}
                className="text-white/70 hover:text-white text-lg leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-emerald-200">
                  <span className="text-3xl text-emerald-600">∞</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 text-sm leading-relaxed">
                    หมุนโทรศัพท์เป็นรูป <strong className="text-emerald-600">∞ (อินฟินิตี้)</strong> ช้าๆ 2-3 รอบ เพื่อปรับเทียบเซ็นเซอร์เข็มทิศ
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    หากยังไม่แม่นยำ ให้กดปุ่ม &ldquo;รีเฟรช&rdquo; ด้านล่าง
                  </p>
                </div>
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
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 rounded-xl text-white font-medium transition-all shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              รีเฟรชเพื่อปรับเทียบใหม่
            </button>
            <p className="text-center text-xs text-slate-400 mt-2">
              กดเมื่อทิศทางไม่แม่นยำหรือเข็มทิศไม่ตอบสนอง
            </p>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-5">
          <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs">?</span>
            วิธีใช้งาน
          </h4>
          <ul className="text-sm text-slate-600 space-y-2.5">
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs flex-shrink-0 mt-0.5">1</span>
              <span>ถือโทรศัพท์ในแนวราบ ขนานกับพื้น</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs flex-shrink-0 mt-0.5">2</span>
              <span>หมุนตัวให้เข็มสีเขียวชี้ตรงหน้า</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs flex-shrink-0 mt-0.5">3</span>
              <span>หลีกเลี่ยงบริเวณที่มีสนามแม่เหล็กรบกวน</span>
            </li>
            <li className="flex items-start gap-3 bg-emerald-50 -mx-2 px-2 py-2 rounded-lg">
              <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">∞</span>
              <span className="text-emerald-700">หมุนโทรศัพท์เป็นรูป ∞ เพื่อปรับเทียบความแม่นยำ</span>
            </li>
          </ul>
          
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              สำหรับประเทศไทย ทิศกิบละห์อยู่ทางตะวันตกเฉียงเหนือ (~290°)
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
