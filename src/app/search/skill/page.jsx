'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Tag from '../../../components/Tag';
import UserCard from '../../../components/UserCard';

export default function SkillPage() {
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/skills`);
        const data = await response.json();
        console.log('取得したスキルデータ:', data);
        setSkills(data);
      } catch (error) {
        console.error('スキルデータの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillClick = (skillName) => {
    // スキル名をクエリパラメータとしてエンコードし、結果ページに遷移
    const encodedSkill = encodeURIComponent(skillName);
    router.push(`/search/skill/results?q=${encodedSkill}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🔍</span>
            <h1 className="text-3xl font-bold">スキルから探す</h1>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleSkillClick(skill.name)}
                >
                  <Tag text={skill.name} />
                </div>
              ))}
            </div>

            {selectedSkill && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-center mb-8">
                  {selectedSkill.name}のスキルを持つメンバー
                </h2>
                {selectedSkill.users.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedSkill.users.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600">
                    このスキルを持つメンバーはまだいません
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
