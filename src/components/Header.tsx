"use client";

import Link from 'next/link';
import { useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <header className="bg-gray-900 text-white shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Title */}
        <h1 className="font-extrabold text-2xl tracking-tight">
          <Link href="/" className="hover:opacity-90">
            Book Explorer
          </Link>
        </h1>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/explore" className="hover:text-gray-300">
            Explore
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </nav>

        {/* Search and Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search for books..."
            className="hidden md:block px-4 py-2 rounded-full bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="hover:text-gray-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <MoonIcon size={24} /> : <SunIcon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
