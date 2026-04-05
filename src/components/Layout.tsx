import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-6 px-8 md:px-16 max-w-[1600px] mx-auto w-full">
        <Link to="/" className="font-bold text-xl tracking-tight uppercase">Vidhu P Vinod</Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
          <Link to="/" className="text-gray-900 hover:text-blue-600 transition-colors pb-1">Home</Link>
          <a href="/#projects" className="hover:text-gray-900 transition-colors">Projects</a>
          <a href="/#accolades" className="hover:text-gray-900 transition-colors">Accolades</a>
          <a href="/#about" className="hover:text-gray-900 transition-colors">About</a>
          <a href="/#contact" className="hover:text-gray-900 transition-colors">Contact</a>
        </div>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=vidhupvinod@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-2.5 text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
        >
          Hire Me
        </a>
      </nav>

      <main className="flex-grow w-full max-w-[1600px] mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#111111] text-gray-500 py-8 px-8 md:px-16 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm mt-auto">
        <div className="font-bold text-white tracking-tight uppercase">Vidhu P Vinod</div>
        <div className="flex gap-6">
          <a href="https://github.com/VidhuVi" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/vidhu-p-vinod-66a84b291/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=vidhupvinod@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Email</a>
        </div>
        <div>© 2026 Vidhu P Vinod. All rights reserved.</div>
      </footer>
    </div>
  );
}
