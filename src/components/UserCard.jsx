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
      className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm cursor-pointer transition-transform hover:scale-105 h-[450px] flex flex-col"
      onClick={handleCardClick}
    >
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2 flex-1 min-w-0">
          <div className="relative w-[60px] h-[60px] flex-shrink-0">
            <Image
              src={user.imageUrl || "/default-avatar.png"}
              alt={displayName}
              fill
              className="rounded object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-[#6b635d] truncate">{displayName}</h3>
            <p className="text-xs text-[#6b635d]/80 truncate break-all">{user.department}</p>
            <p className="text-xs text-[#6b635d]/80">社歴：{user.yearsOfService || '-'}年目</p>
            <p className="text-xs text-[#6b635d]/80">入社形態：{user.joinForm || '未設定'}</p>
          </div>
          <button
            onClick={toggleBookmark}
            disabled={isLoading}
            className={`flex-shrink-0 ${
              isBookmarked
                ? 'text-[#6b635d] hover:text-[#6b635d]/80'
                : 'text-[#6b635d]/40 hover:text-[#6b635d]/60'
            }`}
          >
            <StarIcon className="h-5 w-5" />
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
