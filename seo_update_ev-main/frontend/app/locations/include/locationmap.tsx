"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOMServer from "react-dom/server";
import { HiLocationMarker } from "react-icons/hi";
import {
    FaToilet,
    FaChair,
    FaCoffee,
    FaFilm,
    FaMapMarkerAlt,
    FaClock,
    FaTimes,
    FaSearch,
    FaSlidersH,
    FaChevronRight,
} from "react-icons/fa";
import { IoMdBatteryCharging } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

const STATIONS_DATA = [
    {
        id: "1",
        name: "Relux Hyper Hub - OMR",
        city: "Chennai",
        country: "India",
        latitude: "12.9717",
        longitude: "80.2464",
        status: "active",
        facilities: ["Restroom", "Cafe", "Seating Area"],
        charger_connector: "CCS2",
        charger_power: "120 kW",
        charger_count: 4,
        google_map_url: "https://maps.app.goo.gl/ChennaiOMR"
    },
    {
        id: "2",
        name: "Relux City Hub - T.Nagar",
        city: "Chennai",
        country: "India",
        latitude: "13.0418",
        longitude: "80.2341",
        status: "active",
        facilities: ["Restroom", "Seating Area"],
        charger_connector: "DC Fast",
        charger_power: "60 kW",
        charger_count: 2,
        google_map_url: "https://maps.app.goo.gl/ChennaiTNagar"
    },
    {
        id: "3",
        name: "Relux Coimbatore Hub - Peelamedu",
        city: "Coimbatore",
        country: "India",
        latitude: "11.0252",
        longitude: "77.0124",
        status: "active",
        facilities: ["Restroom", "Cafe", "Multiplex"],
        charger_connector: "CCS2",
        charger_power: "120 kW",
        charger_count: 6,
        google_map_url: "https://maps.app.goo.gl/CbePeelamedu"
    },
    {
        id: "4",
        name: "Relux Salem Express - Highway Hub",
        city: "Salem",
        country: "India",
        latitude: "11.6643",
        longitude: "78.1460",
        status: "active",
        facilities: ["Restroom", "Cafe", "Seating Area"],
        charger_connector: "DC Fast",
        charger_power: "60 kW",
        charger_count: 2,
        google_map_url: "https://maps.app.goo.gl/SalemHighway"
    },
    {
        id: "5",
        name: "Relux Bangalore Metro Hub",
        city: "Bangalore",
        country: "India",
        latitude: "12.9716",
        longitude: "77.5946",
        status: "active",
        facilities: ["Restroom", "Cafe", "Multiplex"],
        charger_connector: "CCS2",
        charger_power: "240 kW",
        charger_count: 8,
        google_map_url: "https://maps.app.goo.gl/BlrMetro"
    },
    {
        id: "6",
        name: "Relux Madurai Ring Road Point",
        city: "Madurai",
        country: "India",
        latitude: "9.9252",
        longitude: "78.1198",
        status: "active",
        facilities: ["Restroom", "Seating Area"],
        charger_connector: "AC Type 2",
        charger_power: "22 kW",
        charger_count: 2,
        google_map_url: "https://maps.app.goo.gl/MaduraiPoint"
    },
    {
        id: "7",
        name: "Relux Trichy Connect",
        city: "Trichy",
        country: "India",
        latitude: "10.7905",
        longitude: "78.7047",
        status: "active",
        facilities: ["Restroom"],
        charger_connector: "DC Fast",
        charger_power: "30 kW",
        charger_count: 1,
        google_map_url: "https://maps.app.goo.gl/TrichyConnect"
    },
    {
        id: "8",
        name: "Relux Erode Express - Under Maintenance",
        city: "Erode",
        country: "India",
        latitude: "11.3410",
        longitude: "77.7172",
        status: "inactive",
        facilities: ["Restroom", "Seating Area"],
        charger_connector: "AC Type 2",
        charger_power: "7.4 kW",
        charger_count: 1,
        google_map_url: "https://maps.app.goo.gl/ErodePoint"
    }
];

