'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function RecommendedBook() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleBack = () => {
    sessionStorage.setItem('skipIntro', 'true');
    window.location.href = '/search#search-section';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // フォーム送信処理を実装
    console.log('フォーム送信:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const currentBook = {
    id: 1,
    title: 'サブスクリプション――「顧客の成功」が収益を生む新時代のビジネスモデル',
    author: 'Tien Tzuo',
    description: 'サブスクリプションビジネスの本質と成功の秘訣を解説。顧客との長期的な関係構築と持続可能な収益モデルについて学べます。',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1920'
  };

  const pastBooks = [
    {
      id: 2,
      title: '生成AI時代のビジネス戦略',
      author: '山田 太郎',
      description: '生成AIの最新動向とビジネスへの応用方法を解説。実践的な活用事例と今後の展望について学べます。',
      image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=1920'
    },
    {
      id: 3,
      title: 'デジタル・トランスフォーメーション',
      author: '佐藤 一郎',
      description: '企業のデジタル化戦略と成功事例を紹介。DX推進の具体的な方法論と実践的なアドバイスを提供します。',
      image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=1920'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black/90 text-white">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-normal">Recommended Book</h1>
            <p className="text-gray-400">おすすめの本や読書会のご案内</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* 現在の本の紹介 */}
            <div className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
              <div className="aspect-video relative">
                <img
                  src={currentBook.image}
                  alt={currentBook.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{currentBook.title}</h3>
                <p className="text-gray-400 mb-4">{currentBook.author}</p>
                <p className="text-gray-400">{currentBook.description}</p>
              </div>
            </div>

            {/* 読書会情報と参加フォーム */}
            <div className="bg-white/5 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">読書会のご案内</h2>
              <p className="text-gray-400 mb-4">毎月、おすすめの本の読書会を開催しています。参加者同士で意見を交換し、新しい視点を得ることができます。興味のある方は、以下のフォームから予約をお願いします。</p>
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-medium mb-2">日時</h3>
                  <p className="text-gray-400">2024年4月20日（土）14:00-16:00</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">場所</h3>
                  <p className="text-gray-400">会議室1（本社ビル3階）</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">定員</h3>
                  <p className="text-gray-400">10名（先着順）</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">お名前</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5C05B]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">メールアドレス</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5C05B]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#A5C05B] text-black rounded-full hover:bg-[#8DA44B] transition-colors"
                >
                  予約する
                </button>
              </form>
            </div>
          </div>

          {/* 過去の紹介本 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">過去の紹介本</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastBooks.map(book => (
                <div
                  key={book.id}
                  className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
                >
                  <div className="aspect-video relative">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                    <p className="text-gray-400 mb-4">{book.author}</p>
                    <p className="text-gray-400">{book.description}</p>
                  </div>
                </div>
              ))}
            </div>
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