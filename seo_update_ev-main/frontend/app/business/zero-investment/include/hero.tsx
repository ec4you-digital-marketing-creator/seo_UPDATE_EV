"use client";

import React from "react";
import Image from "next/image";
import { FiCheck } from "react-icons/fi";

export default function ZeroHero() {
  return (
    <section className="relative w-full bg-[#070b14] overflow-hidden py-16 lg:py-24 flex items-center min-h-0">
      <style>
        {`
          @keyframes slide-up-down {
            0% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0); }
          }
          @keyframes slide-down-up {
            0% { transform: translateY(0); }
            50% { transform: translateY(15px); }
            100% { transform: translateY(0); }
          }
          .animate-pan-1 { animation: slide-up-down 8s ease-in-out infinite; }
          .animate-pan-2 { animation: slide-down-up 10s ease-in-out infinite; }
          .animate-pan-3 { animation: slide-up-down 12s ease-in-out infinite 1s; }
        `}
      </style>
      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col justify-center space-y-7 animate-in fade-in slide-in-from-left-8 duration-1000 py-4 lg:pr-8">
            <div className="relative">
              {/* Subtle decorative line */}
              <div className="absolute -left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-[#84cc16] to-transparent rounded-full hidden md:block opacity-60"></div>
              
              <span className="inline-block mb-3 text-xs font-bold tracking-[0.2em] uppercase text-white/70">
                Earn Without Investing
              </span>
              <h1 className="text-[34px] md:text-[44px] lg:text-[48px] font-black text-white tracking-tight leading-[1.1] mb-5 drop-shadow-sm">
                ZERO INVESTMENT EV<br />
                CHARGING STATION<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">PARTNERSHIP</span>
              </h1>
              <p className="text-[#84cc16] text-sm md:text-[15px] font-extrabold uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#84cc16] rounded-full"></span>
                EARN WITHOUT INVESTING
              </p>
              <p className="text-white/70 text-[15px] md:text-base leading-relaxed max-w-md font-medium mb-2">
                Partner with RELUX Electric for a zero-investment EV charging station at your location. Earn revenue from charging fees without any upfront costs.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {[
                "No Initial Investment",
                "Revenue Sharing Model",
                "Full Support Provided"
              ].map((item, idx) => (
                <div key={item} className="flex items-center gap-3.5 group">
                  <div className="w-[20px] h-[20px] rounded-full bg-[#84cc16]/10 flex items-center justify-center shrink-0 border border-[#84cc16]/40 group-hover:bg-[#84cc16] transition-colors duration-300">
                    <FiCheck className="w-3 h-3 text-[#84cc16] group-hover:text-black stroke-[3] transition-colors duration-300" />
                  </div>
                  <span className="text-white border-b border-transparent group-hover:border-white/20 transition-colors duration-300 font-semibold text-[14px]">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button className="px-6 py-2.5 bg-[#84cc16] hover:bg-[#65a30d] text-black font-semibold rounded-[4px] transition-colors text-[13px]">
                Partner Now
              </button>
            </div>
          </div>

          {/* Right Column: 3-Panel Grid */}
          <div className="relative h-[400px] md:h-[450px] lg:h-[480px] flex gap-3 sm:gap-4 animate-in fade-in slide-in-from-right-8 duration-1000 items-stretch">
            {/* Panel 1 */}
            <div className="flex-1 relative rounded-xl overflow-hidden mt-8 animate-pan-1 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop"
                alt="Station 1"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Panel 2 */}
            <div className="flex-1 relative rounded-xl overflow-hidden mb-8 animate-pan-2 shadow-[0_0_30px_rgba(0,177,79,0.1)]">
              <Image
                src="/about/relux_website_img.webp"
                alt="Station 2"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Panel 3 */}
            <div className="flex-1 relative rounded-xl overflow-hidden mt-16 mb-8 animate-pan-3 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1542344807-157f76301e8a?q=80&w=2127&auto=format&fit=crop"
                alt="Station 3"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-[#84cc16]/5 blur-[100px] rounded-full pointer-events-none -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
