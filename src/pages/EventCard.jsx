import React, { useState, useRef } from "react";

const EventCard = React.memo(({ image, place, desc, date }) => {
  const [open, setOpen] = useState(false);

  // shared
  const [zoom, setZoom] = useState(false);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // mobile refs
  const start = useRef({ x: 0, y: 0 });
  const lastDistance = useRef(null);
  const lastTap = useRef(0);

  // desktop refs
  const imgRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const zoomStep = useRef(0);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  /* ================= DESKTOP ZOOM FOCUS ================= */
  const handleMouseMoveFocus = (e) => {
    if (!zoom || !imgRef.current || isMobile) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  /* ================= DESKTOP DOUBLE CLICK ZOOM ================= */
  const handleDoubleClick = () => {
    if (isMobile) return;

    zoomStep.current += 1;
    setZoom(true);

    if (zoomStep.current === 1) setScale(2);
    else if (zoomStep.current === 2) setScale(3);
    else {
      setZoom(false);
      setScale(1);
      setPos({ x: 0, y: 0 });
      zoomStep.current = 0;
    }
  };

  /* ================= DESKTOP WHEEL ZOOM ================= */
  const handleWheel = (e) => {
    if (isMobile) return;

    e.preventDefault();
    setZoom(true);

    setScale((s) => Math.min(Math.max(1, s - e.deltaY * 0.002), 4));
  };

  /* ================= DESKTOP PAN ================= */
  const handleMouseDown = (e) => {
    if (isMobile || scale === 1) return;

    dragging.current = true;
    dragStart.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const handleMouseDrag = (e) => {
    if (!dragging.current || isMobile) return;

    setPos({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  /* ================= MOBILE DOUBLE TAP ================= */
  const handleMobileTap = () => {
    const now = Date.now();

    if (now - lastTap.current < 400) {
      setZoom((z) => !z);
      setScale(2);
      setPos({ x: 0, y: 0 });
    }

    lastTap.current = now;
  };

  /* ================= MOBILE TOUCH ================= */
  const handleTouchStart = (e) => {
    if (!zoom) return;

    if (e.touches.length === 1) {
      const t = e.touches[0];
      start.current = {
        x: t.clientX - pos.x,
        y: t.clientY - pos.y,
      };
    }

    if (e.touches.length === 2) {
      const [a, b] = e.touches;
      lastDistance.current = Math.hypot(
        a.clientX - b.clientX,
        a.clientY - b.clientY
      );
    }
  };

  const handleTouchMove = (e) => {
    if (!zoom) return;

    // PAN
    if (e.touches.length === 1) {
      const t = e.touches[0];
      setPos({
        x: t.clientX - start.current.x,
        y: t.clientY - start.current.y,
      });
    }

    // PINCH
    if (e.touches.length === 2) {
      const [a, b] = e.touches;
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

      if (lastDistance.current) {
        const diff = dist - lastDistance.current;
        setScale((s) => Math.min(Math.max(1, s + diff / 300), 5));
      }

      lastDistance.current = dist;
    }
  };

  const handleTouchEnd = () => {
    lastDistance.current = null;
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white border-green-200 shadow-[0px_0px_35px_0px_rgb(47_74_46/90%)] rounded-xl overflow-hidden border">
        <div
          className="group relative w-full h-44 overflow-hidden cursor-pointer"
          onClick={() => {
            setOpen(true);
            setZoom(false);
            setScale(1);
            setPos({ x: 0, y: 0 });
            zoomStep.current = 0;
          }}
        >
          <img
            src={image}
            alt={place}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="p-4">
          <h3 className="font-bold text-green-800">📍 {place}</h3>
          <p className="text-sm">📅 {date}</p>
          <p className="text-sm">📝 {desc}</p>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => {
              setOpen(false);
              setZoom(false);
              setScale(1);
              setPos({ x: 0, y: 0 });
              zoomStep.current = 0;
            }}
            className="fixed top-4 right-4 text-white text-3xl z-[9999]"
          >
            ✕
          </button>

          {/* MOVE WRAPPER */}
          <div
            onClick={isMobile ? handleMobileTap : undefined}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              touchAction: "none",
            }}
          >
            <img
              ref={imgRef}
              src={image}
              alt={place}
              onDoubleClick={handleDoubleClick}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={(e) => {
                handleMouseMoveFocus(e);
                handleMouseDrag(e);
              }}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
              style={{
                transform: `scale(${zoom ? scale : 1})`,
                cursor: scale > 1 ? "grab" : "zoom-in",
                transition: dragging.current ? "none" : "transform 0.2s ease",
              }}
              className="max-w-[95vw]
          max-h-[95vh] rounded-xl select-none"
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
});

export default EventCard;
