// โรงงานผลิต เอาไว้ปั๊มข้อมูลโต๊ะว่างๆ กับออเดอร์ปลอมๆ ขึ้นมาในระบบตอนที่ Local Storage ยังว่างเปล่า
// เก็บข้อมูลโต๊ะ 10 ตัว และออเดอร์ตั้งต้น เอาไว้โหลดตอนเปิดเว็บครั้งแรก

// src/data/mockDatabase.js

/**
 * 1. ข้อมูลโต๊ะตั้งต้น (Initial Tables)
 * เก็บสถานะปัจจุบันของโต๊ะทุกตัวในร้าน
 */
export const initialTables = [
  {
    id: "T-01",
    shape: "square",
    cap: 4,
    status: "FREE",
    startTime: null,
    x: 8,
    y: 12,
  },
  {
    id: "T-02",
    shape: "square",
    cap: 4,
    status: "OCCUPIED",
    startTime: Date.now() - 1200000,
    x: 8,
    y: 38,
  }, // มีคนนั่งมาแล้ว 20 นาที
  {
    id: "T-03",
    shape: "square",
    cap: 4,
    status: "FREE",
    startTime: null,
    x: 8,
    y: 64,
  },
  {
    id: "T-04",
    shape: "square",
    cap: 2,
    status: "FREE",
    startTime: null,
    x: 28,
    y: 38,
  },
  {
    id: "VIP-1",
    shape: "long",
    cap: 8,
    status: "BILL",
    startTime: Date.now() - 3600000,
    x: 42,
    y: 12,
  }, // นั่งมา 1 ชม. กดเรียกเก็บเงินแล้ว
  {
    id: "T-05",
    shape: "long",
    cap: 6,
    status: "FREE",
    startTime: null,
    x: 42,
    y: 64,
  },
  {
    id: "B-01",
    shape: "circle",
    cap: 2,
    status: "OCCUPIED",
    startTime: Date.now() - 500000,
    x: 72,
    y: 18,
  },
  {
    id: "B-02",
    shape: "circle",
    cap: 2,
    status: "FREE",
    startTime: null,
    x: 84,
    y: 35,
  },
  {
    id: "B-03",
    shape: "circle",
    cap: 2,
    status: "FREE",
    startTime: null,
    x: 72,
    y: 52,
  },
  {
    id: "B-04",
    shape: "circle",
    cap: 2,
    status: "OCCUPIED",
    startTime: Date.now() - 100000,
    x: 84,
    y: 69,
  },
];

/**
 * 2. ข้อมูลออเดอร์ตั้งต้น (Initial Orders)
 * เก็บประวัติและออเดอร์ที่กำลังทำงานอยู่
 * (สังเกตว่าจะมีการแนบ Array ของ items หรือรายการอาหารเข้าไปด้วย เพื่อให้หน้า Checkout นำไปคำนวณเงินได้)
 */
export const initialOrders = [
  {
    orderId: "#SP-8829",
    status: "PENDING", // PENDING (รอชำระ), PAID (ชำระแล้ว), VOID (ยกเลิก)
    type: "DINE-IN", // DINE-IN, TAKE-AWAY, DELIVERY
    tableId: "T-02", // อ้างอิง ID ของโต๊ะ (ถ้าเป็นกลับบ้าน/เดลิเวอรี่ จะเป็น null)
    staff: "Staff-A",
    timestamp: Date.now() - 1200000,
    totalAmount: 666.61,
    items: [
      { id: 1, name: "Serious Punch Burger", qty: 2, price: 240 },
      { id: 7, name: "Golden Fries (L)", qty: 1, price: 49 },
      { id: 12, name: "Coca-Cola Refill", qty: 3, price: 45.87 },
    ],
  },
  {
    orderId: "#SP-8830",
    status: "PENDING",
    type: "TAKE-AWAY",
    tableId: null,
    staff: "Staff-B",
    timestamp: Date.now() - 600000,
    totalAmount: 250.0,
    items: [
      { id: 3, name: "Zabb Team Box", qty: 1, price: 149 },
      { id: 7, name: "Golden Fries (L)", qty: 2, price: 49 },
      { id: 8, name: "Coleslaw", qty: 1, price: 39 }, // แถมส่วนลด/ปัดเศษให้ตรงยอด 250
    ],
  },
  {
    orderId: "#SP-8825",
    status: "PAID", // ออเดอร์นี้จ่ายเงินแล้ว จะถูกดึงไปโชว์ในหน้า History
    type: "DINE-IN",
    tableId: "VIP-1",
    staff: "Admin",
    timestamp: Date.now() - 3600000,
    totalAmount: 1450.0,
    items: [
      { id: 1, name: "Signature 8pc Bucket", qty: 2, price: 299 },
      { id: 6, name: "Zinger Double", qty: 2, price: 199 },
      { id: 4, name: "Spicy Chicken Sandwich", qty: 3, price: 89 },
      { id: 8, name: "Coleslaw", qty: 4, price: 39 },
      { id: 11, name: "Soft serve", qty: 1, price: 31 },
    ],
  },
  {
    orderId: "#SP-8831",
    status: "PENDING",
    type: "DELIVERY",
    tableId: null,
    staff: "Staff-A",
    timestamp: Date.now() - 300000,
    totalAmount: 320.0,
    items: [
      { id: 4, name: "Spicy Chicken Sandwich", qty: 2, price: 89 },
      { id: 2, name: "Party Pack 20pc", qty: 1, price: 119 },
      { id: 10, name: "Chocolate Cupcake", qty: 1, price: 23 },
    ],
  },
];
