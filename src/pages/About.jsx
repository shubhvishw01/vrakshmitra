import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../components/LanguageContext.jsx";
import { useNavigate } from "react-router-dom";

export default function About() {
  const { t } = useLang();
  const navigate = useNavigate();
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const [visibleSection, setVisibleSection] = useState({
    mission: false,
    vision: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "mission" && entry.isIntersecting) {
            setVisibleSection((prev) => ({ ...prev, mission: true }));
          } else if (entry.target.id === "vision" && entry.isIntersecting) {
            setVisibleSection((prev) => ({ ...prev, vision: true }));
          }
        });
      },
      { threshold: 0.3 }
    );

    if (missionRef.current) observer.observe(missionRef.current);
    if (visionRef.current) observer.observe(visionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-100 text-gray-800 pt-15 overflow-hidden">
      {/* Header Section */}
      <section className="relative h-[100vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')] 
      bg-cover bg-center will-change-transform brightness-[0.7]"
        ></div>

        {/* Green Natural Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-green-900/40 to-black/60"></div>

        {/* Content */}
        <div className="relative max-w-3xl px-6 transition-all duration-700">
          <h1 className="text-5xl md:text-6xl font-extrabold text-green-200 drop-shadow-md leading-tight">
            {t.aboutcontent.heading} 🌳
          </h1>

          <p className="mt-4 text-lg md:text-xl text-green-100 leading-relaxed font-medium drop-shadow-md">
            {t.aboutcontent.paragraph1}
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="relative bg-gradient-to-r from-white via-green-50 to-white py-24 border-t border-green-200 overflow-hidden fade-in">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-green-400/40 to-transparent blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text */}
          <div className="order-1 fade-in transition-all duration-700 hover:scale-105">
            <h2 className="text-4xl font-bold text-green-800 mb-3 tracking-wide transition-all duration-700 hover:text-green-600">
              {t.aboutfounder.heading1}: {t.aboutfounder.name} 🙏
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {t.aboutfounder.paragraph1}{" "}
              <span className="font-semibold text-green-700">
                {t.aboutfounder.name}
              </span>{" "}
              {t.aboutfounder.paragraph2} 🌱
            </p>
          </div>

          {/* Image */}
          <div className="relative flex justify-center order-2 fade-in-delayed group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-green-400 to-green-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-700"></div>
            <img
              src="/images/yogendra-sir.jpg"
              alt="Shree Yogendra Sir"
              className="relative z-10 w-[320px] h-[380px] object-cover rounded-2xl border-4 border-green-300 shadow-[0_0_40px_rgba(34,197,94,0.4)] transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>
      {/* Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-6 space-y-24">
        {/* Mission */}
        <div
          id="mission"
          ref={missionRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
            visibleSection.mission ? "animate-slideLeft" : "opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl group order-2 md:order-1">
            <img
              src="https://www.fastweb.com/uploads/article_photo/photo/2036160/Simple_Environment.jpeg"
              alt="Mission"
              className="w-full h-[400px] object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="order-1 md:order-2 transition-all duration-700 hover:scale-105">
            <h2 className="text-4xl font-bold text-green-800 mb-4 flex items-center gap-2 hover:text-green-600">
              {t.aboutourmission.heading} 🌏
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {t.aboutourmission.paragraph}
            </p>
          </div>
        </div>

        {/* Vision */}
        <div
          id="vision"
          ref={visionRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
            visibleSection.vision ? "animate-slideRight" : "opacity-0"
          }`}
        >
          <div className="order-1 transition-all duration-700 hover:scale-105">
            <h2 className="text-4xl font-bold text-green-800 mb-4 flex items-center gap-2 hover:text-green-600">
              {t.ourvision.heading} 🌿
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {t.ourvision.paragraph}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl shadow-2xl group order-2">
            <img
              src="https://wisconsinmuslimjournal.org/wp-content/uploads/2024/08/timthumb.jpeg"
              alt="Vision"
              className="w-full h-[400px] object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>
      {/* Timeline Section */}
      <section className="bg-linear-to-b from-white to-green-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center text-green-800 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t.ourjourney.heading} 🕊️
          </motion.h2>

          <div className="relative border-l-4 border-green-600 pl-6">
            {[
              {
                year: t.ourjourney.year2019,
                title: t.ourjourney.title1,
                desc: t.ourjourney.desc1,
              },
              {
                year: t.ourjourney.year2020,
                title: t.ourjourney.title2,
                desc: t.ourjourney.desc2,
              },
              {
                year: t.ourjourney.year2023,
                title: t.ourjourney.title3,
                desc: t.ourjourney.desc3,
              },
              {
                year: t.ourjourney.year2024,
                title: t.ourjourney.title4,
                desc: t.ourjourney.desc4,
              },
              {
                year: t.ourjourney.year2024late,
                title: t.ourjourney.title5,
                desc: t.ourjourney.desc5,
              },
            ].map((event, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? -100 : 100,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="mb-12 relative"
              >
                <div className="absolute w-4 h-4 bg-green-600 rounded-full -left-[1.45rem] mt-2 shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                <h3 className="text-xl font-bold text-green-700">
                  {event.year} - {event.title}
                </h3>
                <p className="text-gray-700 ml-2 mt-2">{event.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Join Section */}
      <section className="relative py-32 text-center text-white overflow-hidden">
        {/* Background Image + Parallax Effect */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')]
      bg-cover bg-center will-change-transform opacity-40"
        ></div>

        {/* Deep Nature Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b 
      from-black/70 via-green-900/40 to-black/70"
        ></div>

        {/* Floating Light Particles */}
        <div className="pointer-events-none absolute inset-0">
          <div className="w-2 h-2 bg-green-300/60 blur-md rounded-full absolute top-20 left-1/4 animate-pulse" />
          <div className="w-3 h-3 bg-yellow-200/50 blur-lg rounded-full absolute bottom-24 right-1/3 animate-ping" />
          <div className="w-2 h-2 bg-green-200/40 blur-md rounded-full absolute bottom-14 left-1/3 animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative max-w-3xl mx-auto px-6 transition-all duration-700">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-md">
            {t.joinsecton.heading1}
            <br />
            🌍
          </h2>

          <p className="mt-5 mb-10 text-green-100 text-lg md:text-xl leading-relaxed drop-shadow-md">
            {t.joinsecton.paragraph}
            🌍🌱।
          </p>

          <button
            onClick={() =>
              navigate("/volunteer", { state: { openJoinModal: true } })
            }
            className="bg-green-700 text-white px-5 py-3 rounded-full font-semibold hover:bg-green-800 transition"
          >
            🌿 {t.joinsecton.button1}
          </button>
        </div>
      </section>
    </div>
  );
}
