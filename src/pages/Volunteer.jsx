import { useEffect, useState } from "react";
import axios from "axios";
import VolunteerModal from "../components/VolunteerModal";
import { useLang } from "../components/LanguageContext";

const VolunteersPage = () => {
  const { t } = useLang();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(
        "https://vrakshmitrabackend.onrender.com/api/volunteers"
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
  }, []);

  if (loading) {
    <div className="flex justify-center items-center py-16">
      <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <>
      <div className=" bg-gradient-to-b from-green-50 to-white px-6 mt-16 py-16">
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
            className=" grid grid-cols-2        /* 📱 Mobile → 2 cards */
    gap-4                  /* Mobile gap */
    sm:gap-6
    md:grid-cols-3         /* Tablet */
    lg:grid-cols-4         /* Desktop */
    max-w-6xl mx-auto
    px-3 sm:px-0 text-sm sm:text-base"
          >
            {volunteers.map((v) => (
              <div
                key={v._id}
                className="
    group relative bg-white rounded-2xl overflow-hidden
    
    shadow-[0px_0px_35px_0px_rgb(47_74_46/90%)]
    hover:shadow-[0_20px_60px_rgba(34,197,94,0.45)]
    transition-all duration-300 ease-out
    hover:-translate-y-1
  "
              >
                {/* 🌿 Image Section */}
                <div className="relative w-full aspect-[1/1] overflow-hidden">
                  <img
                    src={v.profileImage}
                    alt={v.name}
                    className="
        w-full h-full object-cover
        transition-transform duration-700
        group-hover:scale-110
      "
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="
        absolute inset-0
        bg-gradient-to-t from-black/40 via-black/10 to-transparent
        opacity-70
      "
                  />

                  {/* Floating City Badge */}
                  <span
                    className="
        absolute bottom-3 left-3
        bg-white/90 backdrop-blur
        text-green-800 text-xs font-semibold
        px-3 py-1 rounded-full shadow
      "
                  >
                    📍 {v.city}
                  </span>
                </div>

                {/* 🌱 Content */}
                <div className="px-4 py-4">
                  {/* Name */}
                  <h3
                    className="
         font-bold text-green-900
        tracking-wide leading-snug
      "
                  >
                    {v.name}
                  </h3>

                  {/* Divider */}
                  <div className="w-20 h-1 bg-green-500 rounded-full my-2" />

                  {/* Reason */}
                  {v.reason && (
                    <p
                      className="
          text-sm text-gray-600 italic
          leading-relaxed line-clamp-3
        "
                    >
                      “{v.reason}”
                    </p>
                  )}
                </div>

                {/* 🌟 Soft Glow */}
                <div
                  className="
      absolute inset-0 rounded-2xl
      ring-1 ring-green-400/20
      pointer-events-none
    "
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Volunteer Modal */}
      {openModal && (
        <VolunteerModal
          onClose={() => {
            setOpenModal(false);
            fetchVolunteers(); // optional: refresh list after submit
          }}
        />
      )}
    </>
  );
};

export default VolunteersPage;
