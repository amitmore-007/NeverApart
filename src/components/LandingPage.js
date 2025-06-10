import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Star } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const loveQuotes = [
    "Every love story is beautiful, but ours is my favorite",
    "You are my today and all of my tomorrows",
    "In a sea of people, my eyes will always search for you",
    "You are the source of my joy, the center of my world"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % loveQuotes.length);
    }, 4000);
    return () => clearInterval(quoteInterval);
  }, []);

  // Generate floating hearts
  const FloatingHearts = () => {
    return Array.from({ length: 15 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute text-pink-300 opacity-20"
        initial={{
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 50,
          scale: Math.random() * 0.5 + 0.5,
          rotate: Math.random() * 360
        }}
        animate={{
          y: -100,
          x: Math.random() * window.innerWidth,
          rotate: 360,
          scale: [0.5, 1, 0.5]
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5
        }}
      >
        <Heart size={Math.random() * 20 + 15} />
      </motion.div>
    ));
  };

  // Generate falling rose petals
  const FallingPetals = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full opacity-30"
        style={{
          left: `${Math.random() * 100}%`,
        }}
        initial={{ y: -50, rotate: 0 }}
        animate={{
          y: window.innerHeight + 50,
          rotate: 360,
          x: [0, Math.random() * 100 - 50, 0]
        }}
        transition={{
          duration: Math.random() * 8 + 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 3
        }}
      />
    ));
  };

  // Generate twinkling stars
  const TwinklingStars = () => {
    return Array.from([ length, 30], (_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.2, 0.5]
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          delay: Math.random() * 2
        }}
      >
        <Star size={8} className="text-yellow-300" fill="currentColor" />
      </motion.div>
    ));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-rose-800">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-rose-500/20"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2), rgba(244, 63, 94, 0.2))",
            "linear-gradient(90deg, rgba(168, 85, 247, 0.2), rgba(244, 63, 94, 0.2), rgba(236, 72, 153, 0.2))",
            "linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Background Elements */}
      <div className="absolute inset-0">
        <FloatingHearts />
        <FallingPetals />
        <TwinklingStars />
      </div>

      {/* Animated Love Quote */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuote}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1 }}
            className="text-white/80 text-lg italic font-light text-center px-4 max-w-md"
          >
            "{loveQuotes[currentQuote]}"
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-4 relative z-20">
        <div className="text-center">
          {/* Glowing Orb Background */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              background: [
                "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%)"
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.6 }}
            className="relative mb-8"
          >
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-pink-400/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 160, height: 160, left: -20, top: -20 }}
            />

            <Heart 
              size={120} 
              className="text-pink-400 mx-auto drop-shadow-2xl filter"
              fill="currentColor"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.6))'
              }}
            />
            
            {/* Multiple Sparkles */}
            {Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: 360
                }}
                transition={{ 
                  delay: 1 + i * 0.3, 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="absolute"
                style={{
                  top: Math.random() * 100 - 50,
                  left: Math.random() * 100 - 50,
                }}
              >
                <Sparkles size={20 + Math.random() * 15} className="text-yellow-300" />
              </motion.div>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-rose-300 bg-clip-text text-transparent mb-4 dancing-script drop-shadow-lg"
            style={{
              textShadow: '0 0 30px rgba(236, 72, 153, 0.5)'
            }}
          >
            I'm Sorry, My Love
          </motion.h1>

          {showMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-xl text-white/90 max-w-md mx-auto leading-relaxed font-light">
                  I know I messed up, and I want to make it right. 
                  This is my heart speaking to yours...
                </p>
              </motion.div>

              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)",
                  background: "linear-gradient(45deg, #ec4899, #a855f7, #f43f5e)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/memories')}
                className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white px-10 py-5 rounded-full text-lg font-semibold shadow-2xl overflow-hidden group"
                style={{
                  boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">
                  ✨ Click to See How Much You Mean to Me ✨
                </span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};

export default LandingPage;
