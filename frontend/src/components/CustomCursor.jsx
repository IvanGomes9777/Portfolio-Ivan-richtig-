import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });
  const [grow, setGrow] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    const onOver = (e) => {
      const t = e.target;
      if (
        t.closest("button, a, [data-cursor='grow'], input, textarea, label")
      ) {
        setGrow(true);
      } else {
        setGrow(false);
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y, dotX, dotY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className={`custom-cursor ${grow ? "cursor-grow" : ""}`}
        style={{ x: springX, y: springY }}
        data-testid="custom-cursor"
      />
      <motion.div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ x: dotX, y: dotY }}
      />
    </>
  );
}
