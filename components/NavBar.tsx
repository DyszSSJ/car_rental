import React from "react";
import { UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-5 shadow-md border-b-[1px] px-5 bg-white">
      <img
        src="/logo.png"
        alt="logo"
        style={{ width: "200px", height: "auto" }}
      />
      <div className="hidden md:flex gap-5">
        <h2 className="hover:bg-blue-500 transition-all ease-in-out p-2 hover:text-white rounded-full px-3 cursor-pointer">
          Home
        </h2>
        <h2 className="hover:bg-blue-500 transition-all ease-in-out p-2 hover:text-white rounded-full px-3 cursor-pointer">
          History
        </h2>
        <h2 className="hover:bg-blue-500 transition-all ease-in-out p-2 hover:text-white rounded-full px-3 cursor-pointer">
          Contact Us
        </h2>
      </div>
      <UserButton />
    </div>
  );
};

export default NavBar;
