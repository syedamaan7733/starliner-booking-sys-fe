import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="bg-background">
      <div className="flex flex-col justify-between  ">
        <Navbar  />
        <main className="grow border-2  min-h-screen ">
          <Outlet  />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;
