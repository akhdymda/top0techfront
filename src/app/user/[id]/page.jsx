'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../../contexts/AuthContext';

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetchUserDetails();
    if (currentUser) {
      checkBookmarkStatus();
    }
  }, [id, currentUser]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${id}`);
      if (!response.ok) throw new Error('ユーザー情報の取得に失敗しました');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkBookmarkStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${currentUser.id}/${id}/status`
      );
      const data = await response.json();
      setIsBookmarked(data.is_bookmarked);
    } catch (error) {
      console.error('ブックマーク状態の確認に失敗しました:', error);
    }
  };

  const toggleBookmark = async () => {
    if (!currentUser) {
      alert('ブックマークするにはログインが必要です');
      return;
    }

    try {
      if (isBookmarked) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${currentUser.id}/${id}`,
          { method: 'DELETE' }
        );
        setIsBookmarked(false);
      } else {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${currentUser.id}/${id}`,
          { method: 'POST' }
        );
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('ブックマークの更新に失敗しました:', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="p-8 text-center">ユーザーが見つかりません</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-md"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        検索結果に戻る
      </button>
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        {/* ヘッダー部分 */}
        <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24">
              <Image
                src={user.imageUrl || '/default-avatar.png'}
                alt={user.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.department} / {user.position}</p>
              <div className="flex space-x-2 mt-2">
                <span className="bg-gray-200 px-2 py-1 rounded text-sm">社歴{user.yearsOfService}年目</span>
                <span className="bg-gray-200 px-2 py-1 rounded text-sm">{user.joinForm}</span>
              </div>
            </div>
          </div>
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isBookmarked ? 'text-yellow-400' : 'text-gray-400'
            }`}
          >
            <StarIcon className="h-6 w-6" />
          </button>
        </div>

        {/* メッセージ部分 */}
        <div className="bg-[#F5F5F4] p-4 rounded-lg mb-6 border border-gray-200">
          <p className="text-gray-800 text-center">相談歓迎しています！</p>
        </div>

        {/* 説明文部分 */}
        <div className="bg-[#F5F5F4] p-4 rounded-lg mb-6 border border-gray-200">
          <p className="text-gray-800">
            プロジェクト管理やチーム運営について、お気軽にご相談ください。経験を活かしてサポートさせていただきます。
          </p>
        </div>

        {/* アクションボタン */}
        <div className="flex space-x-4 mb-6 pb-6 border-b border-gray-200">
          <button className="flex-1 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Teamsで連絡
            </span>
          </button>
          <button className="flex-1 bg-[#E5E5E4] text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors">
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              メールで連絡
            </span>
          </button>
        </div>

        {/* 得意分野 */}
        <div className="mt-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">得意分野</h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* 経験・実績 */}
        <div className="mt-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">経験・実績</h2>
          <div className="space-y-4">
            {user.experiences?.map((experience, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-100">
                <h3 className="font-medium">{experience.title}</h3>
                <p className="text-gray-600 mt-2">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 相談可能時間 */}
        <div className="mt-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">相談可能時間</h2>
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="flex items-center space-x-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>月・水・金</span>
            </div>
            <div className="flex items-center space-x-2 mt-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>14:00 - 17:00</span>
            </div>
            <div className="flex items-center space-x-2 mt-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>オンライン / 対面</span>
            </div>
          </div>
        </div>

        {/* サンクスポイント */}
        <div className="mt-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">サンクスポイント</h2>
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600 mt-1">今月獲得ポイント</div>
            </div>
          </div>
        </div>

        {/* フリーコメント */}
        <div className="mt-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">フリーコメント</h2>
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <p className="text-gray-600 text-center">まだコメントはありません</p>
          </div>
        </div>
      </div>
    </div>
  );
} 