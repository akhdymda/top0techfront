'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { signIn } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // 🔸追加

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // 🔸毎回初期化

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      console.error('ログインエラー:', result.error);
      setErrorMessage('メールアドレスまたはパスワードが正しくありません。'); // 🔸UI表示用
    } else {
      router.push('/search');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="relative flex-1 bg-black text-white pt-16">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-2154/1080p.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />

        <div className="relative z-20 min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-thin font-sans-jp mb-6 text-white tracking-[0.5em]">CHOTTO</h1>
              <p className="text-base text-gray-200 font-sans-jp font-thin mb-12">
                ちょっと聞きたい。ちょっと話したい。
                <br />から何か生まれるかも。
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {errorMessage && (
                <div className="text-red-400 text-sm text-center">{errorMessage}</div> // 🔸エラー表示
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="メールアドレス"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="パスワード"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 bg-white/10 border-2 border-white/20 rounded focus:ring-2 focus:ring-white/30"
                  />
                  <span className="ml-2 text-sm text-gray-400">ログインを記憶する</span>
                </label>
                <a href="/forgot-password" className="text-sm text-gray-400 hover:text-white transition-colors">
                  パスワードを忘れた方
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg hover:bg-white/20 transition-all text-white font-medium flex items-center justify-center gap-2 group"
              >
                ログイン
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center">
                <a href="/registar" className="text-sm text-gray-400 hover:text-white transition-colors">
                  アカウントをお持ちでない方はこちら
                </a>
              </div>
            </form>

            <div className="text-center mt-4">
              <a href="/google" className="text-sm text-gray-400 hover:text-white transition-colors">
                Googleでログイン »
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
