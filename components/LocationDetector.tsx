'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Loader2, Sun, Sunset, Moon, CloudSun, SunDim } from 'lucide-react';
import provinces from '@/data/provinces.json';

interface Province {
  id: string;
  name: string;
  lat: number;
  lng: number;
  region: string;
}

interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

interface PrayerData {
  date: string;
  hijriDate: string;
  times: PrayerTimes;
  province: Province;
}

const PRAYER_NAMES = {
  fajr: 'ฟัจร์',
  sunrise: 'พระอาทิตย์ขึ้น',
  dhuhr: 'ซุฮร์',
  asr: 'อัศร์',
  maghrib: 'มัครีบ',
  isha: 'อีชาอ์'
} as const;

// คำนวณระยะทางระหว่าง 2 จุด (Haversine formula)
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// หาจังหวัดที่ใกล้ที่สุด
function findNearestProvince(lat: number, lng: number): Province | null {
  let nearest: Province | null = null;
  let minDistance = Infinity;

  for (const province of provinces as Province[]) {
    const distance = getDistance(lat, lng, province.lat, province.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = province;
    }
  }

  return nearest;
}

// ดึงเวลาละหมาดจาก API
async function fetchPrayerTimes(lat: number, lng: number): Promise<{ date: string; hijriDate: string; times: PrayerTimes }> {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lng}&method=3&school=1&timezonestring=Asia/Bangkok`
  );

  if (!response.ok) throw new Error('API error');

  const data = await response.json();
  
  return {
    date: data.data.date.readable,
    hijriDate: `${data.data.date.hijri.day} ${data.data.date.hijri.month.ar} ${data.data.date.hijri.year}`,
    times: {
      fajr: data.data.timings.Fajr,
      sunrise: data.data.timings.Sunrise,
      dhuhr: data.data.timings.Dhuhr,
      asr: data.data.timings.Asr,
      maghrib: data.data.timings.Maghrib,
      isha: data.data.timings.Isha,
    }
  };
}

interface Props {
  fallbackData: {
    date: string;
    hijriDate: string;
    times: PrayerTimes;
  } | null;
}

export default function LocationPrayerCard({ fallbackData }: Props) {
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    // ตรวจจับตำแหน่งอัตโนมัติเมื่อ component mount
    if (!navigator.geolocation) {
      setUsingFallback(true);
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const nearestProvince = findNearestProvince(latitude, longitude);
          
          if (nearestProvince) {
            const times = await fetchPrayerTimes(nearestProvince.lat, nearestProvince.lng);
            setPrayerData({
              ...times,
              province: nearestProvince
            });
          } else {
            setUsingFallback(true);
          }
        } catch {
          setUsingFallback(true);
        }
        setIsLoading(false);
      },
      () => {
        // ถ้าไม่อนุญาตหรือ error ใช้ fallback (กรุงเทพ)
        setUsingFallback(true);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 600000 // cache 10 นาที
      }
    );
  }, []);

  // กรณีกำลังโหลด
  if (isLoading) {
    return (
      <section className="relative z-20 -mt-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden p-8">
            <div className="flex items-center justify-center gap-3 text-white">
              <Loader2 className="w-6 h-6 animate-spin text-yellow-400" />
              <span>กำลังค้นหาตำแหน่งของคุณ...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ใช้ข้อมูลที่ตรวจจับได้ หรือ fallback
  const displayData = prayerData || (fallbackData ? { 
    ...fallbackData, 
    province: { id: 'bangkok', name: 'กรุงเทพมหานคร', lat: 13.7563, lng: 100.5018, region: 'central' } 
  } : null);

  if (!displayData) return null;

  const icons: Record<string, React.ReactNode> = {
    fajr: <SunDim className="w-5 h-5 text-yellow-400" />,
    dhuhr: <Sun className="w-5 h-5 text-yellow-400" />,
    asr: <CloudSun className="w-5 h-5 text-yellow-400" />,
    maghrib: <Sunset className="w-5 h-5 text-yellow-400" />,
    isha: <Moon className="w-5 h-5 text-yellow-400" />,
  };

  return (
    <section className="relative z-20 -mt-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div className="px-4 py-3 md:px-5 md:py-4 border-b border-slate-700 flex items-center justify-between">
            <div>
              <Link 
                href={`/prayertime/${displayData.province.id}`}
                className="text-base md:text-lg font-bold text-white flex items-center gap-2 hover:text-yellow-400 transition-colors"
              >
                <MapPin className="w-4 h-4 text-yellow-400" />
                {displayData.province.name}
                {!usingFallback && <span className="text-xs text-green-400 font-normal">(ตำแหน่งของคุณ)</span>}
              </Link>
              <p className="text-slate-400 text-xs">{displayData.date}</p>
            </div>
            <p className="text-yellow-400 font-medium text-xs md:text-sm">{displayData.hijriDate}</p>
          </div>
          
          <div className="p-3 md:p-4">
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(displayData.times)
                .filter(([key]) => key !== 'sunrise')
                .map(([key, time]) => (
                  <div key={key} className="bg-slate-700/50 rounded-lg p-2 md:p-3 text-center">
                    <div className="flex justify-center mb-1">
                      {icons[key]}
                    </div>
                    <div className="text-lg md:text-xl font-bold text-yellow-400">{time}</div>
                    <div className="text-white text-[10px] md:text-xs mt-0.5">
                      {PRAYER_NAMES[key as keyof typeof PRAYER_NAMES]}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
