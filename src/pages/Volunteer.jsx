import { useEffect, useState } from "react";
import axios from "axios";
import VolunteerModal from "../components/VolunteerModal";
import { useLang } from "../components/LanguageContext";
import VolunteerCard from "../components/VolunteerCard";

const VolunteersPage = () => {
  const { t } = useLang();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(
        "https://vrakshmitrabackend.onrender.com/api/volunteers",
      );
      const approved = res.data.filter((v) => v.approved);
      setVolunteers(approved);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  });

  if (loading) {
    <div className="flex justify-center items-center py-16">
      <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <>
      <div className="scroll-smooth bg-gradient-to-b from-green-50 to-white px-6 mt-16 py-16">
        {/* 🔹 Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-4xl md:text-3xl font-bold text-green-800 mb-4">
            {t.volunteer.heading} 🌿
          </h1>
          <p className="text-gray-600 text-lg mb-6">{t.volunteer.paragraph}</p>

          {/* 🔹 Open Modal Button */}
          <button
            onClick={() => setOpenModal(true)}
            className="
              px-8 py-3 rounded-xl
              bg-green-700 text-white font-semibold
              hover:bg-green-800
              transition
              shadow-md
            "
          >
            {t.volunteer.button}
          </button>
        </div>

        {/* 🔹 Volunteers Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : volunteers.length === 0 ? (
          <p className="text-center text-gray-500">No volunteers found.</p>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 /* 📱 Mobile → 2 cards */
    gap-4                  /* Mobile gap */
    sm:gap-6
    md:grid-cols-3         /* Tablet */
    lg:grid-cols-4         /* Desktop */
    max-w-6xl mx-auto
    px-3 sm:px-0 text-sm sm:text-base"
          >
            {volunteers.map((v, index) => (
              <VolunteerCard key={v._id} v={v} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Volunteer Modal */}
      {openModal && (
        <VolunteerModal
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
    </>
  );
};

export default VolunteersPage;
