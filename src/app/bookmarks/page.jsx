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
      setBookmarks(data.bookmarks);
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
            <h2 className="text-3xl font-bold text-gray-900">
              ブックマーク一覧
            </h2>
            <p className="mt-4 text-lg text-gray-600">読み込み中...</p>
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
            <p className="mt-4 text-lg text-red-600">{error}</p>
            <button
              onClick={fetchBookmarks}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              再読み込み
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            ブックマーク一覧
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            気になるユーザーをチェックしましょう
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">ブックマークはまだありません</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => (
              <UserCard
                key={bookmark.id}
                user={bookmark}
                currentUserId={user.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 