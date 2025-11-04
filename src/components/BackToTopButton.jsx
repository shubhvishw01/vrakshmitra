import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // lucide-react icons ke liye

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll par visibility control
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 animate-bounce"
          aria-label="Back to Top"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </>
  );
}
