import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera } from 'lucide-react';
import PhotoGallery from './PhotoGallery';

const MemoryLane = () => {
  const navigate = useNavigate();
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const memories = [
    {
      title: "Our First Date",
      description: "The day my world changed forever",
      color: "from-pink-400 to-red-400"
    },
    {
      title: "Your Beautiful Smile",
      description: "That lights up my entire universe",
      color: "from-purple-400 to-pink-400"
    },
    {
      title: "Our Late Night Talks",
      description: "When time stood still for us",
      color: "from-blue-400 to-purple-400"
    },
    {
      title: "Your Laugh",
      description: "The most beautiful sound in the world",
      color: "from-green-400 to-blue-400"
    },
    {
      title: "Every Moment Together",
      description: "Has been a treasure I cherish",
      color: "from-yellow-400 to-orange-400"
    }
  ];

  const handleCardClick = (memory, index) => {
    setSelectedMemory({ ...memory, index });
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setTimeout(() => setSelectedMemory(null), 300);
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4 dancing-script">
          Our Beautiful Memories
        </h1>
        <p className="text-xl text-gray-600">
          Every moment with you is a memory I treasure
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {memories.map((memory, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCardClick(memory, index)}
            className={`bg-gradient-to-br ${memory.color} p-6 rounded-2xl shadow-lg text-white relative overflow-hidden cursor-pointer transition-all`}
          >
            <div className="relative z-10">
              <Camera className="mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">{memory.title}</h3>
              <p className="text-sm opacity-90">{memory.description}</p>
              <div className="mt-4 text-xs opacity-75">
                Click to view photos & videos
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/reasons')}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg inline-flex items-center gap-2"
        >
          Continue to See Why I Love You
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>

      <PhotoGallery
        isOpen={isGalleryOpen}
        onClose={closeGallery}
        memoryTitle={selectedMemory?.title}
        memoryIndex={selectedMemory?.index}
      />
    </div>
  );
};

export default MemoryLane;
