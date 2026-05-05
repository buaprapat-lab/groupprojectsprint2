// src/pages/cashier/CheckoutPage.jsx

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderHeader from "../../component/cashier/OrderHeader";
import OrderItemList from "../../component/cashier/OrderItemList";
import BillingSummary from "../../component/cashier/BillingSummary";
import PaymentMethodSelector from "../../component/cashier/PaymentMethodSelector";
import CashCalculator from "../../component/cashier/CashCalculator";
import CheckoutButton from "../../component/cashier/CheckoutButton";
import Sidebar from "../../component/shared/SideBar";
import { usePos } from "../../context/PosContext";

/*
const CheckoutPage = () => {
  // 1. Define State (The Data)
  const [items, setItems] = useState([
    { name: "Serious Punch Burger", qty: 2, price: 240 },
    { name: "KFC Styled Fries (L)", qty: 1, price: 89 },
    { name: "Coca-Cola Refill", qty: 3, price: 135 },
    { name: "Spicy Wing (6pcs)", qty: 1, price: 159 },
  ]);
  */

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. ดึงข้อมูล Database ผ่าน Context
  const { orders, changeOrderStatus, changeTableStatus } = usePos();

  // 2. หาว่าเรากำลังทำรายการของออเดอร์ไหนอยู่
  const targetOrderId = location.state?.orderId;
  const currentOrder = orders.find((o) => o.orderId === targetOrderId);

  // 3. Define State (ข้อมูลสำหรับการคำนวณในหน้านี้)
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [serviceChargeRate, setServiceChargeRate] = useState(0);
  const [paymentType, setPaymentType] = useState("CASH");
  const [payAmount, setPayAmount] = useState("");

  // เพิ่ม: เมื่อเปิดหน้ามาปุ๊บ ให้ดึงรายการอาหารจาก currentOrder มาตั้งต้น
  useEffect(() => {
    if (currentOrder) {
      setItems(currentOrder.items);
    } else if (!targetOrderId) {
      // ถ้าไม่มี orderId ส่งมา (เช่น พิมพ์ URL เข้ามาตรงๆ) ให้เด้งกลับไปหน้าแรก
      alert("กรุณาเลือกออเดอร์จากหน้า Order List ก่อนครับ");
      navigate("/waiter/orders");
    }
  }, [currentOrder, targetOrderId, navigate]);

  // 2. Calculations คำนวณ ราคาต่อชิ้น * จำนวน (qty)
  const rawSubtotal = items.reduce((sum, item) => sum + item.price, 0);

  let afterDiscount = Math.max(0, rawSubtotal - discount);
  let scAmount = afterDiscount * (serviceChargeRate / 100);
  let beforeTax = afterDiscount + scAmount;
  let taxAmount = beforeTax * 0.07;
  let finalTotal = beforeTax + taxAmount;

  // Handle auto-filling payAmount for non-cash methods
  useEffect(() => {
    if (paymentType !== "CASH") {
      setPayAmount(finalTotal);
    } else {
      setPayAmount(""); // Reset when switching back to cash
    }
  }, [paymentType, finalTotal]);

  const changeAmount =
    paymentType === "CASH" ? Math.max(0, Number(payAmount) - finalTotal) : 0;

  // Disable checkout if no items, or if cash payment is less than total
  const isCheckoutDisabled =
    items.length === 0 ||
    (paymentType === "CASH" && Number(payAmount) < finalTotal);

  // 3. Actions
  const handleRemoveItem = (indexToRemove) => {
    if (window.confirm("ต้องการยกเลิกรายการนี้ใช่หรือไม่?")) {
      setItems(items.filter((_, index) => index !== indexToRemove));
    }
  };

  /*
  const handleCheckout = () => {
    alert(
      `รับชำระเงินเรียบร้อยผ่าน ${paymentType} จำนวน ${finalTotal.toFixed(2)} บาท! กำลังพิมพ์ใบเสร็จ...`,
    );
    // Reset state after checkout
    setItems([]);
    setDiscount(0);
    setServiceChargeRate(0);
    setPayAmount("");
    setPaymentType("CASH");
  };
  */

  // เพิ่ม: การชำระเงินที่เชื่อมกับฐานข้อมูล
  const handleCheckout = () => {
    if (!currentOrder) return;

    alert(
      `รับชำระเงินเรียบร้อยผ่าน ${paymentType} จำนวน ${finalTotal.toFixed(2)} บาท! กำลังพิมพ์ใบเสร็จ...`,
    );

    // ก. เปลี่ยนสถานะออเดอร์เป็น PAID (จ่ายแล้ว จะไปโผล่หน้า History)
    changeOrderStatus(currentOrder.orderId, "PAID");

    // ข. ถ้าลูกค้านั่งทานที่ร้าน (DINE-IN) และมีเบอร์โต๊ะ ให้ล้างโต๊ะเป็นว่าง (FREE)
    if (currentOrder.type === "DINE-IN" && currentOrder.tableId) {
      changeTableStatus(currentOrder.tableId, "FREE");
    }

    // ค. เด้งกลับไปหน้าคิวออเดอร์แบบหล่อๆ
    navigate("/waiter/orders");
  };

  // 6. แปลงวันที่ให้สวยงาม (Timestamp -> เวลาไทย)
  const formatDateTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date
      .toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .toUpperCase();
  };

  // ถ้ายังโหลดไม่เสร็จ หรือไม่มีข้อมูลออเดอร์ ให้โชว์หน้าจอว่างๆ ไปก่อนกัน Error
  if (!currentOrder) return null;

  // 4. Render
  return (
    <div className="flex bg-[#eeeeee] min-h-screen font-['IBM_Plex_Sans_Thai']">
      <Sidebar />
      <main className="flex-1 ml-60 flex flex-col h-screen p-6 md:p-10">
        <OrderHeader
          orderNo={currentOrder.orderId}
          tableType={`${currentOrder.type} ${currentOrder.tableId ? `: ${currentOrder.tableId}` : ""}`}
          dateStr={formatDateTime(currentOrder.timestamp)}
        />

        <div className="flex flex-1 gap-6 overflow-hidden min-h-0">
          {/* Left Side: Items */}
          <div className="flex-[1.2] flex flex-col min-w-0">
            <OrderItemList
              items={items}
              onRemoveItem={handleRemoveItem}
              discount={discount}
              setDiscount={setDiscount}
              serviceCharge={serviceChargeRate}
              setServiceCharge={setServiceChargeRate}
            />
          </div>

          {/* Right Side: Payment */}
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 pb-4">
            <BillingSummary
              rawSubtotal={rawSubtotal}
              discountAmount={discount}
              scAmount={scAmount}
              taxAmount={taxAmount}
              finalTotal={finalTotal}
            />

            <PaymentMethodSelector
              selectedMethod={paymentType}
              onSelectMethod={setPaymentType}
            />

            <CashCalculator
              paymentType={paymentType}
              payAmount={payAmount}
              setPayAmount={setPayAmount}
              finalTotal={finalTotal}
              changeAmount={changeAmount}
            />

            <div className="mt-auto pt-2">
              <CheckoutButton
                onCheckout={handleCheckout}
                disabled={isCheckoutDisabled}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
