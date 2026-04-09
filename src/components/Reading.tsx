import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { SoftButton } from './SoftUI';
import { Maximize2, Minimize2, ArrowRight } from 'lucide-react';

export const Reading: React.FC<{ selectedId?: number, onBack: () => void }> = ({ selectedId, onBack }) => {
  const { theme } = useTheme();
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch('/src/assets/data.json')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error("Error loading JSON:", err));
  }, []);

  if (!content) return <div className="p-8 text-center opacity-50">د معلوماتو بارول...</div>;

  const section = selectedId 
    ? content.sections.find((s: any) => s.id === selectedId) 
    : null;

  return (
    <div className="h-full flex flex-col">
      {!isFocusMode && (
        <div className="p-4 flex items-center justify-between">
          <SoftButton variant="secondary" onClick={onBack} className="p-2 rounded-full px-4">
            <ArrowRight size={20} />
            <span>بیرته</span>
          </SoftButton>
          <SoftButton variant="secondary" onClick={() => setIsFocusMode(true)} className="p-2 rounded-full">
            <Maximize2 size={20} />
          </SoftButton>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scroll-smooth">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-6 text-center leading-tight" style={{ color: theme.primary }}>
            {section ? section.title : content.title}
          </h1>

          <div className="space-y-6 text-lg leading-loose opacity-90 text-justify">
            {section ? (
              <p>{section.content}</p>
            ) : (
              <>
                <p className="font-bold text-xl italic opacity-100">{content.subtitle}</p>
                {content.introduction.split('\n\n').map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
                <div className="py-8 space-y-12">
                  {content.sections.map((s: any) => (
                    <div key={s.id} className="space-y-4">
                      <h2 className="text-2xl font-bold border-r-4 pr-4" style={{ borderColor: theme.accent }}>
                        {s.id}. {s.title}
                      </h2>
                      <p>{s.content}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-12 border-t border-black/5 dark:border-white/5">
                  <h2 className="text-2xl font-bold mb-4">پایله</h2>
                  <p>{content.conclusion}</p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {isFocusMode && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsFocusMode(false)}
          className="fixed bottom-8 left-8 p-4 rounded-full bg-black/20 backdrop-blur-xl text-white z-50"
        >
          <Minimize2 size={24} />
        </motion.button>
      )}
    </div>
  );
};
