const Contact = () => {
  return (
    <section className="pt-28 pb-16 bg-gradient-to-b from-green-50 to-white px-4">
      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* LEFT: GET IN TOUCH */}
        <div>
          <h1 className="text-center text-4xl font-extrabold text-green-800 mb-4">
            👉 संपर्क करें
          </h1>
          <p className="text-gray-700 py-10 text-lg leading-relaxed">
            किसी भी प्रकार का सहयोग, सुझाव या पूछताछ के लिए नीचे अपना संदेश
            भेजें। हमारी टीम जल्द ही आपसे संपर्क करेगी।
          </p>
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
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl 
                       text-lg font-semibold shadow-md transition-all"
          >
            Send Message →
          </button>
        </form>
      </div>

      {/* CONTACT INFO BOXES */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-16">
        {/* Email */}
        <div className="bg-white shadow-lg border border-green-100 rounded-2xl p-5 flex gap-4 items-center">
          {/* <img className="w-8" src="/icons/mail.svg" alt="Email" /> */}
          <p className="text-gray-800 text-sm sm:text-base break-all">
            <a href="mailto:info@vrakshmitra.org">📧 vrakshmitra@gmail.com</a>
          </p>
        </div>

        {/* Phone */}
        <div className="bg-white shadow-lg border border-green-100 rounded-2xl p-5 flex gap-4 items-center">
          {/* <img className="w-7" src="/icons/phone.svg" alt="Phone" /> */}
          <p className="text-gray-800 text-sm sm:text-base">
            <a href="tel:+918888888888">📞 +91 81033 84532</a>
          </p>
        </div>

        {/* Address */}
        <div className="bg-white shadow-lg border border-green-100 rounded-2xl p-5 flex gap-4 items-center">
          {/* <img className="w-8" src="/icons/location.svg" alt="Location" /> */}
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
