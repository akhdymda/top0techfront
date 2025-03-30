import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full px-4 py-2 flex justify-between items-center bg-white border-b">
      <Link href="/search" className="flex items-center">
        <span className="text-2xl text-gray-700 font-medium">CHOTTO</span>
      </Link>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-6 text-lg text-gray-500">
          <span>探す</span>
          <Link href="/search" className="text-sm hover:text-gray-700">ふわっと</Link>
          <Link href="/skill" className="text-sm hover:text-gray-700">スキル</Link>
          <Link href="/department" className="text-sm hover:text-gray-700">部署</Link>

          <Link href="/notifications" className="text-gray-500 hover:text-gray-700">
            <span>気になる</span>
          </Link>
          <Link 
            href="/mypage" 
            className="text-gray-500 hover:text-gray-700"
          >
            <span>My page/登録</span>
          </Link>
        </div>
      </div>
    </header>
  );
} 