interface Station {
    id: string;
    name: string;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
    status: string;
    facilities: string[];
    charger_connector: string;
    charger_power: string;
    charger_count: number;
    google_map_url: string;
}

const LocationMapPro = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    const [country, setCountry] = useState("India");
    const [city, setCity] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Helper to categorize AC/DC
    const getChargerType = (connector: string) => {
        const c = connector.toLowerCase();
        if (c.includes("ccs") || c.includes("dc") || c.includes("fast")) return "DC";
        return "AC";
    };

    // Derived Data for Filters
    const countries = useMemo(() => ["India", "USA", "Germany"], []);
    const citiesInSelectedCountry = useMemo(() => {
        const filtered = STATIONS_DATA.filter(s => s.country === country);
        return [...new Set(filtered.map(s => s.city))].sort();
    }, [country]);

    const filteredStations = useMemo(() => {
        return STATIONS_DATA.filter(station => {
            const matchesCountry = country === "" || station.country === country;
            const matchesCity = city === "" || station.city === city;
            const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                station.city.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "all" || station.status === statusFilter;
            const matchesType = typeFilter === "all" || getChargerType(station.charger_connector) === typeFilter;
            return matchesCountry && matchesCity && matchesSearch && matchesStatus && matchesType;
        });
    }, [country, city, searchQuery, statusFilter, typeFilter]);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/light-v11",
            center: [78.9629, 15.5937],
            zoom: 4.8
        });

        // Set initial padding (always use padding since sidebar is absolute)
        mapRef.current.setPadding({ left: isSidebarOpen ? 400 : 0, top: 0, right: 0, bottom: 0 });

        mapRef.current.on("load", () => {
            if (mapRef.current) {
                mapRef.current.resize();
                renderMarkers(filteredStations);
            }
        });

        return () => {
            mapRef.current?.remove();
        };
    }, []);

    // Sync Padding when Sidebar toggles
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.easeTo({
                padding: { left: isSidebarOpen ? 400 : 0, top: 0, right: 0, bottom: 0 },
                duration: 500
            });
        }
    }, [isSidebarOpen]);

    // Update markers when filters change
    useEffect(() => {
        if (mapRef.current && mapRef.current.loaded()) {
            renderMarkers(filteredStations);
        }
    }, [filteredStations]);

    const renderMarkers = (data: Station[]) => {
        if (!mapRef.current) return;
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        data.forEach((station) => {
            const isActive = station.status === "active";
            const el = document.createElement("div");
            el.className = `relux-marker-container ${isActive ? "is-active" : "is-inactive"}`;
            el.innerHTML = `
                <div class="relux-marker-pulse"></div>
                <div class="relux-marker-dot"></div>
            `;

            if (mapRef.current) {
                const marker = new mapboxgl.Marker({
                    element: el,
                    anchor: "center",
                    className: "relux-mapbox-marker"
                })
                    .setLngLat([parseFloat(station.longitude), parseFloat(station.latitude)])
                    .addTo(mapRef.current);

                el.addEventListener("click", (e) => {
                    e.stopPropagation();
                    handleStationSelect(station);
                });

                markersRef.current.push(marker);
            }
        });
    };

    const handleStationSelect = (station: Station) => {
        setSelectedStation(station);
        const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

        if (isMobile) {
            setIsSidebarOpen(false);
        }

        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [parseFloat(station.longitude), parseFloat(station.latitude)],
                zoom: 13,
                essential: true,
                padding: { left: (!isMobile && isSidebarOpen) ? 400 : 0, top: 0, right: 0, bottom: 0 }
            });
        }
    };

    const handleReset = () => {
        setStatusFilter("all");
        setTypeFilter("all");
        setCountry("India");
        setCity("");
        setSearchQuery("");
        setSelectedStation(null);
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [78.9629, 15.5937],
                zoom: 4.8,
                essential: true,
                padding: { left: isSidebarOpen ? 400 : 0, top: 0, right: 0, bottom: 0 }
            });
        }
    };

    const facilityIcons = {
        Restroom: <FaToilet />,
        "Seating Area": <FaChair />,
        Cafe: <FaCoffee />,
        Multiplex: <FaFilm />,
    };

    return (
        <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden flex font-sans">

            {/* Sidebar (Glassmorphic List) */}
            <motion.aside
                initial={false}
                animate={{
                    x: isSidebarOpen ? 0 : (typeof window !== "undefined" && window.innerWidth < 1024 ? "-100%" : -400),
                    width: isSidebarOpen ? (typeof window !== "undefined" && window.innerWidth < 1024 ? "100%" : 400) : (typeof window !== "undefined" && window.innerWidth < 1024 ? "100%" : 0),
                    opacity: isSidebarOpen ? 1 : 0
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute h-full bg-white/95 dark:bg-[#0a0a0a]/90 backdrop-blur-3xl border-r border-black/5 dark:border-white/5 z-40 flex flex-col shadow-2xl overflow-hidden"
            >
                {/* Sidebar Header */}
                <div className="p-6 lg:p-8 space-y-6 lg:space-y-8 shrink-0">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-black text-black dark:text-white tracking-tight">Charging <span className="text-[#00b14f]">Locations</span></h2>
                            <p className="text-black/40 dark:text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Relux Premium Network</p>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-black/40 dark:text-white/40"><FaTimes /></button>
                    </div>

                    {/* Search & Filters */}
                    <div className="space-y-4">
                        <div className="relative group">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 dark:text-white/20 group-focus-within:text-[#00b14f] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search stations or cities..."
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-3 lg:py-4 pl-12 pr-4 text-sm text-black dark:text-white focus:outline-none focus:border-[#00b14f]/40 transition-all placeholder:text-black/20 dark:placeholder:text-white/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2">
                            <select
                                className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-xs text-black/60 dark:text-white/60 focus:border-[#00b14f]/40 focus:outline-none appearance-none cursor-pointer"
                                value={country}
                                onChange={(e) => { setCountry(e.target.value); setCity(""); }}
                            >
                                <option value="" className="bg-white dark:bg-zinc-900">All Countries</option>
                                {countries.map(c => <option key={c} value={c} className="bg-white dark:bg-zinc-900">{c}</option>)}
                            </select>
                            <select
                                className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-xs text-black/60 dark:text-white/60 focus:border-[#00b14f]/40 focus:outline-none appearance-none cursor-pointer"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option value="" className="bg-white dark:bg-zinc-900">All Cities</option>
                                {citiesInSelectedCountry.map(c => <option key={c} value={c} className="bg-white dark:bg-zinc-900">{c}</option>)}
                            </select>
                        </div>

                        {/* Status & Type Quick Filters */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-[0.2em]">Filter By Status</span>
                                <button onClick={handleReset} className="text-[9px] font-bold text-[#00b14f] hover:underline">Reset</button>
                            </div>
                            <div className="flex bg-black/5 dark:bg-white/5 rounded-2xl p-1 gap-1">
                                {["all", "active"].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setStatusFilter(s)}
                                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${statusFilter === s ? "bg-[#00b14f] text-white shadow-lg shadow-[#00b14f]/20 scale-[1.02]" : "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <span className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-[0.2em]">Charger Type</span>
                            </div>
                            <div className="flex bg-black/5 dark:bg-white/5 rounded-2xl p-1 gap-1">
                                {["all", "DC", "AC"].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTypeFilter(t)}
                                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${typeFilter === t ? "bg-[#00b14f] text-white shadow-lg shadow-[#00b14f]/20 scale-[1.02]" : "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Station List */}
                <div className="flex-1 overflow-y-auto px-6 pb-12 custom-scrollbar space-y-4">
                    <AnimatePresence>
                        {filteredStations.map((station, i) => (
                            <motion.div
                                key={station.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => handleStationSelect(station)}
                                className={`p-5 lg:p-6 rounded-3xl lg:rounded-4xl border cursor-pointer transition-all group ${selectedStation?.id === station.id
                                    ? "bg-[#00b14f]/10 border-[#00b14f]/30 ring-1 ring-[#00b14f]/20"
                                    : "bg-black/2 dark:bg-white/2 border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/10"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-black dark:text-white font-bold text-base lg:text-lg group-hover:text-[#00b14f] transition-colors">{station.name}</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${station.status === "active" ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${station.status === "active" ? "text-green-500" : "text-red-500"}`}>
                                            {station.status === "active" ? "Active" : "Maintenance"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-black/40 dark:text-white/40 text-[11px] font-medium">
                                    <div className="flex items-center gap-1.5"><FaMapMarkerAlt /> {station.city}</div>
                                    <div className="flex items-center gap-1.5">
                                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${getChargerType(station.charger_connector) === "DC" ? "bg-[#00b14f]/10 text-[#00b14f]" : "bg-blue-500/10 text-blue-500"}`}>
                                            {getChargerType(station.charger_connector)}
                                        </span>
                                        <IoMdBatteryCharging /> {station.charger_power}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filteredStations.length === 0 && (
                        <div className="text-center py-20 opacity-20">
                            <FaSearch size={40} className="mx-auto mb-4" />
                            <p className="text-sm font-bold uppercase tracking-widest">No stations found</p>
                        </div>
                    )}
                </div>
            </motion.aside>

            {/* Sidebar Toggle Button (Desktop only) */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hidden lg:flex absolute top-8 transition-all duration-500 z-30 w-10 h-10 bg-[#00b14f] rounded-xl items-center justify-center text-white shadow-xl"
                style={{ left: isSidebarOpen ? "420px" : "24px" }}
            >
                {isSidebarOpen ? <FaChevronRight className="rotate-180" /> : <FaSearch />}
            </button>

            {/* Mobile Direct Filters (Pinned to Map Top-Left) */}
            <div className="lg:hidden absolute top-6 left-6 z-30 flex flex-col gap-2 w-48">
                <select
                    className="w-full bg-[#007a33] text-white border-none rounded-lg px-4 py-2.5 text-sm font-bold shadow-xl appearance-none cursor-pointer"
                    value={country}
                    onChange={(e) => { setCountry(e.target.value); setCity(""); }}
                >
                    <option value="">All Countries</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select
                    className="w-full bg-[#007a33] text-white border-none rounded-lg px-4 py-2.5 text-sm font-bold shadow-xl appearance-none cursor-pointer"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                >
                    <option value="">All Cities</option>
                    {citiesInSelectedCountry.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {/* Map Area */}
            <main className="absolute inset-0 z-10">
                <div ref={mapContainerRef} className="w-full h-full" />

                {/* WhatsApp Floating Button (Mobile Only) */}
                <button
                    onClick={() => window.open("https://wa.me/YOUR_NUMBER", "_blank")}
                    className="lg:hidden absolute bottom-6 right-6 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-3xl shadow-2xl z-40 hover:scale-110 active:scale-95 transition-transform"
                >
                    <FaWhatsapp />
                </button>

                {/* Floating Selection Overlay (Mobile or Details) */}
                <AnimatePresence>
                    {selectedStation && (
                        <motion.div
                            initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 200, opacity: 0 }}
                            className="absolute bottom-6 left-4 right-4 lg:left-auto lg:right-10 lg:bottom-10 lg:w-[450px] bg-white lg:bg-white/95 dark:bg-[#111] backdrop-blur-3xl rounded-[2rem] lg:rounded-[2.5rem] border border-black/5 dark:border-white/10 p-6 lg:p-8 shadow-2xl z-20"
                        >
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-black/5 dark:bg-white/5 rounded-full lg:hidden" />
                            <button onClick={() => setSelectedStation(null)} className="absolute top-5 right-5 p-2 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"><FaTimes /></button>

                            <div className="space-y-4 lg:space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${selectedStation.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                                            {selectedStation.status === "active" ? "Active" : "Maintenance"}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${getChargerType(selectedStation.charger_connector) === "DC" ? "bg-[#00b14f]/10 text-[#00b14f]" : "bg-blue-500/10 text-blue-500"}`}>
                                            {getChargerType(selectedStation.charger_connector)} Charger
                                        </span>
                                    </div>
                                    <h4 className="text-xl lg:text-2xl font-black text-black dark:text-white leading-tight">{selectedStation.name}</h4>
                                    <p className="text-black/40 dark:text-white/40 text-xs lg:text-sm mt-2 flex items-center gap-2"><FaMapMarkerAlt className="text-[#00b14f]" /> {selectedStation.city}, {selectedStation.country}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                                    <div className="bg-black/5 dark:bg-white/5 p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-black/5 dark:border-white/5">
                                        <p className="text-[9px] lg:text-[10px] font-black text-black/20 dark:text-white/20 uppercase tracking-widest mb-1">Max Power</p>
                                        <p className="text-black dark:text-white font-bold text-sm lg:text-base">{selectedStation.charger_power}</p>
                                    </div>
                                    <div className="bg-black/5 dark:bg-white/5 p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-black/5 dark:border-white/5">
                                        <p className="text-[9px] lg:text-[10px] font-black text-black/20 dark:text-white/20 uppercase tracking-widest mb-1">Connector</p>
                                        <p className="text-black dark:text-white font-bold text-sm lg:text-base">{selectedStation.charger_connector}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => window.open(selectedStation.google_map_url, "_blank")}
                                    className="w-full py-4 lg:py-5 bg-[#00b14f] text-white rounded-xl lg:rounded-2xl font-black text-xs lg:text-sm uppercase tracking-widest shadow-lg shadow-[#00b14f]/20 hover:scale-[1.02] transition-transform active:scale-95"
                                >
                                    Get Directions
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Global Custom CSS for Pulse Markers and Scrollbar */}
            <style jsx global>{`
                .relux-marker-container {
                    width: 0;
                    height: 0;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    will-change: transform;
                    backface-visibility: hidden;
                    transform: translateZ(0);
                }
                .relux-marker-dot {
                    width: 14px;
                    height: 14px;
                    background: #00b14f;
                    border: 2.5px solid white;
                    border-radius: 50%;
                    z-index: 2;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2), 0 0 10px rgba(0, 177, 79, 0.4);
                    position: absolute;
                    transition: all 0.3s ease;
                }
                .is-inactive .relux-marker-dot {
                    background: #ff3b30;
                    box-shadow: 0 2px 8px rgba(255,59,48,0.3);
                }
                .relux-marker-pulse {
                    position: absolute;
                    width: 44px;
                    height: 44px;
                    background: rgba(0, 177, 79, 0.4);
                    border-radius: 50%;
                    animation: relux-pulse-ring 2s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
                    z-index: 1;
                    pointer-events: none;
                }
                .is-inactive .relux-marker-pulse {
                    background: rgba(255, 59, 48, 0.2);
                    animation: none;
                }
                @keyframes relux-pulse-ring {
                    0% { transform: scale(0.2); opacity: 0.8; }
                    80%, 100% { transform: scale(1.4); opacity: 0; }
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
                
                /* Ensure Mapbox marker own classes don't override positioning */
                .relux-mapbox-marker {
                    margin: 0 !important;
                    padding: 0 !important;
                }
            `}</style>
        </div>
    );
};

export default LocationMapPro;
