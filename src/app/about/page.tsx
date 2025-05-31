/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { BookOpen, Search, Star, Globe, Heart, Zap, Users, Target, Sparkles, Code, Database, Shield } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Search,
      title: 'Intelligent Search',
      description: 'Powered by Open Library\'s extensive database with smart filtering and sorting capabilities.',
      color: 'purple'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Database',
      description: 'Access to millions of books, from classics to contemporary works across all genres.',
      color: 'blue'
    },
    {
      icon: Star,
      title: 'Enhanced Details',
      description: 'Rich book information including descriptions, subjects, and publication details.',
      color: 'pink'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Books from publishers worldwide with multiple language support.',
      color: 'green'
    },
    {
      icon: Heart,
      title: 'Personal Collections',
      description: 'Save your favorite books and build your personal reading lists.',
      color: 'red'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with modern web technologies for instant results.',
      color: 'yellow'
    }
  ];

  const stats = [
    { value: '20M+', label: 'Books Available', icon: BookOpen },
    { value: '6M+', label: 'Authors', icon: Users },
    { value: '100%', label: 'Free Access', icon: Heart },
    { value: '24/7', label: 'Availability', icon: Globe }
  ];

  const techStack = [
    { name: 'Next.js 15', description: 'React framework for production', icon: '⚛️' },
    { name: 'TypeScript', description: 'Type-safe development', icon: '📝' },
    { name: 'Tailwind CSS', description: 'Modern styling framework', icon: '🎨' },
    { name: 'Open Library API', description: 'Comprehensive book database', icon: '📚' },
    { name: 'Lucide Icons', description: 'Beautiful icon library', icon: '✨' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative text-center mb-20 pt-8">
        <div className="animate-slide-up">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="w-8 h-8 text-purple-400 mr-3 animate-pulse-glow" />
            <h1 className="text-6xl md:text-7xl font-black gradient-text tracking-tight">
              About Book Explorer
            </h1>
            <Sparkles className="w-8 h-8 text-blue-400 ml-3 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
            Discover, explore, and connect with millions of books from around the world
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Book Explorer is your gateway to the vast universe of literature, powered by cutting-edge technology 
            and designed for book lovers, researchers, and curious minds everywhere.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="glass-effect rounded-3xl p-12 backdrop-blur-xl border border-white/10 shadow-glass-lg">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-full">
                  <Target className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To democratize access to literary knowledge by creating an intuitive, beautiful, and powerful 
              platform that connects readers with the books they love and the ones they never knew existed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass-effect rounded-2xl p-8 border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Accessibility</h3>
              <p className="text-gray-400 leading-relaxed">
                Making literary discovery accessible to everyone, regardless of technical expertise or background.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Discovery</h3>
              <p className="text-gray-400 leading-relaxed">
                Helping readers discover new authors, genres, and hidden literary gems through intelligent search.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 border border-white/5 hover:border-pink-500/30 transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Community</h3>
              <p className="text-gray-400 leading-relaxed">
                Building a community of book lovers who share discoveries and recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">By the Numbers</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Powered by Open Library&apos;s vast collection and our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-8 text-center border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group animate-slide-up"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="mb-4">
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-white mb-2 gradient-text">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20 animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What Makes Us Special</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Cutting-edge features designed to enhance your book discovery journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group animate-slide-up"
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center mb-6 
                group-hover:scale-110 transition-transform bg-gradient-to-r
                ${feature.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  feature.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  feature.color === 'pink' ? 'from-pink-500 to-pink-600' :
                  feature.color === 'green' ? 'from-green-500 to-green-600' :
                  feature.color === 'red' ? 'from-red-500 to-red-600' :
                  'from-yellow-500 to-yellow-600'}
              `}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section className="mb-20 animate-slide-up" style={{ animationDelay: '0.8s' }}>
        <div className="glass-effect rounded-3xl p-12 backdrop-blur-xl border border-white/10 shadow-glass-lg">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-xl opacity-30"></div>
                <div className="relative bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-full">
                  <Code className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Built with Modern Technology</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We use the latest web technologies to deliver a fast, secure, and beautiful experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="glass-effect rounded-2xl p-6 border border-white/5 hover:border-green-500/30 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-2xl">{tech.icon}</span>
                  <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
                </div>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 glass-effect px-6 py-3 rounded-full border border-white/10">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Open Source & Privacy Focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* Data Source Section */}
      <section className="mb-20 animate-slide-up" style={{ animationDelay: '1s' }}>
        <div className="glass-effect rounded-3xl p-12 backdrop-blur-xl border border-white/10 shadow-glass-lg text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-full">
                <Database className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Powered by Open Library</h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Book Explorer is built on top of the Open Library API, a project of the Internet Archive. 
            Open Library is an open, editable library catalog, building towards a web page for every book ever published.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://openlibrary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect px-6 py-3 rounded-xl text-white hover:text-yellow-300 border border-white/10 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              Visit Open Library
            </a>
            <a
              href="https://archive.org"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect px-6 py-3 rounded-xl text-white hover:text-blue-300 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              Learn about Internet Archive
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center animate-slide-up" style={{ animationDelay: '1.2s' }}>
        <div className="glass-effect rounded-3xl p-12 backdrop-blur-xl border border-white/10 shadow-glass-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Explore?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of book lovers who have already discovered their next favorite read
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-neon border border-purple-500/30"
            >
              Start Exploring Books
            </a>
            <a
              href="/contact"
              className="px-8 py-4 glass-effect text-white rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}