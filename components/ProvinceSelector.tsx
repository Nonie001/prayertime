     'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import provinces from '@/data/provinces.json';

interface ProvinceSelectorProps {
  currentProvince: string;
}

export default function ProvinceSelector({ currentProvince }: ProvinceSelectorProps) {
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState(currentProvince);

  const handleProvinceChange = (provinceId: string) => {
    setSelectedProvince(provinceId);
    router.push(`/prayertime/${provinceId}`);
  };

  return (
    <div className="bg-emerald-50 p-4 rounded-lg">
      <label htmlFor="province-select" className="block text-sm font-medium text-emerald-700 mb-2">
        เปลี่ยนจังหวัด:
      </label>
      <select
        id="province-select"
        value={selectedProvince}
        onChange={(e) => handleProvinceChange(e.target.value)}
        className="w-full p-2 border border-emerald-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
      >
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>
    </div>
  );
}