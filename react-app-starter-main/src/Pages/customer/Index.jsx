import React from "react";
import { menuData } from "../../assets/menuData";
import Hero from "../../component/customer/Hero";
import BrandValue from "../../component/customer/BrandValue";
import PromoCarousel from "../../component/customer/PromoCarousel";
import OrderStep from "../../component/customer/OrderStep";
import FinalCTA from "../../component/customer/FinalCTA";
import Footer from "../../component/customer/Footer";

export default function IndexPage({ t }) {
  const topSales = menuData?.filter((item) => item.badge === "top-sale") || [];
  const newUpdates = menuData?.filter((item) => item.badge === "new") || [];
  const promotions = menuData?.filter((item) => item.badge === "promo") || [];

  const highlightItems = [
    ...promotions.slice(0, 1),
    ...topSales.slice(0, 2),
    ...newUpdates.slice(0, 1),
  ];

  return (
    // 🚨 1. ลบ overflow-x-hidden ออกเด็ดขาด! ไม่งั้น Sticky ใน OrderStep จะพัง
    <div className="bg-[#eeeeee] min-h-screen font-['IBM_Plex_Sans_Thai'] flex flex-col">
      <div className="w-full bg-[#242424] pt-24 pb-8">
        <Hero />
      </div>

      {/* 🚨 2. ลบ gap และ margin ที่เว่อร์ๆ ออก เพื่อจัดระยะใหม่ให้พอดี */}
      <main className="flex-1 w-full flex flex-col">
        {/* Section 1: BrandValue ปล่อยอิสระให้กางเต็มจอได้ */}
        <BrandValue />

        {/* 🚨 Section 2: PromoCarousel เอาใส่กลับเข้า "กล่องนิรภัย" จะได้ไม่ชิดขอบจอ */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 mb-12">
          {highlightItems.length > 0 && (
            <PromoCarousel
              title="SERIOUS SELECTIONS"
              items={highlightItems}
              t={t}
            />
          )}
        </div>

        {/* 🚨 Section 3: OrderStep ต้อง "อยู่นอกกล่อง" เพราะข้างในเขามีกล่องคุมเองแล้ว และต้องการให้ฉากดำตอนจบกางเต็มจอ */}
        <OrderStep />

        {/* Section 4: FinalCTA เอาใส่กลับเข้ากล่องเพื่อความเรียบร้อย */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-20 mb-24">
          <FinalCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
}
