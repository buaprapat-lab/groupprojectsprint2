// src/component/rider/DriverDashboard.jsx

import React, { useState } from 'react';
// Import ข้อมูลมาจากไฟล์ assets ที่เราสร้างไว้ (ต้องถอยหลังออกไป 2 ชั้นเพื่อหาโฟลเดอร์ assets)
import { deliveryTasks } from '../../assets/orderdriver';

const DriverDashboard = () => {
  // สร้าง State สำหรับเก็บค่า Tab ปัจจุบัน โดยเริ่มต้นที่ 'current'
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg font-sans">
      
      {/* Header: ส่วนหัวของ Dashboard */}
      <header className="py-8 px-4 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tight text-black">
          Driver Dashboard
        </h1>
      </header>

      {/* Tabs Selection: ส่วนสลับหน้า Current Tasks และ History */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('current')}
          className={`flex-1 py-3 font-bold text-sm transition-all ${
            activeTab === 'current' 
            ? 'border-b-4 border-black text-black' 
            : 'text-gray-400'
          }`}
        >
          CURRENT TASKS
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 font-bold text-sm transition-all ${
            activeTab === 'history' 
            ? 'border-b-4 border-black text-black' 
            : 'text-gray-400'
          }`}
        >
          DELIVERY HISTORY
        </button>
      </div>

      {/* Task List: ส่วนการแสดงรายการออเดอร์โดยใช้ .map() */}
      <div className="p-4 space-y-4 bg-gray-50/50 min-h-[70vh]">
        {deliveryTasks.map((task) => (
          <div 
            key={task.id} 
            className="bg-white border-2 border-gray-200 rounded-[2.5rem] p-5 flex items-center shadow-sm"
          >
            {/* Image Placeholder: วงกลมหรือกล่องรูปภาพด้านซ้าย */}
            <div className="w-24 h-24 bg-gray-300 rounded-2xl flex-shrink-0"></div>

            {/* Content Details: รายละเอียดชื่อออเดอร์และสถานะ */}
            <div className="ml-5 flex-1">
              <h2 className="text-lg font-black uppercase text-black">
                Order {task.id}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-bold">Status:</span> {task.status}
              </p>
              
              {/* Start Delivery Button: ปุ่มที่เปลี่ยนสีตามค่า canStart */}
              <button
                disabled={!task.canStart}
                onClick={() => alert(`Start Delivery for ${task.id}`)}
                className={`mt-3 w-full py-2 px-4 rounded-xl font-black text-white uppercase tracking-wider transition-all ${
                  task.canStart 
                  ? 'bg-[#D33131] hover:bg-red-700 active:scale-95 cursor-pointer' 
                  : 'bg-[#E57373] opacity-80 cursor-not-allowed'
                }`}
              >
                Start Delivery
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverDashboard;