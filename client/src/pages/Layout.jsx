import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useUser,SignIn } from "@clerk/clerk-react";


const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const {user} = useUser()
  return user? (
    <div className="flex flex-col items-start justify-start h-screen z-0  ">
      <nav className="flex justify-between w-full border-b border-slate-300  py-3 px-2 md:px-4 sm:px-20 xl:px-20 ">
        <Link to="/" className="flex items-center space-x-1 md:space-x-2 ">
          <img
            src="/logo.png"
            className="h-7 w-7 md:h-9 md:w-9 object-contain cursor-pointer"
            alt="logo"
          />
          <span className="text-xl md:text-2xl font-semibold text-primary cursor-pointer">
            Genify.<span className="text-gray-400">ai</span>
          </span>
        </Link>

        {sidebar ? (
          <X
            onClick={() => setSidebar(!sidebar)}
            className="w-6 h-6 text-secondary sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(!sidebar)}
            className="w-6 h-6 text-secondary sm:hidden"
          />
        )}
      </nav>

      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <div className="flex-1 ">
          <Outlet />
        </div>
      </div>
    </div>
  ):(
    <div className="flex items-center justify-center h-screen">
     <SignIn/>
    </div>
  )
};

export default Layout;
