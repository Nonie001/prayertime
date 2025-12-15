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

export async function getPrayerTimes(lat: number, lng: number): Promise<PrayerData> {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lng}&method=2`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch prayer times');
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
    console.error('Error fetching prayer times:', error);
    throw error;
  }
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