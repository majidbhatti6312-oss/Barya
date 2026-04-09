/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { ThemeProvider } from './components/ThemeProvider';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Reading } from './components/Reading';
import { Settings } from './components/Settings';
import { About } from './components/About';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'reading' | 'settings' | 'about'>('home');
  const [selectedSectionId, setSelectedSectionId] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Configure Status Bar
    const setupStatusBar = async () => {
      try {
        await StatusBar.setOverlaysWebView({ overlay: true });
      } catch (e) {
        console.warn('StatusBar plugin not available');
      }
    };
    setupStatusBar();

    // Handle Back Button
    const backListener = CapApp.addListener('backButton', ({ canGoBack }) => {
      if (currentScreen !== 'home') {
        setCurrentScreen('home');
        setSelectedSectionId(undefined);
      } else if (selectedSectionId !== undefined) {
        setSelectedSectionId(undefined);
      } else {
        CapApp.exitApp();
      }
    });

    return () => {
      backListener.then(l => l.remove());
    };
  }, [currentScreen, selectedSectionId]);

  const handleRead = (id?: number) => {
    setSelectedSectionId(id);
    setCurrentScreen('reading');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onRead={handleRead} />;
      case 'reading':
        return <Reading selectedId={selectedSectionId} onBack={() => setCurrentScreen('home')} />;
      case 'settings':
        return <Settings />;
      case 'about':
        return <About />;
      default:
        return <Home onRead={handleRead} />;
    }
  };

  return (
    <ThemeProvider>
      <Layout 
        currentScreen={currentScreen} 
        onScreenChange={(screen) => {
          setCurrentScreen(screen);
          setSelectedSectionId(undefined);
        }}
      >
        {renderScreen()}
      </Layout>
    </ThemeProvider>
  );
}
