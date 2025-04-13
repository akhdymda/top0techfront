'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 py-2 flex justify-between items-center bg-white border-b">
        <Link href="/search#search-section" className="flex items-center gap-2">
          <Image
            src="/CHOTTOlogo2.png"
            alt="CHOTTO"
            width={40}
            height={14}
            className="h-auto"
            priority
          />
          <span className="text-2xl text-gray-700 font-medium">CHOTTO</span>
        </Link>
        
        {/* デスクトップメニュー */}
        <div className="hidden md:flex items-center space-x-4">
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

            <Link href="/favorite" className="text-gray-500 hover:text-gray-700">
              <span>気になる</span>
            </Link>
            <Link 
              href="/mypage" 
              className="text-gray-500 hover:text-gray-700"
            >
              <span>My page</span>
            </Link>
          </div>
        </div>

        {/* モバイルメニューボタン */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-500 hover:text-gray-700"
          aria-label="メニュー"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* モバイルメニュー */}
      <div
        ref={menuRef}
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-opacity duration-200 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="px-4 py-2 space-y-1">
          <div className="py-2 border-b border-gray-200">
            <button
              className="flex items-center justify-between w-full px-2 py-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <span className="text-base">探す</span>
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
              <div className="pl-4 py-2 space-y-2">
                <Link 
                  href="/search#search-section" 
                  className="block px-2 py-2 text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  ふわっと
                </Link>
                <Link 
                  href="/search/skill" 
                  className="block px-2 py-2 text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  スキル
                </Link>
                <Link 
                  href="/search/department" 
                  className="block px-2 py-2 text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  部署
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/favorite"
            className="block px-2 py-2 text-base text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            気になる
          </Link>
          <Link
            href="/mypage"
            className="block px-2 py-2 text-base text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My page
          </Link>
        </nav>
      </div>
    </header>
  );
} 


