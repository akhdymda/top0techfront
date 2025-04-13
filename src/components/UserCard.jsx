'use client';

import React from 'react';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkFilled } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function UserCard({ user, currentUserId, isInitiallyBookmarked = false }) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = React.useState(isInitiallyBookmarked);
  const [isLoading, setIsLoading] = React.useState(false);
  const { user: authUser } = useAuth();
  const effectiveUserId = currentUserId || authUser?.id;

  React.useEffect(() => {
    if (effectiveUserId && user.id && !isInitiallyBookmarked) {
      checkBookmarkStatus();
    }
  }, [effectiveUserId, user.id, isInitiallyBookmarked]);

  const checkBookmarkStatus = async () => {
    if (!effectiveUserId) return;
    
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
    
    setIsLoading(true);
    try {
      if (effectiveUserId) {
        const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${effectiveUserId}/${user.id}`;
        await fetch(url, { method: isBookmarked ? 'DELETE' : 'POST' });
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('ブックマークの更新に失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    router.push(`/user/${user.id}`);
  };

  // デバッグ用のログ出力
  console.log('User data:', user);
  console.log('Welcome level:', user.welcome_level);

  // スキルデータの構造をログ出力
  console.log('User skills data:', user.skills);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {user.image_data ? (
            <img
              src={`data:${user.image_data_type};base64,${user.image_data}`}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-sm sm:text-base">
              {user.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-medium text-white truncate">{user.name}</h3>
          <p className="text-xs sm:text-sm text-gray-400 truncate">{user.department?.name || '部署未設定'}</p>
          <div className="text-xs sm:text-sm text-gray-400 flex flex-wrap gap-1 sm:gap-2">
            <span>社歴：{user.yearsOfService}年目</span>
            <span className="hidden sm:inline">|</span>
            <span>{user.joinForm}</span>
          </div>
        </div>
        <button
          onClick={toggleBookmark}
          disabled={isLoading}
          className="text-gray-400 hover:text-white transition-colors p-1 sm:p-2"
        >
          {isBookmarked ? (
            <BookmarkFilled className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <BookmarkOutline className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4 flex-1 mt-3 sm:mt-4">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {user.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-2 sm:px-3 py-1 rounded-full bg-white/10 text-xs sm:text-sm text-white"
            >
              {skill.name}
            </span>
          ))}
        </div>

        <div className="bg-gray-700/50 rounded-lg p-2 sm:p-3">
          <p className="text-xs sm:text-sm text-white">{user.welcome_level}</p>
        </div>
      </div>

      <div className="mt-3 sm:mt-4">
        <a
          href={`/user/${user.id}`}
          className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors flex items-center"
          onClick={(e) => e.stopPropagation()}
        >
          詳細を見る
          <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
        </a>
      </div>
    </div>
  );
}
