const Donate = () => {
  return (
    <section className="max-w-3xl mx-auto text-center min-h-110 mt-20">
      <h1 className="text-3xl font-bold text-green-800 mb-4">
        {/* Support Our Mission 💚 */}
        हमारे मिशन का समर्थन करें 💚
      </h1>
      <p className="text-gray-700 mb-6">
        {/* Your contribution helps us plant more trees and maintain them for a
        greener tomorrow. Every ₹100 supports the growth of one tree! */}
        आपका योगदान हमें और अधिक पेड़ लगाने और एक हरे-भरे कल के लिए उनकी देखभाल
        करने में मदद करता है। प्रत्येक ₹100 एक पेड़ के विकास में सहायक होता है!
      </p>

      <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded">
        दान करें
      </button>
    </section>
  );
};

export default Donate;
