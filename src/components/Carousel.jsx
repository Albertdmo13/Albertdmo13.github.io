import { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

/** A frictionless, drag-x carousel using transforms (not scroll),
 *  with dynamic bounds and prev/next buttons.
 */
export default function Carousel({ images = [] }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const controls = useAnimationControls();
  const [maxDrag, setMaxDrag] = useState(0);
  const xRef = useRef(0); // current animated x

  // Measure bounds on mount and resize
  useEffect(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;

    const calc = () => {
      const max = Math.max(0, track.scrollWidth - vp.clientWidth);
      setMaxDrag(max);
      // clamp x when bounds change
      const clamped = Math.min(0, Math.max(xRef.current, -max));
      if (clamped !== xRef.current) {
        xRef.current = clamped;
        controls.set({ x: clamped });
      }
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(vp); ro.observe(track);
    return () => ro.disconnect();
  }, [images, controls]);

  const onUpdate = latest => {
    if (typeof latest.x === "number") xRef.current = latest.x;
  };

  const step = (dir) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const amount = Math.max(vp.clientWidth * 0.85, 320);
    const target = Math.min(0, Math.max(xRef.current - dir * amount, -maxDrag));
    xRef.current = target;
    controls.start({ x: target, transition: { type: "spring", stiffness: 200, damping: 26 } });
  };

  return (
    <div className="carousel-wrap">
      <button className="carousel-btn prev" onClick={() => step(-1)} aria-label="Previous">‹</button>

      <div className="carousel-viewport" ref={viewportRef}>
        <motion.div
          className="carousel-track"
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.06}
          animate={controls}
          onUpdate={onUpdate}
          whileTap={{ cursor: "grabbing" }}
        >
          {images.map((src, i) => (
            <div className="slide" key={i}>
              <img src={src} alt={`Slide ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </motion.div>
      </div>

      <button className="carousel-btn next" onClick={() => step(1)} aria-label="Next">›</button>
    </div>
  );
}
