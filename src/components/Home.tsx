import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SoftCard } from './SoftUI';
import { useTheme } from './ThemeProvider';
import { ChevronLeft, Star } from 'lucide-react';
import contentData from '../assets/data.json';

export const Home: React.FC<{ onRead: (id: number) => void }> = ({ onRead }) => {
  const { theme } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);
  const content = contentData;

  useEffect(() => {
    if (!content) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % content.sections.length);
    }, 10000); // 10 seconds interval
    return () => clearInterval(timer);
  }, [content]);

  if (!content) return <div className="p-8 text-center opacity-50">د معلوماتو بارول...</div>;

  return (
    <div className="p-4 flex flex-col gap-6 pb-20">
      {/* Featured Slider (Feature) */}
      <section className="relative h-64 rounded-[32px] overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center text-white"
            style={{ background: theme.gradient }}
          >
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
              <Star size={14} fill="currentColor" />
              <span>غوره برخه</span>
            </div>
            
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black mb-4 leading-tight drop-shadow-lg"
            >
              {content.sections[activeSlide].title}
            </motion.h3>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg opacity-90 leading-relaxed line-clamp-3 max-w-md"
            >
              {content.sections[activeSlide].content}
            </motion.p>
          </motion.div>
        </AnimatePresence>
        
        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {content.sections.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveSlide(i)}
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: activeSlide === i ? '32px' : '8px',
                backgroundColor: activeSlide === i ? 'white' : 'rgba(255,255,255,0.3)'
              }}
            />
          ))}
        </div>
      </section>

      {/* Introduction */}
      <SoftCard className="bg-opacity-50 border-r-4" style={{ borderRightColor: theme.primary }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: theme.primary }}>
          {content.title}
        </h2>
        <p className="text-sm leading-loose opacity-80 text-justify">
          {content.introduction}
        </p>
      </SoftCard>

      {/* Grid Sections */}
      <div className="grid grid-cols-1 gap-4">
        <h3 className="text-lg font-bold px-2" style={{ color: theme.primary }}>ټولې برخې</h3>
        {content.sections.map((section: any, index: number) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <SoftCard 
              onClick={() => onRead(section.id)}
              className="flex items-center justify-between group py-5"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg"
                  style={{ background: theme.gradient }}
                >
                  {section.id}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{section.title}</h4>
                  <p className="text-xs opacity-50">د بریا {section.id} عامل</p>
                </div>
              </div>
              <ChevronLeft className="opacity-30 group-hover:opacity-100 transition-opacity" />
            </SoftCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
