// src/ThemeContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, darkTheme, lightTheme } from './themes';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode; // Use ReactNode to allow any valid React child
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') || 'light';
    setTheme(localTheme === 'dark'? darkTheme : lightTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === lightTheme? darkTheme : lightTheme;
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme === darkTheme? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
