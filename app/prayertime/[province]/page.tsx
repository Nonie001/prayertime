import { notFound } from 'next/navigation';
import Link from 'next/link';
import provinces from '@/data/provinces.json';
import { getPrayerTimes, PRAYER_NAMES } from '@/lib/utils/prayerTimes';
import { MapPin, ArrowLeft, Clock, Sun, Sunset, Moon, CloudSun, SunDim, Sunrise } from 'lucide-react';
import Footer from '@/components/Footer';

export const revalidate = 86400;

interface PageProps {
  params: Promise<{
    province: string;
  }>;
}

export async function generateStaticParams() {
  return provinces.map((province) => ({
    province: province.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { province } = await params;
  const provinceData = provinces.find((p) => p.id === province);
  
  if (!provinceData) {
    return { title: 'จังหวัดไม่พบ' };
  }

  return {
    title: `เวลาละหมาด${provinceData.name} - เวลาละหมาดวันนี้`,
    description: `เวลาละหมาดแม่นยำสำหรับจังหวัด${provinceData.name} พร้อมวันที่ฮิจเราะห์`,
  };
}

export default async function ProvincePageDetail({ params }: PageProps) {
  const { province } = await params;
  const provinceData = provinces.find((p) => p.id === province);

  if (!provinceData) {
    notFound();
  }

  let prayerData;
  try {
    prayerData = await getPrayerTimes(provinceData.lat, provinceData.lng);
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return (
      <div className="min-h-screen bg-slate-50 pt-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            ไม่สามารถโหลดข้อมูลเวลาละหมาดได้
          </h1>
          <p className="text-gray-600">กรุณาลองใหม่อีกครั้ง</p>
        </div>
      </div>
    );
  }

  // Get nearby provinces (same region)
  const nearbyProvinces = provinces
    .filter(p => p.region === provinceData.region && p.id !== provinceData.id)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-800 pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/prayertime" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            เลือกจังหวัด
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <MapPin className="w-6 h-6 text-yellow-400" />
            เวลาละหมาด{provinceData.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="text-slate-300">{prayerData.date}</span>
            <span className="text-yellow-400 font-medium">{prayerData.hijriDate}</span>
          </div>
        </div>
      </div>

      {/* Prayer Times Card */}
      <div className="max-w-3xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {Object.entries(prayerData.times).map(([key, time]) => {
                const icons: Record<string, React.ReactNode> = {
                  fajr: <SunDim className="w-6 h-6 text-yellow-400" />,
                  sunrise: <Sunrise className="w-6 h-6 text-yellow-400" />,
                  dhuhr: <Sun className="w-6 h-6 text-yellow-400" />,
                  asr: <CloudSun className="w-6 h-6 text-yellow-400" />,
                  maghrib: <Sunset className="w-6 h-6 text-yellow-400" />,
                  isha: <Moon className="w-6 h-6 text-yellow-400" />,
                };
                return (
                  <div key={key} className="bg-slate-800 rounded-xl p-3 md:p-4 text-center">
                    <div className="flex justify-center mb-2">
                      {icons[key]}
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-yellow-400">{time}</div>
                    <div className="text-white text-xs md:text-sm mt-1">
                      {PRAYER_NAMES[key as keyof typeof PRAYER_NAMES]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Nearby Provinces */}
        {nearbyProvinces.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">จังหวัดใกล้เคียง</h2>
            <div className="flex flex-wrap gap-2">
              {nearbyProvinces.map((p) => (
                <Link
                  key={p.id}
                  href={`/prayertime/${p.id}`}
                  className="px-3 py-1.5 bg-white rounded-full text-sm text-slate-700 shadow-sm hover:shadow-md hover:bg-yellow-50 border border-gray-100 transition-all"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/prayertime"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white text-sm rounded-full hover:bg-blue-800"
          >
            <Clock className="w-4 h-4" />
            ดูทุกจังหวัด
          </Link>
          <Link
            href="/calculator/zakat"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm rounded-full hover:bg-slate-700"
          >
            คำนวณซะกาต
          </Link>
          <Link
            href="/calculator/inheritance"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm rounded-full hover:bg-slate-700"
          >
            คำนวณมรดก
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}