import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import confetti from "canvas-confetti";

export default function LaunchScreen() {
  const fireConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  const [phase, setPhase] = useState("button");
  const [count, setCount] = useState(10);
  const [showHindi, setShowHindi] = useState(false);

  const [launched, setLaunched] = useState(
    localStorage.getItem("vraksh_launch_done") === "true"
  );

  const startLaunch = () => {
    setPhase("countdown");
  };

  useEffect(() => {
    if (phase === "countdown" && count > 0) {
      const timer = setTimeout(() => setCount((c) => c - 1), 1300);
      return () => clearTimeout(timer);
    }

    if (phase === "countdown" && count === 0) {
      setPhase("welcome");
      fireConfetti();

      // 🌱 Hindi welcome 2 sec baad start
      setTimeout(() => {
        setShowHindi(true);
      }, 3000);

      // 🏠 Total 7 sec baad Home
      setTimeout(() => {
        localStorage.setItem("vraksh_launch_done", "true");
        setLaunched(true);
      }, 10000);
    }
  }, [phase, count]);

  return (
    <>
      {/* ✅ Direct Home without reload */}
      {launched ? (
        <Home />
      ) : (
        <div className="h-screen w-full flex items-center justify-center bg-white">
          <AnimatePresence mode="wait">
            {phase === "button" && (
              <motion.button
                key="launch"
                onClick={startLaunch}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
                className="px-16 py-8 text-3xl font-bold rounded-full bg-green-700 text-white shadow-2xl"
              >
                🚀 LAUNCH WEBSITE
              </motion.button>
            )}

            {phase === "countdown" && (
              <motion.div
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
                className="text-9xl font-extrabold text-green-700"
              >
                {count}
              </motion.div>
            )}

            {phase === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="text-center"
              >
                <h1 className="text-5xl font-extrabold text-green-800 mb-4">
                  🌳 Welcome to
                </h1>
                <h2 className="text-6xl font-bold text-green-600">
                  Vraksh Mitra Sanstha
                </h2>
                <br />
                <br />

                {/* 🇮🇳 Hindi Welcome */}
                <AnimatePresence>
                  {showHindi && (
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="text-4xl font-semibold text-green-700"
                    >
                      वृक्ष मित्र संस्था में आपका स्वागत है
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
