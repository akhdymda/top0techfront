import Image from 'next/image';
import SkillTag from './Tag';

export default function UserCard({ user }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={user.name}
            width={60}
            height={60}
            className="rounded"
          />
          <div>
            <h3 className="font-bold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.department}</p>
            <p className="text-sm text-gray-600">社歴：{user.yearsOfService}年目</p>
            <p className="text-sm text-gray-600">専業：{user.specialty}</p>
            <p className="text-sm text-gray-600">入社年度：中途入社</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <span>☆</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 rounded-lg bg-gray-100 p-2">
        {user.skills.map((skill, index) => (
          <SkillTag key={index} text={skill} />
        ))}
      </div>

      <button className="w-full py-2 text-center bg-[#F87171] text-white rounded hover:bg-[#EF4444] transition-colors">
        相談依頼、みんなで聞いてください！
      </button>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>これまで獲得したスキルスポイント</span>
        <span className="flex items-center">
          スキルスポイント
          <span className="ml-1 text-[#F87171] font-bold">100</span>
        </span>
      </div>
    </div>
  );
} 