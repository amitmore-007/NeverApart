import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Camera, MessageCircle, Gift, Shield, Sparkles, Menu, X } from 'lucide-react';

const LoveNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeHearts, setActiveHearts] = useState([]);

  const navItems = [
    { path: '/', label: 'Home', icon: Heart, color: 'text-red-500' },
    { path: '/memories', label: 'Memories', icon: Camera, color: 'text-pink-500' },
    { path: '/reasons', label: 'Why I Love You', icon: Sparkles, color: 'text-purple-500' },
    { path: '/apology', label: 'My Apology', icon: MessageCircle, color: 'text-blue-500' },
    { path: '/promises', label: 'Promises', icon: Shield, color: 'text-green-500' },
    { path: '/surprise', label: 'Surprise', icon: Gift, color: 'text-yellow-500' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHearts(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          delay: Math.random() * 2
        }
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveHearts(prev => prev.slice(1));
    }, 4000);

    return () => clearTimeout(timer);
  }, [activeHearts]);

  const isActive = (path) => location.pathname === path;

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {activeHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: window.innerHeight + 50, opacity: 0, scale: 0 }}
            animate={{ 
              y: -50, 
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 4,
              delay: heart.delay,
              ease: "easeOut"
            }}
            className="absolute text-pink-300"
            style={{ left: heart.x }}
          >
            <Heart size={20} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-pink-200 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavClick('/')}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-red-500"
              >
                <Heart size={32} fill="currentColor" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                For My Love
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <motion.button
                    key={item.path}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavClick(item.path)}
                    className={`relative px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                      active 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      animate={active ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 15, -15, 0]
                      } : {}}
                      transition={{ 
                        duration: 1.5,
                        repeat: active ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                      className={active ? 'text-white' : item.color}
                    >
                      <Icon size={18} />
                    </motion.div>
                    <span className="font-medium text-sm">{item.label}</span>
                    
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full -z-10"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-lg border-t border-pink-200"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <motion.button
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick(item.path)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                        active 
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' 
                          : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                      }`}
                    >
                      <motion.div
                        animate={active ? { 
                          scale: [1, 1.3, 1],
                          rotate: [0, 20, -20, 0]
                        } : {}}
                        transition={{ 
                          duration: 1.5,
                          repeat: active ? Infinity : 0,
                          repeatType: "reverse"
                        }}
                        className={active ? 'text-white' : item.color}
                      >
                        <Icon size={20} />
                      </motion.div>
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from going under navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default LoveNavbar;
