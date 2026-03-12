import React from 'react';
import { Link } from 'react-router-dom';
// Importing the hero image from your assets folder
import heroImg from '../assets/hero.png'; 

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">FireAuth</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 transition-colors">
              Log in
            </Link>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side: Text and Buttons */}
          <div className="lg:w-1/2 flex flex-col items-start text-left space-y-6">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
              v1.0 is live 🚀
            </span>
            <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Authentication, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Simplified.
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              A complete, secure, and ready-to-use authentication system built with React, Tailwind CSS, and Firebase. Give your users the seamless login experience they deserve.
            </p>
            <div className="flex sm:flex-row flex-col gap-4 w-full sm:w-auto pt-4">
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center flex items-center justify-center gap-2">
                Create free account
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </Link>
              <Link to="/login" className="bg-white border-2 border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-gray-700 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all text-center">
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Right Side: Hero Image */}
          <div className="lg:w-1/2 w-full mt-10 lg:mt-0 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
            <img 
              src={heroImg} 
              alt="Authentication Interface" 
              className="rounded-2xl shadow-2xl border border-white/50 w-full object-cover relative z-10"
              onError={(e) => {
                // Fallback UI box just in case hero.png isn't available
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback box if image breaks */}
            <div className="hidden bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 relative z-10">
               <div className="space-y-4">
                 <div className="h-8 bg-gray-100 rounded w-1/3"></div>
                 <div className="h-4 bg-gray-100 rounded w-full"></div>
                 <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                 <div className="h-10 bg-blue-500 rounded w-full mt-6"></div>
               </div>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="bg-white py-20 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Highly Secure</h3>
                <p className="text-gray-600">Industry-standard security backed by Firebase. User data and passwords stay encrypted.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600">Built on React and Vite for sub-second load times with instant real-time state updates.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Modern UI/UX</h3>
                <p className="text-gray-600">Designed with Tailwind CSS for a fully responsive layout that looks great on any device.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} FireAuth System. Ready for production.</p>
      </footer>
    </div>
  );
}