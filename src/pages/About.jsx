import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function About() {
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
            वृक्ष मित्र संस्था 🌳
          </h1>

          <p className="mt-4 text-lg md:text-xl text-green-100 leading-relaxed font-medium drop-shadow-md">
            हम एक पर्यावरण संरक्षण संगठन हैं जो पेड़ लगाने, उनकी देखभाल करने और
            लोगों को प्रकृति के प्रति जागरूक बनाने का कार्य करते हैं। हमारा
            उद्देश्य आने वाली पीढ़ियों के लिए एक हरा-भरा, स्वच्छ और स्वस्थ
            भविष्य बनाना है।
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
              संस्थापक: श्री योगेन्द्र सिंह 🙏
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              वृक्ष मित्र संस्था के संस्थापक{" "}
              <span className="font-semibold text-green-700">
                श्री योगेन्द्र सिंह
              </span>{" "}
              के ही मार्गदर्शन में सभी वृक्ष मित्र मिलकर इस अभियान को
              सफलतापूर्वक संचालित कर रहे हैं। उनका उद्देश्य है — “हर व्यक्ति एक
              वृक्ष लगाए, और धरती को फिर से हरा-भरा बनाए।” 🌱
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
              हमारा मिशन 🌏
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              हमारा मिशन धरती को हरियाली से भरना, वायु को स्वच्छ बनाना और जलवायु
              परिवर्तन से निपटना है। वृक्ष मित्र संस्था का मानना है कि हर
              व्यक्ति एक पौधे के माध्यम से भविष्य को हरा बना सकता है।
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
              हमारी दृष्टि 🌿
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              एक ऐसा समाज जहाँ हर व्यक्ति पर्यावरण के प्रति जिम्मेदार हो। हम आने
              वाले वर्षों में लाखों पेड़ लगाने, जल संरक्षण और प्रदूषण नियंत्रण
              के प्रति जागरूकता फैलाने का लक्ष्य रखते हैं।
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
            हमारी यात्रा 🕊️
          </motion.h2>

          <div className="relative border-l-4 border-green-600 pl-6">
            {[
              {
                year: "2019",
                title: "पहला पौधारोपण 🌱",
                desc: "संस्था का प्रथम पौधारोपण 20 जनवरी 2019 को किया गया। तब से हर सप्ताह पौधारोपण जारी है।",
              },
              {
                year: "2020",
                title: "100+ पौधे लगाए",
                desc: "पूरे नगरीय क्षेत्र में वृक्षारोपण अभियान चलाया गया।",
              },
              {
                year: "2023",
                title: "ग्रीन स्कूल इनिशिएटिव",
                desc: "स्कूलों में बच्चों को पर्यावरण शिक्षा दी गई।",
              },
              {
                year: "2025",
                title: "डिजिटल ट्रैकिंग सिस्टम",
                desc: "अब हम हर पेड़ की ग्रोथ ऑनलाइन ट्रैक कर सकते हैं।",
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
            आइए, मिलकर धरती को बचाएं 🌍
          </h2>

          <p className="mt-5 mb-10 text-green-100 text-lg md:text-xl leading-relaxed drop-shadow-md">
            हर व्यक्ति एक पेड़ लगाए — यही धरती के लिए सबसे अनमोल उपहार है। आइए,
            प्रकृति की इस पुकार को सुनें और मिलकर बनें एक सच्चे ‘वृक्ष मित्र’
            🌍🌱।
          </p>

          <a
            href="/volunteer"
            className="inline-block bg-yellow-400 text-green-900 px-10 py-3
        rounded-full font-semibold shadow-xl hover:bg-yellow-500
        transition-all duration-500 hover:scale-110 hover:shadow-2xl
        ring-2 ring-yellow-300/40 hover:ring-yellow-300"
          >
            हमारे साथ जुड़ें →
          </a>
        </div>
      </section>
    </div>
  );
}
