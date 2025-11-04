import { motion } from "framer-motion";

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-100 text-gray-800 pt-15 overflow-hidden">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-center py-20 bg-gradient-to-r from-green-900 to-green-700 text-white"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            वृक्ष मित्र संस्था 🌳
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-green-100 max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            हम एक पर्यावरण संरक्षण संगठन हैं जो पेड़ लगाने, उनकी देखभाल करने और
            लोगों को प्रकृति के प्रति संवेदनशील बनाने का कार्य करता है।
          </motion.p>
        </div>
      </motion.section>

      {/* Founder Section */}
      <motion.section
        className="bg-gradient-to-r from-white via-green-50 to-white py-20 border-t border-green-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
          >
            <h2 className="text-3xl font-bold text-green-800 mb-3">
              संस्थापक: श्री योगेन्द्र सर 🙏
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              वृक्ष मित्र संस्था के संस्थापक{" "}
              <span className="font-semibold text-green-700">
                श्री योगेन्द्र सर
              </span>{" "}
              के ही मार्गदर्शन में सभी वृक्ष मित्र मिलकर इस अभियान को
              सफलतापूर्वक संचालित कर रहे हैं। उनका उद्देश्य है — “हर व्यक्ति एक
              वृक्ष लगाए, और धरती को फिर से हरा-भरा बनाए।” 🌱
            </p>
          </motion.div>
          <motion.div
            className="relative group flex justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-tr from-green-400 to-green-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-all"></div>
            <img
              src="/yogendra-sir.jpg"
              alt="Shree Yogendra Sir"
              className="relative z-10 w-[320px] h-[380px] object-cover rounded-2xl border-4 border-green-300 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-6 space-y-24">
        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative overflow-hidden rounded-3xl shadow-2xl group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src="https://png.pngtree.com/png-clipart/20230525/original/pngtree-world-environment-day-5th-june-green-earth-covered-with-trees-png-image_9170049.png"
              alt="Mission"
              className="w-full h-[400px] object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold text-green-800 mb-4 flex items-center gap-2">
              हमारा मिशन 🌏
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              हमारा मिशन धरती को हरियाली से भरना, वायु को स्वच्छ बनाना और जलवायु
              परिवर्तन से निपटना है। वृक्ष मित्र संस्था का मानना है कि हर
              व्यक्ति एक पौधे के माध्यम से भविष्य को हरा बना सकता है।
            </p>
          </motion.div>
        </div>

        {/* Vision */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold text-green-800 mb-4 flex items-center gap-2">
              हमारी दृष्टि 🌿
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              एक ऐसा समाज जहाँ हर व्यक्ति पर्यावरण के प्रति जिम्मेदार हो। हम आने
              वाले वर्षों में लाखों पेड़ लगाने, जल संरक्षण और प्रदूषण नियंत्रण
              के प्रति जागरूकता फैलाने का लक्ष्य रखते हैं।
            </p>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-3xl shadow-2xl group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src="https://wisconsinmuslimjournal.org/wp-content/uploads/2024/08/timthumb.jpeg"
              alt="Vision"
              className="w-full h-[400px] object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gradient-to-b from-white to-green-50 py-20">
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
      <motion.section
        className="bg-green-700 text-white text-center py-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10"></motion.div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            आइए, हमारे साथ मिलकर धरती को बचाएं 🌍
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-green-100 text-lg">
            हर व्यक्ति एक पेड़ लगाए, यही हमारे पर्यावरण की सच्ची रक्षा है। अभी
            जुड़ें और बनें एक सच्चे वृक्ष मित्र!
          </p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="/volunteer"
            className="bg-yellow-400 text-green-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 shadow-lg shadow-yellow-300/30 transition-all"
          >
            हमारे साथ जुड़ें →
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
