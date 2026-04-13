import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiZap, FiMapPin, FiUsers, FiCpu, FiTarget, FiHeadphones } from "react-icons/fi";

const newsItems = [
  {
    title: "Relux Electric raises ₹250 Cr to expand highway hyper-charging",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
  },
  {
    title: "Relux joins TNEB ELCOT to deploy 300+ stations across Tamil Nadu",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d59085?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Introducing Super Hub 2.0: The world's first 480kW rapid charger",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
  },
  {
    title: "Relux Electric wins 'Best Green Tech Startup' at Global EV Expo",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
  },
];

export default function HomeHero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-start bg-[#050505] overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-position-[82%_center] md:bg-position-[95%_center] bg-no-repeat opacity-80"
        style={{ backgroundImage: "url('/images/relux-electric-tamilnadu-banner.png')" }}
      />

      {/* ── Hero Content Card — top left ── */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end md:justify-start pt-10 md:pt-56 pb-16 md:pb-0">

        <div className="relative group max-w-[90%] md:max-w-[420px] lg:max-w-[480px]">

          {/* Outer glow ring */}
          <div className="absolute -inset-[2px] rounded-3xl bg-linear-to-br from-white/30 via-white/10 to-[#00b14f]/15 blur-[3px] opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Glass Card - Removed border and top highlight line */}
          <div className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-linear-to-br from-white/20 via-white/5 to-transparent" />

            <div className="relative z-10 p-5 md:p-6">
              <h1 className="text-white text-[17px] md:text-[19px] lg:text-[21px] font-bold leading-snug mb-2.5 tracking-wide drop-shadow">
                India&apos;s No.1 EV Charging Station Network Provider
              </h1>
              <p className="text-white/65 text-[12px] md:text-[13px] leading-relaxed mb-5">
                Powering the nation with fast, reliable and accessible EV charging built for the future. Join the network trusted by thousands of EV owners and top automotive brands.
              </p>
              <Link
                href="/locations"
                className="group/btn relative inline-flex items-center justify-center gap-2 bg-[#00b14f] hover:bg-[#009b45] text-white font-bold text-[12px] px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(0,177,79,0.4)] hover:shadow-[0_8px_24px_rgba(0,177,79,0.55)] hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative">Find Charging Stations</span>
              </Link>
            </div>
          </div>
        </div>
        {/* ── News Marquee — Bottom Right Section ── */}
        <div className="absolute bottom-6 right-0 w-full z-20 overflow-hidden flex justify-end">
          <div className="w-full max-w-[1200px] px-4">
            <div className="relative flex items-center bg-white/3 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden py-3 px-6 h-16 group/marquee">
              
              {/* Label */}
              <div className="flex items-center gap-2 mr-8 shrink-0 relative z-10 bg-[#050505]/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/5">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00b14f] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00b14f]"></span>
                </div>
                <span className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap">Latest News</span>
              </div>

              {/* Scrolling Content */}
              <div className="flex gap-12 animate-marquee whitespace-nowrap group-hover/marquee:pause cursor-default">
                {[...newsItems, ...newsItems].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover/item:scale-110"
                      />
                    </div>
                    <span className="text-white/80 text-sm font-medium hover:text-[#00b14f] transition-colors">
                      {item.title}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 mx-2" />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
