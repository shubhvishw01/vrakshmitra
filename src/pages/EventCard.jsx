import React, { useState } from "react";

const EventCard = React.memo(({ image, place, desc, date }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <div
        className="
          bg-white shadow-lg rounded-xl overflow-hidden
          transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
          border border-green-200
        "
      >
        {/* Image */}
        <div
          className="relative w-full h-44 overflow-hidden cursor-pointer group"
          onClick={() => setOpen(true)}
        >
          <img
            src={image}
            alt={place}
            className="
              w-full h-full object-cover
              transition-transform duration-700
              group-hover:scale-110
            "
            loading="lazy"
          />

          {/* Hover Fade Overlay */}
          <div
            className="
              absolute inset-0 
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
              flex items-center justify-center
            "
          ></div>
        </div>

        {/* Text Content */}
        <div className="p-4 text-left">
          <h3 className="text-lg font-bold text-green-800 mb-1">📍 {place}</h3>

          <p className="text-gray-700 text-sm mb-1">
            📅 <span className="font-medium">{date}</span>
          </p>

          <p className="text-gray-600 text-sm">📝 {desc}</p>
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {open && (
        <div
          className="
            fixed inset-0 z-50 bg-black/80
            flex items-center justify-center p-4
          "
          onClick={() => setOpen(false)}
        >
          <img
            src={image}
            alt={place}
            className="
              max-w-full max-h-full
              rounded-xl shadow-2xl
            "
          />
        </div>
      )}
    </>
  );
});

export default EventCard;
