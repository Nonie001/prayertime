'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import provinces from '@/data/provinces.json';
import { Search, MapPin, Star } from 'lucide-react';

const REGIONS = {
  central: { name: 'ภาคกลาง', color: 'bg-blue-100 text-blue-800' },
  northern: { name: 'ภาคเหนือ', color: 'bg-green-100 text-green-800' },
  northeastern: { name: 'ภาคตะวันออกเฉียงเหนือ', color: 'bg-yellow-100 text-yellow-800' },
  eastern: { name: 'ภาคตะวันออก', color: 'bg-purple-100 text-purple-800' },
  western: { name: 'ภาคตะวันตก', color: 'bg-orange-100 text-orange-800' },
  southern: { name: 'ภาคใต้', color: 'bg-teal-100 text-teal-800' },
};

// จังหวัดที่มีประชากรมุสลิมมาก (เรียงตามสัดส่วน)
const POPULAR_PROVINCES = [
  'pattani', 'yala', 'narathiwat', 'satun', 'songkhla',
  'krabi', 'trang', 'phang-nga', 'phuket', 'nakhon-si-thammarat',
  'surat-thani', 'chumphon', 'ranong', 'phatthalung', 'bangkok',
  'nonthaburi', 'pathum-thani', 'samut-prakan', 'phra-nakhon-si-ayutthaya', 'chon-buri'
];

type RegionKey = keyof typeof REGIONS;

export default function PrayerTimePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<RegionKey | 'all'>('all');

  const filteredProvinces = useMemo(() => {
    return provinces.filter((province) => {
      const matchesSearch = province.name.includes(searchQuery) || 
                           province.id.includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || province.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  const groupedProvinces = useMemo(() => {
    const groups: Record<string, typeof provinces> = {};
    filteredProvinces.forEach((province) => {
      if (!groups[province.region]) {
        groups[province.region] = [];
      }
      groups[province.region].push(province);
    });
    return groups;
  }, [filteredProvinces]);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาจังหวัด..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            />
          </div>
        </div>

        {/* Popular Provinces */}
        {!searchQuery && selectedRegion === 'all' && (
          <div className="mb-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              จังหวัดยอดนิยม
            </h2>
            <div className="flex flex-wrap gap-2">
              {POPULAR_PROVINCES.map((id) => {
                const province = provinces.find(p => p.id === id);
                if (!province) return null;
                return (
                  <Link
                    key={id}
                    href={`/prayertime/${id}`}
                    className="px-3 py-1.5 bg-white rounded-full text-sm text-slate-700 shadow-sm hover:shadow-md hover:bg-yellow-50 border border-gray-100 transition-all"
                  >
                    {province.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Region Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedRegion('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedRegion === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ทั้งหมด
          </button>
          {(Object.keys(REGIONS) as RegionKey[]).map((regionKey) => (
            <button
              key={regionKey}
              onClick={() => setSelectedRegion(regionKey)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedRegion === regionKey
                  ? 'bg-slate-800 text-white'
                  : `${REGIONS[regionKey].color} hover:opacity-80`
              }`}
            >
              {REGIONS[regionKey].name}
            </button>
          ))}
        </div>
        
        {/* Province List */}
        {selectedRegion === 'all' && !searchQuery ? (
          // Grouped by region
          <div className="space-y-6">
            {(Object.keys(REGIONS) as RegionKey[]).map((regionKey) => {
              const regionProvinces = groupedProvinces[regionKey];
              if (!regionProvinces || regionProvinces.length === 0) return null;
              
              return (
                <div key={regionKey}>
                  <h2 className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold mb-3 ${REGIONS[regionKey].color}`}>
                    {REGIONS[regionKey].name}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {regionProvinces.map((province) => (
                      <Link
                        key={province.id}
                        href={`/prayertime/${province.id}`}
                        className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-transparent hover:border-blue-300 hover:bg-blue-50"
                      >
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-slate-700 truncate">{province.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Flat list (when searching or filtering)
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {filteredProvinces.map((province) => (
              <Link
                key={province.id}
                href={`/prayertime/${province.id}`}
                className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-transparent hover:border-blue-300 hover:bg-blue-50"
              >
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-slate-700 truncate">{province.name}</span>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredProvinces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">ไม่พบจังหวัดที่ค้นหา</p>
          </div>
        )}
      </div>
    </div>
  );
}