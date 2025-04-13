// src/app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/user?email=${credentials.email}`);
        if (!res.ok) throw new Error('ユーザーが見つかりません');

        const user = await res.json();

        const isValid = await compare(credentials.password, user.password_hash);
        if (!isValid) throw new Error('パスワードが正しくありません');

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
