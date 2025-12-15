import { notFound } from 'next/navigation';
import Link from 'next/link';
import provinces from '@/data/provinces.json';
import { getPrayerTimes, PRAYER_NAMES } from '@/lib/utils/prayerTimes';
import { MapPin, Clock, Sun, Sunset, Moon, CloudSun, SunDim, Sunrise } from 'lucide-react';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const revalidate = 86400;

interface PageProps {
  params: Promise<{
    province: string;
  }>;
}

// ชื่อภาคภาษาไทย
const REGION_NAMES: Record<string, string> = {
  central: 'ภาคกลาง',
  northern: 'ภาคเหนือ',
  northeastern: 'ภาคตะวันออกเฉียงเหนือ',
  eastern: 'ภาคตะวันออก',
  western: 'ภาคตะวันตก',
  southern: 'ภาคใต้',
};

export async function generateStaticParams() {
  return provinces.map((province) => ({
    province: province.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { province } = await params;
  const provinceData = provinces.find((p) => p.id === province);
  
  if (!provinceData) {
    return { title: 'จังหวัดไม่พบ' };
  }

  const regionName = REGION_NAMES[provinceData.region] || '';
  const currentYear = new Date().getFullYear() + 543; // ปี พ.ศ.

  return {
    title: `เวลาละหมาด${provinceData.name} วันนี้ ${currentYear} | ฟัจร์ ซุฮร์ อัศร์ มัฆริบ อีชา`,
    description: `เวลาละหมาด${provinceData.name} (${regionName}) อัปเดตทุกวัน ✓ เวลาฟัจร์ ซุฮร์ อัศร์ มัฆริบ อีชา แม่นยำ พร้อมวันที่ฮิจเราะห์ คำนวณตาม Muslim World League`,
    keywords: [
      `เวลาละหมาด${provinceData.name}`,
      `เวลาละหมาดวันนี้${provinceData.name}`,
      `ละหมาด${provinceData.name}`,
      `เวลาฟัจร์${provinceData.name}`,
      `เวลามัฆริบ${provinceData.name}`,
      `prayer times ${provinceData.name}`,
      `เวลาละหมาด${regionName}`,
      'เวลาละหมาดไทย',
      'waktu solat thailand',
    ],
    openGraph: {
      title: `เวลาละหมาด${provinceData.name} วันนี้ - เวลาละหมาดไทย`,
      description: `ดูเวลาละหมาด${provinceData.name}วันนี้ ฟัจร์ ซุฮร์ อัศร์ มัฆริบ อีชา อัปเดตทุกวัน`,
      type: 'website',
      locale: 'th_TH',
    },
    alternates: {
      canonical: `/prayertime/${provinceData.id}`,
    },
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

  // Get all provinces for other regions
  const otherRegionProvinces = provinces
    .filter(p => p.region !== provinceData.region)
    .slice(0, 10);

  const regionName = REGION_NAMES[provinceData.region] || '';

  // JSON-LD Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `เวลาละหมาด${provinceData.name}`,
    description: `เวลาละหมาดแม่นยำสำหรับจังหวัด${provinceData.name} อัปเดตทุกวัน`,
    mainEntity: {
      '@type': 'Place',
      name: provinceData.name,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: provinceData.lat,
        longitude: provinceData.lng,
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'หน้าแรก',
          item: 'https://prayertime.example.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'เวลาละหมาด',
          item: 'https://prayertime.example.com/prayertime',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: provinceData.name,
          item: `https://prayertime.example.com/prayertime/${provinceData.id}`,
        },
      ],
    },
  };

  // Prayer Times Table Schema
  const prayerTimesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    about: `เวลาละหมาด${provinceData.name}`,
    mainEntity: Object.entries(prayerData.times).map(([key, time]) => ({
      '@type': 'Event',
      name: PRAYER_NAMES[key as keyof typeof PRAYER_NAMES],
      startDate: `${new Date().toISOString().split('T')[0]}T${time}:00+07:00`,
      location: {
        '@type': 'Place',
        name: provinceData.name,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(prayerTimesSchema) }}
      />
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-800 pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white">หน้าแรก</Link>
              </li>
              <li className="text-slate-500">/</li>
              <li>
                <Link href="/prayertime" className="text-slate-400 hover:text-white">เวลาละหมาด</Link>
              </li>
              <li className="text-slate-500">/</li>
              <li className="text-yellow-400">{provinceData.name}</li>
            </ol>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <MapPin className="w-6 h-6 text-yellow-400" aria-hidden="true" />
            เวลาละหมาด{provinceData.name}
          </h1>
          <p className="text-slate-300 mt-2">
            {regionName} | อัปเดต: {prayerData.date}
          </p>
          <p className="text-yellow-400 font-medium mt-1">{prayerData.hijriDate}</p>
        </div>
      </header>

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
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              เวลาละหมาดจังหวัดใกล้เคียง ({regionName})
            </h2>
            <div className="flex flex-wrap gap-2">
              {nearbyProvinces.map((p) => (
                <Link
                  key={p.id}
                  href={`/prayertime/${p.id}`}
                  className="px-3 py-1.5 bg-white rounded-full text-sm text-slate-700 shadow-sm hover:shadow-md hover:bg-yellow-50 border border-gray-100 transition-all"
                >
                  เวลาละหมาด{p.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other Provinces for Internal Links */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">
            เวลาละหมาดจังหวัดอื่นๆ
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherRegionProvinces.map((p) => (
              <Link
                key={p.id}
                href={`/prayertime/${p.id}`}
                className="px-3 py-1.5 bg-white rounded-full text-sm text-slate-700 shadow-sm hover:shadow-md hover:bg-yellow-50 border border-gray-100 transition-all"
              >
                {p.name}
              </Link>
            ))}
            <Link
              href="/prayertime"
              className="px-3 py-1.5 bg-yellow-400 rounded-full text-sm text-slate-900 font-medium shadow-sm hover:bg-yellow-300 transition-all"
            >
              ดูทั้งหมด 77 จังหวัด →
            </Link>
          </div>
        </section>

        {/* SEO Content Section */}
        <article className="mt-10 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            เวลาละหมาด{provinceData.name}วันนี้
          </h2>
          <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-3">
            <p>
              เวลาละหมาด{provinceData.name} ({regionName}) อัปเดตล่าสุดวันที่ {prayerData.date} 
              ตรงกับวันที่ {prayerData.hijriDate} ตามปฏิทินฮิจเราะห์ 
              เวลาละหมาดคำนวณตามวิธี Muslim World League (MWL) และมาซฮับชาฟิอี
            </p>
            <p>
              จังหวัด{provinceData.name}ตั้งอยู่ที่พิกัด ละติจูด {provinceData.lat.toFixed(4)}° 
              ลองจิจูด {provinceData.lng.toFixed(4)}° เวลาละหมาดจะแตกต่างกันตามตำแหน่งทางภูมิศาสตร์
            </p>
            <h3 className="text-base font-semibold text-slate-800 mt-4">เวลาละหมาด 5 เวลา</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>ฟัจร์ (Fajr)</strong> - {prayerData.times.fajr} น. ละหมาดก่อนพระอาทิตย์ขึ้น</li>
              <li><strong>ซุฮร์ (Dhuhr)</strong> - {prayerData.times.dhuhr} น. ละหมาดช่วงกลางวัน</li>
              <li><strong>อัศร์ (Asr)</strong> - {prayerData.times.asr} น. ละหมาดช่วงบ่าย</li>
              <li><strong>มัฆริบ (Maghrib)</strong> - {prayerData.times.maghrib} น. ละหมาดหลังพระอาทิตย์ตก</li>
              <li><strong>อีชา (Isha)</strong> - {prayerData.times.isha} น. ละหมาดช่วงกลางคืน</li>
            </ul>
          </div>
        </article>

        {/* Quick Links */}
        <div className="mt-8 mb-10 flex flex-wrap gap-3">
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
    </>
  );
}