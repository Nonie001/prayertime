interface PrayerTime {
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
  times: PrayerTime;
}

// Fallback prayer times (approximate for Bangkok)
const FALLBACK_TIMES: PrayerTime = {
  fajr: '05:15',
  sunrise: '06:30',
  dhuhr: '12:15',
  asr: '15:30',
  maghrib: '18:15',
  isha: '19:30',
};

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getPrayerTimes(lat: number, lng: number, retries = 3): Promise<PrayerData> {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Add delay between retries to avoid rate limiting
      if (attempt > 0) {
        await delay(1000 * attempt);
      }

      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lng}&method=2`,
        { 
          next: { revalidate: 86400 },
          signal: AbortSignal.timeout(10000) // 10 second timeout
        }
      );
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      
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
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      
      // On last retry, return fallback data
      if (attempt === retries - 1) {
        console.log('Using fallback prayer times');
        const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
        return {
          date: `${day} ${thaiMonths[month - 1]} ${year + 543}`,
          hijriDate: 'กำลังโหลด...',
          times: FALLBACK_TIMES
        };
      }
    }
  }
  
  // This should never be reached, but TypeScript requires it
  throw new Error('Failed to fetch prayer times');
}

export const PRAYER_NAMES = {
  fajr: 'ฟัจร์',
  sunrise: 'พระอาทิตย์ขึ้น',
  dhuhr: 'ซุฮร์',
  asr: 'อัศร์',
  maghrib: 'มัครีบ',
  isha: 'อีชาอ์'
} as const;

export type { PrayerTime, PrayerData };