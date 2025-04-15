import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full px-4 py-8 flex justify-between items-center bg-[#F5F5F5]">
      <div className="text-base text-gray-500">
        <span>CHOTTO</span>
      </div>
      <div className="text-base text-gray-500">
        <span>© 2025 top0tech</span>
      </div>
      <div className="text-base text-gray-500">
        <Image
          src="https://raw.githubusercontent.com/akhdymda/top0techfront/main/public/Tokyogaslogo.svg"
          alt="Tokyo Gas"
          width={100}
          height={24}
          className="h-6 w-auto"
          unoptimized
        />
      </div>
    </footer>
  );
} 