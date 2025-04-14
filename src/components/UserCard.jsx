'use client';

import Image from 'next/image';
import SkillTag from './Tag';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';

export default function UserCard({ user, isInitiallyBookmarked = false }) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(isInitiallyBookmarked);

  const toggleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const displayName = user.name || '名前未設定';
  const initial = displayName.charAt(0);

  return (
    <div
      className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm cursor-pointer transition-transform hover:scale-105 h-[450px] flex flex-col"
      onClick={() => router.push(`/user/${user.id}`)}
    >
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2 flex-1 min-w-0">
          <div className="relative w-[60px] h-[60px] flex-shrink-0">
            {user.image_data ? (
              <Image
                src={`data:${user.image_data_type};base64,${user.image_data}`}
                alt={displayName}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-[#6b635d]/10 flex items-center justify-center text-[#6b635d] text-2xl font-medium">
                {initial}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-[#6b635d] truncate">{displayName}</h3>
            <p className="text-xs text-[#6b635d]/80 truncate break-all">{user.department}</p>
            <p className="text-xs text-[#6b635d]/80">社歴：{user.yearsOfService || '-'}年目</p>
            <p className="text-xs text-[#6b635d]/80">入社形態：{user.joinForm || '未設定'}</p>
          </div>
          <button
            onClick={toggleBookmark}
            className={`flex-shrink-0 ${
              isBookmarked
                ? 'text-yellow-400 hover:text-yellow-500'
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <StarIcon className={`h-5 w-5 ${isBookmarked ? 'fill-yellow-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* スキル表示部分 */}
      <div className="flex-1 mt-2">
        <div className="flex flex-wrap gap-2 rounded-lg bg-[#6b635d]/10 p-2 h-[200px] overflow-y-auto">
          {user.skills && user.skills.map((skill, index) => (
            <SkillTag key={index} text={typeof skill === 'string' ? skill : skill.name} size="small" />
          ))}
        </div>
      </div>

      {/* ステータス部分 */}
      <div className="mt-2 space-y-2">
        <button className="w-full py-2 text-center bg-[#6b635d] text-white rounded-lg hover:bg-[#6b635d]/80 transition-colors">
          {user.welcome_level || '相談歓迎しています！'}
        </button>

        <div className="flex flex-col gap-1 text-sm text-[#6b635d]/80">
          {user.similarity_score !== undefined && (
            <div className="flex justify-between">
              <span>マッチ度</span>
              <span className="text-[#6b635d] font-bold">
                {Math.round(user.similarity_score * 100)}%
              </span>
            </div>
          )}
          {user.totalPoints !== undefined && (
            <div className="flex justify-between">
              <span>獲得サンクスポイント</span>
              <span className="text-[#6b635d] font-bold">
                {user.totalPoints}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* フッター部分 */}
      <div className="mt-4 pt-2 border-t border-[#6b635d]/20">
        <Link
          href={`/user/${user.id}`}
          className="text-[#6b635d] hover:text-[#6b635d]/80 font-medium inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          詳細を見る →
        </Link>
      </div>
    </div>
  );
}
