'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import UserCard from '../../../../components/UserCard';
import Tag from '../../../../components/Tag';

// 検索パラメータを使用するコンポーネントを分離
function SkillSearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const skillName = searchParams.get('q');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (skillName) {
        setLoading(true);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/skills/${encodeURIComponent(skillName)}`);
          const data = await response.json();
          setUsers(data.users || []);
        } catch (error) {
          console.error('スキル検索エラー:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResults();
  }, [skillName]);

  return (
    <div>
      <div className="flex justify-center gap-2 mb-6">
        <span className="text-2xl">💡</span>
        <h2 className="text-3xl font-bold">スキル検索結果</h2>
      </div>

      <div className="text-center mb-8">
        <Tag text={skillName} />
        <p className="text-xl text-gray-600 mt-4">
          のスキルを持つメンバー
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-600">
              このスキルを持つメンバーは見つかりませんでした
            </div>
          )}
        </div>
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
      <p className="text-gray-500">スキル検索結果を読み込んでいます...</p>
    </div>
  );
}

// メインのページコンポーネント
export default function SkillSearchResults() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Suspense fallback={<SearchResultsLoading />}>
          <SkillSearchResultsContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
} 