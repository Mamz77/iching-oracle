import type { Metadata } from 'next';
import ThemeToggle from '@/components/ThemeToggle';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'The Oracle of Changes — Digital I Ching',
  description:
    'A calm, mystical digital I Ching oracle. Cast hexagrams using the Three Coin Method or a faithful Yarrow Stalk simulation, and explore their meanings.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-parchment-gradient dark:bg-ink-gradient bg-grain min-h-screen font-sans antialiased">
        <ThemeToggle />
        <main className="relative z-[1]">{children}</main>
      </body>
    </html>
  );
}
