import Link from 'next/link';
import { Building2, Calculator, Scroll, Clock, Mail, Compass } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-yellow-400" />
              <span className="text-xl font-bold">เวลาละหมาดไทย</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              บริการเวลาละหมาดแม่นยำสำหรับทุกจังหวัดในประเทศไทย 
              พร้อมเครื่องมือคำนวณอิสลามที่ครบครัน
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-400">เวลาละหมาด</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/prayertime/bangkok" className="text-slate-400 hover:text-white transition-colors">
                  กรุงเทพมหานคร
                </Link>
              </li>
              <li>
                <Link href="/prayertime/pattani" className="text-slate-400 hover:text-white transition-colors">
                  ปัตตานี
                </Link>
              </li>
              <li>
                <Link href="/prayertime/yala" className="text-slate-400 hover:text-white transition-colors">
                  ยะลา
                </Link>
              </li>
              <li>
                <Link href="/prayertime/narathiwat" className="text-slate-400 hover:text-white transition-colors">
                  นราธิวาส
                </Link>
              </li>
              <li>
                <Link href="/prayertime" className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
                  ดูทั้งหมด 77 จังหวัด →
                </Link>
              </li>
            </ul>
          </div>

          {/* Main Links - Same as Header */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-400">เมนูหลัก</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/prayertime" className="text-slate-400 hover:text-white transition-colors">
                  เวลาละหมาด
                </Link>
              </li>
              <li>
                <Link href="/qibla" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  ทิศกิบละห์
                </Link>
              </li>
            </ul>
            
            <h4 className="font-medium text-sm mt-4 mb-2 text-slate-300">เครื่องมือ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculator/zakat" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  คำนวณซะกาต
                </Link>
              </li>
              <li>
                <Link href="/calculator/inheritance" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <Scroll className="w-4 h-4" />
                  คำนวณมรดก
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-400">ข้อมูล</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>เวลาละหมาดคำนวณตามวิธี Muslim World League (MWL)</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>ติดต่อ: contact@prayertimeth.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-slate-500">
            <p>© {currentYear} เวลาละหมาดไทย - สงวนลิขสิทธิ์</p>
            <p>
              ข้อมูลเวลาละหมาดจาก{' '}
              <a 
                href="https://aladhan.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Aladhan API
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
