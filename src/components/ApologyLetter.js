import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PenTool } from 'lucide-react';

const ApologyLetter = () => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [showButton, setShowButton] = useState(false);

  const apologyText = `My Dearest Love,

I know that words alone cannot undo the hurt I've caused, but I need you to know how deeply sorry I am. I've been thinking about my actions, and I realize how much pain I've brought into your life.

You are the most precious person in my world, and seeing you hurt because of me is breaking my heart into pieces. I take full responsibility for my mistakes, and I want you to know that I'm committed to becoming the person you deserve.

I love you more than words can express. Your happiness means everything to me, and I promise to do whatever it takes to earn your forgiveness and trust back.

You are my heart, my soul, my everything. I can't imagine my life without you, and I'm willing to fight for us, for our love, and for our future together.

Please give me a chance to make things right. I love you infinitely.

Forever yours,
With all my love ❤️`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < apologyText.length) {
        setDisplayedText(apologyText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowButton(true), 1000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [apologyText]);

  return (
    <div className="min-h-screen p-8 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <PenTool className="mx-auto mb-4 text-pink-500" size={48} />
          <h1 className="text-5xl font-bold text-gray-800 dancing-script">
            A Letter from My Heart
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"></div>
          
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
              {displayedText}
              <span className="animate-pulse">|</span>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-100 rounded-full opacity-30 translate-x-16 translate-y-16"></div>
        </motion.div>

        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/promises')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg inline-flex items-center gap-2"
            >
              See My Promises to You
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ApologyLetter;
