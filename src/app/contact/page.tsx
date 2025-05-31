/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, User, BookOpen, Sparkles, Github, Twitter, Globe, Heart, Coffee, HelpCircle, Bug, Lightbulb, Star } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: MessageSquare, color: 'purple' },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'yellow' },
    { value: 'bug', label: 'Bug Report', icon: Bug, color: 'red' },
    { value: 'help', label: 'Need Help', icon: HelpCircle, color: 'blue' },
    { value: 'feedback', label: 'Feedback', icon: Star, color: 'green' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    }, 3000);
  };

  const faqs = [
    {
      question: "How do I search for books effectively?",
      answer: "Use specific keywords, author names, or book titles. You can also search by subjects like 'science fiction' or 'biography'. Our intelligent search will find the most relevant results."
    },
    {
      question: "Are all books free to access?",
      answer: "Book Explorer is free to use for searching and discovering books. We provide information about books and links to various sources where you can read or purchase them."
    },
    {
      question: "Can I save my favorite books?",
      answer: "Yes! You can mark books as favorites by clicking the heart icon on each book card. Your favorites are saved locally in your browser."
    },
    {
      question: "How often is the book database updated?",
      answer: "Our database is powered by Open Library, which is continuously updated by a community of librarians and volunteers worldwide."
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com', color: 'gray' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', color: 'blue' },
    { name: 'Website', icon: Globe, url: 'https://example.com', color: 'green' }
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
            <Mail className="w-8 h-8 text-purple-400 mr-3 animate-pulse-glow" />
            <h1 className="text-6xl md:text-7xl font-black gradient-text tracking-tight">
              Get in Touch
            </h1>
            <Sparkles className="w-8 h-8 text-blue-400 ml-3 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
            We&apos;d love to hear from you! Whether you have questions, feedback, or just want to say hello.
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Your input helps us make Book Explorer better for everyone in our reading community.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="mb-20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-effect rounded-3xl p-8 backdrop-blur-xl border border-white/10 shadow-glass-lg">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                Send us a message
              </h2>
              <p className="text-gray-400">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 animate-scale-in">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Thank you!</h3>
                <p className="text-gray-300 mb-6">
                  Your message has been sent successfully. We&apos;ll get back to you soon!
                </p>
                <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-sm">Message delivered</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-white font-medium mb-3">What can we help you with?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <label
                        key={category.value}
                        className={`
                          flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02]
                          ${formData.category === category.value
                            ? 'bg-white/10 border-white/20'
                            : 'glass-effect border-white/10 hover:border-white/20'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category.value}
                          checked={formData.category === category.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`
                          w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r
                          ${category.color === 'purple' ? 'from-purple-500 to-purple-600' :
                            category.color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
                            category.color === 'red' ? 'from-red-500 to-red-600' :
                            category.color === 'blue' ? 'from-blue-500 to-blue-600' :
                            'from-green-500 to-green-600'}
                        `}>
                          <category.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white text-sm font-medium">{category.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-white font-medium mb-2">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 glass-effect border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-all duration-300"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-white font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 glass-effect border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-white font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass-effect border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 glass-effect border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none resize-none transition-all duration-300"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 
                    text-white rounded-xl font-semibold
                    hover:from-purple-600 hover:to-blue-600 
                    disabled:from-gray-600 disabled:to-gray-700
                    transition-all duration-300 hover:scale-[1.02] hover:shadow-neon
                    border border-purple-500/30 hover:border-purple-400/50
                    backdrop-blur-sm overflow-hidden group
                    disabled:cursor-not-allowed disabled:scale-100
                    relative
                  "
                >
                  {/* Button shimmer effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="glass-effect rounded-3xl p-8 backdrop-blur-xl border border-white/10 shadow-glass-lg">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Coffee className="w-6 h-6 text-blue-400" />
                Let&apos;s Connect
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Email Us</h4>
                    <p className="text-gray-400 text-sm mb-2">
                      Get in touch via email for detailed inquiries
                    </p>
                    <a 
                      href="mailto:hello@bookexplorer.com"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      hello@bookexplorer.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Community</h4>
                    <p className="text-gray-400 text-sm mb-2">
                      Join our community discussions and feedback
                    </p>
                    <a 
                      href="#"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Join Discord Server
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Documentation</h4>
                    <p className="text-gray-400 text-sm mb-2">
                      Find answers in our comprehensive docs
                    </p>
                    <a 
                      href="#"
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      Browse Documentation
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-effect rounded-3xl p-8 backdrop-blur-xl border border-white/10 shadow-glass-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass-effect rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform
                      ${social.color === 'gray' ? 'bg-gray-700' :
                        social.color === 'blue' ? 'bg-blue-500' :
                        'bg-green-500'}
                    `}>
                      <social.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Quick answers to common questions about Book Explorer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] animate-slide-up"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">{faq.question}</h3>
              <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">
            Still have questions? We&apos;re here to help!
          </p>
          <a
            href="#contact-form"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-xl text-white border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
          >
            <HelpCircle className="w-5 h-5" />
            Ask Your Question
          </a>
        </div>
      </section>

      {/* Response Time Section */}
      <section className="mb-20 animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="glass-effect rounded-3xl p-12 backdrop-blur-xl border border-white/10 shadow-glass-lg text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-full">
                <Star className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Commitment</h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            We value every message and strive to respond to all inquiries within 24 hours. 
            For urgent matters, please reach out via our community channels for faster assistance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border border-white/5">
              <div className="text-3xl font-bold text-white mb-2 gradient-text">&lt; 24h</div>
              <div className="text-gray-400">Average Response Time</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 border border-white/5">
              <div className="text-3xl font-bold text-white mb-2 gradient-text">100%</div>
              <div className="text-gray-400">Messages Answered</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 border border-white/5">
              <div className="text-3xl font-bold text-white mb-2 gradient-text">24/7</div>
              <div className="text-gray-400">Community Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
        <div className="glass-effect rounded-3xl p-12 backdrop-blur-xl border border-white/10 shadow-glass-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Discover Amazing Books?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            While you&apos;re here, why not explore our vast collection of books?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-neon border border-purple-500/30"
            >
              Start Exploring Books
            </a>
            <a
              href="/about"
              className="px-8 py-4 glass-effect text-white rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}