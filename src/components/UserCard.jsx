import Image from 'next/image';
import SkillTag from './Tag';
import { useRouter } from 'next/navigation';

export default function UserCard({ user }) {
  const router = useRouter();

  console.log('UserCard received user:', {
    id: user.id,
    name: user.name,
    department: user.department,
    yearsOfService: user.yearsOfService,
    skills: user.skills,
    specialty: user.specialty,
    joinForm: user.joinForm,
  });

  // ユーザー名が存在しない場合のフォールバック
  const displayName = user.name || '名前未設定';

  const handleCardClick = () => {
    router.push(`/user/${user.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg p-4 shadow-sm cursor-pointer transition-transform hover:scale-105"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={displayName}
            width={60}
            height={60}
            className="rounded"
          />
          <div>
            <h3 className="font-bold text-lg text-gray-900">{displayName}</h3>
            <p className="text-sm text-gray-600">{user.department}</p>
            <p className="text-sm text-gray-600">社歴：{user.yearsOfService}年目</p>
            <p className="text-sm text-gray-600">専業：{user.specialty || '-'}</p>
            <p className="text-sm text-gray-600">入社形態：{user.joinForm || '未設定'}</p>
          </div>
        </div>
        <button 
          className="text-gray-400 hover:text-gray-600"
          onClick={(e) => {
            e.stopPropagation(); // カードのクリックイベントが発火するのを防ぐ
          }}
        >
          <span>☆</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 rounded-lg bg-gray-100 p-2">
        {user.skills && user.skills.map((skill, index) => (
          <SkillTag key={index} text={skill} />
        ))}
      </div>

      <button 
        className="w-full py-2 text-center bg-[#F87171] text-white rounded hover:bg-[#EF4444] transition-colors"
        onClick={(e) => {
          e.stopPropagation(); // カードのクリックイベントが発火するのを防ぐ
        }}
      >
        相談依頼、みんなで聞いてください！
      </button>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>これまで獲得したスキルスポイント</span>
        <span className="flex items-center">
          スキルスポイント
          <span className="ml-1 text-[#F87171] font-bold">{user.totalPoints || 100}</span>
        </span>
      </div>
    </div>
  );
} 