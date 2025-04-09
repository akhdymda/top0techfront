'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import UserCard from '../../../../components/UserCard';
import Tag from '../../../../components/Tag';

function SkillSearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const skillName = searchParams.get('q');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/skills/${encodeURIComponent(skillName)}`);
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error('ユーザーデータの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    if (skillName) {
      fetchUsers();
    }
  }, [skillName]);

  // if (loading) {
  //   return (
  //     <div className="fixed inset-0 bg-black text-white flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-4xl font-bold mb-4 animate-pulse">CHOTTO</h1>
  //         <Sparkles className="animate-spin" size={32} />
  //       </div>
  //     </div>
  //   );
  // }

  const handleUserClick = (userId) => {
    router.push(`/user/${userId}`);
  };

  return (
    <div className="relative z-20 min-h-screen py-12">
      <div className="max-w-6xl w-full mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-normal font-sans-jp mb-4 text-white tracking-widest">スキル検索結果</h2>
          <div className="flex items-center justify-center gap-2">
            <p className="text-gray-400 font-sans-jp">選択したスキル:</p>
            <Tag text={skillName} />
          </div>
        </div>

        {users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer"
                onClick={() => handleUserClick(user.id)}
              >
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
  );
}

function SearchResultsLoading() {
  return (
    <div className="flex justify-center items-center py-32">
      <p className="text-gray-400 text-xl">検索結果を読み込んでいます...</p>
    </div>
  );
}

export default function SkillSearchResultsPage() {
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
        
        <div className="relative z-20 min-h-screen bg-black/90 pt-20">
          <Suspense fallback={<SearchResultsLoading />}>
            <SkillSearchResultsContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
