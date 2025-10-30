import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type AnimationIntensity = 'off' | 'low' | 'medium' | 'high';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  animationIntensity: AnimationIntensity;
  setAnimationIntensity: (intensity: AnimationIntensity) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [animationIntensity, setAnimationIntensityState] = useState<AnimationIntensity>('medium');

  useEffect(() => {
    // Check localStorage first
    const storedTheme = localStorage.getItem('hotel_theme') as Theme;
    const storedIntensity = localStorage.getItem('hotel_animation_intensity') as AnimationIntensity;

    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }

    if (storedIntensity) {
      setAnimationIntensityState(storedIntensity);
    }

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimationIntensityState('off');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('hotel_theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-animation-intensity', animationIntensity);
    localStorage.setItem('hotel_animation_intensity', animationIntensity);
  }, [animationIntensity]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setAnimationIntensity = (intensity: AnimationIntensity) => {
    setAnimationIntensityState(intensity);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      animationIntensity,
      setAnimationIntensity
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
