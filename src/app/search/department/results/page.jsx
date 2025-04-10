'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import DepartmentSearchResultsContent from './content';

export default function DepartmentSearchResultsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="relative flex-1 bg-[#7BA4A8] h-[250vh] text-white pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10 z-10" />

        <div className="relative z-20 min-h-screen bg-black/90 pt-20">
          <Suspense fallback={<p className="text-center pt-20">検索結果を読み込み中...</p>}>
            <DepartmentSearchResultsContent />
          </Suspense>

          <button
            onClick={() => router.push('/search/department')}
            className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full p-4 hover:bg-white/20 transition-all text-white"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
