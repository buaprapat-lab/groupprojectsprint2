// ตัวกระจายสัญญาณ State Management)
// ทำหน้าที่ดึงข้อมูลจาก localDb.js แล้วส่งแบบ Real-time ไปให้หน้า TableMap และ OrderList)
// คอยเฝ้าดูโกดัง (localDb) ถ้ามีการเปลี่ยนแปลงที่ CheckOutPage จะบอกหน้า TableMap ให้เปลี่ยนสถ่านะโต๊ะ

// src/context/PosContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  initDB,
  getTables,
  getOrders,
  updateTableStatus,
  updateOrderStatus,
  createOrder,
} from "../services/localDB";

// 1. สร้างตัวกระจายสัญญาณ (Context)
const PosContext = createContext();

// 2. สร้างกล่องครอบ (Provider) เพื่อให้ทุกหน้าจอเข้ามาดึงข้อมูลได้
export const PosProvider = ({ children }) => {
  // สร้าง State สำหรับเก็บข้อมูลที่พร้อมโชว์บนหน้าจอ
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);

  // ดึงข้อมูลครั้งแรกตอนเปิดโปรแกรม
  useEffect(() => {
    initDB(); // เช็คและสร้าง Mock DB ถ้ายังไม่มี
    refreshData(); // ดึงข้อมูลจาก Local Storage มาเก็บไว้ใน State
  }, []);

  // ฟังก์ชันไปดึงข้อมูลล่าสุดจากโกดัง (localDb)
  const refreshData = () => {
    setTables(getTables());
    setOrders(getOrders());
  };

  // ==========================================
  // Action Functions (ให้หน้าจอต่างๆ เรียกใช้)
  // ==========================================

  // เวลาแคชเชียร์/เด็กเสิร์ฟ สั่งเปลี่ยนสถานะโต๊ะ
  const changeTableStatus = (tableId, status) => {
    updateTableStatus(tableId, status); // 1. อัปเดตลง Local Storage
    refreshData(); // 2. ดึงข้อมูลใหม่มาอัปเดตหน้าจอทันที!
  };

  // เวลาลูกค้าสั่งอาหารใหม่
  const addNewOrder = (orderData) => {
    createOrder(orderData);
    refreshData();
  };

  // เวลาแคชเชียร์กดเก็บเงิน หรือยกเลิกออเดอร์
  const changeOrderStatus = (orderId, status) => {
    updateOrderStatus(orderId, status);
    refreshData();
  };

  // แพ็กของทั้งหมดใส่ตะกร้า เตรียมส่งให้หน้าอื่นๆ เอาไปใช้
  const value = {
    tables,
    orders,
    changeTableStatus,
    addNewOrder,
    changeOrderStatus,
    refreshData,
  };

  return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
};

// 3. สร้าง Hook เอาไว้ให้หน้า UI เรียกใช้ง่ายๆ
// แทนที่จะต้อง import ท่ายาก ก็เรียกแค่ usePos() จบเลย
// eslint-disable-next-line react-refresh/only-export-components
export const usePos = () => {
  return useContext(PosContext);
};
