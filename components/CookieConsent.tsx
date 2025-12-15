'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Shield } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // เช็คว่าเคยยอมรับหรือยัง
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // รอสักครู่ก่อนแสดง เพื่อไม่ให้รบกวนทันที
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
          <div className="p-4 md:p-5">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Icon & Text */}
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    เว็บไซต์นี้ใช้คุกกี้
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งาน วิเคราะห์การเข้าชม และแสดงโฆษณาที่เกี่ยวข้อง 
                    อ่านเพิ่มเติมที่{' '}
                    <Link 
                      href="/privacy-policy" 
                      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                    >
                      นโยบายความเป็นส่วนตัว
                    </Link>
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 md:flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  ปฏิเสธ
                </button>
                <button
                  onClick={handleAccept}
                  className="px-5 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                >
                  ยอมรับทั้งหมด
                </button>
              </div>

              {/* Close button (mobile) */}
              <button
                onClick={handleDecline}
                className="absolute top-3 right-3 md:hidden text-slate-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
