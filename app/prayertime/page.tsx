'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import provinces from '@/data/provinces.json';
import { Search, MapPin, Star, ArrowLeft, Globe } from 'lucide-react';

const REGIONS = {
  central: { name: 'ภาคกลาง', color: 'bg-blue-500/20 text-blue-300', badge: 'bg-blue-500' },
  northern: { name: 'ภาคเหนือ', color: 'bg-green-500/20 text-green-300', badge: 'bg-green-500' },
  northeastern: { name: 'ภาคตะวันออกเฉียงเหนือ', color: 'bg-yellow-500/20 text-yellow-300', badge: 'bg-yellow-500' },
  eastern: { name: 'ภาคตะวันออก', color: 'bg-purple-500/20 text-purple-300', badge: 'bg-purple-500' },
  western: { name: 'ภาคตะวันตก', color: 'bg-orange-500/20 text-orange-300', badge: 'bg-orange-500' },
  southern: { name: 'ภาคใต้', color: 'bg-teal-500/20 text-teal-300', badge: 'bg-teal-500' },
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
    <div className="min-h-screen bg-slate-900">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-800 to-slate-900 pt-24 pb-8">
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าแรก
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center">
              <Globe className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                เวลาละหมาด<span className="text-yellow-400">ทุกจังหวัด</span>
              </h1>
              <p className="text-slate-400 text-sm">เลือกจังหวัดเพื่อดูเวลาละหมาด</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="bg-slate-800 rounded-xl shadow-lg p-4 mb-4 border border-slate-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="ค้นหาจังหวัด..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-slate-400"
            />
          </div>
        </div>

        {/* Popular Provinces */}
        {!searchQuery && selectedRegion === 'all' && (
          <div className="mb-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Star className="w-4 h-4 text-yellow-400" />
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
                    className="px-3 py-1.5 bg-slate-800 rounded-full text-sm text-slate-300 border border-slate-700 hover:border-yellow-400 hover:text-yellow-400 transition-all"
                  >
                    {province.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Region Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedRegion('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedRegion === 'all'
                ? 'bg-yellow-400 text-slate-900'
                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-500'
            }`}
          >
            ทั้งหมด ({provinces.length})
          </button>
          {(Object.keys(REGIONS) as RegionKey[]).map((regionKey) => {
            const count = provinces.filter(p => p.region === regionKey).length;
            return (
              <button
                key={regionKey}
                onClick={() => setSelectedRegion(regionKey)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedRegion === regionKey
                    ? 'bg-yellow-400 text-slate-900'
                    : `${REGIONS[regionKey].color} border border-transparent hover:border-slate-500`
                }`}
              >
                {REGIONS[regionKey].name} ({count})
              </button>
            );
          })}
        </div>
        
        {/* Province List */}
        {selectedRegion === 'all' && !searchQuery ? (
          // Grouped by region
          <div className="space-y-8">
            {(Object.keys(REGIONS) as RegionKey[]).map((regionKey) => {
              const regionProvinces = groupedProvinces[regionKey];
              if (!regionProvinces || regionProvinces.length === 0) return null;
              
              return (
                <div key={regionKey}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${REGIONS[regionKey].badge}`}></div>
                    <h2 className="text-lg font-semibold text-white">
                      {REGIONS[regionKey].name}
                    </h2>
                    <span className="text-slate-500 text-sm">({regionProvinces.length} จังหวัด)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {regionProvinces.map((province) => (
                      <Link
                        key={province.id}
                        href={`/prayertime/${province.id}`}
                        className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-yellow-400 hover:bg-slate-700 transition-all group"
                      >
                        <MapPin className="w-4 h-4 text-slate-500 group-hover:text-yellow-400 flex-shrink-0 transition-colors" />
                        <span className="text-sm text-slate-300 group-hover:text-white truncate transition-colors">{province.name}</span>
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
                className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-yellow-400 hover:bg-slate-700 transition-all group"
              >
                <MapPin className="w-4 h-4 text-slate-500 group-hover:text-yellow-400 flex-shrink-0 transition-colors" />
                <span className="text-sm text-slate-300 group-hover:text-white truncate transition-colors">{province.name}</span>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredProvinces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">ไม่พบจังหวัดที่ค้นหา</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">เวลาละหมาดไทย</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} สงวนลิขสิทธิ์
          </p>
        </div>
      </footer>
    </div>
  );
}