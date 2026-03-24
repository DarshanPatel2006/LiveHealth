import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BASE_URL from "../config";


export default function RobotAssistant() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX / 30,
        y: e.clientY / 30
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y
      }}
      transition={{ type: "spring", stiffness: 50 }}
      className="robot-container"
    >
      🤖
    </motion.div>
  );
}