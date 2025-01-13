"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("today");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-around items-center w-full h-[70px] rounded-t-[20px] bg-white border-b-1 border-gray-200"> 
      <div
        className={`flex items-center justify-center w-1/2 h-full ${
          activeTab === "today" ? "border-b-2 border-black" : "border-b-2 border-gray-200" 
        }`}
        onClick={() => handleTabClick("today")}
      >
        <h3 className="font-bold leading-6 text-base cursor-pointer">Today's Task</h3>
      </div>
      <div
        className={`flex items-center justify-center w-1/2 h-full ${
          activeTab === "tomorrow" ? "border-b-2 border-black" : "border-b-2 border-gray-200" 
        }`}
        onClick={() => handleTabClick("tomorrow")}
      >
        <h3 className="font-bold leading-6 text-base cursor-pointer">Tomorrow's Task</h3>
      </div>
    </div>
  );
};

export default Navbar;