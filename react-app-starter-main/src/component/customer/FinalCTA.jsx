// src/component/customer/FinalCTA.jsx
import React, { useEffect, useRef, useState } from "react";

export default function FinalCTA() {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;

      const rect = container.getBoundingClientRect();
      const maxScrollVertical = container.offsetHeight - window.innerHeight;
      let scrolled = -rect.top;

      if (scrolled < 0) scrolled = 0;
      if (scrolled > maxScrollVertical) scrolled = maxScrollVertical;

      // คำนวณความคืบหน้า (0.0 ถึง 1.0)
      let p = maxScrollVertical > 0 ? scrolled / maxScrollVertical : 0;
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // 🚨 แก้ไขสำคัญสุด: ลดความสูงเหลือ h-[150vh]
    // พอรูปเลื่อนสุดขอบปุ๊บ ไถต่ออีกนิด Footer จะขึ้นมาชนต่อทันที! ไม่มีที่ว่างแล้ว!
    <section ref={containerRef} className="w-full relative h-[150vh] z-50">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float-slow 4s ease-in-out infinite; }
        
        @keyframes fast-pulse {
          0%, 100% { opacity: 1; transform: scale(1) rotate(-12deg); }
          50% { opacity: 0.8; transform: scale(1.1) rotate(-12deg); }
        }
        .animate-fast-pulse { animation: fast-pulse 0.6s ease-in-out infinite; }
      `,
        }}
      />

      {/* ล็อคหน้าจอให้อยู่ตรงกลางเป๊ะๆ */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="w-[92%] max-w-[1200px] h-[75vh] md:h-[85vh] bg-[#e4002b] rounded-[2rem] md:rounded-[3rem] relative flex items-center justify-center shadow-2xl pointer-events-auto">
          {/* 1. Text Content: อยู่ตรงกลางนิ่งๆ */}
          <div className="absolute z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-4xl pointer-events-none">
            <h2 className="text-[50px] md:text-[90px] font-['Bebas_Neue'] text-white leading-[0.85] tracking-widest uppercase text-center mb-4 md:mb-6">
              FOODIES, <br />
              IT'S TIME TO{" "}
              <span className="text-[#242424] drop-shadow-[4px_4px_0_white]">
                REJOICE.
              </span>
            </h2>
            <p className="text-[#eeeeee] font-['IBM_Plex_Sans_Thai'] font-medium text-base md:text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              We're Serious Punch: the fried chicken joint of your dreams.
              Discover the crunchy items that set our menu apart.
            </p>
          </div>

          {/* 2. รูปไก่อาหาร: เลื่อนหลบไปทางซ้าย */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none will-change-transform"
            style={{
              // ดันรูปไปซ้ายสุดให้พ้น Text
              transform: `translateX(-${progress * 40}vw)`,
            }}
          >
            <div className="animate-float flex items-center justify-center w-full h-full">
              <img
                src="/images/cta-menu.png"
                alt="Serious Punch Menu"
                className="w-auto h-[60%] md:h-[75%] max-h-[600px] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>

          {/* 3. ปุ่ม ORDER NOW! โผล่มากระพริบตอนรูปสไลด์เสร็จ */}
          <button
            className={`absolute z-30 right-[5%] top-[10%] md:right-[8%] md:top-[12%] bg-[#DC5F00] text-white font-['Bebas_Neue'] w-28 h-28 md:w-36 md:h-36 flex items-center justify-center transition-all duration-300 shadow-2xl
              ${
                progress > 0.9
                  ? "opacity-100 animate-fast-pulse cursor-pointer hover:bg-[#ff6e00]"
                  : "opacity-0 scale-50 pointer-events-none"
              }
            `}
            style={{
              clipPath:
                "polygon(50% 0%, 61% 16%, 79% 9%, 84% 26%, 100% 31%, 95% 48%, 100% 64%, 84% 71%, 81% 89%, 63% 84%, 50% 100%, 37% 84%, 19% 89%, 16% 71%, 0% 64%, 5% 48%, 0% 31%, 16% 26%, 21% 9%, 39% 16%)",
            }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              alert("พร้อมสั่งไก่ทอดแล้วจ้าพี่บัว! 🍗");
            }}
          >
            <span className="text-2xl md:text-3xl tracking-wider text-center leading-none mt-1 -rotate-12">
              ORDER <br /> NOW!
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
