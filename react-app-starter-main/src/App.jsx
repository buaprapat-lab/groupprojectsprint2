import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// นำเข้า Layout หลัก
import MainLayout from "../src/layout/MainLayout";

// นำเข้า Pages ต่างๆ
import Index from "./pages/customer/Index";
import Order from "./pages/customer/Order";
import Buttonmenu from "./component/Buttonmenu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckoutPage from "./pages/cashier/CheckoutPage";
import TableMap from "./pages/shared/TableMap";
import OrderList from "./pages/cashier/OrderList";
import OrderHistory from "./pages/cashier/OrderHistory";
import CookBoard from "./pages/CookBoard";
import MenuPage from "./pages/customer/MenuPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ให้ MainLayout ครอบทุกหน้า เพื่อให้มี Navbar และ Footer เสมอ */}
        <Route path="/" element={<MainLayout />}>
          
          {/* ---- โซนหน้าของ Customer ---- */}
          <Route index element={<Buttonmenu />} /> {/* หน้าแรก (/) */}
          <Route path="home" element={<Index />} />
          <Route path="order" element={<Order />} />
          <Route path="menu" element={<MenuPage />} />
     

          {/* ---- โซนหน้าของ พนักงาน (Cashier / Waiter / Kitchen) ---- */}
          <Route path="cashier/checkout" element={<CheckoutPage />} />
          <Route path="cashier/orders" element={<OrderList />} />
          <Route path="cashier/history" element={<OrderHistory />} />
          <Route path="shared/tables" element={<TableMap />} />
          <Route path="cookBoard" element={<CookBoard />} />

        </Route>
        {/* เพิ่ม Route ของ chasier / shared (with waiter)  */}
        <Route path="/cashier/checkout" element={<CheckoutPage />} />
        <Route path="/shared/tables" element={<TableMap />} />
        <Route path="/cashier/orders" element={<OrderList />} />
        <Route path="/cashier/history" element={<OrderHistory />} />
        <Route path="/menu" element={<Buttonmenu />} />
       
        {/* <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
         <Route path="/cookBoard" element={<CookBoard/>}></Route> */}
      </Routes>
    </Router>
  );
}
