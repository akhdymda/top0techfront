'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import SearchUserCard from '../../../components/SearchUserCard';
import { useAuth } from '../../../contexts/AuthContext';

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        let searchQuery = query?.trim() || 'all';
        
        if (searchQuery.length === 0 || /^\s+$/.test(searchQuery)) {
          searchQuery = 'all';
        }

        const encodedQuery = encodeURIComponent(searchQuery);
        const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT.replace(/\/$/, '');
        const apiUrl = `${baseUrl}/search?query=${encodedQuery}`;
        
        console.log('リクエスト詳細:', {
          originalQuery: query,
          processedQuery: searchQuery,
          encodedQuery: encodedQuery,
          fullUrl: apiUrl
        });

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          const errorData = await response.json();
          console.error('APIエラーレスポンス:', errorData);
          throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log('API Response:', JSON.stringify(data, null, 2));
        
        if (!data.results) {
          console.warn('Warning: レスポンスにresultsプロパティがありません:', data);
          setUsers([]);
          return;
        }

        // 重複を除去し、UserCardコンポーネントの期待する形式にデータを変換
        const uniqueUsers = Array.from(new Set(data.results.map(user => user.user_id)))
          .map(userId => {
            const userEntries = data.results.filter(entry => entry.user_id === userId);
            const firstEntry = userEntries[0];
            
            // スキルの重複を除去
            const uniqueSkills = Array.from(new Set(userEntries.map(entry => entry.skill_name)))
              .map(skillName => ({
                id: userEntries.find(entry => entry.skill_name === skillName)?.skill_id,
                name: skillName
              }));
            
            return {
              id: firstEntry.user_id,
              user_id: firstEntry.user_id,
              user_name: firstEntry.user_name,
              name: firstEntry.user_name,
              department_name: firstEntry.department_name,
              yearsOfService: firstEntry.years_of_service,
              joinForm: firstEntry.join_form,
              image_data: firstEntry.image_data,
              image_data_type: firstEntry.image_data_type,
              welcome_level: firstEntry.welcome_level,
              skills: uniqueSkills,
              similarity_score: firstEntry.similarity_score
            };
          });
        
        console.log('Processed users:', uniqueUsers);
        setUsers(uniqueUsers);
      } catch (error) {
        console.error('検索エラー:', error);
        console.error('エラーの詳細:', {
          message: error.message,
          stack: error.stack
        });
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="relative min-h-[50vh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-2154/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <Sparkles className="animate-spin mb-4 text-white" size={32} />
            <p className="text-white">検索結果を読み込んでいます...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-20 min-h-screen py-12">
      <div className="max-w-6xl w-full mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-normal font-sans-jp mb-4 text-white tracking-widest">検索結果</h2>
          <div className="flex items-center justify-center gap-2">
            <p className="text-gray-400 font-sans-jp">検索キーワード:</p>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">{query}</span>
          </div>
        </div>

        {users && users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.user_id}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer"
                onClick={() => router.push(`/user/${user.user_id}`)}
              >
                <SearchUserCard key={user.user_id} user={user} currentUserId={currentUser?.id} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p>検索結果が見つかりませんでした</p>
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
    <div className="relative min-h-[50vh]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-2154/1080p.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <Sparkles className="animate-spin mb-4 text-white" size={32} />
          <p className="text-white">検索結果を読み込んでいます...</p>
        </div>
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
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
        
        <Suspense fallback={<SearchResultsLoading />}>
          <SearchResultsContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
} 