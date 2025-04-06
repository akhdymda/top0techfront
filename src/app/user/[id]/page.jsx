'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, MessageCircle, Mail } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Tag from '../../../components/Tag';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log('Fetching user details for ID:', params.id);
        console.log('API URL:', `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${params.id}`);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${params.id}`);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`ユーザーの取得に失敗しました: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log('User data:', data);
        
        if (!data) {
          throw new Error('ユーザーデータが空です');
        }
        
        setUser({
          id: data.id,
          name: data.name,
          department: data.department,
          yearsOfService: data.yearsOfService,
          joinForm: data.joinForm,
          skills: data.skills || [],
          image: data.image || "/default-avatar.png"
        });
        setError(null);
      } catch (error) {
        console.error('ユーザー詳細の取得に失敗しました:', error);
        setError(error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchUserDetails();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 animate-pulse">読み込み中...</h1>
        </div>
      </div>
    );
  }

  // エラーが発生した場合
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
        <Header />
        <main className="flex-1 pt-16">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">エラーが発生しました</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
              >
                <ArrowLeft size={20} />
                戻る
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ユーザーが見つからない場合
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
        <Header />
        <main className="flex-1 pt-16">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">ユーザーが見つかりませんでした</h2>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
              >
                <ArrowLeft size={20} />
                戻る
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />
      <main className="flex-1 pt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold mb-6">マイページ</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex gap-6">
              <Image
                src={user.image}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <p className="text-gray-600 mb-2">{user.department}</p>
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">社歴：{user.yearsOfService}年目</span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{user.joinForm || '未設定'}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F6F2] rounded-lg p-4 my-4 text-center">
              <p>相談歓迎しています！</p>
              <p className="text-sm text-gray-600">プロジェクト管理やチーム運営について、お気軽にご相談ください。経験を活かしてサポートさせていただきます。</p>
            </div>

            <div className="flex gap-4 justify-center">
              <button className="flex items-center gap-2 px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
                <MessageCircle size={20} />
                Teamsで連絡
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
                <Mail size={20} />
                メールで連絡
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">得意分野</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {user.skills && user.skills.map((skill, index) => (
                <Tag key={index} text={skill} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">経験・実績</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">大規模プロジェクトのマネジメント</h4>
                <p className="text-gray-600">100人規模のチームで新規サービスの立ち上げを担当。スケジュール管理からリスク管理まで一貫して対応。</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">マーケティング戦略の立案と実行</h4>
                <p className="text-gray-600">複数の新規サービスのマーケティング戦略を担当。ユーザー獲得からブランディングまで幅広く対応。</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">相談可能時間</h3>
            <div className="space-y-2">
              <p className="text-gray-600">月・水・金</p>
              <p className="text-gray-600">14:00 - 17:00</p>
              <p className="text-gray-600">オンライン / 対面</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">サンクスポイント</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-2">0</div>
              <p className="text-gray-600">今月獲得ポイント</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">フリーコメント</h3>
            <p className="text-gray-600">まだコメントはありません</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 