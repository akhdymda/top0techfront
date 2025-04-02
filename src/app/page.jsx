"use client";

import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Search, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      title: "Challenge",
      description: "新しい一歩を踏み出す勇気",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920",
    },
    {
      title: "Growth",
      description: "日々の成長を実感する喜び",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1920",
    },
    {
      title: "Innovation",
      description: "革新的なアイデアの実現",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920",
    }
  ];

  const handleScroll = () => {
    const searchSection = document.getElementById('search-section');
    searchSection?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 animate-pulse">CHOTTO</h1>
          <Sparkles className="animate-spin" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-2154/1080p.mp4" type="video/mp4" />
        </video>
        <div className="relative z-20 h-full flex flex-col">
          <header className="p-6">
            <nav className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">CHOTTO</h1>
              <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
                Contact
              </button>
            </nav>
          </header>
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto px-6">
              <div className="text-left space-y-8">
                <div className="flex space-x-4">
                  {'CHOTTO'.split('').map((letter, index) => (
                    <span
                      key={index}
                      className={`text-8xl font-bold opacity-0 animate-[dropIn_0.5s_ease-out_forwards]`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-bold opacity-0 animate-[dropIn_1s_1.2s_forwards]">
                    Make Challenge
                  </p>
                  <p className="text-4xl font-bold opacity-0 animate-[dropIn_1s_1.4s_forwards]">
                    Your Everyday.
                  </p>
                </div>
                <div 
                  onClick={handleScroll}
                  className="cursor-pointer w-12 h-32 mx-auto mt-12 opacity-0 animate-[dropIn_1s_1.6s_forwards]"
                >
                  <ArrowDown className="w-full h-full animate-bounce-slow" strokeWidth={1} />
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 border-2 border-white rounded-full animate-spin-slow" />
                <div className="absolute inset-[3px] border-2 border-white rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                <div className="absolute inset-[6px] border-2 border-white rounded-full animate-spin-slow" style={{ animationDuration: '15s' }} />
                <div className="absolute inset-[9px] border-2 border-white rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
                <div className="absolute inset-[12px] border-2 border-white rounded-full animate-spin-slow" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div id="search-section" className="min-h-screen flex items-center justify-center bg-black/90">
        <div className="max-w-4xl w-full mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">探す</h2>
            <p className="text-gray-400">あなたの挑戦をサポートする情報を見つけましょう</p>
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="キーワードを入力してください..."
              className="w-full bg-white/10 border-2 border-white/20 rounded-full py-4 px-6 pl-14 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={24} />
          </div>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {['デザイン', 'テクノロジー', 'ビジネス', 'クリエイティブ', 'イノベーション'].map((tag) => (
              <button
                key={tag}
                className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Sections */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div
                  key={section.title}
                  className={`cursor-pointer transition-all duration-500 ${
                    activeSection === index ? 'opacity-100' : 'opacity-50'
                  }`}
                  onMouseEnter={() => setActiveSection(index)}
                >
                  <h3 className="text-3xl font-bold flex items-center gap-2">
                    {section.title}
                    <ArrowUpRight className={`transition-transform ${
                      activeSection === index ? 'translate-x-1 -translate-y-1' : ''
                    }`} />
                  </h3>
                  <p className="text-gray-400">{section.description}</p>
                </div>
              ))}
            </div>
            <div className="relative h-[600px] overflow-hidden rounded-2xl">
              {sections.map((section, index) => (
                <img
                  key={section.title}
                  src={section.image}
                  alt={section.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    activeSection === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}