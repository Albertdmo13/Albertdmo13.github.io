// App.jsx
import { motion } from "framer-motion";
import Carousel from "./components/Carousel";
// App.jsx (replace TypewriterRich and update code-titlebar markup)

import { useEffect, useRef, useState } from "react";

// Caret follows the typed fragment
function TypewriterRich({ lines = [], charSpeed = 26, lineDelay = 520 }) {
  const [progress, setProgress] = useState({ li: 0, fi: 0, ci: 0 });
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const { li, fi, ci } = progress;
      const line = lines[li] || [];
      const frag = line[fi] || { text: "" };

      if (ci < frag.text.length) {
        setProgress({ li, fi, ci: ci + 1 });
        timerRef.current = setTimeout(tick, charSpeed);
      } else if (fi < line.length - 1) {
        setProgress({ li, fi: fi + 1, ci: 0 });
        timerRef.current = setTimeout(tick, charSpeed);
      } else if (li < lines.length - 1) {
        timerRef.current = setTimeout(() => {
          setProgress({ li: li + 1, fi: 0, ci: 0 });
        }, lineDelay);
      } else {
        setDone(true);
      }
    };

    if (!done) timerRef.current = setTimeout(tick, charSpeed);
    return () => clearTimeout(timerRef.current);
  }, [progress, done, lines, charSpeed, lineDelay]);

  const { li, fi, ci } = progress;

  return (
    <pre className="typewriter">
      {lines.slice(0, li + 1).map((line, i) => {
        const isCurrent = i === li;
        return (
          <div key={`l${i}`}>
            {line.map((frag, idx) => {
              // Completed fragments first
              if (!isCurrent || idx < fi) {
                return <span key={idx} className={frag.class || ""}>{frag.text}</span>;
              }
              // Active fragment: partial text + caret
              if (idx === fi) {
                const partial = frag.text.slice(0, ci);
                return (
                  <span key={idx} className={frag.class || ""}>
                    {partial}
                    {!done && <span className="caret" aria-hidden="true">▋</span>}
                  </span>
                );
              }
              // Future fragments on the same line: empty for now
              return <span key={idx} />;
            })}
          </div>
        );
      })}
    </pre>
  );
}

