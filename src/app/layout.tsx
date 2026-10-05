import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono, Caveat } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import CustomCursor from '@/components/common/CustomCursor';
import SplashScreen from '@/components/common/SplashScreen';
import FloatingNav from '@/components/navigation/FloatingNav';
import Footer from '@/components/footer/Footer';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ascendra Learning | Singapore Premium Lifelong Learning Ecosystem',
  description:
    'A modern learning ecosystem designed for future-ready learners in Singapore. Multi-disciplinary mastery spanning Deep Tech, Academic Excellence, FinTech Leadership, Diplomatic Languages, and Spatial Design.',
  keywords: [
    'Singapore Education',
    'SkillsFuture',
    'Lifelong Learning',
    'AI Engineering Singapore',
    'A-Level Economics',
    'FinTech Leadership',
    'Ascendra Learning',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${caveat.variable} dark`}
    >
      <body className="bg-[#0A0A0A] text-[#F5F5F5] antialiased selection:bg-[#FF6B35] selection:text-[#0A0A0A]">
        <SplashScreen />
        <SmoothScrollProvider>
          <CustomCursor />
          <FloatingNav />
          <main className="relative min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
