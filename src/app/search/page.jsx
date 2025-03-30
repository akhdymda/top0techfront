'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Search() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search/results?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">CHOTTO</h1>
        <p className="text-sm text-gray-600 mb-8">
          ちょっと聞きたい、ちょっと話したい。から何かが生まれるかも。
        </p>

        <div className="w-full max-w-2xl">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder={`あのスキル持った人いないかな？\nこないだ読んだあの本の話したいな。\nこのプロジェクトやってたの誰だっけ？`}
          />
        </div>

        <button
          onClick={handleSearch}
          className="mt-4 px-8 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-colors"
        >
          ふわっと探す
        </button>

        <div className="mt-16 flex gap-8">
          <a
            href="/skill-search"
            className="px-8 py-2 bg-[#B4C292] text-white rounded-full hover:opacity-90 transition-opacity"
          >
            スキルから探す人はこちら
          </a>
          <a
            href="/department-search"
            className="px-8 py-2 bg-[#7FA6A6] text-white rounded-full hover:opacity-90 transition-opacity"
          >
            部署から探す人はこちら
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
