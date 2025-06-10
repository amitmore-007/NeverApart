import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useDragControls } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize2, Minimize2 } from 'lucide-react';

const PhotoGallery = ({ isOpen, onClose, memoryTitle, memoryIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [media, setMedia] = useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dragDirection, setDragDirection] = useState(0);
  
  const x = useMotionValue(0);
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  // Define media files for each memory
  const memoryMedia = {
    0: [ // Our First Date
      { type: 'image', src: '/assets/memories/first date/photo1.jpg', alt: 'First Date Photo 1' },
      { type: 'video', src: '/assets/memories/first date/video1.mp4', alt: 'First Date Video' },
      { type: 'image', src: '/assets/memories/first date/photo2.jpg', alt: 'First Date Photo 2' },
      { type: 'image', src: '/assets/memories/first date/photo3.jpg', alt: 'First Date Photo 3' },
    ],
    1: [ // Your Beautiful Smile
      { type: 'image', src: '/assets/memories/smile/photo1.jpg', alt: 'Beautiful Smile 1' },
      { type: 'image', src: '/assets/memories/smile/photo2.jpg', alt: 'Beautiful Smile 2' },
      { type: 'image', src: '/assets/memories/smile/photo3.jpg', alt: 'Beautiful Smile 3' },
      { type: 'image', src: '/assets/memories/smile/photo4.jpg', alt: 'Beautiful Smile 4' },
      { type: 'image', src: '/assets/memories/smile/photo5.jpg', alt: 'Beautiful Smile 5' },
      { type: 'image', src: '/assets/memories/smile/photo6.jpg', alt: 'Beautiful Smile 6' },
      { type: 'image', src: '/assets/memories/smile/photo7.jpg', alt: 'Beautiful Smile 7' },
      { type: 'image', src: '/assets/memories/smile/photo8.jpg', alt: 'Beautiful Smile 8' },
      { type: 'video', src: '/assets/memories/smile/video1.mp4', alt: 'Smile Video' },
    ],
    2: [ // Late Night Talks
      { type: 'image', src: '/assets/memories/night/photo1.jpg', alt: 'Late Night Talk 1' },
      { type: 'image', src: '/assets/memories/night/photo2.jpg', alt: 'Late Night Talk 2' },
      { type: 'image', src: '/assets/memories/night/photo3.jpg', alt: 'Late Night Talk 3' },
      { type: 'image', src: '/assets/memories/night/photo4.jpg', alt: 'Late Night Talk 4' },
    ],
    3: [ // Your Laugh
      { type: 'video', src: '/assets/memories/Laugh/video1.mp4', alt: 'Your Laugh Video 1' },
      { type: 'video', src: '/assets/memories/Laugh/video2.mp4', alt: 'Your Laugh Video 2' },
      { type: 'image', src: '/assets/memories/Laugh/photo1.jpg', alt: 'Laugh Photo 1' },
      { type: 'image', src: '/assets/memories/Laugh/photo2.jpg', alt: 'Laugh Photo 2' },
      { type: 'image', src: '/assets/memories/Laugh/photo3.jpg', alt: 'Laugh Photo 3' },
      { type: 'image', src: '/assets/memories/Laugh/photo4.jpg', alt: 'Laugh Photo 4' },
    ],
    4: [ // Every Moment Together
      { type: 'image', src: '/assets/memories/together/photo1.jpg', alt: 'Together Photo 1' },
      { type: 'image', src: '/assets/memories/together/photo2.jpg', alt: 'Together Photo 2' },
      { type: 'image', src: '/assets/memories/together/photo3.jpg', alt: 'Together Photo 3' },
      { type: 'image', src: '/assets/memories/together/photo4.jpg', alt: 'Together Photo 4' },
      { type: 'image', src: '/assets/memories/together/photo5.jpg', alt: 'Together Photo 5' },
      { type: 'image', src: '/assets/memories/together/photo6.jpg', alt: 'Together Photo 6' },
      { type: 'image', src: '/assets/memories/together/photo7.jpg', alt: 'Together Photo 7' },
      { type: 'image', src: '/assets/memories/together/photo8.jpg', alt: 'Together Photo 8' },
      { type: 'image', src: '/assets/memories/together/photo9.jpg', alt: 'Together Photo 9' },
      { type: 'image', src: '/assets/memories/together/photo10.jpg', alt: 'Together Photo 10' },
      { type: 'video', src: '/assets/memories/together/video1.mp4', alt: 'Together Video' },
    ]
  };

  useEffect(() => {
    if (memoryIndex !== null) {
      setMedia(memoryMedia[memoryIndex] || []);
      setCurrentIndex(0);
      setIsVideoPlaying(false);
    }
  }, [memoryIndex]);

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
    setIsVideoPlaying(false);
    x.set(0);
  };

  const prevMedia = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setIsVideoPlaying(false);
    x.set(0);
  };

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevMedia();
    } else if (info.offset.x < -threshold) {
      nextMedia();
    }
  };

  const toggleVideoPlay = () => {
    const video = document.getElementById(`gallery-video-${currentIndex}`);
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen || media.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'}`}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className={`relative w-full bg-black ${isFullscreen ? 'h-full' : 'max-w-6xl h-5/6 rounded-2xl overflow-hidden'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {!isFullscreen && (
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{memoryTitle}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                  >
                    <Maximize2 size={20} />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Fullscreen controls */}
          {isFullscreen && (
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button
                onClick={toggleFullscreen}
                className="p-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-colors"
              >
                <Minimize2 size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          )}

          {/* Media Display */}
          <div 
            ref={constraintsRef}
            className={`relative bg-black flex items-center justify-center overflow-hidden ${isFullscreen ? 'h-full' : 'h-96'}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                drag="x"
                dragControls={dragControls}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{ x }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
                whileDrag={{ cursor: "grabbing" }}
              >
                {media[currentIndex]?.type === 'image' ? (
                  <img
                    src={media[currentIndex].src}
                    alt={media[currentIndex].alt}
                    className="max-w-full max-h-full object-contain select-none"
                    draggable={false}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QaG90byBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                    }}
                  />
                ) : (
                  <div className="relative max-w-full max-h-full">
                    <video
                      id={`gallery-video-${currentIndex}`}
                      src={media[currentIndex].src}
                      className="max-w-full max-h-full object-contain"
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      onEnded={() => setIsVideoPlaying(false)}
                      controls={false}
                    />
                    <button
                      onClick={toggleVideoPlay}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-40 transition-opacity"
                    >
                      <div className="bg-black bg-opacity-50 rounded-full p-4">
                        {isVideoPlaying ? (
                          <Pause size={48} className="text-white" />
                        ) : (
                          <Play size={48} className="text-white ml-1" />
                        )}
                      </div>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {media.length > 1 && (
              <>
                <button
                  onClick={prevMedia}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full shadow-lg transition-all z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextMedia}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full shadow-lg transition-all z-10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Swipe indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
              Swipe or drag to navigate
            </div>
          </div>

          {/* Thumbnails */}
          {media.length > 1 && !isFullscreen && (
            <div className="p-4 bg-gray-900">
              <div className="flex gap-2 justify-center overflow-x-auto max-w-full">
                {media.map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsVideoPlaying(false);
                    }}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      currentIndex === index ? 'border-pink-500 shadow-lg shadow-pink-500/30' : 'border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1nPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <Play size={16} className="text-gray-300" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Counter */}
          <div className={`absolute ${isFullscreen ? 'top-4 left-4' : 'top-20 right-4'} bg-black bg-opacity-60 text-white px-3 py-2 rounded-full text-sm font-medium`}>
            {currentIndex + 1} / {media.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoGallery;
