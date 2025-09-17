import { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

export default function Carousel({ images = [] }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const controls = useAnimationControls();
  const [maxDrag, setMaxDrag] = useState(0);
  const xRef = useRef(0);
  const draggingRef = useRef(false);
  const pressRef = useRef({ x: 0, y: 0 });

  // edge fades
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const EPS = 2;

  const updateFades = (pos, max = maxDrag) => {
    if (max <= 0) { setShowLeftFade(false); setShowRightFade(false); return; }
    setShowLeftFade(pos < -EPS);
    setShowRightFade(pos > -max + EPS);
  };

  // image loaded flags (for fade-in)
  const [loaded, setLoaded] = useState([]);
  useEffect(() => { setLoaded(images.map(() => false)); }, [images]);
  const markLoaded = (i) => setLoaded(prev => {
    const copy = prev.slice();
    copy[i] = true;
    return copy;
  });

  // Lightbox
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [lbLoaded, setLbLoaded] = useState(false);
  const openLightbox = (idx) => {
    setActive(idx);
    setLbLoaded(false);
    setOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };
  const next = () => { setActive(i => (i + 1) % images.length); setLbLoaded(false); };
  const prev = () => { setActive(i => (i - 1 + images.length) % images.length); setLbLoaded(false); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Measure bounds
  useEffect(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;

    const calc = () => {
      const max = Math.max(0, track.scrollWidth - vp.clientWidth);
      setMaxDrag(max);
      const clamped = Math.min(0, Math.max(xRef.current, -max));
      if (clamped !== xRef.current) {
        xRef.current = clamped;
        controls.set({ x: clamped });
      }
      updateFades(clamped, max);
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(vp); ro.observe(track);
    return () => ro.disconnect();
  }, [images, controls]);

  const step = (dir) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const amount = Math.max(vp.clientWidth * 0.85, 320);
    const target = Math.min(0, Math.max(xRef.current - dir * amount, -maxDrag));
    xRef.current = target;
    updateFades(target);
    controls.start({ x: target, transition: { type: "spring", stiffness: 200, damping: 26 } });
  };

  const onUpdate = (latest) => {
    if (typeof latest.x === "number") {
      xRef.current = latest.x;
      updateFades(latest.x);
    }
  };

  return (
    <>
      <div className="carousel-wrap">
        <button className="carousel-btn prev" onClick={() => step(-1)} aria-label="Previous">‹</button>

        <div className="carousel-viewport" ref={viewportRef}>
          <div className={`carousel-edge left ${showLeftFade ? "is-on" : ""}`} />
          <div className={`carousel-edge right ${showRightFade ? "is-on" : ""}`} />

          <motion.div
            className="carousel-track"
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.06}
            onDragStart={() => (draggingRef.current = true)}
            onDragEnd={() => setTimeout(() => (draggingRef.current = false), 0)}
            onUpdate={onUpdate}
            animate={controls}
            whileTap={{ cursor: "grabbing" }}
            onPointerDown={(e) => (pressRef.current = { x: e.clientX, y: e.clientY })}
          >
            {images.map((src, i) => (
              <div
                className="slide"
                key={i}
                onClick={(e) => {
                  const dx = Math.abs(e.clientX - pressRef.current.x);
                  const dy = Math.abs(e.clientY - pressRef.current.y);
                  if (draggingRef.current || dx + dy > 6) return;
                  openLightbox(i);
                }}
              >
                {/* black placeholder wrapper */}
                <div className="slide__media">
                  <img
                    className={`slide__img ${loaded[i] ? "is-loaded" : ""}`}
                    src={src}
                    alt={`Slide ${i + 1}`}
                    loading="lazy"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onLoad={() => markLoaded(i)}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <button className="carousel-btn next" onClick={() => step(1)} aria-label="Next">›</button>
      </div>

      {/* Lightbox */}
      {open && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">‹</button>
          <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">›</button>

          {/* black placeholder is the backdrop; image fades when loaded */}
          <motion.img
            key={active}
            className={`lightbox__img ${lbLoaded ? "is-loaded" : ""}`}
            src={images[active]}
            alt={`Image ${active + 1}`}
            initial={{ opacity: 0.001, scale: 0.98 }}
            animate={{ opacity: lbLoaded ? 1 : 0.001, scale: lbLoaded ? 1 : 0.98 }}
            transition={{ duration: 0.28 }}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
            onLoad={() => setLbLoaded(true)}
          />
        </div>
      )}
    </>
  );
}
