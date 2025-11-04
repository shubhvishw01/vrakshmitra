// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTopButton from "./BackToTopButton";
import ScrollProgressBar from "./ScrollProgressBar";
import ScrollToTop from "./ScrollToTop"; // <-- add this import

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-green-50 text-gray-800">
      <ScrollProgressBar />

      {/* Render ScrollToTop here so it's inside BrowserRouter and wraps whole app */}
      <ScrollToTop />

      <Navbar />
      <main className=" bg-green-50">{children}</main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Layout;
