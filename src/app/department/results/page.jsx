'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import UserCard from '../../../components/UserCard';
import Tag from '../../../components/Tag';

// 検索パラメータを使用するコンポーネントを分離
function DepartmentSearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const departmentName = searchParams.get('q');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (departmentName) {
        setLoading(true);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/departments/${encodeURIComponent(departmentName)}`);
          const data = await response.json();
          setUsers(data.users || []);
        } catch (error) {
          console.error('部署検索エラー:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResults();
  }, [departmentName]);

  return (
<<<<<<< HEAD
=======
    <div>
      <div className="flex justify-center gap-2 mb-6">
        <span className="text-2xl">🏢</span>
        <h2 className="text-3xl font-bold">部署検索結果</h2>
      </div>

      <div className="text-center mb-8">
        <Tag text={departmentName} />
        <p className="text-xl text-gray-600 mt-4">
          のメンバー一覧
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
              この部署にはまだメンバーがいません
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
      <p className="text-gray-500">結果を読み込んでいます...</p>
    </div>
  );
}

// メインのページコンポーネント
export default function DepartmentSearchResults() {
  return (
>>>>>>> main
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
<<<<<<< HEAD
        <div>
          <div className="flex justify-center gap-2 mb-6">
            <span className="text-2xl">🏢</span>
            <h2 className="text-3xl font-bold">部署検索結果</h2>
          </div>

          <div className="text-center mb-8">
            <Tag text={departmentName} />
            <p className="text-xl text-gray-600 mt-4">
              のメンバー一覧
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
                  この部署にはまだメンバーがいません
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-8">
          <button
            className="text-sm text-gray-600 hover:text-gray-800"
            onClick={() => router.back()}
          >
            戻る
          </button>
        </div>
=======
        <Suspense fallback={<SearchResultsLoading />}>
          <DepartmentSearchResultsContent />
        </Suspense>
>>>>>>> main
      </main>

      <Footer />
    </div>
  );
} 