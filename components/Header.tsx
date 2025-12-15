'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Building2, Menu, X, ChevronDown, Calculator, Compass } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800/95 backdrop-blur-sm shadow-lg">
      <nav className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-bold text-white">
              เวลาละหมาดไทย
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/prayertime" 
              className="text-gray-200 hover:text-yellow-400 font-medium transition-colors"
            >
              เวลาละหมาด
            </Link>
            
            <div className="relative group">
              <button className="text-gray-200 hover:text-yellow-400 font-medium transition-colors flex items-center">
                เครื่องมือ
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              <div className="absolute top-full left-0 mt-1 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link 
                  href="/qibla" 
                  className="flex items-center px-4 py-3 text-gray-200 hover:bg-slate-700 hover:text-yellow-400 transition-colors"
                >
                  <Compass className="w-4 h-4 mr-2" />
                  ทิศกิบละห์
                </Link>
                <Link 
                  href="/calculator/zakat" 
                  className="flex items-center px-4 py-3 text-gray-200 hover:bg-slate-700 hover:text-yellow-400 transition-colors"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  คำนวณซะกาต
                </Link>
                <Link 
                  href="/calculator/inheritance" 
                  className="flex items-center px-4 py-3 text-gray-200 hover:bg-slate-700 hover:text-yellow-400 transition-colors"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  คำนวณมรดก
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-slate-600 pt-4">
            <div className="space-y-3">
              <Link 
                href="/prayertime" 
              className="block text-gray-200 hover:text-yellow-400 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              เวลาละหมาด
            </Link>
              
            <div className="space-y-2 pl-4">
              <Link 
                href="/qibla" 
                className="flex items-center text-gray-200 hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <Compass className="w-4 h-4 mr-2" />
                ทิศกิบละห์
              </Link>
              <Link 
                href="/calculator/zakat" 
                className="flex items-center text-gray-200 hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calculator className="w-4 h-4 mr-2" />
                คำนวณซะกาต
              </Link>
              <Link 
                href="/calculator/inheritance" 
                className="flex items-center text-gray-200 hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calculator className="w-4 h-4 mr-2" />
                คำนวณมรดก
              </Link>
            </div>
          </div>
        </div>
        )}
      </nav>
    </header>
  );
}