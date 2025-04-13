'use client';

import React, { useState, useEffect } from 'react';
import UserCard from '../../components/UserCard';
import { useAuth } from '../../contexts/AuthContext';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchBookmarks();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${user.id}`
      );
      if (!response.ok) {
        throw new Error('ブックマークの取得に失敗しました');
      }
      const data = await response.json();
      
      // ブックマークされたユーザーの詳細情報を取得
      const userDetailsPromises = data.bookmarks.map(async (bookmark) => {
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${bookmark.user_id}`
        );
        if (!userResponse.ok) {
          throw new Error(`ユーザー情報の取得に失敗しました: ${bookmark.user_id}`);
        }
        return userResponse.json();
      });

      const userDetails = await Promise.all(userDetailsPromises);
      setBookmarks(userDetails);
    } catch (error) {
      console.error('ブックマークの取得中にエラーが発生しました:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              ブックマーク一覧
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              ブックマークを表示するにはログインが必要です
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              ブックマーク一覧
            </h2>
            <p className="mt-4 text-lg text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            ブックマーク一覧
          </h2>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">ブックマークはありません</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => (
              <UserCard
                key={bookmark.id}
                user={bookmark}
                currentUserId={user.id}
                isInitiallyBookmarked={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 