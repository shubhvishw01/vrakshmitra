import { useLang } from "../components/LanguageContext.jsx";

const Contact = () => {
  const { t } = useLang();
  const handleContactUs = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! this page is under production mode.");
  };
  return (
    <section className="pt-28 bg-gradient-to-b from-green-50 to-white">
      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start p-4">
        {/* LEFT: GET IN TOUCH */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-green-800 mb-6">
            {t.contact.heading} 🌿
          </h1>

          <div className="space-y-4 text-left text-gray-700 leading-relaxed">
            <p className="font-medium">1. {t.contact.paragraph1}</p>
            <p className="font-medium">2. {t.contact.paragraph2}</p>
            <p className="font-medium">3. {t.contact.paragraph3}</p>
            <p className=" font-medium">4. {t.contact.paragraph4}</p>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <form className="w-full p-8 bg-white rounded-3xl shadow-[0px_0px_9px_0px_#001A6E] border border-green-100 space-y-5">
          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 
                       focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
            placeholder="Your Name"
            type="text"
          />

          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 
                       focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
            placeholder="Email"
            type="email"
          />

          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 
                       focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
            placeholder="Contact Number"
            type="text"
          />

          <textarea
            rows="5"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 
                       focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm resize-none"
            placeholder="Message"
          ></textarea>

          <button
            type="submit"
            onClick={handleContactUs}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl 
                       text-lg font-semibold shadow-md transition-all"
          >
            Send Message →
          </button>
        </form>
      </div>

      {/* CONTACT INFO BOXES */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-16 p-4">
        {/* Email */}
        <div
          className="bg-white shadow-[0px_0px_3px_0px_#001A6E] border border-green-100 rounded-2xl p-5 
                  flex flex-col items-center justify-center text-center"
        >
          <p className="text-gray-800 text-sm sm:text-base break-all">
            <a href="mailto:vrakshmitra@gmail.com">📧 vrakshmitra@gmail.com</a>
          </p>
        </div>

        {/* Phone */}
        <div
          className="bg-white shadow-[0px_0px_3px_0px_#001A6E] border border-green-100 rounded-2xl p-5 
                  flex flex-col items-center justify-center text-center"
        >
          <p className="text-gray-800 text-sm sm:text-base">
            <a href="tel:+918103384532">📞 +91 81033 84532</a>
          </p>
        </div>

        {/* Address */}
        <div
          className="bg-white shadow-[0px_0px_3px_0px_#001A6E] border border-green-100 rounded-2xl p-5 
                  flex flex-col items-center justify-center text-center"
        >
          <p className="text-gray-800 text-sm sm:text-base">
            📍 सालीचौका, मध्य प्रदेश, भारत
          </p>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="w-full mx-auto mt-16  overflow-hidden shadow-xl border border-green-200">
        <iframe
          title="location"
          className="w-full h-[350px] md:h-[450px]"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.197301852487!2d78.2320497!3d22.6092312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397e5113caeb8d67%3A0xc8659b0f2e5ba37!2sSalichouka%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1704987562107!5m2!1sen!2sin"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
