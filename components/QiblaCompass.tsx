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
      <div className="flex flex-col items-center justify-center min-h-[350px] text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mb-4" />
        <p>กำลังค้นหาตำแหน่ง...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={requestLocation}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          ลองใหม่
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Compass */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-6">
        {/* Compass Background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-slate-600 shadow-xl">
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
                  y1={isCardinal ? "14" : isMajor ? "17" : "20"}
                  x2="100"
                  y2="24"
                  stroke={isCardinal ? "#10b981" : isMajor ? "#64748b" : "#475569"}
                  strokeWidth={isCardinal ? "2" : "1"}
                  transform={`rotate(${rotation} 100 100)`}
                />
              );
            })}
            
            {/* Cardinal directions */}
            <text x="100" y="40" textAnchor="middle" className="fill-emerald-400 text-xs font-bold">N</text>
            <text x="166" y="104" textAnchor="middle" className="fill-slate-400 text-xs font-bold">E</text>
            <text x="100" y="168" textAnchor="middle" className="fill-slate-400 text-xs font-bold">S</text>
            <text x="34" y="104" textAnchor="middle" className="fill-slate-400 text-xs font-bold">W</text>
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
              d="M100 28 L107 100 L100 112 L93 100 Z"
              className="fill-emerald-500"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
            />
            {/* Ka'bah icon at tip */}
            <rect
              x="95"
              y="20"
              width="10"
              height="10"
              rx="1"
              className="fill-amber-400"
            />
            {/* Center dot */}
            <circle cx="100" cy="100" r="6" className="fill-slate-900 stroke-slate-600" strokeWidth="2" />
            <circle cx="100" cy="100" r="3" className="fill-emerald-400" />
          </svg>
        </div>
      </div>

      {/* Qibla Info - Compact Grid */}
      <div className="w-full grid grid-cols-2 gap-3 mb-4">
        {/* Direction */}
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
            <Navigation className="w-4 h-4" />
            <span className="text-xs font-medium">ทิศกิบละห์</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {qiblaDirection?.toFixed(1)}°
          </div>
          <div className="text-slate-400 text-xs">
            {qiblaDirection !== null && getDirectionName(qiblaDirection)}
          </div>
        </div>

        {/* Distance */}
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-medium">ระยะทาง</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {distance?.toLocaleString('th-TH', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-slate-400 text-xs">กิโลเมตร</div>
        </div>
      </div>

      {/* User Location */}
      {userLocation && (
        <div className="text-center text-xs text-slate-500">
          ตำแหน่ง: {userLocation.lat.toFixed(4)}°, {userLocation.lng.toFixed(4)}°
        </div>
      )}
    </div>
  );
}
