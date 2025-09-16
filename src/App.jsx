// App.jsx
import { motion } from "framer-motion";
import Carousel from "./components/Carousel";

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

      {/* Hero (no whileInView to avoid resize re-triggers) */}
      <motion.section
        className="section section--hero"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="gradient-text">Hi, I’m Albert</h1>
        <p style={{ color: "var(--muted)", margin: 0 }}>Test1.</p>

        <div className="btn-row" style={{ marginTop: ".85rem" }}>
          <a className="btn btn--primary" href="https://github.com/Albertdmo13" target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn btn--ghost" href="https://www.linkedin.com/in/tu-perfil" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </motion.section>

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
