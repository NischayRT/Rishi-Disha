"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src="/logo.webp" alt="RishiDisha Logo" className="h-15 w-15 object-contain" />
            <Link href="/" className="font-serif text-2xl text-[#d9901c] tracking-wide ml-2">
              RishiDisha
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-slate-300 hover:text-[#d9901c] transition text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Call & Book Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+919959629678" className="text-slate-300 hover:text-white transition text-sm flex items-center gap-2 hover:bg-[#d9901c] border border-[#fff] hover:border-[#d9901c] px-5 py-2.5 rounded-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              Call
            </a>
            <Link href="/book" className="bg-[#d9901c] text-black px-5 py-2.5 rounded-md hover:bg-[#c48218] transition text-sm font-bold shadow-lg shadow-[#d9901c]/20">
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0b0f19] border-b border-slate-800 animate-fade-in absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-[#d9901c] hover:bg-slate-800/50"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/book" onClick={() => setIsOpen(false)} className="w-full text-center bg-[#d9901c] text-black px-4 py-3 rounded-md font-bold shadow-lg shadow-[#d9901c]/20">
                Book Now
              </Link>
              <a href="tel:+919959629678" className="w-full text-center text-[#d9901c] border border-[#d9901c] px-4 py-3 rounded-md hover:bg-[#d9901c]/10 transition font-medium">
                Call Us
              </a>
              <a href="https://wa.me/919959629678" className="w-full text-center bg-[#25D366] text-white px-4 py-3 rounded-md font-medium">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}