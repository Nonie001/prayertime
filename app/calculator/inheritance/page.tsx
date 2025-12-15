'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Scroll, Users, ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

// Format number with commas
const formatNumber = (value: string) => {
  const num = value.replace(/,/g, '');
  if (!num || isNaN(Number(num))) return '';
  return Number(num).toLocaleString('th-TH');
};

// Parse formatted number to raw number
const parseNumber = (value: string) => {
  return value.replace(/,/g, '');
};

interface Heir {
  id: string;
  name: string;
  share: string;
  amount: number;
}

export default function InheritanceCalculator() {
  const [totalEstate, setTotalEstate] = useState('');
  const [hasSpouse, setHasSpouse] = useState(false);
  const [hasSons, setHasSons] = useState(false);
  const [hasDaughters, setHasDaughters] = useState(false);
  const [numSons, setNumSons] = useState(0);
  const [numDaughters, setNumDaughters] = useState(0);
  const [hasParents, setHasParents] = useState(false);
  const [result, setResult] = useState<Heir[]>([]);

  const calculateInheritance = () => {
    const estate = parseFloat(parseNumber(totalEstate)) || 0;
    if (estate <= 0) return;

    const heirs: Heir[] = [];
    let remainingEstate = estate;

    if (hasSpouse) {
      let spouseShare = 0;
      if (hasSons || hasDaughters) {
        spouseShare = estate * 0.125;
        heirs.push({ id: 'spouse', name: 'คู่สมรส', share: '1/8', amount: spouseShare });
      } else {
        spouseShare = estate * 0.25;
        heirs.push({ id: 'spouse', name: 'คู่สมรส', share: '1/4', amount: spouseShare });
      }
      remainingEstate -= spouseShare;
    }

    if (hasParents && (hasSons || hasDaughters)) {
      const parentShare = estate * (1/6);
      heirs.push({ id: 'father', name: 'บิดา', share: '1/6', amount: parentShare });
      heirs.push({ id: 'mother', name: 'มารดา', share: '1/6', amount: parentShare });
      remainingEstate -= parentShare * 2;
    }

    if (hasSons || hasDaughters) {
      const totalShares = (numSons * 2) + numDaughters;
      const shareValue = remainingEstate / totalShares;

      if (numSons > 0) {
        const sonShare = shareValue * 2;
        heirs.push({ 
          id: 'sons', 
          name: `บุตรชาย (${numSons} คน)`, 
          share: '2 ส่วน/คน', 
          amount: sonShare * numSons 
        });
      }

      if (numDaughters > 0) {
        const daughterShare = shareValue;
        heirs.push({ 
          id: 'daughters', 
          name: `บุตรสาว (${numDaughters} คน)`, 
          share: '1 ส่วน/คน', 
          amount: daughterShare * numDaughters 
        });
      }
    }

    setResult(heirs);
  };

  const totalDistributed = result.reduce((sum, heir) => sum + heir.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-800 pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center">
              <Scroll className="w-5 h-5 text-yellow-400" />
            </div>
            คำนวณมรดก
          </h1>
          <p className="text-slate-400 mt-2">แบ่งมรดกตามหลักฟะรออิฎ</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                ทรัพย์สินรวม (บาท)
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={totalEstate}
                onChange={(e) => setTotalEstate(formatNumber(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-slate-800"
                placeholder="0"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                ทายาท
              </h3>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSpouse}
                  onChange={(e) => setHasSpouse(e.target.checked)}
                  className="w-4 h-4 text-yellow-400 rounded"
                />
                <span className="text-slate-700">มีคู่สมรส</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasParents}
                  onChange={(e) => setHasParents(e.target.checked)}
                  className="w-4 h-4 text-yellow-400 rounded"
                />
                <span className="text-slate-700">มีพ่อแม่ยังมีชีวิต</span>
              </label>

              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSons}
                    onChange={(e) => setHasSons(e.target.checked)}
                    className="w-4 h-4 text-yellow-400 rounded"
                  />
                  <span className="text-slate-700">มีบุตรชาย</span>
                </label>
                {hasSons && (
                  <input
                    type="number"
                    min="1"
                    value={numSons}
                    onChange={(e) => setNumSons(parseInt(e.target.value) || 0)}
                    className="ml-7 w-24 p-2 border border-gray-200 rounded-lg text-slate-800"
                    placeholder="จำนวน"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasDaughters}
                    onChange={(e) => setHasDaughters(e.target.checked)}
                    className="w-4 h-4 text-yellow-400 rounded"
                  />
                  <span className="text-slate-700">มีบุตรสาว</span>
                </label>
                {hasDaughters && (
                  <input
                    type="number"
                    min="1"
                    value={numDaughters}
                    onChange={(e) => setNumDaughters(parseInt(e.target.value) || 0)}
                    className="ml-7 w-24 p-2 border border-gray-200 rounded-lg text-slate-800"
                    placeholder="จำนวน"
                  />
                )}
              </div>
            </div>

            <button
              onClick={calculateInheritance}
              className="w-full bg-yellow-400 text-slate-900 py-3 rounded-lg hover:bg-yellow-300 transition-colors font-semibold"
            >
              คำนวณมรดก
            </button>

            {result.length > 0 && (
              <div className="mt-4 p-4 bg-slate-800 rounded-xl">
                <h3 className="text-sm font-medium text-slate-400 mb-3">
                  ผลการแบ่งมรดก
                </h3>
                <div className="space-y-2">
                  {result.map((heir) => (
                    <div key={heir.id} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                      <div>
                        <span className="font-medium text-white">{heir.name}</span>
                        <span className="text-sm text-slate-400 ml-2">({heir.share})</span>
                      </div>
                      <span className="font-bold text-yellow-400">
                        {heir.amount.toLocaleString('th-TH')} บาท
                      </span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-slate-600 mt-3">
                    <div className="flex justify-between font-bold text-white">
                      <span>รวมทั้งหมด</span>
                      <span className="text-yellow-400">{totalDistributed.toLocaleString('th-TH')} บาท</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-5">
          <h4 className="font-semibold text-slate-800 mb-3">หมายเหตุ</h4>
          <ul className="text-sm text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">•</span>
              นี่เป็นการคำนวณเบื้องต้นเท่านั้น
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">•</span>
              กรณีซับซ้อนต้องปรึกษาผู้รู้ด้านกฎหมายอิสลาม
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">•</span>
              อัตราส่วน ชาย:หญิง = 2:1
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">•</span>
              ต้องหักหนี้สินและค่าใช้จ่ายก่อนแบ่ง
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
