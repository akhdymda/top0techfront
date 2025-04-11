import Image from 'next/image';
import SkillTag from './Tag';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../contexts/AuthContext';

export default function SearchUserCard({ user }) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.id && user.id) {
      checkBookmarkStatus();
    }
  }, [currentUser?.id, user.id]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${currentUser.id}/${user.id}/status`
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
      alert('ブックマークするにはログインが必要です');
      return;
    }

    setIsLoading(true);
    try {
      if (isBookmarked) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${currentUser.id}/${user.id}`,
          {
            method: 'DELETE',
          }
        );
        setIsBookmarked(false);
      } else {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${currentUser.id}/${user.id}`,
          {
            method: 'POST',
          }
        );
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('ブックマークの更新に失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserClick = (userId) => {
    router.push(`/user/${userId}`);
  };

  const displayName = user.name || '名前未設定';

  return (
    <div
      className="bg-white rounded-lg p-4 shadow-sm cursor-pointer transition-transform hover:scale-105 h-[450px] flex flex-col"
      onClick={() => handleUserClick(user.id)}
    >
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="relative w-[60px] h-[60px] flex-shrink-0">
            <Image
              src={user.imageUrl || "/default-avatar.png"}
              alt={displayName}
              fill
              className="rounded object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 truncate">{displayName}</h3>
            <p className="text-sm text-gray-600 truncate">{user.department}</p>
            <p className="text-sm text-gray-600">社歴：{user.yearsOfService || '-'}年目</p>
            <p className="text-sm text-gray-600">入社形態：{user.joinForm || '未設定'}</p>
          </div>
        </div>

        <button
          onClick={toggleBookmark}
          disabled={isLoading}
          className={`${
            isBookmarked
              ? 'text-yellow-400 hover:text-yellow-500'
              : 'text-gray-400 hover:text-yellow-400'
          }`}
        >
          <StarIcon className="h-6 w-6" />
        </button>
      </div>

      {/* スキル表示部分 */}
      <div className="flex-1 mt-2">
        <div className="flex flex-wrap gap-2 rounded-lg bg-gray-100 p-2 h-[200px] overflow-y-auto">
          {[...new Set(user.skills?.map(skill => skill.name))].map((skillName, index) => (
            <SkillTag key={index} text={skillName} size="small" />
          ))}
        </div>
      </div>

      {/* ステータス部分 */}
      <div className="mt-2">
        <button className="w-full py-2 text-center bg-[#F87171] text-white rounded hover:bg-[#EF4444] transition-colors">
          {user.welcome_level || '相談歓迎しています！'}
        </button>

        {user.similarity_score && (
          <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
            <span>マッチ度</span>
            <span className="flex items-center">
              <span className="ml-1 text-[#F87171] font-bold">
                {Math.round(user.similarity_score * 100)}%
              </span>
            </span>
          </div>
        )}
      </div>

      {/* フッター部分 */}
      <div className="mt-4 pt-2 border-t border-gray-200">
        <Link
          href={`/user/${user.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          詳細を見る →
        </Link>
      </div>
    </div>
  );
}
