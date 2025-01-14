import React from "react";
import Navbar from "@/components/Navbar";
import CreateTask from "@/components/CreateTask";
import ListingTodo from "./ListingTodo";

const Layout = () => {
  return (
    <div className="flex flex-col w-[402px] h-[874px] bg-slate-50 rounded-[20px] ">
      <Navbar />
      <CreateTask />
      <ListingTodo />
    </div>
  );
};

export default Layout;
