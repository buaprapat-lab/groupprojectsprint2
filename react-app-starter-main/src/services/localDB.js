// ระบบหลังบ้านจำลอง Fake APIs
// รวมฟังก์ชัน CRUD เช่น getOrders, createOrder, updateTable
// คอยทำหน้าที่รับคำสั่ง (CRUD) ไปเขียนลง Local Storage หยิบของออกมา หรือลบของทิ้ง

// src/services/localDb.js
import { initialTables, initialOrders } from "../data/mockDatabase";

const TABLE_KEY = "sp_tables";
const ORDER_KEY = "sp_orders";

// ==========================================
// 1. ฟังก์ชันตั้งต้น (Seed Data)
// ==========================================
export const initDB = () => {
  // ถ้าเปิดเว็บมาแล้วยังไม่มีข้อมูลโต๊ะ ให้เอาข้อมูลตั้งต้นไปใส่
  if (!localStorage.getItem(TABLE_KEY)) {
    localStorage.setItem(TABLE_KEY, JSON.stringify(initialTables));
  }
  // ถ้ายังไม่มีข้อมูลออเดอร์ ให้เอาข้อมูลตั้งต้นไปใส่
  if (!localStorage.getItem(ORDER_KEY)) {
    localStorage.setItem(ORDER_KEY, JSON.stringify(initialOrders));
  }
};

// ==========================================
// 2. ฟังก์ชันจัดการโต๊ะ (Table API)
// ==========================================

// Read: ดึงข้อมูลโต๊ะทั้งหมด
export const getTables = () => {
  return JSON.parse(localStorage.getItem(TABLE_KEY)) || [];
};

// Update: อัปเดตสถานะโต๊ะ (เช่น จาก FREE -> OCCUPIED)
export const updateTableStatus = (tableId, newStatus) => {
  const tables = getTables();
  const updatedTables = tables.map((t) => {
    if (t.id === tableId) {
      return {
        ...t,
        status: newStatus,
        // ถ้าเปลี่ยนเป็น OCCUPIED ให้เริ่มจับเวลา ถ้าเป็น FREE ให้ล้างเวลาทิ้ง
        startTime:
          newStatus === "OCCUPIED"
            ? Date.now()
            : newStatus === "FREE"
              ? null
              : t.startTime,
      };
    }
    return t;
  });
  localStorage.setItem(TABLE_KEY, JSON.stringify(updatedTables));
  return updatedTables;
};

// ==========================================
// 3. ฟังก์ชันจัดการออเดอร์ (Order API)
// ==========================================

// Read: ดึงข้อมูลออเดอร์ทั้งหมด
export const getOrders = () => {
  return JSON.parse(localStorage.getItem(ORDER_KEY)) || [];
};

// Create: สร้างออเดอร์ใหม่ (ตอนลูกค้ากดสั่งอาหาร)
export const createOrder = (orderData) => {
  const orders = getOrders();
  // สร้างเลข Order ID จำลองแบบง่ายๆ (เช่น #SP-8832)
  const newOrderId = `#SP-${Math.floor(1000 + Math.random() * 9000)}`;

  const newOrder = {
    ...orderData,
    orderId: newOrderId,
    timestamp: Date.now(),
  };

  orders.push(newOrder); // เติมออเดอร์ใหม่ต่อท้าย
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
  return newOrder;
};

// Update: เปลี่ยนสถานะออเดอร์ (เช่น กดจ่ายเงิน PENDING -> PAID)
export const updateOrderStatus = (orderId, newStatus) => {
  const orders = getOrders();
  const updatedOrders = orders.map((order) => {
    if (order.orderId === orderId) {
      return { ...order, status: newStatus };
    }
    return order;
  });
  localStorage.setItem(ORDER_KEY, JSON.stringify(updatedOrders));
  return updatedOrders;
};

// Delete: ยกเลิก/ลบออเดอร์ (VOID)
export const deleteOrder = (orderId) => {
  const orders = getOrders();
  const updatedOrders = orders.filter((order) => order.orderId !== orderId); // กรองเอาตัวที่จะลบออก
  localStorage.setItem(ORDER_KEY, JSON.stringify(updatedOrders));
  return updatedOrders;
};

// ==========================================
// 4. ฟังก์ชันล้างระบบ (Reset)
// ==========================================
export const resetDB = () => {
  localStorage.removeItem(TABLE_KEY);
  localStorage.removeItem(ORDER_KEY);
  initDB(); // เคลียร์เสร็จก็โหลดข้อมูลจำลองใส่กลับเข้าไปใหม่
};
