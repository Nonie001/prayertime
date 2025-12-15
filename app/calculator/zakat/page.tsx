'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, DollarSign, Coins, ArrowLeft } from 'lucide-react';
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

export default function ZakatCalculator() {
  const [money, setMoney] = useState('');
  const [gold, setGold] = useState('');
  const [goldPrice, setGoldPrice] = useState('32,000');
  const [result, setResult] = useState<number | null>(null);

  const calculateZakat = () => {
    const moneyValue = parseFloat(parseNumber(money)) || 0;
    const goldValue = parseFloat(parseNumber(gold)) || 0;
    const goldPriceValue = parseFloat(parseNumber(goldPrice)) || 32000;
    
    const moneyNisab = 85 * goldPriceValue;
    const totalWealth = moneyValue + (goldValue * goldPriceValue);
    
    if (totalWealth >= moneyNisab) {
      const zakatAmount = totalWealth * 0.025;
      setResult(zakatAmount);
    } else {
      setResult(0);
    }
  };

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
              <Calculator className="w-5 h-5 text-yellow-400" />
            </div>
            คำนวณซะกาต
          </h1>
          <p className="text-slate-400 mt-2">คำนวณซะกาตเงิน ทอง และทรัพย์สิน</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-5">
            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-2 gap-2">
                <DollarSign className="w-4 h-4 text-slate-400" />
                เงินสด (บาท)
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={money}
                onChange={(e) => setMoney(formatNumber(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-slate-800"
                placeholder="0"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-2 gap-2">
                <Coins className="w-4 h-4 text-slate-400" />
                ทองคำ (กรัม)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={gold}
                onChange={(e) => setGold(formatNumber(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-slate-800"
                placeholder="0"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-2 gap-2">
                <Coins className="w-4 h-4 text-slate-400" />
                ราคาทองคำต่อกรัม (บาท)
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={goldPrice}
                onChange={(e) => setGoldPrice(formatNumber(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-slate-800"
              />
            </div>

            <button
              onClick={calculateZakat}
              className="w-full bg-yellow-400 text-slate-900 py-3 rounded-lg hover:bg-yellow-300 transition-colors font-semibold"
            >
              คำนวณซะกาต
            </button>

            {result !== null && (
              <div className="mt-4 p-4 bg-slate-800 rounded-xl">
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  ผลการคำนวณ
                </h3>
                {result > 0 ? (
                  <div>
                    <p className="text-2xl font-bold text-yellow-400">
                      {result.toLocaleString('th-TH')} บาท
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      คุณต้องจ่ายซะกาต {result.toLocaleString('th-TH')} บาท
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg text-white">ทรัพย์สินยังไม่ถึงนิศาบ</p>
                    <p className="text-sm text-slate-400 mt-1">ไม่ต้องจ่ายซะกาต</p>
                  </div>
                )}
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
              นิศาบของเงิน = 85 กรัมทอง
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">•</span>
              อัตราซะกาต = 2.5% ของทรัพย์สินรวม
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">•</span>
              ต้องครบ 1 ปี (เงินเก้าเก็บ)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">•</span>
              สำหรับการคำนวณที่แม่นยำ ควรปรึกษาผู้รู้
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
