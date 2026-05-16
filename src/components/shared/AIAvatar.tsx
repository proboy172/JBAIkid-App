"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AIAvatarProps {
  isTalking: boolean;
  isListening: boolean;
}

export default function AIAvatar({ isTalking, isListening }: AIAvatarProps) {
  // Add a slight randomization to simulate audio reactivity when talking
  const [audioScale, setAudioScale] = useState(1);

  useEffect(() => {
    if (!isTalking) {
      setAudioScale(1);
      return;
    }

    // Simulate audio frequencies
    const interval = setInterval(() => {
      setAudioScale(1 + Math.random() * 0.4); // Random scale between 1 and 1.4
    }, 100);

    return () => clearInterval(interval);
  }, [isTalking]);

  // Determine the core state color
  const primaryColor = isListening ? "from-red-400 to-rose-600" : "from-blue-400 to-indigo-600";
  const secondaryColor = isListening ? "from-orange-400 to-red-500" : "from-cyan-400 to-blue-500";
  const glowColor = isListening ? "rgba(239, 68, 68, 0.5)" : "rgba(99, 102, 241, 0.5)";

  return (
    <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 mx-auto">
      {/* Background ambient glow */}
      <motion.div
        animate={{
          scale: isListening ? [1, 1.2, 1] : isTalking ? audioScale * 1.2 : 1,
          opacity: isListening ? [0.4, 0.8, 0.4] : isTalking ? [0.6, 1, 0.6] : 0.3,
        }}
        transition={{
          duration: isListening ? 2 : isTalking ? 0.2 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full blur-3xl -z-20"
        style={{ backgroundColor: glowColor }}
      />

      {/* Core Orb Container */}
      <motion.div 
        animate={{
          scale: isTalking ? audioScale : isListening ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: isTalking ? 0.1 : isListening ? 2 : 1,
          repeat: isListening ? Infinity : 0,
          ease: "easeInOut"
        }}
        className="relative w-40 h-40 md:w-48 md:h-48 rounded-full z-10 flex items-center justify-center"
      >
        {/* Layer 1: Core Shape */}
        <motion.div
          animate={{
            rotate: [0, 360],
            borderRadius: ["50%", "40% 60% 70% 30% / 40% 50% 60% 50%", "50%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute inset-0 bg-gradient-to-tr ${primaryColor} blur-sm opacity-90`}
        />

        {/* Layer 2: Counter-rotating liquid shape */}
        <motion.div
          animate={{
            rotate: [360, 0],
            borderRadius: ["50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "50%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute inset-0 bg-gradient-to-bl ${secondaryColor} blur-md mix-blend-screen opacity-80`}
        />

        {/* Layer 3: Intense inner core */}
        <motion.div
          animate={{
            scale: isTalking ? [0.8, 1.1, 0.8] : [0.9, 1, 0.9],
          }}
          transition={{
            duration: isTalking ? 0.2 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-24 h-24 bg-white/40 blur-md rounded-full mix-blend-overlay"
        />
        
        {/* Layer 4: Center Brightness */}
        <div className="absolute w-12 h-12 bg-white blur-lg rounded-full opacity-60" />
      </motion.div>
    </div>
  );
}

