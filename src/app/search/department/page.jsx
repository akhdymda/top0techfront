'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Tag from '@/components/Tag';

export default function DepartmentPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/departments`);
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('部署データの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentClick = (departmentName) => {
    // 部署名をクエリパラメータとしてエンコード
    const encodedDepartment = encodeURIComponent(departmentName);
    // 検索結果ページに遷移
    router.push(`/search/results?q=${encodedDepartment}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">部署から探す</h1>
          <p className="text-gray-600">
            気になる部署の人を見つけましょう
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((department, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center min-h-[120px] text-center"
                onClick={() => handleDepartmentClick(department.name)}
              >
                <Tag text={department.name} />
                <div className="mt-4">
                  <p className="text-gray-600">{department.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
} 