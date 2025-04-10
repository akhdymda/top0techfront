'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Coffee, Mail, MessageCircle, Bookmark } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function MyPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [thankPoints, setThankPoints] = useState(0);

  const handleTeamsClick = () => {
    // Teams deep link integration
    window.open('msteams://', '_blank');
  };

  const handleEmailClick = () => {
    // Email client integration
    window.open('mailto:misaki.sato@company.com', '_blank');
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleThankClick = () => {
    setThankPoints(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-[#f5f1eb] text-[#6b635d] pt-16">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Profile Header */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#6b635d]/20 p-8">
            <div className="flex items-start gap-8">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-semibold text-[#6b635d]">佐藤 美咲</h1>
                  <button
                    onClick={handleFavoriteClick}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite ? 'text-[#6b635d]' : 'text-[#6b635d]/50 hover:text-[#6b635d]'
                    }`}
                  >
                    <Bookmark className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <p className="text-[#6b635d]/80 mb-2">マーケティング部 / プロジェクトマネージャー</p>
                <div className="flex gap-3 mb-4">
                  <span className="text-sm bg-[#6b635d]/10 text-[#6b635d] px-3 py-1 rounded-full">
                    社歴 5年目
                  </span>
                  <span className="text-sm bg-[#6b635d]/10 text-[#6b635d] px-3 py-1 rounded-full">
                    新卒採用
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-[#6b635d]/80 bg-[#6b635d]/5 p-4 rounded-lg text-sm border border-[#6b635d]/20">
                    <span className="font-medium text-[#6b635d]">相談歓迎しています！</span>
                    <br />
                    プロジェクト管理やチーム運営について、お気軽にご相談ください。経験を活かしてサポートさせていただきます。
                  </p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={handleTeamsClick}
                    className="flex items-center gap-2 bg-[#6b635d] text-white px-4 py-2 rounded-lg hover:bg-[#6b635d]/90 transition-colors"
                  >
                    <MessageCircle size={18} />
                    Teamsで連絡
                  </button>
                  <button 
                    onClick={handleEmailClick}
                    className="flex items-center gap-2 bg-[#6b635d]/10 text-[#6b635d] px-4 py-2 rounded-lg hover:bg-[#6b635d]/20 transition-colors"
                  >
                    <Mail size={18} />
                    メールで連絡
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Expertise Section */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#6b635d]/20 p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#6b635d]">得意分野</h2>
                <div className="flex flex-wrap gap-2">
                  {['プロジェクト管理', 'アジャイル開発', 'チームビルディング', 'デジタルマーケティング', 'コンテンツ戦略'].map((skill) => (
                    <span key={skill} className="bg-[#6b635d]/5 text-[#6b635d] px-3 py-1 rounded-full text-sm border border-[#6b635d]/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Section */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#6b635d]/20 p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#6b635d]">経験・実績</h2>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-1 bg-[#6b635d]/20 rounded"></div>
                    <div>
                      <h3 className="font-medium text-[#6b635d]">大規模プロジェクトのマネジメント</h3>
                      <p className="text-[#6b635d]/80 text-sm mt-1">
                        100人規模のチームで新規サービスの立ち上げを担当。スケジュール管理からリスク管理まで一貫して対応。
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-1 bg-[#6b635d]/20 rounded"></div>
                    <div>
                      <h3 className="font-medium text-[#6b635d]">マーケティング戦略の立案と実行</h3>
                      <p className="text-[#6b635d]/80 text-sm mt-1">
                        複数の新規サービスのマーケティング戦略を担当。ユーザー獲得からブランディングまで幅広く対応。
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Availability Section */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#6b635d]/20 p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#6b635d]">相談可能時間</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#6b635d]/80">
                    <Calendar size={18} />
                    <span>平日 10:00-18:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6b635d]/80">
                    <Coffee size={18} />
                    <span>ランチタイムも可能</span>
                  </div>
                </div>
              </div>

              {/* Thank Points Section */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#4a4541]">サンクスポイント</h2>
                <div className="bg-[#faf7f2] rounded-lg p-6 border border-[#e6dfd4]">
                  <div className="flex items-end gap-2 mb-2 ml-auto w-fit">
                    <div className="text-6xl font-bold text-[#4a4541]">{thankPoints}</div>
                    <div className="bg-[#FF6058] rounded-full w-12 h-12 flex items-center justify-center mb-1 shadow-md shadow-gray-600/50">
                      <span className="text-white text-xs font-bold text-center">
                        Thank<br />You
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-[#6b635d]">今月獲得ポイント</div>
                </div>
              </div>
            </div>
          </div>

          {/* Free Comments Section */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#6b635d]/20 p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#6b635d]">CHOTTOひとこと</h2>
            <div className="space-y-4">
              <p className="text-[#6b635d]/80 text-left py-4">
              新しいことに挑戦するのが好きです。私自身も色んな方と一緒に経験を積んでいきたいので、声かけて頂くのは大歓迎です！休日は、走ってます。マラソン仲間も募集中！
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}