'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, Sparkles, ArrowLeft } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Tag from '../../../components/Tag';
import UserCard from '../../../components/UserCard';

// ✅ URLを安全に結合する関数を追加
const normalizeUrl = (base, path) =>
  `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;

export default function SkillPage() {
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('スキルデータを取得中...');

      // ✅ 環境変数とエンドポイントを結合（スラッシュ安全）
      const url = normalizeUrl(process.env.NEXT_PUBLIC_API_ENDPOINT, 'skills');
      console.log('Fetch URL:', url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('スキルデータを取得しました:', data);
      setSkills(data);
    } catch (error) {
      console.error('スキルデータの取得に失敗しました:', error);
      setError('スキルデータの取得に失敗しました。ページを更新してください。');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillClick = (skillName) => {
    const encodedSkill = encodeURIComponent(skillName);
    router.push(`/search/skill/results?q=${encodedSkill}`);
  };

  const handleSearch = () => {
    if (query.trim()) {
      const filteredSkills = skills.filter(skill =>
        skill.name.toLowerCase().includes(query.toLowerCase())
      );
      setSkills(filteredSkills);
    } else {
      fetchSkills();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  // ここ以降のUI部分は変更不要なので省略可能（もし全部必要なら前のコードから結合可能です）

  return (
    <div className="text-white bg-black min-h-screen flex flex-col">
      {/* ヘッダーやUIはそのまま */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <main className="pt-20 px-4">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : loading ? (
          <div className="flex justify-center items-center h-60">
            <p>読み込み中...</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl mb-4">スキル一覧</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  onClick={() => handleSkillClick(skill.name)}
                  className="bg-white/10 rounded p-4 cursor-pointer hover:bg-white/20"
                >
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
