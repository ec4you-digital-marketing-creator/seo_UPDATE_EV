"use client";

import React from "react";
import { FiZap, FiCpu, FiTarget, FiHeadphones } from "react-icons/fi";

const features = [
    {
        id: 1,
        title: "Strategic Pricing",
        description: "Competitive investment models and flexible connection options to protect your ROI in the EV landscape.",
        icon: FiZap,
        iconColor: "#84cc16", // Relux Green
    },
    {
        id: 2,
        title: "Professional Expert Team",
        description: "With years of pioneering experience, we build the best product effective and fit processes for Indian roads.",
        icon: FiCpu,
        iconColor: "#84cc16", // Relux Green
    },
    {
        id: 3,
        title: "Customer Focused Network",
        description: "Ensuring excellent and fast services across our pan-India charging infrastructure.",
        icon: FiTarget,
        iconColor: "#84cc16", // Relux Green
    },
    {
        id: 4,
        title: "24/7 Support Services",
        description: "Our professional IT support team ensures your system always operates stably with minimal business interference.",
        icon: FiHeadphones,
        iconColor: "#84cc16", // Relux Green
    },
];

export default function WhyTxt() {
    return (
        <section id="why-txt-section" className="relative w-full py-5 lg:py-10 bg-black overflow-hidden font-sans">
            {/* Background Glows for Depth */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#84cc16]/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#84cc16]/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {/* Circular Pattern Background (Subtle) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                <svg
                    className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%]"
                    viewBox="0 0 1000 1000"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {[100, 150, 200, 250, 300, 350, 400, 450, 500].map((r, i) => (
                        <circle
                            key={i}
                            cx="200"
                            cy="400"
                            r={r}
                            fill="none"
                            stroke="#84cc16"
                            strokeWidth="1"
                            strokeOpacity={0.2 - (i * 0.015)}
                        />
                    ))}
                </svg>
            </div>

            <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Column: Heading & Intro */}
                    <div className="lg:col-span-5 flex flex-col gap-8">


                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight tracking-tight">
                            What <span className="font-extrabold text-[#84cc16]">EV Solutions</span> <br />
                            will you find <br />
                            from us ?
                        </h2>

                        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-md">
                            Relux Electric – India’s leading EV infrastructure provider, delivering comprehensive solutions to create a solid foundation for sustainable mobility.
                        </p>
                    </div>

                    {/* Right Column: Grid of Features */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-10">
                        {features.map((feature) => (
                            <div key={feature.id} className="flex flex-col gap-6 group translate-y-0 transition-all duration-300 hover:-translate-y-2">
                                {/* Teardrop Icon Container */}
                                <div className="relative w-16 h-16 flex items-center justify-center">
                                    {/* The Teardrop Shape */}
                                    <div
                                        className="absolute inset-0 bg-white shadow-[0_10px_30px_rgba(132,204,22,0.2)] transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            borderRadius: "40px 40px 40px 4px",
                                        }}
                                    />
                                    {/* The Icon */}
                                    <div className="relative z-10">
                                        <feature.icon className="w-8 h-8" style={{ color: feature.iconColor }} />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h3 className="text-xl font-bold text-white tracking-wide transition-colors duration-300 group-hover:text-[#84cc16]">
                                        {feature.title}
                                    </h3>
                                    <p className="text-white/50 text-sm md:text-base leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
