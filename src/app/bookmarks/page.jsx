'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserCard from '../../components/UserCard';
import { useAuth } from '../../contexts/AuthContext';

export default function BookmarksPage() {
  const router = useRouter();
  const [bookmarkedUsers, setBookmarkedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookmarkedUsers = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bookmarks/${user.id}`
        );
        if (!response.ok) {
          throw new Error('ブックマークの取得に失敗しました');
        }
        const data = await response.json();
        setBookmarkedUsers(data);
      } catch (error) {
        console.error('Error fetching bookmarked users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedUsers();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <p className="text-white text-xl">ログインが必要です</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Header />
      <div className="max-w-6xl w-full mx-auto px-6 py-12">
        <h1 className="text-4xl font-normal font-sans-jp mb-12 text-white tracking-widest text-center">
          ブックマーク
        </h1>

        {bookmarkedUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedUsers.map((user) => (
              <UserCard 
                key={user.id} 
                user={user}
                currentUserId={user.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p>ブックマークしたユーザーはいません</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 