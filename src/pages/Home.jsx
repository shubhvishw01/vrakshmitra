import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
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
      { threshold: 0.2 }
    );

    boxes.forEach((box) => observer.observe(box));
    return () => observer.disconnect();
  }, [scrollDir]);

  const projects = [
    {
      title: "हर घर पेड़",
      desc: "हर परिवार एक पौधा लगाए — यही हमारा पहला कदम है हरियाली की ओर।",
      img: "https://nonprod-media.webdunia.com/public_html/_media/hi/img/hp/home-page/2017-06/14/full/1497418216-4858.jpg",
    },
    {
      title: "ग्रीन स्कूल अभियान",
      desc: "बच्चों को पेड़ लगाने और प्रकृति से प्रेम करना सिखाना।",
      img: "https://www.jagranimages.com/images/newimg/25062022/25_06_2022-ytg_22835264.webp",
    },
    {
      title: "जल संरक्षण मिशन",
      desc: "वर्षा जल संचयन और जल संरक्षण पर कार्य।",
      img: "https://www.adda247.com/jobs/wp-content/uploads/sites/4/2022/12/14101552/List-of-Water-Conservation-Campaigns-and-Schemes.png",
    },
  ];

  return (
    <div className="text-gray-800">
      {/* 🌱 HERO SECTION */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* 🎬 Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/videos/home1280.webm" type="video/webm" />
        </video>

        {/* Dark Overlay (optimized, no backdrop filters) */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* 🌿 Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-0 px-6 py-16 md:py-24 text-white">
          {/* LEFT */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-md">
              चलो मिलकर <span className="text-green-300">धरा को हरा भरा</span>{" "}
              बनाते हैं 🌱
            </h1>
            <p className="text-lg text-gray-100">
              🌿"हर लगाया हुआ वृक्ष आने वाली पीढ़ियों के लिए आशा का दीप बनता
              है।"
              <br />
              वृक्ष मित्र संस्था पर्यावरण की रक्षा और वृक्षारोपण को समर्पित एक
              अभियान है।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/volunteer"
                className="bg-green-700 text-white px-5 py-3 rounded-full font-semibold hover:bg-green-800 transition"
              >
                🌿 हमारे साथ जुड़ें
              </Link>

              <Link
                to="/donate"
                className="bg-yellow-400 text-green-900 px-5 py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
              >
                💚 सहयोग करें
              </Link>
            </div>
          </div>

          {/* RIGHT — optimized blur + rotation */}
          <div className="md:w-1/2 flex justify-center relative">
            {/* Aura Effect (Highly optimized) */}
            <motion.div
              className="absolute w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full bg-green-600/20 blur-2xl"
              style={{ willChange: "transform" }}
              animate={{ scale: 1.05 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 10,
                ease: "easeInOut",
              }}
            />

            {/* Earth */}
            <motion.div
              className="relative aspect-square w-64 sm:w-72 md:w-96 rounded-full overflow-hidden"
              style={{ willChange: "transform" }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 80,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.img
                src="/images/earth.webp"
                alt="Earth"
                className="w-full h-full object-cover rounded-full"
                style={{
                  filter: "brightness(1) saturate(1)",
                  willChange: "filter, transform",
                }}
                animate={{
                  filter: [
                    "brightness(0.95) saturate(0.95)",
                    "brightness(1.1) saturate(1.2)",
                  ],
                  scale: [1, 1.02, 1], // subtle breathing effect
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

      <div className="relative bg-[url('/images/Nature_home.jpg')] bg-cover bg-center bg-no-repeat">
        {/* 🌏 About Section */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="py-16 md:py-20 mx-3">
          <div
            className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-4xl 
                   p-6    text-center 
                   border border-green-300"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-800 mb-4 sm:mb-6 tracking-wide">
              हमारा मिशन 🌏
            </h2>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto px-1">
              वृक्ष मित्र संस्था का लक्ष्य केवल पेड़ लगाना नहीं, बल्कि हरियाली
              को फिर से जीवित करना है। हम ऐसी दुनिया बनाना चाहते हैं जहाँ हर
              व्यक्ति प्रकृति से जुड़कर उसके संरक्षण में अपना योगदान दे। हम
              पौधारोपण, वृक्ष संरक्षण और पर्यावरण जागरूकता के माध्यम से आने वाली
              पीढ़ियों के लिए एक स्वच्छ, सुरक्षित और संतुलित भविष्य तैयार कर रहे
              हैं।
            </p>

            <Link
              to="/about"
              className="inline-block mt-6 sm:mt-8 bg-green-700 text-white text-base sm:text-lg 
              px-6 sm:px-8 py-2.5 sm:py-3 rounded-full 
              hover:bg-green-800 transition-all shadow-md hover:shadow-lg"
            >
              और जानें →
            </Link>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="py-20">
          <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
            <h2 className="box text-4xl font-bold text-green-300 mb-10">
              आगामी वृक्षारोपण
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  date: "25 नवम्बर 2025",
                  place: "सालीचौका – वन उद्यान",
                  desc: "स्थानीय विद्यालय के साथ पौधों का वृक्षारोपण",
                },
                {
                  date: "27 नवम्बर 2025",
                  place: "गाडरवारा – नदी किनारा",
                  desc: "नर्मदा संरक्षण हेतु वृक्षारोपण अभियान",
                },
                {
                  date: "30 नवम्बर 2025",
                  place: "सालीचौका – पार्क क्षेत्र",
                  desc: "सामाजिक समूह द्वारा हरित मिशन कार्यक्रम",
                },
              ].map((event, i) => (
                <div
                  key={i}
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
          <div className=" relative max-w-6xl mx-auto px-6 text-center">
            <h2 className="box text-4xl font-bold text-green-300 mb-10 text-center">
              हमारे प्रमुख प्रोजेक्ट्स
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="box bg-white rounded-2xl shadow p-6 transition transform hover:-translate-y-3"
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-48 object-cover mb-4 rounded-xl"
                  />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-gray-600">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
