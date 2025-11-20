import React, { useEffect, useState } from "react";

function Episode() {
  const [scrollDir, setScrollDir] = useState("down");

  // Detect Scroll Direction
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const detectScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", detectScroll);
    return () => window.removeEventListener("scroll", detectScroll);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const boxes = document.querySelectorAll(".box");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;

          if (entry.isIntersecting) {
            el.classList.remove("hide-left");

            if (scrollDir === "down") {
              el.classList.add("from-right");
              el.classList.remove("from-left");
            } else {
              el.classList.add("from-left");
              el.classList.remove("from-right");
            }
          } else {
            el.classList.add("hide-left");
            el.classList.remove("from-left");
            el.classList.remove("from-right");
          }
        });
      },
      { threshold: 0.7 }
    );

    boxes.forEach((box) => observer.observe(box));
    return () => observer.disconnect();
  }, [scrollDir]);

  return (
    <div className="dark:bg-slate-500 mx-auto max-w-4xl p-6 mt-12 space-y-10">
      {/** Reusable clean box */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div className="box rounded-xl shadow-md dark:bg-slate-700/40 bg-white p-8 flex flex-col gap-3">
          <h2 className="text-3xl font-bold dark:text-green-400 text-blue-700">
            This is episode {i + 1}
          </h2>
          <p className="text-lg leading-relaxed dark:text-white text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            officia necessitatibus sit earum impedit itaque cupiditate enim
            dolorum.
          </p>
        </div>
      ))}
    </div>
  );
}

export default Episode;

// import React, { useState, useEffect } from "react";

// export default function ScrollSlideDiv() {
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Yahan opacity aur translateX ko scroll ke hisaab se map karte hain
//   const maxScroll = 100; // scroll ke kitne px tak animation chale
//   const opacity = Math.min(scrollY / maxScroll, 1) * 0.9;
//   const translateX = Math.min(scrollY / maxScroll, 1) * 500;

//   return (
//     <div
//       style={{
//         height: "100vh",
//         padding: "50px",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           opacity: opacity,
//           transform: `translateX(${translateX}px)`,
//           transition: "all 0.01s ease-out", // smooth movement and fade
//           background: "linear-gradient(135deg, #667eea, #764ba2)", // gradient color
//           color: "white",
//           padding: "30px 40px",
//           width: "250px",
//           borderRadius: "15px", // rounded corners
//           boxShadow: "0 15px 30px rgba(0,0,0,0.2)", // subtle shadow
//           fontSize: "1.2rem",
//           textAlign: "center",
//           fontWeight: "600",
//         }}
//       >
//         Scroll-Based Slide
//       </div>
//     </div>
//   );
// }
