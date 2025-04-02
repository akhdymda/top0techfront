import { Inter } from 'next/font/google'
import './globals.css'
import { Noto_Sans, Noto_Sans_JP } from 'next/font/google'

const notoSans = Noto_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
});

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${notoSans.variable} ${notoSansJP.variable}`}>
      <body>{children}</body>
    </html>
  )
} 