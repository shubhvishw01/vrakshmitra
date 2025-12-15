import React, { useState, useRef } from "react";

const EventCard = React.memo(({ image, place, desc, date }) => {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const imgRef = useRef(null);

  const isMobile = window.matchMedia("(pointer: coarse)").matches;

  // Desktop mouse move (pan)
  const handleMouseMove = (e) => {
    if (!zoom || !imgRef.current || isMobile) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-green-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        <div
          className="relative w-full h-44 overflow-hidden cursor-pointer group"
          onClick={() => setOpen(true)}
        >
          <img
            src={image}
            alt={place}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div className="p-4 text-left">
          <h3 className="text-lg font-bold text-green-800 mb-1">📍 {place}</h3>
          <p className="text-gray-700 text-sm mb-1">
            📅 <span className="font-medium">{date}</span>
          </p>
          <p className="text-gray-600 text-sm">📝 {desc}</p>
        </div>
      </div>

      {/* IMAGE PREVIEW */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center overflow-hidden">
          {/* Close Button */}
          <button
            onClick={() => {
              setOpen(false);
              setZoom(false);
            }}
            className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
          >
            ✕
          </button>

          {/* Preview Image */}
          <img
            ref={imgRef}
            src={image}
            alt={place}
            /* Desktop */
            onClick={() => !isMobile && setZoom(!zoom)}
            onMouseMove={handleMouseMove}
            /* Mobile */
            onDoubleClick={() => isMobile && setZoom(!zoom)}
            className={`
              max-w-full max-h-full rounded-xl shadow-2xl
              transition-transform duration-500
              ${zoom ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"}
            `}
          />
        </div>
      )}
    </>
  );
});

export default EventCard;
