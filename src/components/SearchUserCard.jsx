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
      className="bg-white rounded-lg p-4 shadow-sm cursor-pointer transition-transform hover:scale-105"
      onClick={() => handleUserClick(user.id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <Image
            src={user.image || '/default-avatar.png'}
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
          className={`${
            isBookmarked
              ? 'text-yellow-400 hover:text-yellow-500'
              : 'text-gray-400 hover:text-yellow-400'
          }`}
        >
          <StarIcon className="h-6 w-6" />
        </button>
      </div>

      {/* ✅ 重複除外済みスキル表示 */}
      <div className="flex flex-wrap gap-2 mb-4 rounded-lg bg-gray-100 p-2">
        {[...new Set(user.skills?.map(skill => skill.name))].map((skillName, index) => (
          <SkillTag key={index} text={skillName} />
        ))}
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.department}</p>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-2">
          {user.welcome_level || '相談歓迎しています！'}
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          <button className="w-full py-2 text-center bg-[#F87171] text-white rounded hover:bg-[#EF4444] transition-colors">
            {user.welcome_level || '相談歓迎しています！'}
          </button>
        </div>

        {user.similarity_score && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
            <span>マッチ度</span>
            <span className="flex items-center">
              <span className="ml-1 text-[#F87171] font-bold">
                {Math.round(user.similarity_score * 100)}%
              </span>
            </span>
          </div>
        )}

        <div className="mt-6">
          <Link
            href={`/user/${user.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            詳細を見る →
          </Link>
        </div>
      </div>
    </div>
  );
}
