'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import UserCard from '../../../../components/UserCard';
import Tag from '../../../../components/Tag';

export default function DepartmentSearchResultsContent() {
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
    <div>
      <div className="flex justify-center gap-2 mb-6">
        <span className="text-2xl">🏢</span>
        <h2 className="text-3xl font-bold">部署検索結果</h2>
      </div>

      <div className="text-center mb-8">
        <Tag text={departmentName} />
        <p className="text-xl text-gray-600 mt-4">のメンバー一覧</p>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      ) : users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="col-span-2 text-center text-gray-600">
          この部署にはまだメンバーがいません
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