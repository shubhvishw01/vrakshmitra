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
            className="animate-bounce
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
            className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4       /* 📱 Mobile → 2 cards */
    gap-4                  /* Mobile gap */
    sm:gap-6
    md:grid-cols-3         /* Tablet */
    lg:grid-cols-4         /* Desktop */
    max-w-6xl mx-auto
    px-3 sm:px-0 text-sm sm:text-base"
          >
            {volunteers.map((v, index) => {
              const isReverse = index % 2 !== 0;

              return (
                <div
                  key={v._id}
                  className={`
        group overflow-hidden rounded-2xl
        shadow-[0px_0px_25px_0px_rgb(47_74_46/70%)]
        transition-all duration-300
        hover:-translate-y-1

        /* MOBILE LAYOUT */
        flex ${isReverse ? "flex-row-reverse" : "flex-row"}

        /* DESKTOP LAYOUT */
        sm:block
      `}
                >
                  {/* 🌿 IMAGE */}
                  <div className="relative w-1/2 sm:w-full aspect-square">
                    <img
                      src={v.profileImage}
                      alt={v.name}
                      className="w-full h-full object-cover"
                    />

                    {/* City badge */}
                    <span className="absolute bottom-1 left-1 bg-white/90 text-green-800 text-xs px-2 py-0.5 rounded-full">
                      📍{v.city}
                    </span>
                  </div>

                  {/* 🌱 CONTENT */}
                  <div className="w-1/2 sm:w-full p-3 flex flex-col justify-center">
                    <h3 className="font-bold text-green-900 text-sm sm:text-base">
                      {v.name}
                    </h3>

                    <div className="w-15 h-1 bg-green-500 rounded-full my-2" />

                    {v.reason && (
                      <p className="text-xs sm:text-sm text-gray-600 italic line-clamp-3">
                        “{v.reason}”
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
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
