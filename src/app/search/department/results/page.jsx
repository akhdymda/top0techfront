'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import DepartmentSearchResultsContent from './content';

export default function DepartmentSearchResultsPage() {
  const router = useRouter();
  const [departmentName, setDepartmentName] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/departments/${encodeURIComponent(departmentName)}`);
        if (!response.ok) {
          throw new Error('ユーザーデータの取得に失敗しました');
        }
        const data = await response.json();
        
        // ユーザー詳細情報を取得
        const userDetailsPromises = data.users.map(async (user) => {
          const userResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${user.id}`
          );
          if (!userResponse.ok) {
            throw new Error(`ユーザー情報の取得に失敗しました: ${user.id}`);
          }
          return userResponse.json();
        });

        const userDetails = await Promise.all(userDetailsPromises);
        setUsers(userDetails);
      } catch (error) {
        console.error('ユーザーデータの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    if (departmentName) {
      fetchUsers();
    }
  }, [departmentName]);

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
          <Suspense fallback={<p className="text-center pt-20">検索結果を読み込み中...</p>}>
            <DepartmentSearchResultsContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
