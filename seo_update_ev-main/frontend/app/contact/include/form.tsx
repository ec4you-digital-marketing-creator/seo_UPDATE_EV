"use client";

import React, { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry",
  "Ladakh", "Jammu and Kashmir"
];

const citiesByState: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada"],
  "Arunachal Pradesh": ["Naharlagun", "Pasighat", "Tawang", "Ziro", "Itanagar", "Bhismaknagar", "Bomdila"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "North Lakhimpur"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Bihar Sharif", "Purnia", "Arrah"],
  Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Raigarh", "Durg", "Rajnandgaon"],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Goa Velha"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh"],
  Haryana: ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Sonipat"],
  "Himachal Pradesh": ["Shimla", "Solan", "Mandi", "Kullu", "Dharamshala", "Bilaspur", "Chamba"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Hazaribagh"],
  Karnataka: ["Bengaluru", "Hubli-Dharwad", "Mysore", "Mangalore", "Belgaum", "Gulbarga", "Davangere"],
  Kerala: ["Kochi", "Kozhikode", "Thiruvananthapuram", "Thrissur", "Malappuram", "Kollam", "Kottayam"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Ratlam"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur"],
  Manipur: ["Imphal", "Bishnupur", "Ukhrul", "Tamenglong", "Chandel", "Senapati"],
  Meghalaya: ["Shillong", "Tura", "Jowai", "Cherrapunji", "Baghmara", "Nongpoh"],
  Mizoram: ["Aizawl", "Lunglei", "Serchhip", "Champhai", "Tuipang", "Mamit"],
  Nagaland: ["Dimapur", "Kohima", "Mokokchung", "Tuensang", "Zunheboto", "Kiphire Sadar", "Phek"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Kapurthala"],
  Rajasthan: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Jaisalmer"],
  Sikkim: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rabdentse"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Adilabad", "Khammam"],
  Tripura: ["Agartala", "Udaipur", "Amarpur", "Kumarghat", "Gakulnagar", "Kunjaban"],
  "Uttar Pradesh": ["Kanpur", "Lucknow", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad", "Noida"],
  Uttarakhand: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Rishikesh", "Kashipur"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bhatpara", "Darjeeling"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu"],
  Lakshadweep: ["Kavaratti"],
  Delhi: ["New Delhi", "Delhi", "Dwarka", "Rohini"],
  Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  Ladakh: ["Leh", "Kargil"],
  "Jammu and Kashmir": ["Srinagar", "Jammu"]
};

export default function ContactForm() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
  };

  const currentCities = selectedState ? citiesByState[selectedState] || [] : [];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does installation take?",
      answer: "Standard installations typically take 2-4 hours after the site assessment is complete."
    },
    {
      question: "Do you offer AMC services?",
      answer: "Yes, we offer comprehensive Annual Maintenance Contracts to ensure your charging stations run smoothly."
    }
  ];

  return (
    <section className="relative w-full py-20 bg-black overflow-hidden font-sans">
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(450px,500px)] gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Contact Info & FAQ */}
          <div className="space-y-10">
            {/* Header */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                Get in touch with Us
              </h2>
              <p className="text-[#8e939a] text-sm leading-relaxed max-w-md font-medium">
                Connect with Relux Electric — We're Here to Assist You. Choose your preferred way to connect.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4 max-w-md">
              {/* Phone Card */}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-[#1a1c23] border border-white/[0.02]">
                <div className="shrink-0 w-10 h-10 rounded-[10px] bg-[#22242c] border border-white/5 flex items-center justify-center">
                  <FiPhone className="w-[18px] h-[18px] text-[#4caf50]" />
                </div>
                <div>
                  <h4 className="text-[#8e939a] text-[10px] font-bold uppercase tracking-wider mb-1">Phone Number</h4>
                  <p className="text-white text-[15px] font-bold mb-0.5">+91 98848 66993</p>
                  <p className="text-[#646870] text-[11px] font-medium">Mon-Sat, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-[#1a1c23] border border-white/[0.02]">
                <div className="shrink-0 w-10 h-10 rounded-[10px] bg-[#22242c] border border-white/5 flex items-center justify-center">
                  <FiMail className="w-[18px] h-[18px] text-[#4caf50]" />
                </div>
                <div>
                  <h4 className="text-[#8e939a] text-[10px] font-bold uppercase tracking-wider mb-1">Email Support</h4>
                  <p className="text-white text-[15px] font-bold mb-0.5">enquiry@reluxelectric.com</p>
                  <p className="text-[#646870] text-[11px] font-medium">Average response time: 4 hours</p>
                </div>
              </div>

              {/* Office Card */}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-[#1a1c23] border border-white/[0.02]">
                <div className="shrink-0 w-10 h-10 rounded-[10px] bg-[#22242c] border border-white/5 flex items-center justify-center">
                  <FiMapPin className="w-[18px] h-[18px] text-[#4caf50]" />
                </div>
                <div>
                  <h4 className="text-[#8e939a] text-[10px] font-bold uppercase tracking-wider mb-1">Corporate Office</h4>
                  <p className="text-white text-[15px] font-bold mb-0.5">No:16/8, PRV Towers, Guindy</p>
                  <p className="text-[#646870] text-[11px] font-medium">Chennai, Tamil Nadu 600032</p>
                </div>
              </div>

              {/* Technical Support Card */}
              <div className="p-5 rounded-xl bg-[#0c2a16] border border-[#1b3d26]">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-[18px] h-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-white text-[15px] font-extrabold">Technical Support</h4>
                </div>
                <p className="text-[#98c1a6] text-xs leading-relaxed mb-5 font-medium">
                  Facing issues with a charging station? Our technical response team is available 24/7 for emergency troubleshooting via our app.
                </p>
                <div className="flex items-center gap-5">
                  <a href="#" className="flex items-center gap-1.5 text-[#4caf50] hover:text-[#5ede63] text-xs font-bold transition-colors">
                    View Help Center <FiSend className="w-3.5 h-3.5" />
                  </a>
                  <a href="#" className="flex items-center gap-1.5 text-[#4caf50] hover:text-[#5ede63] text-xs font-bold transition-colors">
                    Network Status <FiSend className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Questions FAQ */}
            <div className="max-w-md pt-4">
              <h3 className="text-[17px] font-extrabold text-white mb-2">Quick Questions</h3>
              <div className="space-y-0.5">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-white/10 last:border-0 relative">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
                    >
                      <span className="text-[13px] font-extrabold text-white pr-4">{faq.question}</span>
                      <svg className={`w-4 h-4 text-white/50 transition-transform duration-300 group-hover:text-white ${openFaq === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${openFaq === idx ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[13px] text-[#8e939a] font-medium leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#1a1c23] rounded-[1rem] p-8 md:p-10 shadow-2xl relative z-10 w-full xl:w-[95%] ml-auto">
            <h3 className="text-[22px] font-extrabold text-white mb-2 tracking-tight">Send a message</h3>
            <p className="text-[#8e939a] text-[12px] font-medium mb-8 leading-relaxed">
              Fill out the form below and our team will get back to you within one business day.
            </p>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#242630] border border-transparent rounded-md px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors placeholder:text-[#5e636e] font-medium"
                  />
                </div>
                {/* Email Address */}
                <div>
                  <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder="name@company.com"
                    className="w-full bg-[#242630] border border-transparent rounded-md px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors placeholder:text-[#5e636e] font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Phone Number */}
                <div>
                  <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="bg-[#2a2d36] border-r border-[#1a1c23] px-3 py-3 text-[12px] text-white font-medium rounded-l-md flex items-center justify-center shrink-0">
                      +91
                    </div>
                    <input 
                      type="tel" 
                      placeholder="10 digit number"
                      className="w-full bg-[#242630] border border-transparent rounded-r-md px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors placeholder:text-[#5e636e] font-medium"
                    />
                  </div>
                </div>

                {/* State Dropdown replacing Interest Area for functionality */}
                <div>
                  <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={selectedState}
                      onChange={handleStateChange}
                      className="w-full bg-[#242630] border border-transparent rounded-md px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors appearance-none font-medium [&>option]:text-white [&>option]:bg-[#242630]"
                    >
                      <option value="" disabled hidden className="text-[#5e636e]">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                       <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* City Dropdown replacing part of row 3 for functionality */}
                <div>
                  <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedState}
                      className="w-full bg-[#242630] border border-transparent rounded-md px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors appearance-none font-medium disabled:opacity-50 disabled:cursor-not-allowed [&>option]:text-white [&>option]:bg-[#242630]"
                    >
                      <option value="" disabled hidden className="text-[#5e636e]">Select City</option>
                      {currentCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                       <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    placeholder="Briefly describe your inquiry"
                    className="w-full bg-[#242630] border border-transparent rounded-md px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors placeholder:text-[#5e636e] font-medium"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea 
                  placeholder="Tell us more about your requirements..."
                  rows={4}
                  className="w-full bg-[#242630] border border-transparent rounded-md px-4 py-4 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors placeholder:text-[#5e636e] font-medium resize-none mb-1.5"
                ></textarea>
                <p className="text-[10px] text-[#5e636e] font-semibold">Minimum 20 characters.</p>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white font-extrabold text-[14px] py-4 rounded-md transition-colors flex items-center justify-center gap-2">
                  Submit Inquiry
                  <FiSend className="w-[15px] h-[15px]" />
                </button>
              </div>

              {/* Footer text */}
              <div className="text-center pt-2">
                <p className="text-[10px] text-[#646870] font-medium">
                  By submitting this form, you agree to our <a href="#" className="underline hover:text-[#8e939a] transition-colors">Privacy Policy</a> and <a href="#" className="underline hover:text-[#8e939a] transition-colors">Terms of Service</a>.
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

