'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import UserCard from '../../../components/UserCard';

// 仮のデータ（後でバックエンドから取得）
// const mockUser = {
//   name: "高橋健人",
//   department: "リビング電気部",
//   yearsOfService: 13,
//   specialty: "技術",
//   image: "/sample-avatar.png",
//   skills: ["Webマーケティング全般", "データ分析と計測", "コンテンツマーケティング", "SNSマーケティング"]
// };

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("クエリパラメータ（query）:", query); 

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/search?q=${encodeURIComponent(query)}`);
          const data = await res.json();
          setUsers(data);
        } catch (error) {
          console.error('検索エラー:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResults();
  }, [query]);

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

        <div className="relative z-20 min-h-screen py-12">
          <div className="max-w-6xl w-full mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-normal font-sans-jp mb-4 text-white tracking-widest">検索結果</h2>
              <div className="flex items-center justify-center gap-2">
                <p className="text-gray-400 font-sans-jp">検索ワード:</p>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full text-white">
                  {query === 'all' ? 'すべて' : query}
                </span>
              </div>
            </div>

            {users.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <div key={user.id} className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all">
                    <UserCard user={user} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <p>該当するユーザーが見つかりませんでした。</p>
              </div>
            )}

            <div className="mt-12 text-center">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full hover:bg-white/20 transition-all text-white"
              >
                <ArrowLeft size={20} />
                戻る
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
