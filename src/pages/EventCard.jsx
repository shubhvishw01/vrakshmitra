import React from "react";

const EventCard = React.memo(({ image, title, date, location }) => {
  return (
    <div
      className="
        bg-white shadow-lg rounded-xl overflow-hidden
        transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
        border border-green-200
      "
    >
      {/* Image */}
      <div className="w-full h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Text Content */}
      <div className="p-4 text-left">
        <h3 className="text-lg font-bold text-green-800 mb-1">{title}</h3>

        <p className="text-gray-700 text-sm mb-1">
          📅 <span className="font-medium">{date}</span>
        </p>

        <p className="text-gray-600 text-sm">
          📍 <span className="font-medium">{location}</span>
        </p>
      </div>
    </div>
  );
});

export default EventCard;
