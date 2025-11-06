import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "Donate", path: "/donate" },
    // { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return ( 
    <nav
      className={`fixed top-0 left-0 w-full z-100 transition-all duration-800 ${
        isScrolled || location.pathname !== "/"
          ? "bg-white/80 shadow-md text-green-700"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* 🌿 Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold flex items-center gap-2 transition-all ${
            isScrolled || location.pathname !== "/"
              ? "text-green-700"
              : "text-white"
          }`}
        >
          <span className="text-3xl">🌱</span> वृक्ष मित्र संस्था
        </Link>

        {/* 🖥️ Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `transition hover:text-yellow-300 ${
                    isActive ? "text-yellow-300 font-semibold" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 📱 Mobile Menu Button */}
        <button
          className={`md:hidden focus:outline-none z-120 ${
            isOpen ? "text-white" : "text-green-700"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* 📱 Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 
        bg-green-800/70 backdrop-blur-lg border-l border-green-500/30
        text-white shadow-2xl transform transition-all duration-500 ease-in-out 
        z-110 rounded-l-3xl 
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 px-4">
          {navItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium tracking-wide transition duration-300 transform 
                hover:scale-110 hover:text-yellow-300 ${
                  isActive ? "text-yellow-300 font-semibold" : ""
                }`
              }
              style={{
                animation: isOpen
                  ? `fadeSlideIn 0.5s ease forwards ${index * 0.1 + 0.2}s`
                  : "none",
                opacity: 0,
              }}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* 🔳 Background Overlay (video dikhega peeche se) */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 z-100 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* 🔄 Animation Keyframes */}
      <style>
        {`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateX(40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </nav>
  );
}
