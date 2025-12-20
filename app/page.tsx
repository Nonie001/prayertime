import Link from 'next/link';
import Image from 'next/image';
import provinces from '@/data/provinces.json';
import { getPrayerTimes } from '@/lib/utils/prayerTimes';
import { Calculator, Scroll, MapPin, ArrowRight, Compass } from 'lucide-react';
import LocationPrayerCard from '@/components/LocationDetector';
import Footer from '@/components/Footer';

export const revalidate = 86400;

// JSON-LD Schema for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'เวลาละหมาดไทย',
  description: 'เวลาละหมาดแม่นยำสำหรับทุกจังหวัดในประเทศไทย',
  url: 'https://prayertime.in.th',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://prayertime.in.th/prayertime/{province}',
    'query-input': 'required name=province',
  },
};

// จังหวัดที่มีประชากรมุสลิมมากและจังหวัดสำคัญ
const POPULAR_PROVINCE_IDS = [
  'pattani', 'yala', 'narathiwat', 'satun', 'songkhla',
  'krabi', 'trang', 'phang-nga', 'phuket', 'nakhon-si-thammarat',
  'surat-thani', 'chumphon', 'ranong', 'phatthalung', 'bangkok',
  'nonthaburi', 'pathum-thani', 'samut-prakan', 'phra-nakhon-si-ayutthaya', 'chon-buri',
  'chiang-mai', 'chiang-rai', 'khon-kaen', 'udon-thani', 'nakhon-ratchasima',
  'ubon-ratchathani', 'rayong', 'samut-sakhon', 'nakhon-pathom', 'ratchaburi'
];

export default async function Home() {
  const popularProvinces = POPULAR_PROVINCE_IDS
    .map(id => provinces.find(p => p.id === id))
    .filter(Boolean);
  const bangkokProvince = provinces.find(p => p.id === 'bangkok');
  let bangkokPrayerData = null;
  
  if (bangkokProvince) {
    try {
      bangkokPrayerData = await getPrayerTimes(bangkokProvince.lat, bangkokProvince.lng);
    } catch (error) {
      // Fallback data will be used from getPrayerTimes
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image 
            src="/hero-optimized.webp" 
            alt="มัสยิด" 
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-bottom" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 pt-16 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            เวลาละหมาด<span className="text-yellow-400">ไทย</span>
          </h1>
          
          <p className="text-base md:text-lg text-white/80 mb-6 max-w-md mx-auto">
            ดูเวลาละหมาดแม่นยำทุกจังหวัด พร้อมเครื่องมือคำนวณอิสลาม
          </p>
          
          <Link 
            href="/prayertime" 
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-semibold shadow-lg"
          >
            <MapPin className="w-5 h-5" />
            ดูเวลาละหมาดทุกจังหวัด
          </Link>
        </div>
      </section>

      {/* Prayer Times Card - ตรวจจับตำแหน่งอัตโนมัติ */}
      <LocationPrayerCard fallbackData={bangkokPrayerData} />

      {/* Qibla Quick Access - ติดกับการ์ดเวลาละหมาด */}
      <div className="relative z-20 px-3 sm:px-4 mt-3">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/qibla"
            className="flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-700 rounded-lg py-2.5 px-4 transition-all border border-slate-700"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span className="text-white text-sm font-medium">หาทิศกิบละห์</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        
        {/* Featured Provinces */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 text-center mb-4 md:mb-6">
            จังหวัดยอดนิยม
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {popularProvinces.map((province) => province && (
              <Link
                key={province.id}
                href={`/prayertime/${province.id}`}
                className="px-3 py-1.5 bg-white rounded-full text-sm text-slate-700 shadow-sm hover:shadow-md hover:bg-yellow-50 border border-gray-100 transition-all"
              >
                {province.name}
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link
              href="/prayertime"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-900 text-white text-sm rounded-full hover:bg-blue-800 font-medium"
            >
              ดูทุกจังหวัด <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Islamic Tools */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-6 md:mb-8">
            เครื่องมือคำนวณ
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link
              href="/calculator/zakat"
              className="group bg-slate-800 rounded-xl p-5 md:p-6 hover:bg-slate-700 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">คำนวณซะกาต</h3>
              <p className="text-slate-400 text-sm mb-3">คำนวณซะกาตเงิน ทอง และทรัพย์สิน</p>
              <span className="text-yellow-400 text-sm flex items-center gap-1">
                เริ่มคำนวณ <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            
            <Link
              href="/calculator/inheritance"
              className="group bg-slate-800 rounded-xl p-5 md:p-6 hover:bg-slate-700 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center mb-4">
                <Scroll className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">คำนวณมรดก</h3>
              <p className="text-slate-400 text-sm mb-3">แบ่งมรดกตามหลักฟะรออิฎ</p>
              <span className="text-yellow-400 text-sm flex items-center gap-1">
                เริ่มคำนวณ <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
}
