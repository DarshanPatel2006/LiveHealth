import { useEffect, useState } from "react";

export default function AIFace() {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 60;
      const y = (e.clientY - window.innerHeight / 2) / 60;
      setEyePos({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="ai-face"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`face-glow ${hover ? "active" : ""}`}></div>

      <div className={`face-core ${hover ? "hovered" : ""}`}>
        <div
          className="eye"
          style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
        ></div>
        <div
          className="eye"
          style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
        ></div>
      </div>
    </div>
  );
}