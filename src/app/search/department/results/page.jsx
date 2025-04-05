import { Suspense } from 'react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import DepartmentSearchResultsContent from './content';

export default function DepartmentSearchResultsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="relative flex-1 bg-black text-white pt-16">
        <Suspense fallback={<p className="text-center pt-20">検索結果を読み込み中...</p>}>
          <DepartmentSearchResultsContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
