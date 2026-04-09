import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { LUXURY_THEMES } from '../constants';
import { SoftCard, SoftButton } from './SoftUI';
import { Check, RotateCcw, Palette, Moon } from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, isDarkMode, setTheme, toggleDarkMode, resetToDefault } = useTheme();

  return (
    <div className="p-4 space-y-8 pb-24">
      <h2 className="text-2xl font-bold px-2" style={{ color: theme.primary }}>تنظیمات</h2>

      {/* Theme Selection */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-2 opacity-60">
          <Palette size={18} />
          <h3 className="text-sm font-bold uppercase tracking-wider">د رنګ انتخاب</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {LUXURY_THEMES.map((t) => (
            <SoftCard
              key={t.name}
              onClick={() => setTheme(t.name)}
              className={theme.name === t.name ? "ring-2 ring-offset-2 dark:ring-offset-black" : ""}
              style={{ ringColor: t.primary }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ background: t.gradient }}
                />
                <span className="text-sm font-medium">{t.name}</span>
                {theme.name === t.name && <Check size={14} className="mr-auto" style={{ color: t.primary }} />}
              </div>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* Dark Mode & Font */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-2 opacity-60">
          <Moon size={18} />
          <h3 className="text-sm font-bold uppercase tracking-wider">بڼه او لیکدود</h3>
        </div>
        
        <SoftCard className="flex items-center justify-between">
          <span className="font-medium">توره بڼه (Dark Mode)</span>
          <button 
            onClick={toggleDarkMode}
            className={`w-14 h-8 rounded-full transition-colors duration-300 relative ${isDarkMode ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <motion.div 
              animate={{ x: isDarkMode ? 24 : 4 }}
              className="absolute top-1 left-0 w-6 h-6 bg-white rounded-full shadow-md"
            />
          </button>
        </SoftCard>
      </section>

      {/* Reset */}
      <SoftButton 
        variant="secondary" 
        onClick={resetToDefault}
        className="w-full py-4 text-red-500"
      >
        <RotateCcw size={18} />
        <span>بیا تنظیمول (Reset)</span>
      </SoftButton>
    </div>
  );
};
