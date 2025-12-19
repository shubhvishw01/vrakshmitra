import { useLang } from "../components/LanguageContext.jsx";
import { useState } from "react";

const Contact = () => {
  const { t } = useLang();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleContactUs = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const form = e.target;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value,
    };

    try {
      const res = await fetch(
        "https://vrakshmitrabackend.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess("✅ Message sent successfully!");
        form.reset(); // ✅ reset after submit
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-28 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start p-4">
        {/* LEFT */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-green-800 mb-6">
            {t.contact.heading} 🌿
          </h1>

          <div className="space-y-4 text-left text-gray-700 leading-relaxed">
            <p className="font-medium">1. {t.contact.paragraph1}</p>
            <p className="font-medium">2. {t.contact.paragraph2}</p>
            <p className="font-medium">3. {t.contact.paragraph3}</p>
            <p className="font-medium">4. {t.contact.paragraph4}</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleContactUs}
          className="w-full p-8 bg-white rounded-3xl shadow-[0px_0px_9px_0px_#001A6E] border border-green-100 space-y-5"
        >
          <input
            name="name"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
            placeholder="Your Name"
            type="text"
          />

          <input
            name="email"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
            placeholder="Email"
            type="email"
          />

          <input
            name="phone"
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
            placeholder="Contact Number"
            type="text"
          />

          <textarea
            name="message"
            required
            rows="5"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none"
            placeholder="Message"
          ></textarea>

          {success && (
            <p className="text-green-700 text-sm font-semibold">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl text-lg font-semibold transition-all"
          >
            {loading ? "Sending..." : "Send Message →"}
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
          <a
            href="mailto:vrakshmitrasanstha@gmail.com"
            className="
      text-gray-800 text-sm sm:text-base
      break-words
      hover:text-green-700
      transition
    "
          >
            📧 vrakshmitrasanstha@gmail.com
          </a>
        </div>

        {/* Phone */}
        <div
          className="bg-white shadow-[0px_0px_3px_0px_#001A6E] border border-green-100 rounded-2xl p-5 
                  flex flex-col items-center justify-center text-center"
        >
          <p className="text-gray-800 text-sm sm:text-base">
            <a
              href="tel:+918103384532"
              className="hover:text-green-700 transition"
            >
              📞 +91 81033 84532
            </a>
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
          className="w-full h-[400px] md:h-[600px]"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3495.188810559489!2d78.67789424841683!3d22.834673990492295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397facdfa2d608cb%3A0x799befdb5fd87bc6!2sRMPG%2B6XG%2C%20Babai%20Kalan%2C%20Madhya%20Pradesh%20487881!5e1!3m2!1sen!2sin!4v1765992812755!5m2!1sen!2sin"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
