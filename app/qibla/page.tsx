'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ChevronRight, Home, Compass } from 'lucide-react';
import Footer from '@/components/Footer';

// Dynamic import เพื่อปิด SSR สำหรับ component ที่ใช้ browser APIs
const QiblaCompass = dynamic(() => import('@/components/QiblaCompass'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-300">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg">กำลังโหลด compass...</p>
    </div>
  ),
});

export default function QiblaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600 transition-colors flex items-center">
            <Home className="w-4 h-4 mr-1" />
            หน้าแรก
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-emerald-600 flex items-center">
            <Compass className="w-4 h-4 mr-1" />
            ทิศกิบละห์
          </span>
        </nav>

        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg mb-4">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            ทิศกิบละห์
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            หาทิศทางสู่กะอ์บะห์ ณ มัสยิดอัลฮะรอม เมืองมักกะห์ 
            <br className="hidden sm:block" />
            สำหรับการละหมาดและการอิบาดะฮ์
          </p>
        </header>

        {/* Compass Component */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200">
          <QiblaCompass />
        </div>

        {/* Info Section */}
        <section className="mt-10 space-y-6">
          {/* What is Qibla */}
          <article className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                🕋
              </span>
              กิบละห์คืออะไร?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              <strong className="text-emerald-600">กิบละห์ (Qibla)</strong> หรือ <strong className="text-emerald-600">กิบลัต</strong> 
              คือทิศทางที่มุสลิมทั่วโลกหันหน้าไปเมื่อทำการละหมาด 
              โดยหันไปยังกะอ์บะห์ (Ka&apos;bah) ซึ่งตั้งอยู่ในมัสยิดอัลฮะรอม เมืองมักกะห์ ประเทศซาอุดีอาระเบีย
            </p>
          </article>

          {/* How it works */}
          <article className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                📐
              </span>
              วิธีการคำนวณ
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              ระบบคำนวณทิศกิบละห์โดยใช้สูตร <strong className="text-emerald-600">Great Circle Bearing</strong> 
              ซึ่งเป็นเส้นทางที่สั้นที่สุดบนพื้นผิวโลกระหว่างตำแหน่งของคุณกับกะอ์บะห์
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-sm border border-gray-200">
              <div className="text-gray-500 mb-2">พิกัดกะอ์บะห์:</div>
              <div className="text-gray-700 font-mono">
                Latitude: 21.4225° N<br />
                Longitude: 39.8262° E
              </div>
            </div>
          </article>

          {/* Tips */}
          <article className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                💡
              </span>
              เคล็ดลับการใช้งาน
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span>ถือโทรศัพท์ในแนวราบ ขนานกับพื้น เพื่อให้ compass ทำงานได้ดีที่สุด</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span>หลีกเลี่ยงการใช้งานใกล้กับวัตถุที่มีสนามแม่เหล็ก เช่น ลำโพง หรือเครื่องใช้ไฟฟ้า</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span>หากเข็มทิศไม่แม่นยำ ลองขยับโทรศัพท์เป็นรูปเลข 8 เพื่อ calibrate</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span>สำหรับประเทศไทย ทิศกิบละห์อยู่ทางทิศ<strong className="text-emerald-600">ตะวันตก</strong>เอียงไปทางเหนือเล็กน้อย (ประมาณ 290°)</span>
              </li>
            </ul>
          </article>
        </section>

        {/* Related Links */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">เครื่องมืออื่นๆ</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link 
              href="/prayertime"
              className="bg-white hover:bg-gray-50 rounded-xl p-4 transition-colors flex items-center shadow-md border border-gray-100"
            >
              <span className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                🕌
              </span>
              <div>
                <div className="text-gray-800 font-medium">เวลาละหมาด</div>
                <div className="text-gray-500 text-sm">ตารางเวลาละหมาดทั้ง 77 จังหวัด</div>
              </div>
            </Link>
            <Link 
              href="/calculator/zakat"
              className="bg-white hover:bg-gray-50 rounded-xl p-4 transition-colors flex items-center shadow-md border border-gray-100"
            >
              <span className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                💰
              </span>
              <div>
                <div className="text-gray-800 font-medium">คำนวณซะกาต</div>
                <div className="text-gray-500 text-sm">คำนวณซะกาตประจำปี</div>
              </div>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
