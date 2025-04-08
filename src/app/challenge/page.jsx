'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Challenge() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'movie', name: '動画' },
    { id: 'data', name: 'データ' },
    { id: 'study', name: '勉強会' },
    { id: 'book', name: '読書会' }
  ];

  const challenges = [
    {
      id: 1,
      title: '動画マーケの相談も"CHOTTO"で',
      description: '東京ガス料理教室をもっと多くの方に届けたいと思い、YouTubeでの展開も検討中。でもYouTubeユーザーの嗜好に合った動画制作やマーケティングに詳しい方が社内にいるのか分からなくて…というご相談が。そこで「CHOTTO」でスキル検索をしたところ、以前広報動画を手掛けた経験のある方とマッチング！撮影から編集、配信までの流れを一緒に組み立てられました。',
      category: 'movie',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920',
      date: '2024年3月'
    },
    {
      id: 2,
      title: 'データに強い人とつながりたい！',
      description: 'ハウスクリーニングサービスを閲覧したユーザーにアプローチしたい。でも、東京ガス会員のアクセスデータをどう活かしたらいいか分からない…「CHOTTO」でアクセスデータに詳しい社員を探したところ、カスタマーデータ分析チームの担当者とマッチ。分析視点を取り入れたマーケティング施策が実現しました。',
      category: 'data',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1920',
      date: '2024年2月'
    },
    {
      id: 3,
      title: "「読者会」ってアリかも？",
      description: "「サブスクリプション――『顧客の成功』が収益を生む新時代のビジネスモデル」を読んで感銘を受けた社員が、「この本を読んだ人と意見交換したい！」と「CHOTTO」に投稿。読了済みの社員数名と読者会を開催し、東京ガスの会員向けサブスク施策に関する新しい視点が生まれました。",
      category: 'book',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920',
      date: '2024年1月'
    },
    {
      id: 4,
      title: '生成AIを活用したOne to Oneマーケティングツール「AIGNIS-marketing」勉強会',
      description: '最新AI技術を活用したマーケティング手法に関心が集まり、多くの質問とディスカッションが交わされました。',
      category: 'study',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920',
      date: '2023年12月'
    }
  ];

  const filteredChallenges = activeCategory === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.category === activeCategory);

  const handleBack = () => {
    sessionStorage.setItem('skipIntro', 'true');
    window.location.href = '/search#search-section';
  };

  return (
    <div className="min-h-screen flex flex-col bg-black/90 text-white">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl md:text-4xl font-bold">これまでの取り組み</h1>
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? 'bg-[#A5C05B] text-black'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChallenges.map(challenge => (
              <div
                key={challenge.id}
                className="group relative overflow-hidden rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="aspect-video relative">
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-[#A5C05B] text-black text-sm rounded-full">
                      {categories.find(c => c.id === challenge.category)?.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold group-hover:text-[#A5C05B] transition-colors">
                      {challenge.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-gray-400 mb-4">{challenge.description}</p>
                  <p className="text-sm text-gray-500">{challenge.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
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