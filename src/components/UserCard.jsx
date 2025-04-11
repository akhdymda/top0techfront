import Image from 'next/image';
import SkillTag from './Tag';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../contexts/AuthContext';

export default function UserCard({ user, currentUserId }) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user: authUser } = useAuth();
  const effectiveUserId = currentUserId || authUser?.id;

  useEffect(() => {
    if (effectiveUserId && user.id) {
      checkBookmarkStatus();
    }
  }, [effectiveUserId, user.id]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${effectiveUserId}/${user.id}/status`
      );
      const data = await response.json();
      setIsBookmarked(data.is_bookmarked);
    } catch (error) {
      console.error('ブックマーク状態の確認に失敗しました:', error);
    }
  };

  const toggleBookmark = async (e) => {
    e.stopPropagation();
    if (!effectiveUserId) {
      alert('ブックマークするにはログインが必要です');
      return;
    }

    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${effectiveUserId}/${user.id}`;
      await fetch(url, { method: isBookmarked ? 'DELETE' : 'POST' });
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('ブックマークの更新に失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayName = user.name || '名前未設定';

  const handleCardClick = () => {
    router.push(`/user/${user.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg p-4 shadow-sm cursor-pointer transition-transform hover:scale-105"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={displayName}
            width={60}
            height={60}
            className="rounded"
          />
          <div>
            <h3 className="font-bold text-lg text-gray-900">{displayName}</h3>
            <p className="text-sm text-gray-600">{user.department}</p>
            <p className="text-sm text-gray-600">社歴：{user.yearsOfService || '-'}年目</p>
            <p className="text-sm text-gray-600">専業：{user.specialty || '-'}</p>
            <p className="text-sm text-gray-600">入社形態：{user.joinForm || '未設定'}</p>
          </div>
        </div>
        <button
          onClick={toggleBookmark}
          disabled={isLoading}
          className={`text-gray-400 hover:text-gray-600 ${
            isBookmarked
              ? 'text-yellow-400 hover:text-yellow-500'
              : 'text-gray-400 hover:text-yellow-400'
          }`}
        >
          <StarIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 rounded-lg bg-gray-100 p-2">
        {user.skills && user.skills.map((skill, index) => (
          <SkillTag key={index} text={typeof skill === 'string' ? skill : skill.name} />
        ))}
      </div>

      <button
        className="w-full py-2 text-center bg-[#F87171] text-white rounded hover:bg-[#EF4444] transition-colors"
      >
        {user.welcome_level || '相談歓迎しています！'}
      </button>

      {/* スコア情報の表示（両方） */}
      <div className="mt-4 text-sm text-gray-500 space-y-1">
        {user.similarity_score !== undefined && (
          <div className="flex justify-between">
            <span>マッチ度</span>
            <span className="text-[#F87171] font-bold">
              {Math.round(user.similarity_score * 100)}%
            </span>
          </div>
        )}
        {user.totalPoints !== undefined && (
          <div className="flex justify-between">
            <span>これまで獲得したサンクスポイント</span>
            <span className="text-[#F87171] font-bold">
              {user.totalPoints}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          href={`/user/${user.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          詳細を見る →
        </Link>
      </div>
    </div>
  );
}
