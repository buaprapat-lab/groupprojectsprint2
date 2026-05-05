// index Section 5: Foodies, it's time!

import React from "react";

export default function FinalCTA() {
  return (
    <section className="w-full bg-[#e4002b] rounded-3xl py-20 px-6 flex flex-col items-center relative overflow-hidden text-center mt-12">
      {/* หยักๆ ตกแต่ง (Squiggle Line) */}
      <div className="text-white opacity-80 mb-6 tracking-[0.5em]">
        〰️〰️〰️〰️
      </div>

      <h2 className="text-6xl md:text-8xl font-['Bebas_Neue'] text-white leading-[0.9] tracking-widest uppercase z-10">
        FOODIES, <br />
        IT'S TIME TO <span className="text-[#242424]">REJOICE.</span>
      </h2>

      <p className="mt-6 mb-12 text-[#eeeeee] font-['IBM_Plex_Sans_Thai'] max-w-lg text-lg z-10">
        We're Serious Punch: the fried chicken joint of your dreams. Discover
        the crunchy items that set our menu apart.
      </p>

      {/* Placeholder รูปอาหารซ้อนกันแบบภาพที่ 5 */}
      <div className="relative w-[300px] h-[400px] bg-white/20 rounded-full border-4 border-dashed border-white/50 flex items-center justify-center backdrop-blur-sm z-10">
        <span className="text-white font-['IBM_Plex_Sans_Thai'] text-center px-4">
          Stacked Chicken / Burger Image <br /> (Transparent PNG)
        </span>

        {/* Starburst Sticker แบบรูป 5/6 */}
        <div
          className="absolute -top-6 -right-6 bg-[#DC5F00] text-white font-['Bebas_Neue'] w-28 h-28 flex items-center justify-center rotate-12 shadow-lg"
          style={{
            clipPath:
              "polygon(50% 0%, 61% 16%, 79% 9%, 84% 26%, 100% 31%, 95% 48%, 100% 64%, 84% 71%, 81% 89%, 63% 84%, 50% 100%, 37% 84%, 19% 89%, 16% 71%, 0% 64%, 5% 48%, 0% 31%, 16% 26%, 21% 9%, 39% 16%)",
          }}
        >
          <span className="text-xl tracking-wide -rotate-12">
            ORDER <br /> NOW!
          </span>
        </div>
      </div>

      <div className="text-white opacity-80 mt-12 tracking-[0.5em]">
        〰️〰️〰️〰️
      </div>
    </section>
  );
}
