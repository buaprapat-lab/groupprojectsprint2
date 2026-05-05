// src/component/customer/OrderStep.jsx
import React, { useState, useEffect, useRef } from "react";
// 🚨 นำเข้าไอคอน Drumstick (น่องไก่) มาใช้เป็น Loading ครับ
import {
  Bike,
  Store,
  Utensils,
  CheckCircle2,
  Clock,
  MapPin,
  Flame,
  Drumstick,
} from "lucide-react";

export default function OrderStep() {
  const [activeStep, setActiveStep] = useState(1);
  const [expandProgress, setExpandProgress] = useState(0);
  const cardRefs = useRef([]);
  const finaleRef = useRef(null);

  const steps = [
    {
      id: 1,
      title: "DELIVERY",
      icon: Bike,
      image: "/images/mascot-delivery.png",
      desc: [
        "ส่งไว ทันใจวัยรุ่นหิว",
        "ครอบคลุมพื้นที่พังโคน",
        "รับประกันความกรอบ",
        "สั่งเลยตอนนี้!",
      ],
    },
    {
      id: 2,
      title: "PICK UP STORE",
      icon: Store,
      image: "/images/mascot-skate.png",
      desc: [
        "สั่งล่วงหน้าผ่านเว็บ",
        "แวะโฉบมารับที่หน้าร้าน",
        "ไม่ต้องรอคิว",
        "สะดวก รวดเร็ว พร้อมลุย",
      ],
    },
    {
      id: 3,
      title: "DINE-IN",
      icon: Utensils,
      image: "/images/mascot-eat.png",
      desc: [
        "แวะมานั่งชิลที่ร้าน",
        "เสพ Vibe สตรีทคัลเจอร์",
        "กินไก่ทอดร้อนๆ",
        "ชวนเพื่อนมาปาร์ตี้",
      ],
    },
  ];

  const finalePromises = [
    { title: "ANYTIME", icon: Clock, desc: "หิวเมื่อไหร่ จัดได้ทันที" },
    { title: "ANYWHERE", icon: MapPin, desc: "ครอบคลุมทั่วพื้นที่พังโคน" },
    { title: "ANY VIBE", icon: Flame, desc: "ปาร์ตี้บ้าน หรือชิลร้านก็สุด" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const { top, bottom } = card.getBoundingClientRect();
        if (
          scrollPosition >= top + window.scrollY &&
          scrollPosition <= bottom + window.scrollY
        ) {
          setActiveStep(steps[index].id);
        }
      });

      // 🚨 ลอจิก Cinematic รูปแบบใหม่ (ขยายไวขึ้น แล้วค้างไว้อ่านนานขึ้น)
      if (finaleRef.current) {
        const rect = finaleRef.current.getBoundingClientRect();
        const scrolled = -rect.top;

        // กำหนดระยะที่ใช้สำหรับ "การขยายกล่อง" (ใช้แค่ 70% ของความสูงจอ)
        // ส่วนที่เหลือจะถูกปล่อยให้ค้างจอไว้นิ่งๆ ให้คนได้อ่านครับ
        const expandDistance = window.innerHeight * 0.7;

        if (scrolled >= 0) {
          let progress = scrolled / expandDistance;
          setExpandProgress(Math.max(0, Math.min(1, progress)));
        } else {
          setExpandProgress(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full flex flex-col relative">
      <section className="w-full bg-[#eeeeee] relative pb-[10vh]">
        <div className="sticky top-[60px] md:top-[80px] z-40 bg-[#eeeeee] pt-12 pb-6 px-4 w-full">
          <div className="w-full max-w-7xl mx-auto md:px-8">
            <h2 className="text-4xl md:text-5xl font-['Bebas_Neue'] font-black text-[#242424] tracking-widest uppercase text-center md:text-left md:ml-[33%]">
              CHOOSE YOUR <span className="text-[#e4002b]">FIGHTING STYLE</span>
            </h2>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-4 md:mt-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 relative items-start">
            <div className="md:w-1/3 w-full md:sticky md:top-[200px] flex flex-row md:flex-col justify-center gap-6 z-30 sticky top-[130px] bg-[#eeeeee]/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none py-4 md:border-none border-b border-gray-200">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-6 transition-all duration-300 ${activeStep === step.id ? "opacity-100" : "opacity-40"}`}
                >
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${activeStep === step.id ? "bg-[#242424] text-white shadow-[4px_4px_0_#e4002b] -translate-y-1" : "bg-white text-[#242424] border-2"}`}
                  >
                    <step.icon
                      size={activeStep === step.id ? 28 : 24}
                      strokeWidth={activeStep === step.id ? 2.5 : 2}
                    />
                  </div>
                  <span
                    className={`font-['Bebas_Neue'] tracking-widest text-2xl hidden md:block transition-all duration-300 ${activeStep === step.id ? "text-[#242424] scale-110" : "text-gray-400"}`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="md:w-2/3 flex flex-col gap-[30vh] w-full items-center md:items-start pb-[10vh]">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`flex flex-col bg-white rounded-[24px] p-6 md:p-8 shadow-sm border w-full max-w-[480px] transition-all duration-700 ${activeStep === step.id ? "opacity-100 translate-y-0" : "opacity-30 translate-y-12"}`}
                >
                  <div className="w-full h-[180px] md:h-[200px] relative mb-8 flex justify-center items-end">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <h3 className="text-3xl font-['Bebas_Neue'] text-[#242424] mb-4">
                    {step.title}
                  </h3>
                  <ul className="flex flex-col gap-3 font-['IBM_Plex_Sans_Thai'] text-gray-600">
                    {step.desc.map((line, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2
                          size={18}
                          className="text-[#DC5F00] shrink-0"
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── พาร์ทที่ 2: ฉากจบขยายเต็มจอ (แช่หน้าจอให้อ่านได้นานขึ้น) ─── */}
      {/* 🚨 เพิ่มความสูงเป็น 250vh เพื่อให้ตอนกล่องขยายเสร็จ มันจะล็อกค้างที่เดิมให้คนอ่านยาวๆ */}
      <section
        ref={finaleRef}
        className="w-full bg-[#eeeeee] h-[250vh] relative z-50"
      >
        <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
          <div
            className="bg-[#242424] flex flex-col items-center justify-center relative shadow-2xl"
            style={{
              width: `${80 + expandProgress * 20}%`,
              height: `${60 + expandProgress * 40}vh`,
              borderRadius: `${(1 - expandProgress) * 40}px`,
            }}
          >
            {/* 🚨 กิมมิค 1: น่องไก่ Loading (เฟดหายไปตอนกล่องขยายเกิน 50%) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300"
              style={{ opacity: Math.max(0, 1 - expandProgress * 2) }}
            >
              <Drumstick
                size={64}
                className="text-[#e4002b] animate-bounce"
                strokeWidth={1.5}
              />
              <span className="text-[#DC5F00] font-['Bebas_Neue'] tracking-widest mt-4 text-xl animate-pulse">
                PREPARING THE CRUNCH...
              </span>
            </div>

            {/* 🚨 กิมมิค 2: เนื้อหาหลัก (เริ่มเฟดเข้ามาตอนกล่องขยายเกิน 60%) แถมมีเด้งขึ้นมานิดๆ */}
            <div
              className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center transition-all duration-300"
              style={{
                opacity:
                  expandProgress > 0.6 ? (expandProgress - 0.6) * 2.5 : 0,
                transform: `translateY(${(1 - expandProgress) * 30}px)`,
              }}
            >
              <h2 className="text-4xl md:text-6xl font-['Bebas_Neue'] font-black text-white tracking-widest uppercase mb-16 text-center leading-tight">
                NO MATTER HOW YOU FIGHT. <br />
                <span className="text-[#e4002b]">WE DELIVER THE CRUNCH.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-4xl mb-16">
                {finalePromises.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 rounded-[20px] p-8 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 mb-6 rounded-full bg-[#e4002b] flex items-center justify-center text-white shadow-[0_0_15px_rgba(228,0,43,0.5)]">
                      <item.icon size={36} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-3xl font-['Bebas_Neue'] text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="font-['IBM_Plex_Sans_Thai'] text-gray-300">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <button className="bg-white text-[#242424] font-['Bebas_Neue'] text-2xl md:text-3xl tracking-widest py-4 md:py-5 px-16 shadow-[8px_8px_0_#e4002b] hover:translate-y-[4px] hover:translate-x-[4px] hover:shadow-[4px_4px_0_#e4002b] transition-all rounded-none border-2 border-white group relative overflow-hidden">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  START YOUR PUNCH
                </span>
                <div className="absolute inset-0 w-0 bg-[#e4002b] group-hover:w-full transition-all duration-300 ease-out z-0"></div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
