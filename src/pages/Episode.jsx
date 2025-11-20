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
