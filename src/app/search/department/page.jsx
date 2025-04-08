'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, Sparkles, ArrowLeft } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function DepartmentPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('部署データを取得中...');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/departments`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('部署データを取得しました:', data);
      setDepartments(data);
    } catch (error) {
      console.error('部署データの取得に失敗しました:', error);
      setError('部署データの取得に失敗しました。ページを更新してください。');
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentClick = (departmentName) => {
    const encodedDepartment = encodeURIComponent(departmentName);
    router.push(`/search/department/results?q=${encodedDepartment}`);
  };

  const handleSearch = () => {
    if (query.trim()) {
      const filteredDepartments = departments.filter(dept => 
        dept.name.toLowerCase().includes(query.toLowerCase())
      );
      setDepartments(filteredDepartments);
    } else {
      fetchDepartments();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
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
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>
        <main className="relative flex-1 bg-black text-white pt-16">
          <div className="max-w-4xl w-full mx-auto px-6 py-12 text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-500">エラーが発生しました</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchDepartments}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg hover:bg-white/20 transition-all text-white"
            >
              再読み込み
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="relative flex-1 bg-[#7BA4A8] h-[250vh] text-white pt-16">
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-2154/1080p.mp4" type="video/mp4" />
        </video> */}

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10 z-10" />

        <div className="relative z-20 min-h-screen flex items-center justify-center bg-black/90">
          <div className="max-w-4xl w-full mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-normal font-sans-jp mb-4 text-white tracking-widest">部署から探す</h2>
              <p className="text-gray-400 font-sans-jp">気になる部署の人を見つけましょう</p>
            </div>

            <div className="relative mb-8">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="部署を検索"
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={24} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((department, index) => (
                <div 
                  key={index}
                  onClick={() => handleDepartmentClick(department.name)}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[160px] text-center"
                >
                  <div className="text-white text-lg font-medium mb-2">{department.name}</div>
                  {department.description && (
                    <p className="text-gray-400 text-sm">{department.description}</p>
                  )}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white/60 text-sm">クリックして詳細を見る →</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push('/search')}
              className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full p-4 hover:bg-white/20 transition-all text-white"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 