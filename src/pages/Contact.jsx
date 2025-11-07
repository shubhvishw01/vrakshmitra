const Contact = () => {
  return (
    <section className="max-w-3xl mx-auto text-center mt-20 py-16">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">
        Have questions or want to collaborate? Get in touch with us below.
      </p>

      <form className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          rows="4"
          placeholder="Your Message"
          className="w-full border rounded px-3 py-2"
        />
        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded">
          Send Message
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4">
        📍 Salichouka Road, Madhya Pradesh | 📧 info@vrakshmitra.org
      </p>
    </section>
  );
};

export default Contact;
