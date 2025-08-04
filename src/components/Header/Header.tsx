import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-sm md:px-5 2xl:px-10">
      <SidebarTrigger />
      <div>
        <span className="font-bold">Hello</span> Gihan Piumal
      </div>
    </header>
  );
};

export default Header;
