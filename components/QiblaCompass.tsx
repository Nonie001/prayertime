'use client';

import { useState, useEffect, useCallback } from 'react';
import { Navigation, MapPin, Loader2, AlertCircle, Compass, RotateCcw } from 'lucide-react';
import { calculateQiblaDirection, calculateDistanceToMakkah, getDirectionName, KAABA_INFO } from '@/lib/utils/qibla';

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
}

export default function QiblaCompass() {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isCompassSupported, setIsCompassSupported] = useState(true);

  // คำนวณมุมที่ต้องหมุน compass needle
  const needleRotation = useCallback(() => {
    if (qiblaDirection === null) return 0;
    if (compassHeading !== null) {
      // มี compass จริง - หมุนตามทิศที่อุปกรณ์หัน
      return qiblaDirection - compassHeading;
    }
    // ไม่มี compass - แสดงทิศกิบละห์จากทิศเหนือ
    return qiblaDirection;
  }, [qiblaDirection, compassHeading]);

  // ขอ permission สำหรับ Geolocation
  const requestLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        
        const qibla = calculateQiblaDirection(latitude, longitude);
        const dist = calculateDistanceToMakkah(latitude, longitude);
        
        setQiblaDirection(qibla);
        setDistance(dist);
        setIsLoading(false);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('กรุณาอนุญาตการเข้าถึงตำแหน่งเพื่อหาทิศกิบละห์');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('ไม่สามารถระบุตำแหน่งได้');
            break;
          case err.TIMEOUT:
            setError('หมดเวลาในการค้นหาตำแหน่ง');
            break;
          default:
            setError('เกิดข้อผิดพลาดในการระบุตำแหน่ง');
        }
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  // ขอ permission สำหรับ Device Orientation (compass)
  const requestCompassPermission = useCallback(async () => {
    // Check for iOS 13+
    const DeviceOrientationEventTyped = DeviceOrientationEvent as unknown as DeviceOrientationEventiOS;
    
    if (typeof DeviceOrientationEventTyped.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEventTyped.requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
          return true;
        } else {
          setIsCompassSupported(false);
          return false;
        }
      } catch {
        setIsCompassSupported(false);
        return false;
      }
    }
    
    // Android และ desktop browsers
    setPermissionGranted(true);
    return true;
  }, []);

  // Handle device orientation
  useEffect(() => {
    if (!permissionGranted) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      let heading: number | null = null;
      
      // iOS
      if ('webkitCompassHeading' in event) {
        heading = (event as DeviceOrientationEvent & { webkitCompassHeading: number }).webkitCompassHeading;
      }
      // Android
      else if (event.alpha !== null) {
        heading = 360 - event.alpha;
      }

      if (heading !== null) {
        setCompassHeading(heading);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [permissionGranted]);

  // เริ่มต้นขอตำแหน่ง
  useEffect(() => {
    requestLocation();
    requestCompassPermission();
  }, [requestLocation, requestCompassPermission]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mb-4" />
        <p className="text-lg">กำลังค้นหาตำแหน่งของคุณ...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={requestLocation}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          ลองใหม่
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Compass */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mb-8">
        {/* Compass Background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 to-white border-4 border-gray-200 shadow-2xl">
          {/* Compass Ring */}
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Degree marks */}
            {[...Array(72)].map((_, i) => {
              const rotation = i * 5;
              const isMajor = rotation % 30 === 0;
              const isCardinal = rotation % 90 === 0;
              return (
                <line
                  key={i}
                  x1="100"
                  y1={isCardinal ? "12" : isMajor ? "15" : "18"}
                  x2="100"
                  y2="22"
                  stroke={isCardinal ? "#10b981" : isMajor ? "#6b7280" : "#d1d5db"}
                  strokeWidth={isCardinal ? "2" : "1"}
                  transform={`rotate(${rotation} 100 100)`}
                />
              );
            })}
            
            {/* Cardinal directions */}
            <text x="100" y="38" textAnchor="middle" className="fill-emerald-600 text-xs font-bold">N</text>
            <text x="168" y="104" textAnchor="middle" className="fill-gray-500 text-xs font-bold">E</text>
            <text x="100" y="170" textAnchor="middle" className="fill-gray-500 text-xs font-bold">S</text>
            <text x="32" y="104" textAnchor="middle" className="fill-gray-500 text-xs font-bold">W</text>
          </svg>
        </div>

        {/* Qibla Needle */}
        <div 
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${needleRotation()}deg)` }}
        >
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Needle */}
            <path
              d="M100 25 L108 100 L100 115 L92 100 Z"
              className="fill-emerald-500"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
            />
            {/* Ka'bah icon at tip */}
            <rect
              x="94"
              y="18"
              width="12"
              height="12"
              rx="1"
              className="fill-amber-500"
            />
            {/* Center dot */}
            <circle cx="100" cy="100" r="8" className="fill-white stroke-gray-300" strokeWidth="2" />
            <circle cx="100" cy="100" r="4" className="fill-emerald-500" />
          </svg>
        </div>

        {/* Compass status indicator */}
        {!isCompassSupported && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-500 flex items-center gap-1 border border-gray-200">
            <Compass className="w-3 h-3" />
            <span>หันอุปกรณ์ไปทางทิศเหนือ</span>
          </div>
        )}
      </div>

      {/* Qibla Info */}
      <div className="w-full max-w-md space-y-4">
        {/* Direction Card */}
        <div className="bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-100">
          <div className="flex items-center justify-center gap-2 text-emerald-600 mb-2">
            <Navigation className="w-5 h-5" />
            <span className="text-sm font-medium">ทิศกิบละห์</span>
          </div>
          <div className="text-4xl font-bold text-gray-800 mb-1">
            {qiblaDirection?.toFixed(1)}°
          </div>
          <div className="text-gray-500">
            {qiblaDirection !== null && getDirectionName(qiblaDirection)}
          </div>
        </div>

        {/* Distance Card */}
        <div className="bg-amber-50 rounded-2xl p-6 text-center border border-amber-100">
          <div className="flex items-center justify-center gap-2 text-amber-600 mb-2">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">ระยะทางถึงมักกะห์</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {distance?.toLocaleString('th-TH', { maximumFractionDigits: 0 })} กม.
          </div>
          <div className="text-gray-500 text-sm">
            {KAABA_INFO.nameArabic} - {KAABA_INFO.city}, {KAABA_INFO.country}
          </div>
        </div>

        {/* User Location */}
        {userLocation && (
          <div className="bg-gray-50 rounded-xl p-4 text-center text-sm border border-gray-200">
            <div className="text-gray-500 mb-1">ตำแหน่งของคุณ</div>
            <div className="text-gray-700 font-mono">
              {userLocation.lat.toFixed(6)}°, {userLocation.lng.toFixed(6)}°
            </div>
          </div>
        )}

        {/* Compass heading (when available) */}
        {compassHeading !== null && (
          <div className="text-center text-sm text-gray-500">
            <Compass className="w-4 h-4 inline mr-1" />
            ทิศหัวอุปกรณ์: {compassHeading.toFixed(0)}°
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 max-w-md text-center text-gray-500 text-sm">
        <p className="mb-2">
          <span className="text-emerald-600">💡 วิธีใช้:</span> หมุนตัวเองให้เข็มสีเขียวชี้ตรงกับตัวคุณ
        </p>
        {!isCompassSupported && (
          <p className="text-xs text-gray-400">
            * อุปกรณ์ของคุณไม่รองรับ compass ดิจิทัล กรุณาใช้ compass จริงเพื่อหาทิศเหนือก่อน
          </p>
        )}
      </div>
    </div>
  );
}
