// src/theme.ts

export interface Theme {
    background: string;
    textPrimary: string;
    textSecondary: string;
    inputBackground: string;
    inputBorder: string;
    inputText: string;
    buttonBackground: string;
    buttonHover: string;
    buttonFocus: string;
    buttonActive: string;
  }
  
  export const lightTheme: Theme = {
    background: '#ffffff',
    textPrimary: '#000000',
    textSecondary: '#666666',
    inputBackground: '#f9fafb',
    inputBorder: '#dcdcdc',
    inputText: '#1a202c',
    buttonBackground: '#007bff',
    buttonHover: '#0056b3',
    buttonFocus: '#004085',
    buttonActive: '#0069d9',
  };
  
  export const darkTheme: Theme = {
    background: '#121212',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    inputBackground: '#2d3748',
    inputBorder: '#4a5568',
    inputText: '#cbd5e0',
    buttonBackground: '#007bff',
    buttonHover: '#0056b3',
    buttonFocus: '#004085',
    buttonActive: '#0069d9',
  };
  