'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="w-full px-4 py-2 flex justify-between items-center bg-white border-b">
      <Link href="/search#search-section" className="flex items-center">
        <span className="text-2xl text-gray-700 font-medium">CHOTTO</span>
      </Link>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-6 text-lg text-gray-500">
          <div className="relative">
            <button
              className="flex items-center space-x-1 hover:text-gray-700"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <span>探す</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isSearchOpen ? 'transform rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isSearchOpen && (
              <div className="absolute top-full mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-50">
                <Link 
                  href="/search#search-section" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsSearchOpen(false)}
                >
                  ふわっと
                </Link>
                <Link 
                  href="/search/skill" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsSearchOpen(false)}
                >
                  スキル
                </Link>
                <Link 
                  href="/search/department" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsSearchOpen(false)}
                >
                  部署
                </Link>
              </div>
            )}
          </div>

          <Link href="/notifications" className="text-gray-500 hover:text-gray-700">
            <span>気になる</span>
          </Link>
          <Link 
            href="/mypage" 
            className="text-gray-500 hover:text-gray-700"
          >
            <span>My page/登録</span>
          </Link>
        </div>
      </div>
    </header>
  );
} 
