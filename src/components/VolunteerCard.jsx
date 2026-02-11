import React from "react";

const VolunteerCard = ({ v, index }) => {
  const isReverse = index % 2 !== 0;

  const optimized = v.profileImage.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_400/",
  );

  return (
    <div
      className={`
        group overflow-hidden rounded-2xl
        bg-white shadow-[0px_0px_25px_0px_rgb(47_74_46/70%)]
        transition-transform duration-150
        hover:-translate-y-1

        /* MOBILE LAYOUT */
        flex ${isReverse ? "flex-row-reverse" : "flex-row"}

        /* DESKTOP LAYOUT */
        sm:block
      `}
    >
      {/* 🌿 IMAGE */}
      <div className="relative w-1/2 sm:w-full h-40 sm:h-60 overflow-hidden bg-gray-200">
        <img
          src={optimized}
          width="400"
          height="400"
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
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

        <div className="w-12 h-1 bg-green-500 rounded-full my-2" />

        {v.reason && (
          <p className="text-xs sm:text-sm text-gray-600 italic line-clamp-3">
            “{v.reason}”
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(VolunteerCard);
