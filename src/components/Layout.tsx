import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, BookOpen, Settings, Info, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { MENU_ITEMS } from '../constants';
import { cn } from '../lib/utils';
import { GeometricPattern } from './GeometricPattern';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: string;
  onScreenChange: (screen: any) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onScreenChange }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { theme, isDarkMode, toggleDarkMode } = useTheme();

  const getIcon = (id: string) => {
    switch (id) {
      case 'home': return <Home size={20} />;
      case 'reading': return <BookOpen size={20} />;
      case 'settings': return <Settings size={20} />;
      case 'about': return <Info size={20} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <GeometricPattern className="absolute inset-0 z-0 pointer-events-none" />

      {/* AppBar */}
      <header 
        className={cn(
          "sticky top-0 z-40 px-4 py-4 flex items-center justify-between backdrop-blur-md transition-all duration-300 pt-[calc(1rem+env(safe-area-inset-top))]",
          isDarkMode ? "bg-black/50 border-b border-white/10" : "bg-white/50 border-b border-black/5"
        )}
      >
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <h1 className="text-xl font-bold tracking-tight" style={{ color: theme.primary }}>
          د بریا راز
        </h1>

        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>

      {/* Side Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                "fixed top-0 right-0 bottom-0 w-72 z-50 p-6 flex flex-col gap-8",
                isDarkMode ? "bg-[#121212]" : "bg-white"
              )}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold" style={{ color: theme.primary }}>مینو</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {MENU_ITEMS.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: -8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onScreenChange(item.id);
                      setIsDrawerOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-right",
                      currentScreen === item.id 
                        ? (isDarkMode ? "bg-white/10 text-white" : "bg-black/5 text-black")
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                    )}
                  >
                    <span style={{ color: currentScreen === item.id ? theme.primary : 'inherit' }}>
                      {getIcon(item.id)}
                    </span>
                    <span className="text-lg font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto p-4 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <p className="text-xs text-center opacity-50">v1.0.0 - Pashto Edition</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
