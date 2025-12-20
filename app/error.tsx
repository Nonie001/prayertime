'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // e.g., Sentry.captureException(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            เกิดข้อผิดพลาด
          </h2>
          
          <p className="text-slate-600 mb-6">
            ขออภัย เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง
          </p>
          
          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold rounded-lg transition-colors"
            >
              ลองอีกครั้ง
            </button>
            
            <Link
              href="/"
              className="block w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
            >
              กลับหน้าแรก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
