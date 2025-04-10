'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
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
          console.log('Fetching department:', departmentName);
          const response = await fetch(`/api/departments/${encodeURIComponent(departmentName)}`);
          const data = await response.json();
          console.log('API Response:', JSON.stringify(data, null, 2));
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

  const handleUserClick = (userId) => {
    router.push(`/user/${userId}`);
  };

  return (
    <div className="relative z-20 min-h-screen py-12">
      <div className="max-w-6xl w-full mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-normal font-sans-jp mb-4 text-white tracking-widest">部署検索結果</h2>
          <div className="flex items-center justify-center gap-2">
            <p className="text-gray-400 font-sans-jp">選択した部署:</p>
            <Tag text={departmentName} />
          </div>
        </div>

        {users && users.length > 0 ? (
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
            <p>この部署にはまだメンバーがいません</p>
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