import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Global Header */}
        <header className="bg-black/80 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <h1 className="font-bold text-xl">Book Explorer</h1>
            <nav>
              {/* Example: Add nav links if needed */}
              {/* <a href="#" className="mr-4">Home</a> */}
              {/* <a href="#" className="mr-4">About</a> */}
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Global Footer */}
        <footer className="bg-black/80 text-gray-300 py-4 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            © {new Date().getFullYear()} Book Explorer. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
