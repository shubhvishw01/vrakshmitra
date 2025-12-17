import React, { useState, useRef } from "react";

const EventCard = React.memo(({ image, place, desc, date }) => {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const lastDistance = useRef(0);

  const imgRef = useRef(null);
  const lastTap = useRef(0);
  const start = useRef({ x: 0, y: 0 });

  const isMobile = window.matchMedia("(pointer: coarse)").matches;

  /* ================= DESKTOP PAN ================= */
  const handleMouseMove = (e) => {
    if (!zoom || !imgRef.current || isMobile) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  /* ================= MOBILE DOUBLE TAP ================= */
  const handleMobileTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!zoom) {
        setZoom(true);
      } else {
        setZoom(false);
        setOpen(false);
        setPos({ x: 0, y: 0 });
      }
    }
    lastTap.current = now;
  };

  /* ================= MOBILE PAN ================= */
  const handleTouchStart = (e) => {
    if (!zoom) return;
    const t = e.touches[0];
    start.current = { x: t.clientX - pos.x, y: t.clientY - pos.y };
  };

  const handleTouchMove = (e) => {
    if (!zoom) return;
    const t = e.touches[0];
    setPos({
      x: t.clientX - start.current.x,
      y: t.clientY - start.current.y,
    });
  };

  const handlePinch = (e) => {
    if (e.touches.length !== 2) return;

    const [a, b] = e.touches;
    const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

    if (lastDistance.current) {
      const diff = dist - lastDistance.current;
      setScale((s) => Math.min(Math.max(1, s + diff / 200), 3));
    }

    lastDistance.current = dist;
  };

  const handleTouchEnd = () => {
    lastDistance.current = 0;
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white border-green-200 shadow-[0px_0px_35px_0px_rgb(47_74_46/90%)] rounded-xl overflow-hidden border">
        <div
          className="relative w-full h-44 overflow-hidden cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="relative w-full h-44 overflow-hidden group">
            <img
              src={image}
              alt={place}
              className="
      w-full h-full object-cover
      transition-transform duration-700 ease-out
      group-hover:scale-110
      will-change-transform
    "
            />
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-green-800">📍 {place}</h3>
          <p className="text-sm">📅 {date}</p>
          <p className="text-sm">📝 {desc}</p>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* CLOSE */}
          <button
            onClick={() => {
              setOpen(false);
              setZoom(false);
              setPos({ x: 0, y: 0 });
            }}
            className="
    fixed top-4 right-4 
    text-white text-3xl 
    z-[9999]
    bg-black/40 hover:bg-black/60
    rounded-full w-10 h-10
    flex items-center justify-center
    backdrop-blur
  "
          >
            ✕
          </button>

          <img
            ref={imgRef}
            src={image}
            alt={place}
            /* DESKTOP */
            onClick={() => !isMobile && setZoom((z) => !z)}
            onMouseMove={handleMouseMove}
            /* MOBILE */
            {...(isMobile && {
              onTouchEnd: handleMobileTap,
              onTouchStart: handleTouchStart,
              onTouchMove: handleTouchMove,
            })}
            style={{
              transform: isMobile
                ? zoom
                  ? `scale(2) translate(${pos.x / 2}px, ${pos.y / 2}px)`
                  : "scale(1)"
                : zoom
                ? "scale(2)"
                : "scale(1)",
              transition: zoom ? "none" : "transform 0.3s ease",
              touchAction: isMobile ? "none" : "auto",
            }}
            className="max-w-full max-h-full rounded-xl select-none"
            draggable={false}
          />
        </div>
      )}
    </>
  );
});

export default EventCard;
