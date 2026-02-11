import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLang } from "./LanguageContext";

const Navbar = () => {
  const { t, toggleLanguage, lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  const navLinks = [
    { name: `${t.navLinks.home}`, path: "/" },
    { name: `${t.navLinks.about}`, path: "/about" },
    // { name: `${t.navLinks.projects}`, path: "/projects" },
    { name: `${t.navLinks.gallery}`, path: "/gallery" },
    { name: `${t.navLinks.volunteer}`, path: "/volunteer" },
    { name: `${t.navLinks.donate}`, path: "/donate" },
    // { name: `${t.navLinks.blog}`, path: "/blog" },
    { name: `${t.navLinks.contact}`, path: "/contact" },
    // { name: `${t.navLinks.episode}`, path: "/episode" },
  ];

  const isHome = location.pathname === "/";

  // ✅ Optimized scroll listener with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgOpacity = Math.min(scrollY / 300, 0.8);
  const blurValue = Math.min(scrollY / 30, 10);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-700 will-change-transform will-change-backdrop-filter"
      style={{
        backgroundColor: isHome
          ? `rgba(255,255,255,${bgOpacity})`
          : "rgba(255,255,255,0.9)",
        backdropFilter: `blur(${isHome ? blurValue : 8}px)`,
        WebkitBackdropFilter: `blur(${isHome ? blurValue : 8}px)`,
        boxShadow:
          scrollY > 60
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "0 0px 0px rgba(0,0,0,0)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* 🌿 Logo */}
        <NavLink
          to="/"
          className={`
      flex flex-col items-center
      w-[160px] sm:w-[180px]   /* 🔒 FIXED WIDTH */
      text-center
      whitespace-nowrap
      transition-transform duration-500 ease-in-out
      ${scrollY > 40 ? "scale-[0.85]" : "scale-100"}
      ${isHome && scrollY < 40 ? "text-white" : "text-green-700"}
    `}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {/* Logo Image */}
          <img
            src="/images/vmsLogo_bg1.png"
            alt="Vraksh Mitra Sanstha Logo"
            className="w-8 h-7 mb-1"
          />

          {/* Title */}
          <span className="font-semibold text-sm sm:text-base leading-tight block">
            {t.logo.title}
          </span>

          {/* Subtitle */}
          <span className="text-[10px] sm:text-xs font-medium tracking-wide block">
            {t.logo.city}
          </span>
        </NavLink>

        {/* 🖥️ Desktop Menu */}
        <div className="hidden md:flex space-x-6 transition-colors duration-500">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative font-medium transition duration-300 
              hover:text-green-700 after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full 
              after:scale-x-0 after:bg-green-500 after:opacity-70 after:transition-transform after:duration-300 hover:after:scale-x-100 
              ${
                isActive
                  ? "text-green-700 after:scale-x-100"
                  : isHome && scrollY < 40
                  ? "text-white"
                  : "text-gray-800"
              }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <button
            onClick={toggleLanguage}
            className="items-right text-sm font-medium  text-yellow-600 hover:text-red-500 gap-1 focus:outline-none"
          >
            {lang === "hi" ? "Eng" : "हिंदी"} <span className="text-xs">▼</span>
          </button>
        </div>

        {/* 📱 Mobile Actions (Language + Hamburger) */}
        <div className="flex items-center gap-3 md:hidden z-[60]">
          {/* 🌐 Language Toggle (RIGHT) */}
          <button
            onClick={toggleLanguage}
            className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors duration-300
      ${
        isHome && scrollY < 40
          ? "text-white border border-white/70"
          : "text-yellow-600 border border-green-600"
      }`}
          >
            {lang === "hi" ? "EN" : "हिं"}
          </button>
          {/* Hamburger Menu (LEFT) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`focus:outline-none transition-colors duration-500 ${
              isHome && scrollY < 40 ? "text-white" : "text-green-800"
            }`}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>
      {/* 📲 Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-3/4 sm:w-1/2 
        bg-green-700/90 backdrop-blur-xl shadow-xl text-white
        transform transition-transform duration-500 ease-in-out 
        z-50 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg font-bold transition-colors duration-300 ${
                  isActive
                    ? "text-yellow-400"
                    : "text-white hover:text-yellow-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* 🔲 Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
