import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/eventsSlice";
import { useLang } from "../components/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { t } = useLang();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { upcoming, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // safety
  const events = Array.isArray(upcoming) ? upcoming : [];

  const [scrollDir, setScrollDir] = useState("up");

  const [weeks, setWeeks] = useState(0);

  // Calculate Weeks Since First Plantation
  useEffect(() => {
    // Starting date
    const startDate = new Date(2019, 0, 13); // (year, monthIndex, day) — January = 0
    const today = new Date();

    const diffTime = today - startDate; // milliseconds
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)); // convert to weeks

    setWeeks(diffWeeks);
  }, []);

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
      { threshold: 0.2 }
    );

    boxes.forEach((box) => observer.observe(box));
    return () => observer.disconnect();
  }, [scrollDir]);

  const projects = [
    {
      title: t.projects.title1,
      desc: t.projects.desc1,
      img: "https://nonprod-media.webdunia.com/public_html/_media/hi/img/hp/home-page/2017-06/14/full/1497418216-4858.jpg",
    },
    {
      title: t.projects.title2,
      desc: t.projects.desc2,
      img: "https://www.jagranimages.com/images/newimg/25062022/25_06_2022-ytg_22835264.webp",
    },
    {
      title: t.projects.title3,
      desc: t.projects.desc3,
      img: "https://png.pngtree.com/thumb_back/fh260/background/20250227/pngtree-world-water-day-illustration-conservation-and-environmental-awareness-design-image_17007827.jpg",
    },
  ];

  useEffect(() => {
    if (!loading) {
      window.dispatchEvent(new Event("scroll"));
    }
  }, [loading]);

  return (
    <div>
      {/* HERO SECTION */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/videos/homebg1.webm" type="video/webm" />
        </video>

        {/* Dark Overlay (optimized, no backdrop filters) */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-0 px-6 py-16 md:py-24 text-white">
          {/* LEFT */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl  font-bold leading-tight drop-shadow-md">
              {t.hero.heading1}{" "}
              <span className="text-green-300 md:text-5xl">
                {t.hero.heading2}
              </span>{" "}
              {t.hero.heading3}
            </h1>
            <p className="text-lg text-gray-100">
              "{t.hero.paragraph1}"
              <br />"{t.hero.paragraph2}"
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/volunteer"
                state={{ openJoinModal: true }}
                className="bg-green-700 text-white px-5 py-3 rounded-full font-semibold hover:bg-green-800 transition"
              >
                🌿 {t.hero.button1}
              </Link>

              <Link
                to="/donate"
                className="bg-yellow-400 text-green-900 px-5 py-3 rounded-full font-semibold hover:bg-yellow-600 transition"
              >
                💚 {t.hero.button2}
              </Link>
            </div>
          </div>

          {/* RIGHT — optimized blur + rotation */}
          <div className="md:w-1/2 flex justify-center relative">
            {/* Aura Effect (Highly optimized) */}
            {/* <motion.div
              className="absolute w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full bg-green-600/20 blur-2xl"
              style={{ willChange: "transform" }}
              animate={{ scale: 1.05 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 10,
                ease: "easeInOut",
              }}
            /> */}

            {/* Earth */}

            <motion.div
              className="mt-8 relative aspect-square w-70 sm:w-72 md:w-130 rounded-full overflow-hidden"
              // style={{ willChange: "transform" }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 70,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.img
                src="/images/earth.webp"
                alt="Earth"
                className="w-full h-full object-cover rounded-full"
                style={
                  {
                    // filter: "brightness(1) saturate(1)",
                    // willChange: "filter, transform",
                  }
                }
                animate={{
                  filter: [
                    // "brightness(0.95) saturate(0.95)",
                    // "brightness(1.1) saturate(1.2)",
                  ],
                  // scale: [1, 1.02, 1], // subtle breathing effect
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative bg-[url('/images/bg.home.jpg')] bg-cover bg-center bg-no-repeat">
        {/* 🌏 About Section */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="py-16 md:py-20 mx-3">
          <div
            className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-4xl 
                   p-6    text-center 
                   border border-green-300 transition transform hover:-translate-y-5"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-800 mb-4 sm:mb-6 tracking-wide">
              {t.ourmission.heading} 🌏
            </h2>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto px-1">
              {t.ourmission.paragraph}
            </p>

            <Link
              to="/about"
              className="inline-block mt-6 sm:mt-8 bg-green-700 text-white text-base sm:text-lg 
              px-6 sm:px-8 py-2.5 sm:py-3 rounded-full 
              hover:bg-green-800 transition-all shadow-md hover:shadow-lg"
            >
              {t.ourmission.button} →
            </Link>
          </div>
        </div>

        {/* 🌳 Planting Stats – Ultra Premium + Animated */}
        <div
          className="max-w-5xl mx-auto my-16 p-[2px] rounded-4xl 
             bg-gradient-to-r from-green-300 to-green-500 dark:from-green-500 dark:to-green-600
             shadow-2xl animate-fade-in-up"
        >
          <div
            className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-4xl p-10 
               transition-all duration-500 hover:shadow-3xl hover:bg-white/90
               dark:hover:bg-black/60 hover:-translate-y-3"
          >
            {/* Layout */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* LEFT SECTION */}
              <div className="flex-1 text-center md:text-left animate-slide-left">
                <h1 className="text-4xl font-extrabold text-green-800 dark:text-green-300 tracking-wide leading-tight drop-shadow-sm mb-5">
                  🌱{t.firstplantation.heading1}🌱
                  <br />
                  {t.firstplantation.heading2}
                </h1>
                <p
                  className="bg-green-100/60 dark:bg-green-900/40 
                        px-4 py-2 rounded-2xl inline-block shadow-sm"
                >
                  <span className="text-green-700 dark:text-green-300 font-bold text-xl">
                    {t.firstplantation.date}
                  </span>
                </p>

                {/* <p className="mt-4 text-lg text-green-700 dark:text-green-200 font-medium opacity-90">
                  {t.firstplantation.paragraph1}
                </p> */}
              </div>

              {/* MIDDLE IMAGE */}
              <div className="box flex-1 flex justify-center animate-zoom-in">
                <div
                  className="p-2 rounded-3xl bg-gradient-to-br 
                  from-green-200 to-green-100 dark:from-green-700 dark:to-green-600
                  shadow-xl"
                >
                  <img
                    src="/images/firstplantation.jpg"
                    alt="Sapling"
                    className="rounded-3xl w-full shadow-xl 
                    transition-transform duration-500 hover:scale-300 hover:rotate-1"
                  />
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex-1 text-center md:text-right animate-slide-right">
                <div className="text-lg font-semibold text-green-900 dark:text-green-200 space-y-3">
                  <p
                    className="bg-green-100/60 dark:bg-green-900/40 
                    px-4 py-2 rounded-2xl inline-block shadow-sm"
                  >
                    {t.firstplantation.week} :{" "}
                    <span className="text-green-700 dark:text-green-300 font-bold text-xl">
                      {weeks}
                    </span>
                  </p>
                  <p className="mt-4 text-lg text-green-700 dark:text-green-200 font-medium">
                    "{t.firstplantation.paragraph2}"
                  </p>

                  {/* <p
                    className="bg-green-100/60 dark:bg-green-900/40 
                        px-4 py-2 rounded-2xl inline-block shadow-sm"
                  >
                    कुल वृक्ष रोपण :{" "}
                    <span className="text-green-700 dark:text-green-300 font-bold text-xl">
                      {weeks * 10}
                    </span>
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="py-20">
          <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
            <h2 className="box text-4xl font-bold text-green-300 mb-10">
              {t.upcomingevents.heading1}
            </h2>
            {/* Loader Overlay */}
            {loading && (
              <div className="box inset-0 flex items-center justify-center z-30 bg-transparent my-10">
                <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Empty State */}
            {!loading && events.length === 0 && (
              <p className="box inline-block text-green-400 text-center border border-amber-300 rounded-3xl text-xl font-semibold px-4 py-1">
                {t.upcomingevents.heading2}
              </p>
            )}

            {/* Events Grid (ALWAYS IN DOM) */}
            <div
              className={`grid md:grid-cols-3 gap-8 transition-opacity duration-300 ${
                loading ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {events.map((event) => (
                <div
                  key={event._id}
                  className="box bg-white/90 rounded-2xl shadow p-8 transition hover:-translate-y-3"
                >
                  <h3 className="text-xl font-semibold text-green-800">
                    {event.place}
                  </h3>
                  <p className="text-gray-600 mt-1">{event.date}</p>
                  <p className="text-gray-700 mt-3">{event.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="py-16">
          <div className=" relative max-w-6xl mx-auto px-6 text-center transition transform hover:-translate-y-5">
            <h2 className="box text-4xl font-bold text-green-300 mb-10 text-center">
              {t.projects.heading}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((item, index) => (
                <div
                  key={index}
                  className="box bg-white rounded-2xl shadow p-6 transition transform hover:-translate-y-5"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 object-cover mb-4 rounded-xl"
                  />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
