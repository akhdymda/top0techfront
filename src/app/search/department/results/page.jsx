'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search as SearchIcon, Sparkles, ArrowLeft } from 'lucide-react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Tag from '../../../../components/Tag';
import UserCard from '../../../../components/UserCard';
import { useAuth } from '../../../../contexts/AuthContext';

export default function DepartmentResultsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  useEffect(() => {
    const department = searchParams.get('department');
    if (department) {
      setSearchQuery(department);
      fetchUsers(department);
    }
  }, [searchParams]);

  const fetchUsers = async (department) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users?department=${encodeURIComponent(department)}`);
      if (!response.ok) {
        throw new Error('ユーザーの取得に失敗しました');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('ユーザーの取得中にエラーが発生しました:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/search/results?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch(e);
    }
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">エラーが発生しました</h2>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => fetchUsers(searchQuery)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              再読み込み
            </button>
          </div>
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
              <h2 className="text-4xl font-normal font-sans-jp mb-4 text-white tracking-widest">部署検索結果</h2>
              <p className="text-gray-400 font-sans-jp">{searchQuery} の検索結果</p>
            </div>

            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="部署を検索..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50"
                />
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <UserCard key={user.id} user={user} currentUserId={user?.id} />
              ))}
            </div>

            {users.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">該当するユーザーが見つかりませんでした</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
