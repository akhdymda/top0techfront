'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DetailPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] p-8">
      <h1 className="text-2xl font-bold mb-4">詳細ページ</h1>
      <p className="mb-4">このページは現在開発中です</p>
      <button 
        onClick={() => router.back()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        戻る
      </button>
    </div>
  );
}