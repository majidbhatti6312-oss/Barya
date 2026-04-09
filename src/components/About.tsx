import React from 'react';
import { SoftCard } from './SoftUI';
import { useTheme } from './ThemeProvider';
import { Info, Shield, Heart, Globe } from 'lucide-react';

export const About: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-8">
        <div 
          className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white soft-shadow"
          style={{ background: theme.gradient }}
        >
          <Shield size={40} />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: theme.primary }}>د بریا راز</h2>
        <p className="opacity-50">نسخه ۱.۰.۰</p>
      </div>

      <SoftCard className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
            <Info size={24} />
          </div>
          <div>
            <h3 className="font-bold">کاريال جوړوونکی: عبیدالله غفاري</h3>
            <p className="text-sm opacity-60">ترتيب کوونکی : الحاج ډاکټر فريدون احرار</p>
          </div>
        </div>
      </SoftCard>

      <SoftCard className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-red-500/10 text-red-500">
            <Heart size={24} />
          </div>
          <div>
            <h3 className="font-bold">نشروونکې اداره</h3>
            <p className="text-sm opacity-60">د اسلامي کاريالونو څانګه</p>
          </div>
        </div>
      </SoftCard>

      <SoftCard className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-green-500/10 text-green-500">
            <Globe size={24} />
          </div>
          <div>
            <h3 className="font-bold">واټساپ شميره</h3>
            <p className="text-sm opacity-60" dir="ltr">0779705897</p>
          </div>
        </div>
      </SoftCard>
    </div>
  );
};
