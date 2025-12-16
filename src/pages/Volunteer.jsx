const Volunteer = () => {
  const becomeVrakshMitra = (e) => {
    e.preventDefault();
    alert(
      "Thank you for your interest! Thank you for reaching out! this page is under production mode."
    );
  };
  return (
    <section className="max-w-3xl mx-auto text-center py-20 mt-20">
      <h1 className="text-3xl font-bold text-green-800 mb-4 ">
        Become a Vraksh Mitra 🌿
      </h1>
      <p className="text-gray-700 mb-6">
        Join us as a volunteer and take part in plantation drives, awareness
        campaigns, and tree care initiatives.
      </p>

      <form className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="City"
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          rows="4"
          placeholder="Why do you want to join?"
          className="w-full border rounded px-3 py-2"
        />
        <button
          onClick={becomeVrakshMitra}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Volunteer;
