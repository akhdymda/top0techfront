'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../contexts/AuthContext';

export default function SearchUserCard({ user }) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user: currentUser } = useAuth();

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (currentUser?.id && user.user_id) {
      checkBookmarkStatus();
    }
  }, [currentUser?.id, user.user_id]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${currentUser.id}/${user.user_id}/status`
      );
      const data = await response.json();
      setIsBookmarked(data.is_bookmarked);
    } catch (error) {
      console.error('ブックマーク状態の確認に失敗しました:', error);
    }
  };

  const toggleBookmark = async (e) => {
    e.stopPropagation();
    if (!currentUser?.id) {
      setIsBookmarked(!isBookmarked);
      return;
    }

    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${currentUser.id}/${user.user_id}`;
      await fetch(url, { method: isBookmarked ? 'DELETE' : 'POST' });
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('ブックマークの更新に失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayName = user.user_name || '名前未設定';
  const imageSrc = user.image_data 
    ? `data:image/jpeg;base64,${user.image_data}`
    : '/default-avatar.png';

  const handleCardClick = () => {
    if (user.user_id) {
      router.push(`/user/${user.user_id}`);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm cursor-pointer transition-transform hover:scale-105">
      {/* ヘッダー部分 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src={imageSrc}
              alt={displayName}
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#6b635d]">{displayName}</h3>
            <p className="text-xs text-[#6b635d]/80">{user.department_name || '未所属'}</p>
            <p className="text-xs text-[#6b635d]/80">社歴：{user.yearsOfService || '-'}年目</p>
            <p className="text-xs text-[#6b635d]/80">入社形態：{user.joinForm || '未設定'}</p>
          </div>
        </div>
        <button
          onClick={toggleBookmark}
          disabled={isLoading}
          className={`flex-shrink-0 ${
            isBookmarked
              ? 'text-yellow-400 hover:text-yellow-500'
              : 'text-[#6b635d]/40 hover:text-[#6b635d]/60'
          }`}
        >
          <StarIcon className="h-5 w-5" />
        </button>
      </div>

      {/* スキルタグ */}
      <div className="flex flex-wrap gap-2 min-h-[120px] max-h-[160px] overflow-y-auto rounded-lg bg-[#6b635d]/10 p-2">
        {user.skills?.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 text-base text-[#6b635d] bg-white rounded-full border border-[#6b635d]/30 whitespace-nowrap"
          >
            {typeof skill === 'string' ? skill : skill.name}
          </span>
        ))}
      </div>

      {/* ステータス */}
      <div className="mt-4">
        <button className="w-full py-2 text-center bg-[#6b635d] text-white rounded-lg hover:bg-[#6b635d]/80 transition-colors">
          {user.welcome_level || '相談歓迎しています！'}
        </button>
      </div>

      {/* マッチ度 */}
      {typeof user.similarity_score === 'number' && (
        <div className="mt-2 flex justify-between text-sm text-[#6b635d]/80">
          <span>マッチ度</span>
          <span className="text-[#6b635d] font-bold">
            {Math.round(user.similarity_score * 100)}%
          </span>
        </div>
      )}

      {/* フッター */}
      <div className="mt-4 pt-2 border-t border-[#6b635d]/20">
        <Link
          href={`/user/${user.user_id}`}
          className="text-[#6b635d] hover:text-[#6b635d]/80 font-medium inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          詳細を見る →
        </Link>
      </div>
    </div>
  );
}
