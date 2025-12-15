import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Cookie, Database, UserCheck, Mail } from 'lucide-react';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว',
  description: 'นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคลของเว็บไซต์เวลาละหมาดไทย ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-800 pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-400/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            นโยบายความเป็นส่วนตัว
          </h1>
          <p className="text-slate-400 mt-2">Privacy Policy</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-8">
          
          {/* Last Updated */}
          <div className="text-sm text-slate-500 pb-4 border-b border-slate-100">
            อัพเดทล่าสุด: 16 ธันวาคม 2568
          </div>

          {/* Introduction */}
          <section>
            <p className="text-slate-600 leading-relaxed">
              เว็บไซต์ <strong>เวลาละหมาดไทย</strong> (&quot;เรา&quot;) ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้งาน 
              นโยบายนี้อธิบายวิธีการเก็บรวบรวม ใช้ และปกป้องข้อมูลของท่าน 
              ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
            </p>
          </section>

          {/* Section 1: Data Collection */}
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-500" />
              1. ข้อมูลที่เราเก็บรวบรวม
            </h2>
            <div className="text-slate-600 space-y-3">
              <p>เราเก็บรวบรวมข้อมูลดังนี้:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>ข้อมูลตำแหน่ง (Location)</strong> - เมื่อท่านอนุญาต เพื่อแสดงเวลาละหมาดและทิศกิบละห์ที่แม่นยำ</li>
                <li><strong>ข้อมูลการใช้งาน</strong> - หน้าที่เยี่ยมชม, เวลาที่ใช้, อุปกรณ์ที่ใช้</li>
                <li><strong>ข้อมูลทางเทคนิค</strong> - IP Address, ประเภทเบราว์เซอร์, ระบบปฏิบัติการ</li>
              </ul>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-green-800 text-sm">
                  ✅ <strong>สิ่งที่เราไม่เก็บ:</strong> ชื่อ, อีเมล, เบอร์โทร, หรือข้อมูลส่วนบุคคลที่ระบุตัวตนได้โดยตรง
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Cookies */}
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-500" />
              2. การใช้คุกกี้ (Cookies)
            </h2>
            <div className="text-slate-600 space-y-3">
              <p>เราใช้คุกกี้เพื่อ:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>คุกกี้ที่จำเป็น</strong> - เพื่อให้เว็บไซต์ทำงานได้ถูกต้อง</li>
                <li><strong>คุกกี้วิเคราะห์</strong> - เพื่อวิเคราะห์การใช้งานผ่าน Vercel Analytics</li>
                <li><strong>คุกกี้โฆษณา</strong> - Google AdSense อาจใช้คุกกี้เพื่อแสดงโฆษณาที่เกี่ยวข้อง</li>
              </ul>
              <p className="mt-3">
                ท่านสามารถจัดการคุกกี้ได้ในการตั้งค่าเบราว์เซอร์ของท่าน
              </p>
            </div>
          </section>

          {/* Section 3: Data Usage */}
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-500" />
              3. วัตถุประสงค์ในการใช้ข้อมูล
            </h2>
            <div className="text-slate-600 space-y-3">
              <p>เราใช้ข้อมูลเพื่อ:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>แสดงเวลาละหมาดตามตำแหน่งของท่าน</li>
                <li>แสดงทิศกิบละห์และระยะทางไปยังมักกะห์</li>
                <li>ปรับปรุงประสบการณ์การใช้งานเว็บไซต์</li>
                <li>วิเคราะห์สถิติการใช้งานเพื่อพัฒนาบริการ</li>
                <li>แสดงโฆษณาที่เกี่ยวข้อง (ผ่าน Google AdSense)</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Third Party */}
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              4. การแบ่งปันข้อมูลกับบุคคลที่สาม
            </h2>
            <div className="text-slate-600 space-y-3">
              <p>เราอาจแบ่งปันข้อมูลกับ:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Aladhan API</strong> - สำหรับดึงข้อมูลเวลาละหมาด (ส่งเฉพาะพิกัดตำแหน่ง)</li>
                <li><strong>Google AdSense</strong> - สำหรับแสดงโฆษณา</li>
                <li><strong>Vercel Analytics</strong> - สำหรับวิเคราะห์การใช้งาน</li>
              </ul>
              <p className="mt-3">
                บริการเหล่านี้มีนโยบายความเป็นส่วนตัวของตนเอง กรุณาศึกษาเพิ่มเติมที่เว็บไซต์ของผู้ให้บริการแต่ละราย
              </p>
            </div>
          </section>

          {/* Section 5: Your Rights */}
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              5. สิทธิของท่าน
            </h2>
            <div className="text-slate-600 space-y-3">
              <p>ตาม PDPA ท่านมีสิทธิ:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>เข้าถึงข้อมูลส่วนบุคคลของท่าน</li>
                <li>แก้ไขข้อมูลให้ถูกต้อง</li>
                <li>ลบข้อมูล (สิทธิในการถูกลืม)</li>
                <li>คัดค้านการประมวลผลข้อมูล</li>
                <li>ถอนความยินยอม</li>
                <li>ร้องเรียนต่อหน่วยงานที่เกี่ยวข้อง</li>
              </ul>
            </div>
          </section>

          {/* Section 6: Data Security */}
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              6. การรักษาความปลอดภัยของข้อมูล
            </h2>
            <div className="text-slate-600">
              <p>
                เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสม รวมถึงการเข้ารหัส HTTPS 
                เพื่อปกป้องข้อมูลของท่านจากการเข้าถึงโดยไม่ได้รับอนุญาต
              </p>
            </div>
          </section>

          {/* Section 7: Contact */}
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" />
              7. ติดต่อเรา
            </h2>
            <div className="text-slate-600">
              <p>หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อ:</p>
              <div className="mt-3 bg-slate-50 rounded-lg p-4">
                <p className="font-medium text-slate-800">เวลาละหมาดไทย</p>
                <p className="text-slate-600">อีเมล: anas.aouming@gmail.com</p>
              </div>
            </div>
          </section>

          {/* Section 8: Changes */}
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              8. การเปลี่ยนแปลงนโยบาย
            </h2>
            <div className="text-slate-600">
              <p>
                เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราว การเปลี่ยนแปลงจะมีผลเมื่อเผยแพร่บนหน้านี้ 
                กรุณาตรวจสอบเป็นระยะเพื่อรับทราบการอัพเดท
              </p>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
