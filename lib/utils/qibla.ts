/**
 * Qibla Direction Calculator
 * คำนวณทิศกิบละห์จากตำแหน่งปัจจุบันไปยังมักกะห์
 */

// พิกัดกะอ์บะห์ (มักกะห์)
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

/**
 * แปลงองศาเป็น Radian
 */
export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * แปลง Radian เป็นองศา
 */
export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * คำนวณทิศกิบละห์ (Qibla Direction)
 * ใช้สูตร Great Circle bearing
 * 
 * @param lat - Latitude ของผู้ใช้
 * @param lng - Longitude ของผู้ใช้
 * @returns ทิศกิบละห์เป็นองศา (0-360, โดย 0 = ทิศเหนือ)
 */
export function calculateQiblaDirection(lat: number, lng: number): number {
  const φ1 = toRadians(lat);
  const φ2 = toRadians(KAABA_LAT);
  const Δλ = toRadians(KAABA_LNG - lng);

  const x = Math.cos(φ2) * Math.sin(Δλ);
  const y = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  let qibla = toDegrees(Math.atan2(x, y));
  
  // Normalize to 0-360
  if (qibla < 0) {
    qibla += 360;
  }

  return qibla;
}

/**
 * คำนวณระยะทางไปยังมักกะห์ (กิโลเมตร)
 * ใช้สูตร Haversine
 */
export function calculateDistanceToMakkah(lat: number, lng: number): number {
  const R = 6371; // รัศมีโลก (กม.)
  
  const φ1 = toRadians(lat);
  const φ2 = toRadians(KAABA_LAT);
  const Δφ = toRadians(KAABA_LAT - lat);
  const Δλ = toRadians(KAABA_LNG - lng);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * แปลงองศาเป็นทิศทางภาษาไทย
 */
export function getDirectionName(degrees: number): string {
  const directions = [
    { min: 337.5, max: 360, name: 'เหนือ' },
    { min: 0, max: 22.5, name: 'เหนือ' },
    { min: 22.5, max: 67.5, name: 'ตะวันออกเฉียงเหนือ' },
    { min: 67.5, max: 112.5, name: 'ตะวันออก' },
    { min: 112.5, max: 157.5, name: 'ตะวันออกเฉียงใต้' },
    { min: 157.5, max: 202.5, name: 'ใต้' },
    { min: 202.5, max: 247.5, name: 'ตะวันตกเฉียงใต้' },
    { min: 247.5, max: 292.5, name: 'ตะวันตก' },
    { min: 292.5, max: 337.5, name: 'ตะวันตกเฉียงเหนือ' },
  ];

  for (const dir of directions) {
    if (degrees >= dir.min && degrees < dir.max) {
      return dir.name;
    }
  }
  return 'เหนือ';
}

/**
 * ข้อมูลกะอ์บะห์
 */
export const KAABA_INFO = {
  lat: KAABA_LAT,
  lng: KAABA_LNG,
  name: 'กะอ์บะห์ (Ka\'bah)',
  nameArabic: 'الكعبة',
  city: 'มักกะห์',
  country: 'ซาอุดีอาระเบีย'
};
