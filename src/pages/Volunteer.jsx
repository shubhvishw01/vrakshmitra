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
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-6 mt-16 py-16">
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
        {volunteers.length === 0 ? (
          <p className="text-center text-gray-500">No volunteers found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {volunteers.map((v) => (
              <div
                key={v._id}
                className="group bg-white rounded-xl overflow-hidden border 
                border-green-200 shadow-[0px_0px_35px_0px_rgb(47_74_46/90%)] transition-all duration-300"
              >
                {/* 🔹 Square Profile Image (smaller) */}
                <div className="relative w-full aspect-[1/1] max-h-screen overflow-hidden">
                  <img
                    src={v.profileImage}
                    alt={v.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition" />
                </div>

                {/* 🔹 Content (compact spacing) */}
                <div className="px-4 py-3">
                  {/* Name */}
                  <h3 className="text-base font-semibold text-green-800 leading-tight">
                    {v.name}
                  </h3>

                  {/* City */}
                  <div className="text-sm text-gray-700 mt-0.5 font-medium">
                    {v.city}
                  </div>

                  {/* Reason (shorter) */}
                  {v.reason && (
                    <p className="mt-2 text-xs text-gray-600 italic leading-snug line-clamp-2">
                      “{v.reason}”
                    </p>
                  )}
                </div>
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
