'use client';

import { useState, useEffect, Suspense } from 'react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { Sparkles, ArrowLeft } from 'lucide-react';
import UserCard from '../../../../components/UserCard';
import { useRouter } from 'next/navigation';

function ReadersContent() {
  const [users, setUsers] = useState([]);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 本のデータ
        const bookData = {
          id: 1,
          title: "最新マーケティングの教科書2024",
          author: "日経BPムック",
          description: "これは『最新マーケティングの教科書2024』という本の仮の説明です。デジタルマーケティングの最新動向がまとめられています。"
        };
        setBook(bookData);

        // ダミーユーザーデータの設定
        const userIds = [1, 2, 3];
        const userPromises = userIds.map(id =>
          fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${id}`)
            .then(res => res.json())
        );
        
        const usersData = await Promise.all(userPromises);
        setUsers(usersData);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 animate-pulse">CHOTTO</h1>
          <Sparkles className="animate-spin" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-20 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-normal font-sans-jp mb-4 text-white tracking-widest">この本を読んだユーザー</h2>
        </div>

        {book && (
          <div className="mb-8 sm:mb-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{book.title}</h3>
            <p className="text-sm sm:text-base text-gray-300 mb-2">著者：{book.author}</p>
            <p className="text-sm sm:text-base text-gray-400">{book.description}</p>
          </div>
        )}

        {users && users.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 sm:p-6 hover:bg-white/20 transition-all cursor-pointer"
                onClick={() => router.push(`/user/${user.id}`)}
              >
                <UserCard key={user.id} user={user} isInitiallyBookmarked={false} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p className="text-sm sm:text-base">この本を読んだユーザーはいません</p>
          </div>
        )}

        <div className="mt-8 sm:mt-12 text-center">
          <button
            onClick={() => router.push('/books')}
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border-2 border-white/20 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            本の一覧に戻る
          </button>
        </div>
      </div>
    </div>
  );
}

function ReadersLoading() {
  return (
    <div className="flex justify-center items-center py-20 sm:py-32">
      <p className="text-gray-400 text-base sm:text-xl">データを読み込んでいます...</p>
    </div>
  );
}

export default function ReadersPage() {
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
        
        <Suspense fallback={<ReadersLoading />}>
          <ReadersContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}