import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Building2, Target, Heart, Mail, Github, Globe } from 'lucide-react';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา',
  description: 'เกี่ยวกับเว็บไซต์เวลาละหมาดไทย - บริการเวลาละหมาดแม่นยำสำหรับมุสลิมทุกจังหวัดในประเทศไทย',
};

export default function AboutPage() {
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
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-yellow-400" />
            </div>
            เกี่ยวกับเรา
          </h1>
          <p className="text-slate-400 mt-2">About Us & Contact</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        
        {/* About Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-500" />
            เกี่ยวกับเว็บไซต์
          </h2>
          <div className="text-slate-600 space-y-4 leading-relaxed">
            <p>
              <strong className="text-slate-800">เวลาละหมาดไทย</strong> คือเว็บไซต์ที่พัฒนาขึ้นเพื่อให้บริการข้อมูลเวลาละหมาดที่แม่นยำ
              สำหรับพี่น้องมุสลิมทุกจังหวัดในประเทศไทย
            </p>
            <p>
              เราเชื่อว่าการเข้าถึงเวลาละหมาดที่ถูกต้องเป็นสิ่งสำคัญสำหรับมุสลิมทุกคน 
              ไม่ว่าจะอยู่ที่ไหนในประเทศไทย ก็สามารถละหมาดได้ตรงเวลา
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            สิ่งที่เรามอบให้
          </h2>
          <div className="grid gap-4">
            <div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 font-bold">77</span>
              </div>
              <div>
                <h3 className="font-medium text-slate-800">เวลาละหมาดทุกจังหวัด</h3>
                <p className="text-sm text-slate-600">ครอบคลุมทั้ง 77 จังหวัดทั่วประเทศไทย อัพเดททุกวัน</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-lg">🧭</span>
              </div>
              <div>
                <h3 className="font-medium text-slate-800">ทิศกิบละห์</h3>
                <p className="text-sm text-slate-600">หาทิศทางกะอ์บะห์ด้วยเข็มทิศบนมือถือ</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600 text-lg">💰</span>
              </div>
              <div>
                <h3 className="font-medium text-slate-800">คำนวณซะกาต</h3>
                <p className="text-sm text-slate-600">คำนวณซะกาตทรัพย์สินตามหลักศาสนา</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 text-lg">📜</span>
              </div>
              <div>
                <h3 className="font-medium text-slate-800">คำนวณมรดก (ฟะรออิฎ)</h3>
                <p className="text-sm text-slate-600">แบ่งมรดกตามหลักกฎหมายอิสลาม</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Source */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            แหล่งข้อมูล
          </h2>
          <div className="text-slate-600 space-y-3">
            <p>เวลาละหมาดคำนวณโดยใช้:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>วิธีคำนวณ:</strong> Muslim World League (MWL)</li>
              <li><strong>มัซฮับ:</strong> ชาฟิอี (อัศร์เมื่อเงาเท่าตัว)</li>
              <li><strong>API:</strong> Aladhan.com</li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-sm p-6 md:p-8 text-white">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-yellow-400" />
            ติดต่อเรา
          </h2>
          <div className="space-y-4">
            <p className="text-slate-300">
              หากมีคำถาม ข้อเสนอแนะ หรือพบข้อผิดพลาด สามารถติดต่อได้ที่:
            </p>
            
            <div className="space-y-3">
              <a 
                href="mailto:anas.aouming@gmail.com"
                className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">อีเมล</p>
                  <p className="font-medium">anas.aouming@gmail.com</p>
                </div>
              </a>
              
              <a 
                href="https://github.com/Nonie001/prayertime"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">GitHub</p>
                  <p className="font-medium">Nonie001/prayertime</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Developer Note */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <p className="text-emerald-800 text-center">
            🤲 พัฒนาด้วยความตั้งใจเพื่อเป็นสะดะเกาะฮ์ญาริยะห์ <br/>
            <span className="text-sm text-emerald-600">ขอให้อัลลอฮ์ทรงตอบรับ อามีน</span>
          </p>
        </div>

      </div>

      <Footer />
    </div>
  );
}
