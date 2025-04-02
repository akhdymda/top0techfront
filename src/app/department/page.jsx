'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Tag from '@/components/Tag';
import UserCard from '@/components/UserCard';

export default function DepartmentPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
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
    const encodedDepartment = encodeURIComponent(departmentName);
    router.push(`/department/results?q=${encodedDepartment}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🏢</span>
            <h1 className="text-3xl font-bold">部署から探す</h1>
          </div>
          <p className="text-gray-600">
            気になる部署の人を見つけましょう
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {departments.map((department, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleDepartmentClick(department.name)}
                >
                  <Tag text={department.name} />
                </div>
              ))}
            </div>

            {selectedDepartment && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-center mb-8">
                  {selectedDepartment.name}のメンバー
                </h2>
                {selectedDepartment.users.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedDepartment.users.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600">
                    この部署にはまだメンバーがいません
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