"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function HomeFooter() {
  return (
    <footer className="relative w-full pt-16 pb-8 bg-black overflow-hidden px-6">
      
      {/* Premium Footer Hub Container */}
      <div className="max-w-7xl mx-auto">
        <div className="relative p-10 md:p-16 rounded-[2.5rem] bg-[#050505] border border-[#00b14f]/30 shadow-[0_0_50px_rgba(0,177,79,0.15)] overflow-hidden">
          
          {/* Top Glow Line */}
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#00b14f]/50 to-transparent" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
            
            {/* Brand & Socials */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-8">
                <Image 
                  src="/relux-electric-india-logo.svg" 
                  alt="Relux Electric" 
                  width={140} 
                  height={50} 
                  className="brightness-0 invert h-auto w-[120px]"
                />
              </Link>
              <div className="flex items-center gap-4 text-white/40 mb-10">
                <Link href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#00b14f] hover:text-white transition-all">
                  <FaFacebookF size={14} />
                </Link>
                <Link href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#00b14f] hover:text-white transition-all">
                  <FaTwitter size={14} />
                </Link>
                <Link href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#00b14f] hover:text-white transition-all">
                  <FaInstagram size={14} />
                </Link>
                <Link href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#00b14f] hover:text-white transition-all">
                  <FaLinkedinIn size={14} />
                </Link>
                <Link href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#00b14f] hover:text-white transition-all">
                  <FaYoutube size={14} />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
               <h4 className="text-[#00b14f] font-bold text-sm uppercase tracking-widest mb-8">Company</h4>
               <ul className="space-y-4 text-white/50 text-sm">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/locations" className="hover:text-white transition-colors">Locations</Link></li>
                  <li><Link href="/partners" className="hover:text-white transition-colors">Partners</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
               </ul>
            </div>

            {/* Support/Links */}
            <div>
               <h4 className="text-[#00b14f] font-bold text-sm uppercase tracking-widest mb-8">Solutions</h4>
               <ul className="space-y-4 text-white/50 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors">Host a Station</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Own a Franchise</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Fleet Charging</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Corporate EV</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">App Support</Link></li>
               </ul>
            </div>

            {/* Download App */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
               <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">Download Now</h4>
               <div className="space-y-4">
                  <Link href="#" className="flex items-center gap-3 bg-white text-black px-5 py-2.5 rounded-xl hover:bg-neutral-200 transition-all">
                    <Image src="/logo.svg" alt="App Store" width={18} height={18} />
                    <span className="text-xs font-bold leading-tight uppercase tracking-tighter">App Store</span>
                  </Link>
                  <Link href="#" className="flex items-center gap-3 bg-transparent text-white px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all">
                    <Image src="/logo.svg" alt="Play Store" width={18} height={18} />
                    <span className="text-xs font-bold leading-tight uppercase tracking-tighter">Play Store</span>
                  </Link>
               </div>
            </div>

          </div>

          {/* Bottom Row */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
             <p className="text-white/30 text-xs">
                &copy; {new Date().getFullYear()} Relux Electric Private Limited. All rights reserved.
             </p>
             <div className="flex items-center gap-8 text-white/30 text-xs">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
             </div>
          </div>

        </div>
      </div>
      
      {/* Sub-footer aesthetic line */}
      <div className="max-w-7xl mx-auto mt-8 flex justify-center opacity-20">
         <div className="w-16 h-1 bg-[#00b14f] rounded-full" />
      </div>
    </footer>
  );
}
