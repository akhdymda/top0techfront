'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Search as SearchIcon } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Connect() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBack = () => {
    sessionStorage.setItem('skipIntro', 'true');
    window.location.href = '/search#search-section';
  };

  const tabs = [
    { id: 'all', name: 'すべて' },
    { id: 'skill', name: 'スキル' },
    { id: 'project', name: 'プロジェクト' },
    { id: 'study', name: '勉強会' },
    { id: 'other', name: 'その他' }
  ];

  const posts = [
    {
      id: 1,
      title: 'ReactとTypeScriptに詳しい人探しています',
      description: '新規プロジェクトでReactとTypeScriptを使用したフロントエンド開発を担当するメンバーを募集しています。経験年数は問いません。',
      category: 'skill',
      date: '2024年3月15日',
      author: '山田 太郎',
      department: '開発部'
    },
    {
      id: 2,
      title: 'AIを活用した新規サービス開発メンバー募集',
      description: '生成AIを活用した新規サービスの開発を計画中です。企画から開発まで一緒に取り組める方を募集しています。',
      category: 'project',
      date: '2024年3月14日',
      author: '佐藤 花子',
      department: '企画部'
    },
    {
      id: 3,
      title: 'Pythonデータ分析勉強会参加者募集',
      description: 'Pythonを使用したデータ分析の基礎から実践まで学ぶ勉強会を開催します。初心者大歓迎です。',
      category: 'study',
      date: '2024年3月13日',
      author: '鈴木 一郎',
      department: 'データ分析部'
    }
  ];

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeTab);

  const searchedPosts = searchQuery
    ? filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredPosts;

  return (
    <div className="min-h-screen flex flex-col bg-black/90 text-white">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Connect</h1>
            <button
              onClick={() => router.push('/connect/new')}
              className="px-4 py-2 bg-[#A5C05B] text-black rounded-full hover:bg-[#8DA44B] transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              新規投稿
            </button>
          </div>

          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="キーワードで検索"
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50"
              />
              <SearchIcon className="absolute left-4 top-3 text-white/50" size={20} />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#A5C05B] text-black'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {searchedPosts.map(post => (
              <div
                key={post.id}
                className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-400 mb-4">{post.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>{post.department}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#A5C05B] text-black text-sm rounded-full">
                    {tabs.find(t => t.id === post.category)?.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div 
          className="fixed bottom-24 right-8 md:right-20 opacity-50 animate-bounce-slow cursor-pointer z-50" 
          onClick={handleBack}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-400/50 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 