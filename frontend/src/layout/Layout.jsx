import React from "react";
import Navbar from "../component/Header/Navbar";
import Footer from "../component/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow bg-gray-100">
          <Outlet />
        </main>
        <footer className="">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
