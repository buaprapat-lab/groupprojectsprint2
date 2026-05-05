// src/pages/customer/MenuPage.jsx
import React, { useState, useEffect } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import MenuCard from "../../component/customer/MenuCard";
import CartSidebar from "../../component/customer/CartSidebar";
// 1. นำเข้าข้อมูลให้ถูกชื่อ
import {
  menuData,
  AUTOPLAY_INTERVAL_MS,
  TOAST_DURATION_MS,
} from "../../assets/menuData";

const MenuPage = () => {
  // --- States ---
  const [activeTab, setActiveTab] = useState("all");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("crispyCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // 2. กรองเฉพาะรายการที่เป็นโปรโมชั่น (เอาไปทำ Slider ด้านซ้าย)
  const promos = menuData.filter((item) => item.badge === "promo");

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem("crispyCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (promos.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promos.length);
    }, AUTOPLAY_INTERVAL_MS || 5000); // ถ้าหาค่าไม่เจอให้ใช้ 5 วินาที
    return () => clearInterval(timer);
  }, [promos.length]);

  // --- Functions ---
  const handleAddToCart = (id, name) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { id, qty: 1 }];
    });

    setToastMsg(`Added: ${name}`);
    setTimeout(() => setToastMsg(""), TOAST_DURATION_MS || 2500);
  };

  const handleUpdateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) return { ...item, qty: item.qty + delta };
          return item;
        })
        .filter((item) => item.qty > 0),
    );
  };

  // 3. เปลี่ยนจาก MENU เป็น menuData
  const filteredMenu =
    activeTab === "all"
      ? menuData
      : menuData.filter((m) => m.cat === activeTab);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const totalPrice = cart.reduce((sum, item) => {
    const itemInfo = menuData.find((m) => m.id === item.id);
    // แปลงราคาที่เป็น String ให้เป็นตัวเลขก่อนคำนวณ
    const priceNum =
      typeof itemInfo?.price === "string"
        ? parseInt(itemInfo.price.replace(/[^\d]/g, ""))
        : itemInfo?.price || 0;
    return sum + priceNum * item.qty;
  }, 0);

  return (
    <div className="min-h-screen bg-[#eeeeee] font-['IBM_Plex_Sans_Thai'] text-[#242424] pt-18">
      <div className="flex flex-col md:flex-row relative">
        {/* --- PROMO PANEL (ซ้าย) --- */}
        <aside className="relative w-full h-[400px] md:w-96 md:shrink-0 md:sticky md:top-20 md:h-[calc(100vh-80px)] bg-[#242424] overflow-hidden">
          {promos.map((promo, i) => (
            <div
              key={promo.id}
              className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-500 ${i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <img
                src={promo.image}
                alt={promo.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="relative z-20 p-8 text-white bg-gradient-to-t from-black to-transparent">
                <span className="text-[#e4002b] font-bold text-xs tracking-widest uppercase">
                  {promo.badge}
                </span>
                <h2 className="font-['Bebas_Neue'] text-4xl my-2">
                  {promo.name}
                </h2>
                <div className="font-['Bebas_Neue'] text-3xl mb-4 text-[#DC5F00]">
                  {promo.price}
                </div>
                <button className="bg-[#e4002b] text-white px-6 py-2 rounded font-['Bebas_Neue'] text-lg hover:bg-white hover:text-black transition">
                  ORDER NOW
                </button>
              </div>
            </div>
          ))}
        </aside>

        {/* --- MENU GRID (ขวา) --- */}
        <main className="flex-1 p-6 md:p-10 pb-32">
          <header className="mb-8">
            <h2 className="text-5xl font-black font-['Bebas_Neue'] tracking-tight">
              SERIOUS SELECTIONS
            </h2>
          </header>

          {/* TABS */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {["all", "bucket", "sandwich", "side", "desserts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all border-2 ${
                  activeTab === tab
                    ? "bg-[#242424] text-white border-[#242424]"
                    : "border-gray-300 text-gray-500 hover:border-[#242424]"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onAddToCart={() => handleAddToCart(item.id, item.name)}
              />
            ))}
          </div>
        </main>
      </div>

      {/* --- MOBILE CART BAR --- */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 bg-[#242424] p-4 flex justify-between items-center text-white z-50 border-t-4 border-[#e4002b]"
        onClick={() => setIsCartOpen(true)}
      >
        <div>
          <div className="text-xs opacity-60">{totalItems} ITEMS</div>
          <div className="text-xl font-bold text-[#e4002b]">
            ฿{totalPrice.toLocaleString()}.-
          </div>
        </div>
        <button className="bg-[#e4002b] px-6 py-2 rounded-full font-black text-xs flex items-center gap-2">
          VIEW CART <ArrowRight size={14} />
        </button>
      </div>

      {/* --- TOAST --- */}
      <div
        className={`fixed bottom-10 right-10 bg-white border-2 border-[#242424] p-4 rounded-xl shadow-[8px_8px_0_#242424] z-[100] transition-all ${toastMsg ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
      >
        <div className="flex items-center gap-3 font-bold text-[#242424]">
          <CheckCircle className="text-green-500" /> {toastMsg}
        </div>
      </div>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
      />
    </div>
  );
};

export default MenuPage;
