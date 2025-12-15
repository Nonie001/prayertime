import Link from 'next/link';
import provinces from '@/data/provinces.json';
import { getPrayerTimes, PRAYER_NAMES } from '@/lib/utils/prayerTimes';
import { Calculator, Scroll, Clock, MapPin, ArrowRight, Star, Sun, Sunset, Moon, CloudSun, SunDim } from 'lucide-react';

export const revalidate = 86400;

// JSON-LD Schema for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'เวลาละหมาดไทย',
  description: 'เวลาละหมาดแม่นยำสำหรับทุกจังหวัดในประเทศไทย',
  url: 'https://prayertime.example.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://prayertime.example.com/prayertime/{province}',
    'query-input': 'required name=province',
  },
};

// จังหวัดที่มีประชากรมุสลิมมาก (20 จังหวัด)
const POPULAR_PROVINCE_IDS = [
  'pattani', 'yala', 'narathiwat', 'satun', 'songkhla',
  'krabi', 'trang', 'phang-nga', 'phuket', 'nakhon-si-thammarat',
  'surat-thani', 'chumphon', 'ranong', 'phatthalung', 'bangkok',
  'nonthaburi', 'pathum-thani', 'samut-prakan', 'phra-nakhon-si-ayutthaya', 'chon-buri'
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
      console.error('Error fetching Bangkok prayer times:', error);
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
          <img src="/hero.png" alt="มัสยิด" className="w-full h-full object-cover object-bottom" />
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

      {/* Prayer Times Card */}
      {bangkokPrayerData && (
        <section className="relative z-20 -mt-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
              <div className="px-4 py-3 md:px-5 md:py-4 border-b border-slate-700 flex items-center justify-between">
                <div>
                  <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-yellow-400" />
                    กรุงเทพมหานคร
                  </h2>
                  <p className="text-slate-400 text-xs">{bangkokPrayerData.date}</p>
                </div>
                <p className="text-yellow-400 font-medium text-xs md:text-sm">{bangkokPrayerData.hijriDate}</p>
              </div>
              
              <div className="p-3 md:p-4">
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(bangkokPrayerData.times)
                    .filter(([key]) => key !== 'sunrise')
                    .map(([key, time]) => {
                      const icons: Record<string, React.ReactNode> = {
                        fajr: <SunDim className="w-5 h-5 text-yellow-400" />,
                        dhuhr: <Sun className="w-5 h-5 text-yellow-400" />,
                        asr: <CloudSun className="w-5 h-5 text-yellow-400" />,
                        maghrib: <Sunset className="w-5 h-5 text-yellow-400" />,
                        isha: <Moon className="w-5 h-5 text-yellow-400" />,
                      };
                      return (
                        <div key={key} className="bg-slate-700/50 rounded-lg p-2 md:p-3 text-center">
                          <div className="flex justify-center mb-1">
                            {icons[key]}
                          </div>
                          <div className="text-lg md:text-xl font-bold text-yellow-400">{time}</div>
                          <div className="text-white text-[10px] md:text-xs mt-0.5">
                            {PRAYER_NAMES[key as keyof typeof PRAYER_NAMES]}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">เวลาละหมาดไทย</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} สงวนลิขสิทธิ์
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}
