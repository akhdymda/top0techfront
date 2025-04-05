'use client';

import React from 'react';
import { Calendar, Clock, Coffee, Mail, MessageCircle } from 'lucide-react';

function App() {
  const handleTeamsClick = () => {
    // Teams deep link integration
    window.open('msteams://', '_blank');
  };

  const handleEmailClick = () => {
    // Email client integration
    window.open('mailto:misaki.sato@company.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f5f1eb] text-gray-800">
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-8 mb-6">
          <div className="flex items-start gap-8">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
            />
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-semibold text-[#4a4541]">高橋健人</h1>
              </div>
              <p className="text-[#6b635d] mb-2">リビング戦略部 / プロジェクトマネージャー</p>
              <div className="flex gap-3 mb-4">
                <span className="text-sm bg-[#e6dfd4] text-[#6b635d] px-3 py-1 rounded-full">
                  社歴 5年目
                </span>
                <span className="text-sm bg-[#e6dfd4] text-[#6b635d] px-3 py-1 rounded-full">
                  新卒採用
                </span>
              </div>
              <div className="mb-4">
                <p className="text-[#6b635d] bg-[#faf7f2] p-4 rounded-lg text-sm border border-[#e6dfd4]">
                  <span className="font-medium text-[#4a4541]">相談歓迎しています！</span>
                  <br />
                  プロジェクト管理やチーム運営について、お気軽にご相談ください。経験を活かしてサポートさせていただきます。
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={handleTeamsClick}
                  className="flex items-center gap-2 bg-[#6b635d] text-white px-4 py-2 rounded-lg hover:bg-[#4a4541] transition-colors"
                >
                  <MessageCircle size={18} />
                  Teamsで連絡
                </button>
                <button 
                  onClick={handleEmailClick}
                  className="flex items-center gap-2 bg-[#e6dfd4] text-[#4a4541] px-4 py-2 rounded-lg hover:bg-[#d8cfc2] transition-colors"
                >
                  <Mail size={18} />
                  メールで連絡
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Expertise Section */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#4a4541]">得意分野</h2>
              <div className="flex flex-wrap gap-2">
                {['プロジェクト管理', 'アジャイル開発', 'チームビルディング', 'デジタルマーケティング', 'コンテンツ戦略'].map((skill) => (
                  <span key={skill} className="bg-[#faf7f2] text-[#6b635d] px-3 py-1 rounded-full text-sm border border-[#e6dfd4]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#4a4541]">経験・実績</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-1 bg-[#e6dfd4] rounded"></div>
                  <div>
                    <h3 className="font-medium text-[#4a4541]">大規模プロジェクトのマネジメント</h3>
                    <p className="text-[#6b635d] text-sm mt-1">
                      100人規模のチームで新規サービスの立ち上げを担当。スケジュール管理からリスク管理まで一貫して対応。
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-1 bg-[#e6dfd4] rounded"></div>
                  <div>
                    <h3 className="font-medium text-[#4a4541]">マーケティング戦略の立案と実行</h3>
                    <p className="text-[#6b635d] text-sm mt-1">
                      複数の新規サービスのマーケティング戦略を担当。ユーザー獲得からブランディングまで幅広く対応。
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Status Section */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#4a4541]">相談可能時間</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#6b635d]">
                  <Calendar size={18} />
                  <span>月・水・金</span>
                </div>
                <div className="flex items-center gap-3 text-[#6b635d]">
                  <Clock size={18} />
                  <span>14:00 - 17:00</span>
                </div>
                <div className="flex items-center gap-3 text-[#6b635d]">
                  <Coffee size={18} />
                  <span>オンライン / 対面</span>
                </div>
              </div>
            </div>

            {/* Thanks Points Section */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#4a4541]">サンクスポイント</h2>
              <div className="bg-[#faf7f2] rounded-lg p-6 border border-[#e6dfd4]">
                <div className="flex items-end gap-2 mb-2">
                  <div className="text-6xl font-bold text-[#6b635d]">50</div>
                  <div className="bg-[#6b635d] rounded-full w-12 h-12 flex flex-col items-center justify-center">
                    <span className="text-white text-xs font-bold">Thank</span>
                    <span className="text-white text-xs font-bold">You</span>
                  </div>
                </div>
                <div className="text-sm text-[#6b635d]">これまでの獲得ポイント</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-8 mt-6">
          <h2 className="text-xl font-semibold mb-6 text-[#4a4541]">自己紹介</h2>
          <div className="space-y-4">
            <p className="text-[#6b635d] leading-relaxed">
              マーケティング部門で新規サービスの企画・推進を担当しています。ユーザー視点を大切にしながら、データドリブンなアプローチで課題解決に取り組んでいます。
            </p>
            <p className="text-[#6b635d] leading-relaxed">
              得意分野はWebマーケティングとデータ分析です。特にコンテンツマーケティングやSNSマーケティングについて、実践的な知見を持っています。新しいチャレンジを通じて、チームの成長に貢献できることを楽しみにしています。
            </p>
            <p className="text-[#6b635d] leading-relaxed">
              趣味は読書と写真撮影です。休日は自然の中でカメラを持って過ごすことが多いです。仕事でもクリエイティブな視点を大切にしています。
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
export default App;
// =======
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function DetailPage() {
//   const router = useRouter();
  
//   return (
//     <div className="min-h-screen flex flex-col bg-[#F5F5F5] p-8">
//       <h1 className="text-2xl font-bold mb-4">詳細ページ</h1>
//       <p className="mb-4">このページは現在開発中です</p>
//       <button 
//         onClick={() => router.back()}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         戻る
//       </button>
//     </div>
//   );
// }
// >>>>>>> main
