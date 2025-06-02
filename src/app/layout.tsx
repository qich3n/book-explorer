import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import { ThemeProvider } from '../contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Book Explorer',
  description: 'Search and explore books using Open Library API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-200`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          {/* Global Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 max-w-7xl mx-auto px-4 py-10">{children}</main>

          {/* Global Footer */}
          <footer className="bg-black/90 dark:bg-black/90 light:bg-white/90 text-gray-400 dark:text-gray-400 light:text-gray-600 py-4 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 text-center">
              © {new Date().getFullYear()} Book Explorer. All rights reserved.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}