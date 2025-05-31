"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon, BookOpen, Menu, X, Sparkles, Search } from 'lucide-react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled 
            ? 'glass-effect backdrop-blur-xl border-b border-white/10 shadow-glass' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Title */}
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-2.5 rounded-xl">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="font-black text-2xl tracking-tight">
                <Link 
                  href="/" 
                  className="gradient-text hover:scale-105 transition-transform duration-300 block"
                >
                  Book Explorer
                </Link>
              </h1>
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse-glow hidden sm:block" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                href="/" 
                onClick={(e) => {
                  // If we're already on the home page, focus the search bar
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    setTimeout(() => {
                      const searchInput = document.querySelector('input[placeholder*="Search for books"]') as HTMLInputElement;
                      if (searchInput) {
                        searchInput.focus();
                        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);
                  }
                }}
                className="text-gray-300 hover:text-white font-medium relative group transition-all duration-300 hover:scale-105"
              >
                Explore
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-white font-medium relative group transition-all duration-300 hover:scale-105"
              >
                About
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-300 hover:text-white font-medium relative group transition-all duration-300 hover:scale-105"
              >
                Contact
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Quick Search (Desktop) */}
              <div className="hidden xl:block">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative glass-effect rounded-full border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    <input
                      type="text"
                      placeholder="Quick search..."
                      className="w-64 px-4 py-2.5 pl-10 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none focus:text-white text-sm rounded-full transition-all duration-300 relative z-10"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          if (target.value.trim()) {
                            // Navigate to home with search query
                            window.location.href = `/?search=${encodeURIComponent(target.value.trim())}`;
                          }
                        }
                      }}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors pointer-events-none z-20" />
                  </div>
                </div>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl glass-effect border border-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 text-gray-300 hover:text-white group"
                aria-label="Toggle Dark Mode"
              >
                <div className="relative">
                  {darkMode ? (
                    <MoonIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  ) : (
                    <SunIcon className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  )}
                  <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl glass-effect border border-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 text-gray-300 hover:text-white group"
                aria-label="Toggle Menu"
              >
                <div className="relative w-5 h-5">
                  <Menu 
                    className={`
                      absolute inset-0 transition-all duration-300
                      ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}
                    `} 
                  />
                  <X 
                    className={`
                      absolute inset-0 transition-all duration-300
                      ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}
                    `} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="absolute top-0 right-0 w-80 max-w-[85vw] h-full glass-effect border-l border-white/10 shadow-glass-lg p-6 animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile menu header */}
            <div className="flex items-center justify-between mb-8 pt-16">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white">Menu</span>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="mb-8">
              <div className="relative group">
                <div className="glass-effect rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <input
                    type="text"
                    placeholder="Search books..."
                    className="w-full px-4 py-3 pl-10 bg-transparent text-white placeholder-gray-400 focus:outline-none rounded-2xl text-sm relative z-10"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const target = e.target as HTMLInputElement;
                        if (target.value.trim()) {
                          // Navigate to home with search query and close menu
                          window.location.href = `/?search=${encodeURIComponent(target.value.trim())}`;
                          setIsMenuOpen(false);
                        }
                      }
                    }}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-20" />
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover:translate-x-1 border border-transparent hover:border-white/10 animate-slide-up"
                style={{ animationDelay: '0s' }}
                onClick={(e) => {
                  // If we're already on the home page, focus the search bar
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    setTimeout(() => {
                      const searchInput = document.querySelector('input[placeholder*="Search for books"]') as HTMLInputElement;
                      if (searchInput) {
                        searchInput.focus();
                        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 300);
                  } else {
                    setIsMenuOpen(false);
                  }
                }}
              >
                <span className="text-lg">🔍</span>
                <span className="font-medium">Explore</span>
              </Link>

              <Link
                href="/about"
                className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover:translate-x-1 border border-transparent hover:border-white/10 animate-slide-up"
                style={{ animationDelay: '0.1s' }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-lg">ℹ️</span>
                <span className="font-medium">About</span>
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover:translate-x-1 border border-transparent hover:border-white/10 animate-slide-up"
                style={{ animationDelay: '0.2s' }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-lg">📧</span>
                <span className="font-medium">Contact</span>
              </Link>
            </nav>

            {/* Mobile menu footer */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass-effect rounded-xl p-4 border border-white/10 text-center">
                <p className="text-gray-400 text-sm mb-2">
                  Discover your next favorite book
                </p>
                <div className="flex justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse-glow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
}