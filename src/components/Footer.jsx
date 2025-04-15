'use client';

import FallbackImage from '../components/FallbackImage';

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
        <FallbackImage
          src="/Tokyogaslogo.svg"
          alt="Tokyo Gas"
          width={100}
          height={24}
          className="h-6 w-auto"
        />
      </div>
    </footer>
  );
}
