'use client';

import Header from '@/components/Header';
import { AuthProvider } from '@/contexts/AuthContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  );
} 