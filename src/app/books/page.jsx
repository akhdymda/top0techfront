'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BookCard from '../../components/BookCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';

// 本のデータリスト
const booksList = [
  { id: 1, title: "最新マーケティングの教科書2024", author: "日経BPムック", description: "これは『最新マーケティングの教科書2024』という本の仮の説明です。デジタルマーケティングの最新動向がまとめられています。" },
  { id: 2, title: "手にとるようにわかる デジタルマーケティング入門", author: "宇都雅史", description: "デジタルマーケティングを初めて学ぶ人向けに基礎を丁寧に解説した入門書です。" },
  { id: 3, title: "デジタルマーケティングの教科書", author: "牧田幸裕", description: "体系的にマーケティングを学べる教科書形式の一冊です。" },
  { id: 4, title: "デジタルマーケティングの定石", author: "垣内勇威", description: "成果を上げるための定番パターンを集約した実践的ガイドです。" },
  { id: 5, title: "マンガでわかるWebマーケティング", author: "村上佳代", description: "マンガ形式で学べる楽しくわかりやすいWebマーケティングの入門書です。" },
  { id: 6, title: "1冊目に読みたい デジタルマーケティングの教科書", author: "神崎健太・佐々木塁", description: "初心者向けに基礎をわかりやすく解説した一冊です。" },
  { id: 7, title: "AIと共に拓く デジタルマーケティング完全攻略バイブル", author: "小池英樹", description: "AIの活用を含めたデジタルマーケティングの実践ガイドです。" },
  { id: 8, title: "デジタルマーケティング用語図鑑", author: "竹内哲也", description: "マーケティング用語をわかりやすく図解で解説した用語集です。" },
  { id: 9, title: "日本一詳しいWeb集客術「デジタル・マーケティング超入門」", author: "森和吉", description: "Web集客の基本から応用までを丁寧に解説しています。" },
  { id: 10, title: "沈黙のWebマーケティング", author: "松尾茂起", description: "ストーリー形式でWebマーケティングの考え方が学べます。" },
  { id: 11, title: "いちばんやさしい新しいSEOの教本", author: "安川洋", description: "最新のSEOの基本をやさしく解説した一冊です。" },
  { id: 12, title: "スピードマスター 1時間でわかる SEO対策", author: "小岩和男", description: "短時間でSEOの要点を理解できるガイドブックです。" },
  { id: 13, title: "10年つかえるSEOの教科書", author: "鈴木将司", description: "長期間通用するSEOの基礎と考え方が学べます。" },
  { id: 14, title: "沈黙のWebライティング", author: "松尾茂起", description: "文章で成果を出すためのWebライティングの技術を解説しています。" },
  { id: 15, title: "成果を出し続けるための 王道SEO対策 実践講座", author: "鈴木良治", description: "成果を継続的に出すためのSEO施策を体系的に学べます。" },
  { id: 16, title: "はじめてでもよくわかる！デジタルマーケティング集中講義", author: "小川卓", description: "初心者にも理解しやすい集中講義スタイルで解説した本です。" },
  { id: 17, title: "ドリルを売るには穴を売れ", author: "佐藤義典", description: "顧客視点のマーケティング発想法を学べる名著です。" },
  { id: 18, title: "たった一人の分析から事業は成長する 実践 顧客起点マーケティング", author: "西口一希", description: "顧客を起点にした分析とマーケティング実践法を紹介しています。" },
  { id: 19, title: "いちばんやさしいデジタルマーケティングの教本", author: "田村修", description: "誰にでもわかりやすく書かれたマーケティング入門書です。" },
  { id: 20, title: "デジ単 デジタルマーケティングの単語帳", author: "佐藤達郎", description: "重要単語を一覧でまとめ、学習に便利な単語帳形式の一冊です。" },
  { id: 21, title: "アドテクノロジーの教科書", author: "岩本崇", description: "広告技術の仕組みと実践知識を体系的に学べる教科書です。" },
  { id: 22, title: "ザ・アドテクノロジー", author: "小泉耕二", description: "広告技術の実態と今後の展望を解説した専門書です。" },
  { id: 23, title: "データ・ドリブン・マーケティング", author: "マーク・ジェフリー", description: "データに基づいたマーケティングの意思決定手法を学べる一冊です。" },
  { id: 24, title: "マンガでわかる デジタルマーケティング", author: "西井敏恭", description: "マンガを通じて親しみやすく学べるデジタルマーケティング入門書です。" },
  { id: 25, title: "小さな会社の勝算", author: "山本琢磨", description: "中小企業が勝ち抜くためのデジタル活用戦略を紹介しています。" },
  { id: 26, title: "ファンダメンタルズ×テクニカル マーケティング", author: "山本一郎", description: "マーケティングの本質を理論と実践から多面的に解説しています。" },
  { id: 27, title: "デジタルマーケティングで売上の壁を超える方法", author: "西井敏恭", description: "売上向上に繋げるデジタル施策を実例を交えて紹介しています。" },
  { id: 28, title: "アナログ×デジタル 超絶体験から生まれた奇跡のマーケティング", author: "田中仁", description: "体験価値を中心としたマーケティング手法を紹介した一冊です。" },
  { id: 29, title: "BtoB製造業のコミュニケーション革命", author: "佐藤元則", description: "製造業におけるマーケティング・営業変革のヒントが詰まった本です。" },
  { id: 30, title: "デジタルマーケティングの基礎", author: "田村修", description: "デジタルマーケティングの基礎をしっかり理解できる教科書です。" },
  { id: 31, title: "ゼロから学ぶデジタルマーケティング", author: "山崎秀夫", description: "初心者向けにマーケティングを基礎から丁寧に解説しています。" },
  { id: 32, title: "デジタルマーケティング完全攻略", author: "佐々木健", description: "マーケティング実務に役立つノウハウを網羅的に学べる一冊です。" },
  { id: 33, title: "デジタルマーケティング大全", author: "田中洋", description: "あらゆる手法と理論を包括したマーケティングの決定版です。" },
  { id: 34, title: "デジタルマーケティング見るだけノート", author: "鈴木利典", description: "図解を中心に理解しやすくまとめたビジュアルガイドです。" },
  { id: 35, title: "マーケティングのデジタル化5つの本質", author: "田中洋", description: "デジタル時代の本質を捉えたマーケティング戦略書です。" },
  { id: 36, title: "マーケティング・マネジメント 原書16版", author: "フィリップ・コトラー", description: "世界的に支持されるマーケティングのバイブルです。" },
  { id: 37, title: "コトラーのマーケティング5.0", author: "フィリップ・コトラー", description: "最新の技術を活用したマーケティングの未来像を提示します。" },
  { id: 38, title: "サブスクリプション――「顧客の成功」が収益を生む新時代のビジネスモデル", author: "ティエン・ツォ、ゲイブ・ワイザート", description: "サブスクリプションビジネスの本質とその運用戦略を解説しています。" }
];

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // 検索機能の実装
  const filteredBooks = booksList.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        
        <div className="relative z-20 min-h-screen bg-black/90 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-normal font-sans-jp mb-2 sm:mb-4 text-white tracking-widest">読書仲間から探す</h2>
              <p className="text-sm sm:text-base text-gray-400 font-sans-jp">本を通じて新しい出会いを見つけましょう</p>
            </div>
            
            {/* 検索バー */}
            <div className="relative mb-6 sm:mb-8 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="本のタイトルや著者名で検索..."
                className="w-full pl-12 pr-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50 text-sm sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
            </div>

            {/* 本のリスト */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 sm:p-6 hover:bg-white/20 transition-all cursor-pointer"
                  onClick={() => router.push(`/books/${book.id}/readers`)}
                >
                  <h2 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">{book.title}</h2>
                  <p className="text-sm sm:text-base text-gray-300 mb-2">著者：{book.author}</p>
                  <p className="text-sm text-gray-400 line-clamp-3">{book.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-12 text-center">
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border-2 border-white/20 text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                トップページに戻る
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 