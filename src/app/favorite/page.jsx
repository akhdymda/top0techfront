'use client';

import { useState, useEffect, Suspense } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Sparkles } from 'lucide-react';
import UserCard from '../../components/UserCard';
import { useRouter } from 'next/navigation';

function FavoriteContent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userIds = [1, 2, 3, 4, 5, 6];
        const userPromises = userIds.map(id =>
          fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${id}`)
            .then(res => res.json())
        );
        
        const usersData = await Promise.all(userPromises);
        setUsers(usersData);
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 animate-pulse">CHOTTO</h1>
          <Sparkles className="animate-spin" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-20 min-h-screen py-12">
      <div className="max-w-6xl w-full mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-normal font-sans-jp mb-4 text-white tracking-widest">お気に入り</h2>
        </div>

        {users && users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer"
                onClick={() => router.push(`/user/${user.id}`)}
              >
                <UserCard key={user.id} user={user} isInitiallyBookmarked={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p>お気に入りのユーザーがいません</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FavoriteLoading() {
  return (
    <div className="flex justify-center items-center py-32">
      <p className="text-gray-400 text-xl">お気に入りを読み込んでいます...</p>
    </div>
  );
}

export default function FavoritePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="relative flex-1 bg-black text-white pt-16">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-2154/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />
        
        <Suspense fallback={<FavoriteLoading />}>
          <FavoriteContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}