import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SoftCard } from './SoftUI';
import { PASHTO_CONTENT } from '../constants';
import { useTheme } from './ThemeProvider';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const Home: React.FC<{ onRead: (id: number) => void }> = ({ onRead }) => {
  const { theme, isDarkMode } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);

  const featuredSections = PASHTO_CONTENT.sections.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredSections.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [featuredSections.length]);

  return (
    <div className="p-4 flex flex-col gap-6 pb-20">
      {/* Featured Slider */}
      <section className="relative h-48 rounded-3xl overflow-hidden soft-shadow dark:soft-shadow-dark">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col justify-end p-6 text-white"
            style={{ background: theme.gradient }}
          >
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Star size={12} fill="currentColor" />
              <span>غوره برخه</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{featuredSections[activeSlide].title}</h3>
            <p className="text-sm opacity-80 line-clamp-1">{featuredSections[activeSlide].content}</p>
          </motion.div>
        </AnimatePresence>
        
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredSections.map((_, i) => (
            <div 
              key={i} 
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ 
                width: activeSlide === i ? '24px' : '8px',
                backgroundColor: activeSlide === i ? 'white' : 'rgba(255,255,255,0.4)'
              }}
            />
          ))}
        </div>
      </section>

      {/* Introduction */}
      <SoftCard className="bg-opacity-50">
        <h2 className="text-xl font-bold mb-3" style={{ color: theme.primary }}>
          {PASHTO_CONTENT.title}
        </h2>
        <p className="text-sm leading-relaxed opacity-80">
          {PASHTO_CONTENT.introduction.split('\n')[0]}
        </p>
      </SoftCard>

      {/* Grid Sections */}
      <div className="grid grid-cols-1 gap-4">
        <h3 className="text-lg font-bold px-2" style={{ color: theme.primary }}>ټولې برخې</h3>
        {PASHTO_CONTENT.sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SoftCard 
              onClick={() => onRead(section.id)}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ background: theme.gradient }}
                >
                  {section.id}
                </div>
                <div>
                  <h4 className="font-bold">{section.title}</h4>
                  <p className="text-xs opacity-50">د بریا {section.id} عامل</p>
                </div>
              </div>
              <ChevronLeft className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </SoftCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
