// index Section 6: Sign up & Brand Playful

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#eeeeee] mt-12 border-t-2 border-[#242424] relative">
      {/* ส่วนบน: ลายตารางและ Sign up (อ้างอิงภาพ 6) */}
      <div
        className="w-full bg-[#DC5F00] py-16 relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(#242424 1px, transparent 1px), linear-gradient(90deg, #242424 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-['Bebas_Neue'] text-white tracking-widest bg-[#DC5F00] px-4 py-2 border-2 border-[#242424] inline-block mb-6 shadow-[6px_6px_0_#242424] -rotate-2">
            JOIN THE CRISPY CLUB
          </h2>

          <form className="flex w-full max-w-md mt-4 shadow-[8px_8px_0_#242424]">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border-2 border-r-0 border-[#242424] focus:outline-none font-['IBM_Plex_Sans_Thai']"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="bg-[#242424] text-white font-['Bebas_Neue'] px-6 py-3 text-xl tracking-wider border-2 border-[#242424] hover:bg-[#e4002b] transition-colors"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>

      {/* ขอบหยักเชื่อมระหว่างตารางกับ Footer ด้านล่าง */}
      <div
        className="w-full h-8 bg-[#eeeeee] absolute left-0"
        style={{
          top: "calc(100% - 2rem)",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          marginTop: "-16px",
        }}
      ></div>

      {/* ส่วนล่าง: โลโก้ และลิงก์ */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
        <div className="flex items-center gap-2">
          {/* Placeholder สำหรับไอคอนไก่เล่นสเก็ตบอร์ด */}
          <span className="text-4xl">🛹🐔</span>
          <h1 className="text-4xl font-['Bebas_Neue'] font-black tracking-widest text-[#242424]">
            SERIOUS PUNCH
          </h1>
        </div>

        <div className="text-sm font-['IBM_Plex_Sans_Thai'] font-bold text-[#242424] flex gap-6">
          <a href="#" className="hover:text-[#e4002b] transition-colors">
            IG
          </a>
          <a href="#" className="hover:text-[#e4002b] transition-colors">
            TIKTOK
          </a>
          <a href="#" className="hover:text-[#e4002b] transition-colors">
            FACEBOOK
          </a>
        </div>
      </div>
    </footer>
  );
}