function SectionDivider({ label = "Projects", leftSrc, rightSrc, id = "projects-divider" }) {
  return (
    <div className="full-divider" role="separator" aria-labelledby={id}>
      {/* Side images (optional) */}
      {leftSrc && (
        <div
          className="full-divider__img full-divider__img--left"
          style={{ "--img": `url(${leftSrc})` }}
        />
      )}
      {rightSrc && (
        <div
          className="full-divider__img full-divider__img--right"
          style={{ "--img": `url(${rightSrc})` }}
        />
      )}

      {/* Center scrim for guaranteed readability */}
      <div className="full-divider__center" />

      {/* Subtle animated sheen */}
      <div className="full-divider__sheen" />

      {/* Label aligned to main content width */}
      <div className="full-divider__inner">
        <span id={id} className="full-divider__label">{label}</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
        <>
      {/* NEW sticky, full-width top section */}
      <section className="top-sticky">
        <div className="top-sticky__inner">
          <strong className="gradient-text" style={{ fontSize: "1.05rem" }}>
            Welcome to my portfolio
          </strong>

          <div className="top-sticky__right">
            <a className="top-sticky__pill" href="#projects-1">Section 1</a>
            <a className="top-sticky__pill" href="#projects-2">Section 2</a>
          </div>
        </div>
      </section>

    <main style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

    {/* HERO — two-column: left code window + right image */}
<motion.section
  className="section section--hero"
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
>
  <div className="hero-grid">
    {/* LEFT – code window */}
      <div className="hero-left hero-code">
        <div className="code-window">
    <div className="code-titlebar">
      <span className="code-title">Example.jsx</span>
      <div className="code-dots">
      <span className="code-dot code-dot--green" />
      <span className="code-dot code-dot--amber" />
      <span className="code-dot code-dot--red" />
      </div>
    </div>

        <div className="code-body">
          <TypewriterRich
            charSpeed={24}
            lineDelay={480}
            lines={[
              [{ text:"// ", class:"cm" }, { text:"Welcome to my code!", class:"cm" }],
              [{ text:"function ", class:"kw" }, { text:"greet", class:"fn" }, { text:"() {", class:"op" }],
              [{ text:"  console.", class:"var" }, { text:"log", class:"fn" }, { text:"(", class:"op" }, { text:"'Hello, world!'", class:"str" }, { text:");", class:"op" }],
              [{ text:"}", class:"op" }],
              [{ text:"greet", class:"fn" }, { text:"();", class:"op" }],
            ]}
            />
        </div>
        </div>
      </div>

      {/* RIGHT – image spans both rows */}
    <div className="hero-right hero-img-wrap">
      <div className="hero-card">
        <img
          className="hero-img"
          src="https://picsum.photos/1000/800?random=900&blur=0"
          alt="Placeholder portrait"
        />
      </div>
    </div>

    {/* LEFT – CTAs in row 2 */}
    <div className="hero-left hero-cta">
      <div className="btn-row">
        <a className="btn btn--primary" href="https://github.com/Albertdmo13" target="_blank" rel="noreferrer">GitHub</a>
        <a className="btn btn--ghost" href="https://www.linkedin.com/in/tu-perfil" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </div>
  </div>
</motion.section>


    <SectionDivider
      label="Projects"
      leftSrc="https://picsum.photos/1200/480?random=301"
      rightSrc="https://picsum.photos/1200/480?random=302"
    />

      {/* Projects 1 */}
      <motion.section
        className="section section--blue"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 90, damping: 14 }}
      >
        <div className="section-header">
          <h2 style={{ margin: 0 }}>Projects Section 1</h2>
          <a className="btn btn--ghost btn--sm" href="https://github.com/Albertdmo13?tab=repositories" target="_blank" rel="noreferrer">
            View all
          </a>
        </div>

        <Carousel images={[
          "https://picsum.photos/1200/480?random=101",
          "https://picsum.photos/1200/480?random=102",
          "https://picsum.photos/1200/480?random=103",
          "https://picsum.photos/1200/480?random=104",
        ]} />

        <div className="projects-grid">
          {[
            { name: "Project One", url: "https://github.com/Albertdmo13/PROJECT-1", desc: "Description" },
            { name: "Project One Plus", url: "https://github.com/Albertdmo13/PROJECT-1", desc: "Description" },
          ].map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              className="card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.35 }}
              whileHover={{ scale: 1.015, rotateX: 1.2, rotateY: -1.2 }}
              whileTap={{ scale: 0.99 }}
              style={{ display: "block", textDecoration: "none" }}
            >
              <strong style={{ color: "#fff" }}>{p.name}</strong>
              <div style={{ opacity: 0.85, color: "var(--muted)" }}>{p.desc}</div>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Projects 2 */}
      <motion.section
        className="section section--indigo"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 90, damping: 14 }}
      >
        <div className="section-header">
          <h2 style={{ margin: 0 }}>Projects Section 2</h2>
          <a className="btn btn--ghost btn--sm" href="https://github.com/Albertdmo13?tab=repositories" target="_blank" rel="noreferrer">
            View all
          </a>
        </div>

        <Carousel images={[
          "https://picsum.photos/1200/480?random=201",
          "https://picsum.photos/1200/480?random=202",
          "https://picsum.photos/1200/480?random=203",
          "https://picsum.photos/1200/480?random=204",
        ]} />

        <div className="projects-grid">
          {[
            { name: "Project Two", url: "https://github.com/Albertdmo13/PROJECT-2", desc: "Description" },
            { name: "Project Two Plus", url: "https://github.com/Albertdmo13/PROJECT-2", desc: "Description" },
          ].map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              className="card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.35 }}
              whileHover={{ scale: 1.015, rotateX: 1.2, rotateY: -1.2 }}
              whileTap={{ scale: 0.99 }}
              style={{ display: "block", textDecoration: "none" }}
            >
              <strong style={{ color: "#fff" }}>{p.name}</strong>
              <div style={{ opacity: 0.85, color: "var(--muted)" }}>{p.desc}</div>
            </motion.a>
          ))}
        </div>
      </motion.section>
    </main>
    </>
  );
}
