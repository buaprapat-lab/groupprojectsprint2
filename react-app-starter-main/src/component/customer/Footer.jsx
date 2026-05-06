// src/component/customer/Footer.jsx
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const eyeRef = useRef(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!eyeRef.current) return;
      const eye = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eye.left + eye.width / 2;
      const eyeCenterY = eye.top + eye.height / 2;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      const maxDistance = eye.width / 4;
      const distance = Math.min(maxDistance, Math.hypot(deltaX, deltaY) / 8);

      setPupilPos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const footerLinks = [
    { label: "Our Branches", href: "#" },
    { label: "Allergen Information", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  return (
    <footer className="w-full pb-6 pt-8 relative">
      {/* ─── ส่วนบน: Sign up ─── */}
      <div className="w-full py-16 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-['Bebas_Neue'] text-[#242424] tracking-widest mb-6 text-center">
            JOIN THE CRISPY CLUB
          </h2>

          <form className="flex w-full max-w-md mt-2 border-2 border-[#242424] bg-white shadow-[8px_8px_0_#242424] hover:-translate-y-1 hover:shadow-[12px_12px_0_#242424] transition-all duration-300">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-transparent focus:outline-none font-['IBM_Plex_Sans_Thai'] text-[#242424]"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="bg-[#242424] text-white font-['Bebas_Neue'] px-6 py-3 text-xl tracking-wider border-l-2 border-[#242424] hover:bg-[#e4002b] transition-colors"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>

      {/* ─── ส่วนล่าง: โลโก้ และ เมนู ─── */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-t-2 border-[#242424]/20">
        {/* ซ้าย: โลโก้ */}
        <div className="flex flex-col items-start leading-[0.85] text-[#242424]">
          <h1 className="text-[60px] md:text-[100px] font-['Bebas_Neue'] font-black tracking-wider flex items-center flex-wrap">
            SERI
            <span
              ref={eyeRef}
              className="relative inline-flex items-center justify-center w-[0.8em] h-[0.8em] rounded-[30%] border-[0.15em] border-[#242424] mx-1 md:mx-2 bg-white"
            >
              <span
                className="absolute w-[0.3em] h-[0.3em] bg-[#e4002b] rounded-full shadow-inner"
                style={{
                  transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              ></span>
            </span>
            US
          </h1>
          <h1 className="text-[60px] md:text-[100px] font-['Bebas_Neue'] font-black tracking-wider text-[#DC5F00]">
            FRIED CHICKEN.
          </h1>
        </div>

        {/* ขวา: เมนูหลัก */}
        <div className="flex flex-col items-start md:items-end w-full md:w-auto">
          {/* 🚨 แก้ไขตรงนี้: เปลี่ยนฟอนต์ ลดขนาด(text-lg) และบีบ gap ลง(gap-2) */}
          <div className="flex flex-col items-start md:items-end gap-2 mb-8 font-['IBM_Plex_Sans_Thai'] text-lg font-bold uppercase tracking-wide text-[#242424]">
            {footerLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="group flex items-center gap-2 hover:text-[#e4002b] transition-colors"
              >
                {/* ลดขนาดลูกศรลงให้พอดีกับ text-lg */}
                <ArrowUpRight
                  size={20}
                  strokeWidth={2.5}
                  className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#e4002b]"
                />
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Social Media & Legal Links */}
          <div className="flex flex-col items-start md:items-end gap-3 font-['IBM_Plex_Sans_Thai'] text-sm font-bold text-[#242424]/70">
            <div className="flex gap-6 text-[#242424]">
              <a href="#" className="hover:text-[#e4002b] transition-colors">
                INSTAGRAM
              </a>
              <a href="#" className="hover:text-[#e4002b] transition-colors">
                TIKTOK
              </a>
              <a href="#" className="hover:text-[#e4002b] transition-colors">
                FACEBOOK
              </a>
            </div>
            <div className="flex gap-4 font-normal mt-2">
              <a
                href="#"
                className="hover:text-[#242424] transition-colors underline decoration-[#242424]/30 underline-offset-4"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-[#242424] transition-colors underline decoration-[#242424]/30 underline-offset-4"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── ส่วนก้นสุด: Copyright ─── */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 flex justify-center md:justify-start">
        <p className="text-[#242424]/50 text-xs font-['IBM_Plex_Sans_Thai']">
          © {new Date().getFullYear()} Serious Fried Chicken. All rights
          reserved. Let's get crispy.
        </p>
      </div>
    </footer>
  );
}
