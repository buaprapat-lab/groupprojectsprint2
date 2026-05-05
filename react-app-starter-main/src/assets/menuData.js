// src/assets/menuData.js

export const AUTOPLAY_INTERVAL_MS = 5000; // ตั้งเวลาสลับรูปโปรโมชั่นทุก 5 วินาที
export const TOAST_DURATION_MS = 2500; // ตั้งเวลาให้แจ้งเตือนหายไปหลังผ่านไป 2.5 วินาที
export const menuData = [
  {
    id: "p1",
    name: "SMILE BUCKET",
    price: "฿199.-",
    cal: "1200 Cal.",
    badge: "promo",
    image: "/images/pro-1.png",
  },
  {
    id: "t1",
    name: "ZABB TEAM BOX",
    price: "฿149.-",
    cal: "850 Cal.",
    badge: "top-sale",
    image: "/images/pro-2.png",
  },
  {
    id: "t2",
    name: "Signature 8pc Bucket",
    price: "฿299.-",
    cal: "1500 Cal.",
    badge: "top-sale",
    image: "/images/menu-profile-1.png",
  },
  {
    id: "n1",
    name: "CHICKSKATE",
    price: "฿199.-",
    cal: "950 Cal.",
    badge: "new",
    image: "/images/pro-4.png",
  },
  {
    id: "m1",
    name: "Classic Sandwich",
    price: "฿69.-",
    cal: "450 Cal.",
    badge: "", // ไม่มี badge ก็เว้นว่างไว้
    image: "/images/menu-profile-5.png",
  },
];
