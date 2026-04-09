export type ThemeColor = 
  | 'Royal Blue' 
  | 'Emerald Green' 
  | 'Deep Purple' 
  | 'Gold Accent' 
  | 'Teal' 
  | 'Indigo' 
  | 'Soft Gray' 
  | 'Dark Navy' 
  | 'Sunset Orange' 
  | 'Rose';

export type FontOption = 'Sans';

export interface ThemeConfig {
  name: ThemeColor;
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
}

export interface AppState {
  theme: ThemeColor;
  isDarkMode: boolean;
  font: FontOption;
  currentScreen: 'home' | 'reading' | 'settings' | 'about';
}
