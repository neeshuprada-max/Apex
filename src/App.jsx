import React, { useState, useEffect, useMemo } from 'react';
import { Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Initialize app
    setUser({ uid: 'guest-user', isAnonymous: true });
  }, []);

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-[#070b19]/80 backdrop-blur-md border-b border-cyan-950/40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-lg shadow-md shadow-cyan-500/10">
              <Gamepad2 className="w-6 h-6 text-white" />
            </span>
            <span className="text-xl font-bold tracking-tight text-white uppercase">
              APEX <span className="text-cyan-400 font-medium">GAMING</span>
            </span>
          </div>
          <a 
            href="#book" 
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2 rounded-xl font-bold text-sm tracking-wide uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.32)]"
          >
            Request Slot
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#070b19] to-[#070b19] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Premium Console <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Rentals in Kambil.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Experience next-gen gameplay with high-performance PS4 consoles delivered directly to your doorstep.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all border border-slate-800">
              Live Availability
            </button>
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-[0_4px_20px_rgba(6,182,212,0.25)]">
              Instant Reservation
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <Gamepad2 className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Feature {i}</h3>
              <p className="text-slate-400 text-sm">High-quality gaming experience with premium equipment</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-800 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-slate-400 text-sm">
          <p>© 2024 Apex Gaming Rentals. All rights reserved. | Kambil, Kannur, Kerala</p>
        </div>
      </footer>
    </div>
  );
}
