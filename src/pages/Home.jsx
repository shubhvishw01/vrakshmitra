import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
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
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* 🎬 Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          {/* <source src="/videos/vtest.mp4" type="video/mp4" /> */}
          <source src="/videos/home1280..webm" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* 🌿 Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-0 px-6 py-16 md:py-24 text-white">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
              चलो मिलकर <span className="text-green-300">धरा को हरा भरा</span>{" "}
              बनाते हैं 🌱
            </h1>
            <p className="text-lg text-gray-100 drop-shadow-md">
              वृक्ष मित्र संस्था पर्यावरण की रक्षा और वृक्षारोपण को समर्पित एक
              अभियान है। आइए मिलकर पौधे लगाएँ और आने वाली पीढ़ियों के लिए एक
              हरियाली भरा भविष्य बनाएं।
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

          <div className="md:w-1/2 flex justify-center md:mb-0 relative md:mt-0">
            {/* 🌟 Glowing Aura */}
            <motion.div
              className="absolute w-80 h-80 md:w-120 md:h-120 rounded-full bg-green-600/30 blur-3xl"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            {/* 🌍 Earth Animation (Fixed Responsive Round Shape) */}
            <motion.div
              className="relative aspect-square w-64 sm:w-72 md:w-96 rounded-full overflow-hidden flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <motion.img
                src="https://i0.wp.com/amazingphysicsforall.com/wp-content/uploads/2022/06/planet-earth-space-continents-1457453.png?fit=1280%2C1280&ssl=1"
                alt="Earth"
                className="w-full h-full object-cover rounded-full"
                style={{
                  filter:
                    "brightness(0.7) saturate(0.7) sepia(0.5) hue-rotate(-20deg)",
                }}
                animate={{
                  filter: [
                    "brightness(0.7) saturate(0.7) sepia(0.5) hue-rotate(-20deg)", // dry
                    "brightness(1.1) saturate(1.4) sepia(0) hue-rotate(10deg)", // green
                  ],
                }}
                transition={{
                  duration: 7,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🌏 About Section */}
      <section className="relative bg-[url('/images/Nature_home.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/50 backdrop-brightness-75"></div>
        <section className="py-16">
          <div className="relative bg-white/90 rounded-2xl p-8 max-w-6xl mx-auto px-4 text-center transition-all duration-700 hover:scale-105">
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              हमारा मिशन 🌏
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              वृक्ष मित्र संस्था पर्यावरण की सुरक्षा, पौधारोपण और जलवायु संतुलन
              के लिए काम करती है। हम हर वर्ष हजारों पौधे लगाते हैं और लोगों को
              पर्यावरण के प्रति जागरूक बनाते हैं।
            </p>
            <Link
              to="/about"
              className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition"
            >
              और जानें →
            </Link>
          </div>
        </section>

        <section className="py-20">
          {/* 🌗 Dark Overlay for brightness control */}

          {/* 🌱 Content */}
          <div className="relative max-w-6xl mx-auto px-4 text-center text-white transition-all duration-700 hover:scale-105">
            <h2 className="text-4xl font-bold text-green-300 mb-10">
              आगामी वृक्षारोपण
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  date: "10 नवम्बर 2025",
                  place: "सालीचौका – वन उद्यान",
                  desc: "स्थानीय विद्यालय के साथ 200 पौधों का वृक्षारोपण",
                },
                {
                  date: "15 नवम्बर 2025",
                  place: "गाडरवारा – नदी किनारा",
                  desc: "नर्मदा संरक्षण हेतु वृक्षारोपण अभियान",
                },
                {
                  date: "20 नवम्बर 2025",
                  place: "भोपाल – पार्क क्षेत्र",
                  desc: "सामाजिक समूह द्वारा हरित मिशन कार्यक्रम",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="duration-300 bg-white/90 rounded-2xl shadow-md p-8 hover:shadow-lg hover:-translate-y-5 transition text-gray-800"
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
        </section>

        {/* 🌲 Projects Section */}
        <section className="py-16">
          <div className="relative max-w-6xl mx-auto px-6 text-center transition-all duration-700 hover:scale-105">
            <h2 className="text-4xl font-bold text-green-300 mb-10">
              हमारे प्रमुख प्रोजेक्ट्स 🌲
            </h2>
            <div className="grid md:grid-cols-3 gap-8 ">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 transform hover:-translate-y-5 transition"
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-48 object-cover mx-auto mb-4 rounded-xl"
                  />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-gray-600">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
