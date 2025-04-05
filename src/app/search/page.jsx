'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDown, ArrowUpRight, Search as SearchIcon, Sparkles, Cloud } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Search() {
  console.log('🟢 Search コンポーネント表示中！');
  const [activeSection, setActiveSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  console.log("🎯 isLoading の状態:", isLoading);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log("ローディング開始");
    const timer = setTimeout(() => {
      console.log("isLoading false に変更されました");
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const scrollTimer = setTimeout(() => {
        const searchSection = document.getElementById('search-section');
        searchSection?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 3000); // アニメーションの最後の要素（ArrowDown）のアニメーションが終わる1.6秒後に実行
      return () => clearTimeout(scrollTimer);
    }
  }, [isLoading]);

  const sections = [
    {
      title: "Challenge",
      description: "これまでの取り組み",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920",
    },
    {
      title: "Growth",
      description: "勉強会",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1920",
    },
    {
      title: "Innovation",
      description: "革新的なアイデアの実現",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920",
    }
  ];

  const handleScrollToSearch = () => {
    const searchSection = document.getElementById('search-section');
    searchSection?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleScrollToConst = () => {
    console.log("Constセクションへの遷移を試みます");
    const constSection = document.querySelector('.py-12.md\\:py-20');
    if (constSection) {
      console.log("Constセクションが見つかりました");
      constSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.log("Constセクションが見つかりませんでした");
    }
  };
  
  const handleSearch = () => {
    const searchQuery = query.trim() || 'all';
    router.push(`/search/results?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
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
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="relative flex-1 bg-black h-[250vh] text-white pt-16">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-2154/1080p.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />

        <div className="relative z-20 h-[80vh] flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-left space-y-4 md:space-y-8">
                <div className="flex justify-center space-x-2 md:space-x-4">
                  {'CHOTTO'.split('').map((letter, index) => (
                    <span
                      key={index}
                      className={`text-4xl md:text-8xl font-semibold font-sans animate-drop-in delay-${index*100} opacity-0`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mt-8 md:mt-12">
                  <p className="text-2xl md:text-4xl font-normal font-sans opacity-0 animate-[dropIn_1s_1.2s_forwards]">
                    Make Challenge
                  </p>
                  <p className="text-2xl md:text-4xl font-normal font-sans opacity-0 animate-[dropIn_1s_1.4s_forwards]">
                    Your Everyday.
                  </p>
                </div>
                <div 
                  onClick={handleScrollToSearch}
                  className="cursor-pointer w-8 h-20 md:w-12 md:h-32 mx-auto mt-8 md:mt-12 opacity-0 animate-[dropIn_1s_1.6s_forwards]"
                >
                  <ArrowDown className="w-full h-full animate-bounce-slow" strokeWidth={1} />
                </div>
              </div>
              <div className="relative w-[200px] h-[145px] md:w-[400px] md:h-[290px] ml-auto">
                <div className="absolute inset-0 border-2 border-white rounded-full animate-spin-slow" />
                <div className="absolute inset-[3px] border-2 border-white rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                <div className="absolute inset-[6px] border-2 border-white rounded-full animate-spin-slow" style={{ animationDuration: '15s' }} />
                <div className="absolute inset-[9px] border-2 border-white rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
                <div className="absolute inset-[12px] border-2 border-white rounded-full animate-spin-slow"/>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Search Section */}
      <div id="search-section" className="min-h-screen flex items-center justify-center bg-black/90 relative">
        <div className="max-w-4xl w-full mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-normal font-sans-jp mb-4 text-white tracking-widest">CHOTTO</h2>
            <p className="text-sm md:text-base text-gray-400 font-sans-jp">ちょっと聞きたい。ちょっと話したい。から何か生まれるかも。</p>
          </div>
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`あのスキル持った人いないかな？\nこないだ読んだあの本の話したいな。\nこのプロジェクトやってたのって誰だっけ？`}
              className="w-full h-32 md:h-48 pl-12 pr-4 pt-4 pb-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/15 whitespace-pre-line text-sm md:text-base"
            />
            <SearchIcon className="absolute left-4 top-4 text-white/50" size={20} />
          </div>
          <div className="mt-8 flex flex-col items-center gap-8 md:gap-12">
            <button
              onClick={() => router.push('/search/results')}
              className="w-full md:w-auto px-8 md:px-28 py-3 bg-gradient-to-r from-white to-gray-100 text-black rounded-full hover:from-gray-100 hover:to-white transition-all duration-300 font-sans-jp text-base md:text-lg tracking-widest flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Cloud className="w-5 h-5 md:w-7 md:h-7" />
              ふわっと探す
            </button>
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 w-full md:w-auto">
              <a
                href="/search/skill"
                className="w-full md:w-80 px-8 py-3 bg-gradient-to-r from-[#A5C05B] to-[#8DA44B] text-white rounded-full hover:from-[#8DA44B] hover:to-[#A5C05B] transition-all duration-300 font-sans-jp text-center whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                スキルから探す人はこちら
              </a>
              <a
                href="/search/department"
                className="w-full md:w-80 px-8 py-3 bg-gradient-to-r from-[#7BA4A8] to-[#5B8A8E] text-white rounded-full hover:from-[#5B8A8E] hover:to-[#7BA4A8] transition-all duration-300 font-sans-jp text-center whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                部署から探す人はこちら
              </a>
              <a
                href="/department-search"
                className="w-full md:w-80 px-8 py-3 bg-gradient-to-r from-[#D09683] to-[#B87A67] text-white rounded-full hover:from-[#B87A67] hover:to-[#D09683] transition-all duration-300 font-sans-jp text-center whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                読書仲間から探す人はこちら
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 right-8 md:right-20 opacity-50 animate-bounce-slow cursor-pointer" 
          onClick={() => {
            console.log("三角ボタンがクリックされました");
            handleScrollToConst();
          }}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-400/50 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[4px] md:border-l-[6px] border-l-transparent border-t-[6px] md:border-t-[8px] border-t-gray-300 border-r-[4px] md:border-r-[6px] border-r-transparent"></div>
          </div>
        </div>
      </div>

      {/* Dynamic Sections */}
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div className="space-y-6 md:space-y-8">
              {sections.map((section, index) => (
                <div
                  key={section.title}
                  className={`cursor-pointer transition-all duration-500 ${
                    activeSection === index ? 'opacity-100' : 'opacity-50'
                  }`}
                  onMouseEnter={() => setActiveSection(index)}
                >
                  <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    {section.title}
                    <ArrowUpRight className={`transition-transform ${
                      activeSection === index ? 'translate-x-1 -translate-y-1' : ''
                    }`} />
                  </h3>
                  <p className="text-sm md:text-base text-gray-400">{section.description}</p>
                </div>
              ))}
            </div>
            <div className="relative h-[300px] md:h-[600px] overflow-hidden rounded-2xl">
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

      <Footer />
    </div>
  );
}
