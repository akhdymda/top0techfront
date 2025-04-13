'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function BookCard({ book }) {
  const [hasRead, setHasRead] = useState(false);

  const handleReadClick = (e) => {
    e.stopPropagation();
    setHasRead(!hasRead);
  };

  return (
    <Link
      href={`/books/${book.id}/readers`}
      className="block w-full text-left bg-white/80 backdrop-blur rounded-2xl p-3 shadow-sm hover:scale-105 transition-transform relative cursor-pointer"
    >
      <button
        onClick={handleReadClick}
        className={`absolute top-2 right-2 px-2 py-1 rounded-full shadow-md transition-colors flex items-center gap-1 text-xs ${
          hasRead 
            ? 'bg-[#6b635d] text-white' 
            : 'bg-white/90 text-[#6b635d] hover:bg-[#6b635d] hover:text-white'
        }`}
      >
        <BookOpen className="w-3.5 h-3.5" />
        <span>{hasRead ? '読了' : '読んだ'}</span>
      </button>

      <div className="flex flex-col">
        <div className="flex-1">
          <h2 className="text-base font-bold text-[#6b635d] mb-1 pr-16">{book.title}</h2>
          <p className="text-xs text-[#6b635d]/80 mb-1">{book.author}</p>
          <p className="text-xs text-[#6b635d] leading-relaxed line-clamp-2">{book.description}</p>
        </div>
        <div
          className="flex items-center text-xs text-[#6b635d]/80 group"
        >
          <span>詳細を見る</span>
          <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
} 