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
    let isMounted = true;
    
    // ตรวจจับตำแหน่งอัตโนมัติเมื่อ component mount
    if (!navigator.geolocation) {
      // ใช้ setTimeout เพื่อหลีกเลี่ยง cascading renders
      setTimeout(() => {
        if (isMounted) {
          setUsingFallback(true);
          setIsLoading(false);
        }
      }, 0);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (!isMounted) return;
        try {
          const { latitude, longitude } = position.coords;
          const nearestProvince = findNearestProvince(latitude, longitude);
          
          if (nearestProvince) {
            const times = await fetchPrayerTimes(nearestProvince.lat, nearestProvince.lng);
            if (isMounted) {
              setPrayerData({
                ...times,
                province: nearestProvince
              });
            }
          } else {
            if (isMounted) setUsingFallback(true);
          }
        } catch {
          if (isMounted) setUsingFallback(true);
        }
        if (isMounted) setIsLoading(false);
      },
      () => {
        // ถ้าไม่อนุญาตหรือ error ใช้ fallback (กรุงเทพ)
        if (isMounted) {
          setUsingFallback(true);
          setIsLoading(false);
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 600000 // cache 10 นาที
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  // กรณีกำลังโหลด
  if (isLoading) {
    return (
      <section className="relative z-20 -mt-16 sm:-mt-20 px-3 sm:px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden p-6 sm:p-8">
            <div className="flex items-center justify-center gap-3 text-white">
              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-yellow-400" />
              <span className="text-sm sm:text-base">กำลังค้นหาตำแหน่ง...</span>
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
    fajr: <SunDim className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />,
    dhuhr: <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />,
    asr: <CloudSun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />,
    maghrib: <Sunset className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />,
    isha: <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />,
  };

  return (
    <section className="relative z-20 -mt-16 sm:-mt-20 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-3 py-2.5 sm:px-5 sm:py-4 border-b border-slate-700 flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <Link 
                href={`/prayertime/${displayData.province.id}`}
                className="text-sm sm:text-lg font-bold text-white flex items-center gap-1.5 sm:gap-2 hover:text-yellow-400 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                <span className="truncate">{displayData.province.name}</span>
                {!usingFallback && <span className="hidden sm:inline text-xs text-green-400 font-normal">(ตำแหน่งของคุณ)</span>}
              </Link>
              <p className="text-slate-400 text-[10px] sm:text-xs mt-0.5">{displayData.date}</p>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-yellow-400 font-medium text-[10px] sm:text-sm">{displayData.hijriDate}</p>
              {!usingFallback && <span className="sm:hidden text-[9px] text-green-400">📍 ตำแหน่งของคุณ</span>}
            </div>
          </div>
          
          {/* Prayer Times Grid */}
          <div className="p-2.5 sm:p-4">
            <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
              {Object.entries(displayData.times)
                .filter(([key]) => key !== 'sunrise')
                .map(([key, time]) => (
                  <div key={key} className="bg-slate-700/50 rounded-lg p-1.5 sm:p-3 text-center">
                    <div className="flex justify-center mb-0.5 sm:mb-1">
                      {icons[key]}
                    </div>
                    <div className="text-sm sm:text-xl font-bold text-yellow-400 leading-tight">{time}</div>
                    <div className="text-white text-[8px] sm:text-xs mt-0.5 leading-tight">
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
