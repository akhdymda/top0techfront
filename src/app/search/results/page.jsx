'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import UserCard from '../../../components/UserCard';
import { Suspense } from 'react';

// 仮のデータ（後でバックエンドから取得）
// const mockUser = {
//   name: "高橋健人",
//   department: "リビング電気部",
//   yearsOfService: 13,
//   specialty: "技術",
//   image: "/sample-avatar.png",
//   skills: ["Webマーケティング全般", "データ分析と計測", "コンテンツマーケティング", "SNSマーケティング"]
// };

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("クエリパラメータ（query）:", query); 

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        setLoading(true);
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

  return (
    <div>
      <div className="flex justify-center gap-2 mb-6">
        <span className="text-2xl">🏢</span>
        <h2 className="text-3xl font-bold">{query}の検索結果</h2>
      </div>

      {users.length > 0 ? (
        <>
          <p className="text-center text-xl text-gray-600 mb-4">
            {query}のメンバー一覧
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-xl text-gray-600 mb-4">
          {query}のメンバーは見つかりませんでした
        </p>
      )}

      {loading && (
        <p className="text-center text-gray-500">読み込み中...</p>
      )}

      <div className="flex justify-end mt-8">
        <button
          className="text-sm text-gray-600 hover:text-gray-800"
          onClick={() => router.back()}
        >
          戻る
        </button>
      </div>
    </div>
  );
}

// フォールバックのローディングコンポーネント
function SearchResultsLoading() {
  return (
    <div className="flex justify-center items-center p-12">
      <p className="text-gray-500">検索結果を読み込んでいます...</p>
    </div>
  );
}

// メインのページコンポーネント
export default function SearchResults() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Suspense fallback={<SearchResultsLoading />}>
          <SearchResultsContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}