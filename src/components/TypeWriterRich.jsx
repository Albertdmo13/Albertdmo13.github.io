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
